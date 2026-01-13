import React, { useState, useEffect } from "react";
import { Box, Container, Typography, IconButton, Stack, Tooltip } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TerminalIcon from '@mui/icons-material/Terminal';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Footer: React.FC = () => {
  const cyberBlue = "#00BFFF";
  const [displayText, setDisplayText] = useState("");
  const fullText = "STATUS: ENCRYPTED_CONNECTION // V.2.0.26";

  // Typewriter Effect Logic
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 50);
    return () => clearInterval(typing);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        mt: 'auto',
        borderTop: `1px solid rgba(0, 191, 255, 0.1)`,
        bgcolor: "rgba(5, 5, 5, 0.8)",
        backdropFilter: "blur(15px)",
        position: "relative",
        zIndex: 2,
        overflow: "hidden"
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={4}
        >
          {/* Left Side: Animated System Status */}
          <Box sx={{ textAlign: { xs: "center", md: "left" }, minWidth: { md: '350px' } }}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Box 
                sx={{ 
                  width: 8, 
                  height: 8, 
                  bgcolor: cyberBlue, 
                  borderRadius: '50%', 
                  boxShadow: `0 0 10px ${cyberBlue}`,
                  animation: 'pulse 2s infinite ease-in-out'
                }} 
              />
              <Typography variant="caption" sx={{ color: cyberBlue, fontWeight: 'bold', letterSpacing: 2, fontFamily: 'monospace' }}>
                {displayText}
                <span className="cursor">_</span>
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.4)", fontFamily: 'monospace', fontSize: '0.75rem' }}>
              Designed by <span style={{ color: '#fff' }}>TAREK_HALLOUL</span>. No cookies, just bytes.
            </Typography>
          </Box>

          {/* Center: Social Hub with Neon Glow */}
          <Stack direction="row" spacing={2}>
            {[
              { icon: <GitHubIcon />, link: "https://github.com/T-Fluffy", label: "Source_Code" },
              { icon: <LinkedInIcon />, link: "https://www.linkedin.com/in/tarekhalloul/", label: "Neural_Network" },
              { icon: <TerminalIcon />, link: "/projects", label: "Project_Logs" },
            ].map((social, index) => (
              <Tooltip key={index} title={social.label} arrow>
                <IconButton
                  href={social.link}
                  target="_blank"
                  sx={{
                    color: "rgba(255,255,255,0.5)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    transition: "0.4s",
                    "&:hover": {
                      color: cyberBlue,
                      borderColor: cyberBlue,
                      boxShadow: `0 0 20px ${cyberBlue}44`,
                      transform: "translateY(-5px) scale(1.1)",
                      bgcolor: "rgba(0, 191, 255, 0.05)"
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Stack>

          {/* Right Side: Back to Top with Glitch Effect */}
          <Box 
            onClick={scrollToTop}
            className="glitch-container"
            sx={{ 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: "rgba(255,255,255,0.3)",
              transition: '0.3s',
              "&:hover": { 
                color: cyberBlue,
                "& .glitch-text": { animation: 'glitch 0.3s cubic-bezier(.25,.46,.45,.94) both infinite' }
              }
            }}
          >
            <Typography className="glitch-text" sx={{ fontFamily: 'monospace', fontSize: '0.7rem', fontWeight: 'bold', mr: 1, position: 'relative' }}>
              &gt; EXECUTE_SCROLL_UP
            </Typography>
            <KeyboardArrowUpIcon fontSize="small" />
          </Box>
        </Stack>
      </Container>

      {/* Modern Animations */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.3; transform: scale(1.3); }
            100% { opacity: 1; transform: scale(1); }
          }

          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }

          .cursor {
            display: inline-block;
            width: 8px;
            animation: blink 1s infinite;
            color: ${cyberBlue};
          }

          @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
          }
        `}
      </style>
    </Box>
  );
};

export default Footer;