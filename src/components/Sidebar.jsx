// src/components/Sidebar.jsx
import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ChatIcon from '@mui/icons-material/Chat';
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const sidebarItems = [
    { label: "Home", icon: <HomeIcon fontSize="large" />, route: "/" },
    { label: "Courses", icon: <MenuBookIcon fontSize="large" />, route: "/courses" },
    { label: "Chat", icon: <ChatIcon fontSize="large" />, route: "/chat" },
  ];

  return (
    <Box
      sx={{
        width: 100,                 
        bgcolor: "#cfe3dd",        
        minHeight: "100vh",        
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo container at the top */}
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <SchoolIcon fontSize="large" />
      </Box>

      {/* Navigation items centered in the remaining space */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <List sx={{ width: "100%" }}>
          {sidebarItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                onClick={() => navigate(item.route)}
                sx={{
                  flexDirection: "column", // Stack icon above text.
                  alignItems: "center",
                  py: 2,
                }}
              >
                <ListItemIcon sx={{ minWidth: "unset" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    textAlign: "center",
                    mt: 1,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
