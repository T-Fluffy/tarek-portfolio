import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box, Button, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const cyberBlue = "#00BFFF"; 

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = (path?: string) => {
    setAnchorEl(null);
    if (path) navigate(path);
  };

  const navItemStyles = {
    textTransform: "none" as const,
    fontSize: "0.9rem",
    mx: 1.5,
    color: "rgba(255, 255, 255, 0.7)",
    transition: "0.3s",
    "&.active": {
      color: cyberBlue,
      "&:after": {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "2px",
        backgroundColor: cyberBlue,
        boxShadow: `0 0 10px ${cyberBlue}`,
      },
    },
    "&:hover": { color: "white", backgroundColor: "transparent" },
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: "rgba(10, 10, 15, 0.8)", 
        backdropFilter: "blur(8px)",
        borderBottom: `1px solid rgba(0, 191, 255, 0.2)`,
        boxShadow: "none"
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LOGO - Sert maintenant de bouton HOME principal */}
        <Typography 
          variant="h6" 
          onClick={() => navigate("/")}
          sx={{ 
            cursor: "pointer", 
            display: "flex", 
            alignItems: "center", 
            fontWeight: "bold", 
            color: "white" 
          }}
        >
          <Box component="span" sx={{ color: cyberBlue, mr: 0.5 }}>&gt;</Box>Tarek.Dev
        </Typography>

        {isMobile ? (
          <>
            <IconButton onClick={handleMenuOpen} color="inherit"><MenuIcon /></IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleMenuClose()} 
              PaperProps={{ sx: { bgcolor: "#0a0a0f", color: "white", border: `1px solid ${cyberBlue}` } }}>
              {/* On garde Home dans le menu mobile car c'est plus ergonomique sur téléphone */}
              <MenuItem onClick={() => handleMenuClose("/")}>Home</MenuItem>
              <MenuItem onClick={() => handleMenuClose("/about")}>About</MenuItem>
              <MenuItem onClick={() => handleMenuClose("/projects")}>Portfolio</MenuItem>
              <MenuItem onClick={() => handleMenuClose("/contact")}>Contact</MenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex' }}>
            {/* Bouton Home SUPPRIMÉ ici */}
            <Button component={NavLink} to="/about" sx={navItemStyles}>About</Button>
            <Button component={NavLink} to="/projects" sx={navItemStyles}>Portfolio</Button>
            <Button component={NavLink} to="/contact" sx={navItemStyles}>Contact</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;