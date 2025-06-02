import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Button,
  useMediaQuery,
  useTheme,
  SvgIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';



const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (path?: string) => {
    setAnchorEl(null);
    if (path) navigate(path);
  };

  return (
    <Box sx={{ 
      flexGrow: 1,
      "& .MuiPaper-root": {
        backgroundColor: "#1F2937",
        color: "white",
        }, 
      }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Site Name */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "white", display: "flex", alignItems: "center" }}>
            <SvgIcon sx={{ marginRight: 1 }}>
              <svg viewBox="0 0 30 24">
                <path d="M3 4.5C3 2.84531 4.34531 1.5 6 1.5H24C25.6547 1.5 27 2.84531 27 4.5V16.5H24V4.5H6V16.5H3V4.5ZM0 18.9C0 18.4031 0.403125 18 0.9 18H29.1C29.5969 18 30 18.4031 30 18.9C30 20.8875 28.3875 22.5 26.4 22.5H3.6C1.6125 22.5 0 20.8875 0 18.9ZM13.1719 9.79688L11.7188 11.25L13.1719 12.7031C13.6125 13.1438 13.6125 13.8562 13.1719 14.2922C12.7312 14.7281 12.0188 14.7328 11.5828 14.2922L9.33281 12.0422C8.89219 11.6016 8.89219 10.8891 9.33281 10.4531L11.5828 8.20312C12.0234 7.7625 12.7359 7.7625 13.1719 8.20312C13.6078 8.64375 13.6125 9.35625 13.1719 9.79219V9.79688ZM18.4219 8.20312L20.6719 10.4531C21.1125 10.8938 21.1125 11.6062 20.6719 12.0422L18.4219 14.2922C17.9813 14.7328 17.2688 14.7328 16.8328 14.2922C16.3969 13.8516 16.3922 13.1391 16.8328 12.7031L18.2859 11.25L16.8328 9.79688C16.3922 9.35625 16.3922 8.64375 16.8328 8.20781C17.2734 7.77188 17.9859 7.76719 18.4219 8.20781V8.20312Z" fill="#60A5FA"/>
              </svg>
            </SvgIcon>
            Tarek.Dev
          </Typography>

          {/* Mobile Menu */}
          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleMenuClose()}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{ 
                  "& .MuiPaper-root": {
                    backgroundColor: "#1F2937",
                    color: "white",
                  },
                }}
              >
                <MenuItem onClick={() => handleMenuClose("/")}>Home</MenuItem>
                <MenuItem onClick={() => handleMenuClose("/about")}>About</MenuItem>
                <MenuItem onClick={() => handleMenuClose("/projects")}>Projects</MenuItem>
                <MenuItem onClick={() => handleMenuClose("/contact")}>Contact</MenuItem>
              </Menu>
            </>
          ) : (
            // Desktop Nav Buttons
            <>
              <Button
                color="inherit"
                component={NavLink}
                to="/"
                sx={{
                  textTransform: "none",
                  "&.active": {
                    fontWeight: "bold",
                    borderBottom: "2px solid white",
                  },
                }}
              >
                <HomeIcon style={{ fontSize: '32px', color: '#1976d2', marginRight: '4px' }} />
                Home
              </Button>
              <Button
                color="inherit"
                component={NavLink}
                to="/about"
                sx={{
                  textTransform: "none",
                  "&.active": {
                    fontWeight: "bold",
                    borderBottom: "2px solid white",
                  },
                }}
              >
                <PermIdentityIcon style={{ fontSize: '32px', color: '#1976d2', marginRight: '4px' }} />
                About
              </Button>
              <Button
                color="inherit"
                component={NavLink}
                to="/projects"
                sx={{
                  textTransform: "none",
                  "&.active": {
                    fontWeight: "bold",
                    borderBottom: "2px solid white",
                  },
                }}
              >
                <FolderOpenIcon style={{ fontSize: '32px', color: '#1976d2', marginRight: '4px' }} />
                Portfolio
              </Button>
              <Button
                color="inherit"
                component={NavLink}
                to="/contact"
                sx={{
                  textTransform: "none",
                  "&.active": {
                    fontWeight: "bold",
                    borderBottom: "2px solid white",
                  },
                }}
              >
                <PermContactCalendarIcon style={{ fontSize: '32px', color: '#1976d2', marginRight: '4px' }} />
                Contact
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
