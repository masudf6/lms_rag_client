// src/components/Layout.jsx
import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#ffffff", // White background for main content
      }}
    >
        {/* Left Sidebar */}
        <Sidebar />

        {/* Right Panel */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {/* Top Bar */}
          <Topbar />

          {/* Main Content */}
          <Box sx={{ flexGrow: 1, p: 3 }}>
            <Outlet />
          </Box>
        </Box>
    </Box>
  );
}
