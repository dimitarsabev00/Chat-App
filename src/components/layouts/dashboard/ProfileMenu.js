import React, { useState } from "react";
import { Avatar, Box, Fade, Menu, MenuItem, Stack } from "@mui/material";

import { Gear, SignOut, User } from "phosphor-react";
import { signOut } from "firebase/auth";
import { auth, db } from "../../../firebaseConfig";
import { UserAuth } from "../../../contexts/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ChatAuth } from "../../../contexts/ChatContext";

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser } = UserAuth();
  const { dispatch } = ChatAuth();
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await updateDoc(doc(db, "users", currentUser.uid), {
      isOnline: false,
    });
    dispatch({ type: "LOGOUT_FROM_APP" });
    await signOut(auth);
    navigate("/auth/login");
  };
  return (
    <>
      <Avatar
        id="profile-positioned-button"
        aria-controls={openMenu ? "profile-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        alt={currentUser?.displayName}
        src={currentUser?.photoURL}
        onClick={handleClick}
      />
      <Menu
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        TransitionComponent={Fade}
        id="profile-positioned-menu"
        aria-labelledby="profile-positioned-button"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={1}>
          <Stack spacing={1}>
            <MenuItem onClick={handleClose}>
              <Stack
                sx={{ width: 100 }}
                direction="row"
                alignItems={"center"}
                justifyContent="space-between"
              >
                <span>Profile</span>
                <User />
              </Stack>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Stack
                sx={{ width: 100 }}
                direction="row"
                alignItems={"center"}
                justifyContent="space-between"
              >
                <span>Settings</span>
                <Gear />
              </Stack>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Stack
                sx={{ width: 100 }}
                direction="row"
                alignItems={"center"}
                justifyContent="space-between"
              >
                <span>Logout</span>
                <SignOut />
              </Stack>
            </MenuItem>
          </Stack>
        </Box>
      </Menu>
    </>
  );
};

export default ProfileMenu;
