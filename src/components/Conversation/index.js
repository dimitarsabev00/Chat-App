import { Stack, Box } from "@mui/material";
import { Chat_History } from "../../data";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
} from "./MsgTypes";

const Conversation = ({ isMobile }) => {
  return (
    <Box p={isMobile ? 1 : 3}>
      <Stack spacing={3}>
        {Chat_History.map((el, idx) => {
          switch (el.type) {
            case "divider":
              return (
                // Timeline
                <Timeline el={el} />
              );

            case "msg":
              switch (el.subtype) {
                case "img":
                  return (
                    // Media Message
                    <MediaMsg el={el} />
                  );

                case "doc":
                  return (
                    // Doc Message
                    <DocMsg el={el} />
                  );
                case "link":
                  return (
                    //  Link Message
                    <LinkMsg el={el} />
                  );

                case "reply":
                  return (
                    //  ReplyMessage
                    <ReplyMsg el={el} />
                  );

                default:
                  return (
                    // Text Message
                    <TextMsg el={el} />
                  );
              }

            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export { Conversation };
