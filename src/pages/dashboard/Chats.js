import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { ArchiveBox, UserCirclePlus } from "phosphor-react";
import { SimpleBarStyle } from "../../components/Scrollbar";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import MobileBottomNav from "../../components/layouts/MobileBottomNav";
import ChatElement from "../../components/ChatElement";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { UserAuth } from "../../contexts/AuthContext";
import { ChatAuth } from "../../contexts/ChatContext";
import Search from "../../components/Search";

const Chats = () => {
  const { dispatch } = ChatAuth();
  const [chats, setChats] = useState([]);
  const { currentUser } = UserAuth();
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelectUser = (chatInfo) => {
    dispatch({ type: "CHANGE_USER", payload: chatInfo });
  };
  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        width: isDesktop ? 320 : "100vw",
        backgroundColor:
          theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,

        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      {!isDesktop && (
        // Mobile Bottom Nav
        <MobileBottomNav />
      )}

      <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
        <Stack
          alignItems={"center"}
          justifyContent="space-between"
          direction="row"
        >
          <Typography variant="h5">Chats</Typography>
          <IconButton
            component={Link}
            to="/app"
            sx={{ width: "max-content", color: theme.palette.primary.main }}
          >
            <UserCirclePlus />
          </IconButton>
        </Stack>

        <Search />

        <Stack spacing={1}>
          <Stack direction={"row"} spacing={1.5} alignItems="center">
            <ArchiveBox size={24} />
            <Button variant="text">Archive</Button>
          </Stack>
          <Divider />
        </Stack>
        <Stack sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}>
          <SimpleBarStyle timeout={500} clickOnTrack={false}>
            <Stack spacing={2.4}>
              {/* <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                Pinned
              </Typography> */}
              {/* Pinned Chats List */}
              {/* {ChatList.filter((el) => el.pinned).map((el, idx) => {
                return <ChatElement {...el} />;
              })} */}
              <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                All Chats
              </Typography>
              {/* All Chats List */}
              {/* {ChatList.filter((el) => !el.pinned).map((el, idx) => {
                return <ChatElement {...el} />;
              })} */}
              {chats && !Object.entries(chats).length < 1 ? (
                <>
                  {Object.entries(chats)
                    ?.sort((a, b) => b[1]?.date - a[1]?.date)
                    ?.map((chat) => {
                      return (
                        <ChatElement
                          chatInfo={chat[1]?.userInfo}
                          key={chat[0]}
                          handleSelectUser={handleSelectUser}
                          lastMessage={chat[1]?.lastMessage?.text}
                        />
                      );
                    })}
                </>
              ) : (
                <Box>No chats</Box>
              )}
            </Stack>
          </SimpleBarStyle>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Chats;
