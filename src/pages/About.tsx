import React from "react";
import { Container, Typography, Box, Card, CardContent, Button, Paper } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import TerminalIcon from '@mui/icons-material/Terminal';
import CV from "../assets/CV_TarekHalloul-fr.pdf?url"; 

const About: React.FC = () => {
  const cyberBlue = "#00BFFF";

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: { xs: 5, md: 10 },
        mb: 8,
        textAlign: "center",
        color: "white",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Header */}
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" sx={{ color: cyberBlue }}>
        &lt; About Me /&gt;
      </Typography>

      {/* Main Bio */}
      <Box sx={{ textAlign: "left", mb: 6 }}>
        <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 3, lineHeight: 1.8 }}>
          Hi! I'm <strong style={{ color: cyberBlue }}>Tarek Halloul</strong>, a software engineer and game developer. 
          I bridge the gap between robust backend logic with <strong style={{ color: cyberBlue }}>Spring Boot</strong> and 
          immersive interactive worlds using <strong style={{ color: cyberBlue }}>Unity and Godot</strong>. 
          I don't just write code; I build experiences.
        </Typography>

        <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 3, lineHeight: 1.8 }}>
          With a Software Engineering degree from EPI School, I’ve navigated the transition from intern to instructor 
          to full-stack developer. My passion lies in solving complex problems—whether it’s optimizing a web service 
          or calculating procedural animations for a game character.
        </Typography>
      </Box>

      {/* The "SURVIVE" / Current Status Section */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 6, 
          backgroundColor: "rgba(0, 0, 0, 0.4)", 
          borderLeft: `4px solid ${cyberBlue}`,
          textAlign: "left",
          fontFamily: "monospace"
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <TerminalIcon sx={{ color: cyberBlue, mr: 1, fontSize: '1.2rem' }} />
          <Typography variant="subtitle2" sx={{ color: cyberBlue, fontWeight: 'bold', letterSpacing: 1 }}>
            CURRENT_STATUS.log
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "#aaa", fontStyle: "italic" }}>
          "Currently exploring Godot, shader programming, and procedural animation. 
          Balancing my passion with a part-time role as a Client Consultant—because the world is a hard place 
          and we do what we can to <strong>SURVIVE</strong>. This grind only makes the code sharper."
        </Typography>
      </Paper>

      {/* Resume Card */}
      <Box display="flex" justifyContent="center">
        <Card 
          sx={{ 
            minWidth: 300, 
            backgroundColor: "rgba(31, 41, 55, 0.8)", 
            color: "white", 
            border: `1px solid ${cyberBlue}`,
            backdropFilter: "blur(5px)"
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Interested in the full specs?
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "#ccc" }}>
              Download my CV for the complete technical breakdown.
            </Typography>
            <Button
              variant="outlined"
              href={CV}
              download
              startIcon={<DownloadIcon />}
              sx={{ 
                mt: 1, 
                color: cyberBlue, 
                borderColor: cyberBlue,
                "&:hover": {
                    backgroundColor: "rgba(0, 191, 255, 0.1)",
                    borderColor: "white",
                    color: "white"
                }
              }}
            >
              Download PDF
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default About;