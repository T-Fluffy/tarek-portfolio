import React from "react";
import { Container, Typography, Box, Card, CardContent, Button, Paper, Stack } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import TerminalIcon from '@mui/icons-material/Terminal';
import LanguageIcon from '@mui/icons-material/Language';

const About: React.FC = () => {
  const cyberBlue = "#00BFFF";

  const Resume_English = "/assets/TarekHalloulEN.pdf";
  const Resume_French = "/assets/TarekHalloulFR.pdf";

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: { xs: 5, md: 12 },
        mb: 8,
        textAlign: "center",
        color: "white",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" sx={{ color: cyberBlue }}>
        &lt; About Me /&gt;
      </Typography>

      <Box sx={{ textAlign: "left", mb: 6 }}>
        <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 3, lineHeight: 1.8 }}>
          Hi! I'm <strong style={{ color: cyberBlue }}>Tarek Halloul</strong>, a software engineer and game developer. 
          I bridge the gap between robust backend logic with <strong style={{ color: cyberBlue }}>Spring Boot</strong> and 
          immersive interactive worlds using <strong style={{ color: cyberBlue }}>Unity and Godot</strong>. 
        </Typography>

        <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 3, lineHeight: 1.8 }}>
          With a Software Engineering degree from EPI School, I’ve navigated the transition from intern to instructor 
          to full-stack developer.
        </Typography>
      </Box>

      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 6, 
          backgroundColor: "rgba(0, 0, 0, 0.4)", 
          borderLeft: `4px solid ${cyberBlue}`,
          textAlign: "left",
          fontFamily: "monospace",
          backdropFilter: "blur(10px)"
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <TerminalIcon sx={{ color: cyberBlue, mr: 1, fontSize: '1.2rem' }} />
          <Typography variant="subtitle2" sx={{ color: cyberBlue, fontWeight: 'bold', letterSpacing: 1 }}>
            CURRENT_STATUS.log
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "#aaa", fontStyle: "italic" }}>
          "Currently exploring Godot and shader programming. Balancing my passion with a part-time role."
        </Typography>
      </Paper>

      <Box display="flex" justifyContent="center">
        <Card 
          sx={{ 
            minWidth: 320, 
            maxWidth: 500,
            backgroundColor: "rgba(20, 20, 25, 0.8)", 
            color: "white", 
            border: `1px solid rgba(0, 191, 255, 0.3)`,
            backdropFilter: "blur(12px)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              Interested in the full specs?
            </Typography>
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button
                  variant="outlined"
                  href={Resume_English}
                  download="Tarek_Halloul_Resume_EN.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  type="application/pdf" // Force browser to treat the binary data as PDF
                  startIcon={<LanguageIcon />}
                  sx={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }}
                >
                  English CV
                </Button>

                <Button
                  variant="contained"
                  href={Resume_French}
                  download="Tarek_Halloul_Resume_FR.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  type="application/pdf" // Force browser to treat the binary data as PDF
                  startIcon={<DownloadIcon />}
                  sx={{ backgroundColor: cyberBlue, color: "black" }}
                >
                  CV Français
                </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default About;