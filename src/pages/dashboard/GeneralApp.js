import { Box, Stack, useTheme } from "@mui/material";
import Chats from "./Chats";
import Conversation from "../../components/Conversation";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import StarredMessages from "../../components/StarredMessages";
import Media from "../../components/SharedMessages";
const GeneralApp = () => {
  const theme = useTheme();

  const { sideBar } = useSelector((state) => state.app);

  return (
    <Stack direction="row" sx={{ width: "100%" }}>
      <Chats />

      <Box
        sx={{
          height: "100%",
          width: sideBar.open ? `calc(100vw - 740px )` : "calc(100vw - 420px )",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#f0f4fa"
              : theme.palette.background.default,
        }}
      >
        <Conversation />
      </Box>
      {
        sideBar.open &&
          (() => {
            switch (sideBar.type) {
              case "CONTACT":
                return <Contact />;

              case "STARRED":
                return <StarredMessages />;

              case "SHARED":
                return <Media />;

              default:
                break;
            }
          })()
        //  Contact Info
        //

        //
      }
    </Stack>
  );
};

export default GeneralApp;
