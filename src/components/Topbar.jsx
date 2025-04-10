// src/components/Topbar.jsx
import React from "react";
import { Box, Select, MenuItem, Avatar } from "@mui/material";

export default function Topbar() {
  return (
    <Box
      sx={{
        height: 60,
        bgcolor: "#cfe3dd",  // Same background to match the design
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        px: 3,
      }}
    >
      <Select
        value="masud"
        variant="outlined"
        size="small"
        startAdornment={<Avatar sx={{ width: 24, height: 24, mr: 1 }} />}
      >
        <MenuItem value="masud">Masud</MenuItem>
        {/* More MenuItems here if needed */}
      </Select>
    </Box>
  );
}
