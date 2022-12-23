import {
  Avatar,
  Badge,
  Box,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import truncateString from "../utils/truncate";
import StyledBadge from "./StyledBadge";
const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

const ChatElement = ({
  chatInfo,
  isOnline = true,
  handleSelectUser,
  lastMessage,
}) => {
  const lastMessageString =
    lastMessage === undefined ? "Click to chat" : lastMessage;
  const theme = useTheme();
  return (
    <StyledChatBox
      onClick={() => {
        handleSelectUser(chatInfo);
      }}
      sx={{
        width: "100%",

        borderRadius: 1,
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2}>
          {" "}
          {isOnline ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={chatInfo?.displayName} src={chatInfo?.photoURL} />
            </StyledBadge>
          ) : (
            <Avatar alt={chatInfo?.displayName} src={chatInfo?.photoURL} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{chatInfo?.displayName}</Typography>
            <Typography variant="caption">
              {truncateString(lastMessageString, 20)}
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems={"center"}>
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            {"10:24"}
          </Typography>
          <Badge className="unread-count" color="primary" badgeContent={"1"} />
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

export default ChatElement;
