import { Box, Stack } from "@mui/material";
import { ChatHeader, ChatFooter } from "../Chat";

const Conversation = () => {
  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/* ChatHeader */}
      <ChatHeader />
      {/* <Msg /> */}
      <Box width={"100%"} sx={{ flexGrow: 1 }}></Box>
      {/* <ChatFooter /> */}
      <ChatFooter />
    </Stack>
  );
};

export default Conversation;
