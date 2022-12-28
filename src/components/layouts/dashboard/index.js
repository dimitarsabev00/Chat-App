import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { UserAuth } from "../../../contexts/AuthContext";
import useResponsive from "../../../hooks/useResponsive";
import SideBar from "./SideBar";

const DashboardLayout = () => {
  const isDesktop = useResponsive("up", "md");
  const { currentUser } = UserAuth();
  return (
    <>
      <Stack direction="row">
        {isDesktop && currentUser && (
          <>
            <SideBar />
          </>
        )}
        <Outlet />
      </Stack>
    </>
  );
};

export default DashboardLayout;
