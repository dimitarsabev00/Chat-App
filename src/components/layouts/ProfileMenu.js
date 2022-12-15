import React from "react";
import { Avatar, Box, Fade, Menu, MenuItem, Stack } from "@mui/material";

import { faker } from "@faker-js/faker";
import { Gear, SignOut, User } from "phosphor-react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    signOut(auth);
  };
  return (
    <>
      <Avatar
        id="profile-positioned-button"
        aria-controls={openMenu ? "profile-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        alt={faker.name.fullName()}
        src={faker.image.avatar()}
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
