import { Stack, Box } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { ChatAuth } from "../../contexts/ChatContext";
import { Chat_History } from "../../data";
import { db } from "../../firebaseConfig";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
} from "./MsgTypes";

const Conversation = ({ isMobile }) => {
  const [messages, setMessages] = useState("");
  const { data } = ChatAuth();
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [data.chatId]);
  return (
    <Box p={isMobile ? 1 : 3}>
      <Stack spacing={3}>
        {/* {Chat_History.map((el, idx) => {
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
        })} */}
        {messages &&
          messages.map((message) => (
            <TextMsg message={message} key={message.id} />
          ))}
      </Stack>
    </Box>
  );
};

export { Conversation };
