import { Menu, MenuItem, Stack } from "@mui/material";
import { DotsThreeVertical } from "phosphor-react";
import { useState } from "react";

const Message_options = [
  {
    title: "Reply",
  },
  {
    title: "React",
  },
  {
    title: "Forward",
  },
  {
    title: "Edit",
  },
  {
    title: "Delete",
  },
];

const MessageOptions = () => {
  const [openMsgOptions, setOpenMsgOptions] = useState(null);
  const open = Boolean(openMsgOptions);
  const handleClick = (event) => {
    setOpenMsgOptions(event.currentTarget);
  };
  const handleClose = () => {
    setOpenMsgOptions(null);
  };
  return (
    <>
      <DotsThreeVertical
        size={20}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={openMsgOptions}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack spacing={1} px={1}>
          {Message_options.map((el) => (
            <MenuItem onClick={handleClose}>{el.title}</MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
};

export default MessageOptions;
