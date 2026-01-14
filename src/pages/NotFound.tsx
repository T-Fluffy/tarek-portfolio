import React from "react";
import { Container, Typography, Box, Button, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import HomeIcon from '@mui/icons-material/Home';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const cyberRed = "#FF003C"; // Emergency red for the crash theme
  const cyberBlue = "#00BFFF";

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        height: "80vh", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center",
        textAlign: "center"
      }}
    >
      {/* Glitchy 404 Header */}
      <Box sx={{ position: 'relative', mb: 4 }}>
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: { xs: '6rem', md: '10rem' }, 
            fontWeight: 900, 
            color: cyberRed,
            textShadow: `3px 3px 0px ${cyberBlue}`,
            animation: 'glitch 0.5s infinite alternate-reverse'
          }}
        >
          404
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            position: 'absolute', 
            bottom: 10, 
            right: 0, 
            bgcolor: cyberRed, 
            color: 'black', 
            px: 1,
            fontWeight: 'bold',
            fontFamily: 'monospace'
          }}
        >
          SYSTEM_FAILURE
        </Typography>
      </Box>

      <Typography variant="h5" sx={{ mb: 2, fontFamily: 'monospace', fontWeight: 'bold' }}>
        [CRITICAL_ERROR]: SECTOR_NOT_FOUND
      </Typography>
      
      <Typography variant="body1" sx={{ color: "#aaa", mb: 4, maxWidth: '500px' }}>
        The data packet you are looking for has been intercepted or deleted from the mainframe. 
        Current coordinates lead to a <span style={{ color: cyberRed }}>null_pointer_exception</span>.
      </Typography>

      {/* Terminal Error Logs */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 6, 
          width: '100%',
          maxWidth: '600px',
          backgroundColor: "rgba(255, 0, 60, 0.05)", 
          border: `1px solid ${cyberRed}44`,
          textAlign: "left",
          fontFamily: "monospace",
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ color: cyberRed, opacity: 0.8, fontSize: '0.85rem' }}>
          <Box sx={{ mb: 0.5 }}>&gt; Initializing recovery sequence...</Box>
          <Box sx={{ mb: 0.5 }}>&gt; Searching for path: "{window.location.pathname}"</Box>
          <Box sx={{ mb: 0.5, color: '#ffae00' }}>&gt; [WARNING]: Route mapping corrupted.</Box>
          <Box sx={{ mb: 0.5 }}>&gt; Memory dump successful. Reverting to stable state.</Box>
          <Box className="blinking-cursor" sx={{ display: 'inline-block', width: '8px', height: '15px', bgcolor: cyberRed }} />
        </Box>
      </Paper>

      {/* Action Buttons */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button
          variant="outlined"
          startIcon={<RestartAltIcon />}
          onClick={() => window.location.reload()}
          sx={{ 
            borderColor: cyberRed, 
            color: cyberRed,
            "&:hover": { borderColor: 'white', color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
          }}
        >
          RETRY_CONNECTION
        </Button>
        <Button
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
          sx={{ 
            bgcolor: cyberRed, 
            color: 'white',
            fontWeight: 'bold',
            "&:hover": { bgcolor: 'white', color: 'black', boxShadow: '0 0 20px white' }
          }}
        >
          RESTORE_SYSTEM_HOME
        </Button>
      </Stack>

      <style>
        {`
          @keyframes glitch {
            0% { transform: translate(0); text-shadow: 2px 2px ${cyberBlue}; }
            20% { transform: translate(-3px, 3px); }
            40% { transform: translate(-3px, -3px); text-shadow: -2px -2px ${cyberBlue}; }
            60% { transform: translate(3px, 3px); }
            80% { transform: translate(3px, -3px); text-shadow: 2px -2px ${cyberBlue}; }
            100% { transform: translate(0); }
          }
          .blinking-cursor {
            animation: blink 1s step-end infinite;
          }
          @keyframes blink {
            from, to { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </Container>
  );
};

export default NotFound;