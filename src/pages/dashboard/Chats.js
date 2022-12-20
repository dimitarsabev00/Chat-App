import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  InputBase,
  Avatar,
} from "@mui/material";
import { ArchiveBox, MagnifyingGlass, UserCirclePlus } from "phosphor-react";
import { SimpleBarStyle } from "../../components/Scrollbar";
import { useTheme, styled, alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import MobileBottomNav from "../../components/layouts/MobileBottomNav";
import { ChatList } from "../../data";
import ChatElement from "../../components/ChatElement";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { UserAuth } from "../../contexts/AuthContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.background.paper, 1),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

const Chats = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const { currentUser } = UserAuth();
  const [chats, setChats] = useState([]);
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
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.userID
        ? currentUser.uid + user.userID
        : user.userID + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //Create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //Create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.userID,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.userID), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
    setUser(null);
    setUsername("");
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
        <Stack sx={{ width: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              onKeyDown={handleKey}
            />
          </Search>
        </Stack>
        {user && (
          <Stack spacing={1} onClick={handleSelect} sx={{ cursor: "pointer" }}>
            <Stack direction={"row"} spacing={1.5} alignItems="center">
              <Avatar src={user?.photoURL} />
              <Typography variant="subtitle2">{user?.displayName}</Typography>
            </Stack>
            <Divider />
          </Stack>
        )}
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
              {Object.entries(chats)?.map((el) => {
                return <ChatElement {...el[1].userInfo} />;
              })}
            </Stack>
          </SimpleBarStyle>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Chats;
