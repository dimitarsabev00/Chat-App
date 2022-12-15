import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { UserAuth } from "../../contexts/AuthContext";
import useResponsive from "../../hooks/useResponsive";
import SideBar from "./SideBar";

const Layout = () => {
  const isDesktop = useResponsive("up", "md");
  const { user } = UserAuth();
  console.log(user);
  return (
    <>
      <Stack direction="row">
        {isDesktop && user && <SideBar />}

        <Outlet />
      </Stack>
    </>
  );
};

export default Layout;
