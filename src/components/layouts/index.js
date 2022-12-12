import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import SideBar from "./SideBar";

const Layout = () => {
  const isDesktop = useResponsive("up", "md");

  return (
    <>
      <Stack direction="row">
        {isDesktop && <SideBar />}

        <Outlet />
      </Stack>
    </>
  );
};

export default Layout;
