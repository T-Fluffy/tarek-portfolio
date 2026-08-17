import React from "react";
import { Container, Typography, Box, Card, CardContent, Button, Paper, Stack, Divider } from "@mui/material";
import TerminalIcon from '@mui/icons-material/Terminal';
import PublicIcon from '@mui/icons-material/Public';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

const About: React.FC = () => {
  const cyberBlue = "#00BFFF";
  const base = import.meta.env.BASE_URL;

  const CVs = {
    webEn: `${base}assets/CV_TarekHalloul_Web.pdf`,
    gameEn: `${base}assets/CV_TarekHalloul_Gameplay.pdf`,
    webFr: `${base}assets/CV_TarekHalloul_Web_FR.pdf`,
    gameFr: `${base}assets/CV_TarekHalloul_Gameplay_FR.pdf`,
  };

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
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" sx={{ color: cyberBlue, mb: 4 ,fontSize: { xs: "2.50rem", md: "3.25rem" }}}>
        &lt; About Me /&gt;
      </Typography>

      <Box sx={{ textAlign: "left", mb: 6 }}>
        {/* The Robust Professional Intro */}
        <Typography variant="body1" sx={{ fontSize: "1.15rem", mb: 3, lineHeight: 1.8 }}>
          Hello, I'm <strong style={{ color: cyberBlue }}>Tarek</strong>, a Junior Software Engineer and Game Developer 
          with specialized expertise in the use of <strong style={{ color: cyberBlue }}>Unity Engine</strong> and trying to convert my skills to the <strong style={{ color: cyberBlue }}>Godot Engine</strong> along the way. 
          My passion lies at the intersection of game and web technologies, where I bridge the gap between 
          immersive interactive worlds and robust system architecture while delivering enjoyable gameplay experiences.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1.15rem", mb: 3, lineHeight: 1.8 }}>
          I architect full-stack solutions utilizing <strong style={{ color: cyberBlue }}>Angular or React</strong> for 
          the frontend, powered by scalable backends built with <strong style={{ color: cyberBlue }}>Dotnet, Spring Boot or Nestjs</strong> and playing with some 3D libraries like <strong style={{ color: cyberBlue }}>Three js</strong> sometimes. 
          Adaptable and self-reliant. I am committed to continuing my technical evolution, staying at the forefront of the IT landscape and staying alive in this ever-changing industry deeply focused on the use of <strong style={{ color: cyberBlue }}>LLM AI models</strong>.
        </Typography>
      </Box>

      {/* Tech Stack Summary - Adds high "scannability" for recruiters
      <Box sx={{ mb: 6, textAlign: 'left' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CodeIcon sx={{ color: cyberBlue, mr: 1 }} />
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'monospace' }}>
            TECHNICAL_LOADOUT
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
          {["Unity", "C#", "Angular", "React", "Dotnet", "Spring Boot", "Node.js", "Godot", "TypeScript"].map((skill) => (
            <Chip 
              key={skill} 
              label={skill} 
              variant="outlined" 
              sx={{ color: cyberBlue, borderColor: 'rgba(0, 191, 255, 0.3)', bgcolor: 'rgba(0, 191, 255, 0.05)' }} 
            />
          ))}
        </Stack>
      </Box> */}

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
            MISSION_STATEMENT.log
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "#aaa", fontStyle: "italic" }}>
          "Focusing on developing technical and personal skills to advance in the field of information technologies."
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
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Ready for the full documentation?
            </Typography>

            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle2" sx={{ color: cyberBlue, fontFamily: "monospace", fontWeight: 'bold', letterSpacing: 1, mb: 1.5 }}>
                  &gt; ENGLISH_CV
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="outlined"
                    fullWidth
                    href={CVs.webEn}
                    download="Tarek_Halloul_CV_Web_EN.pdf"
                    rel="noopener noreferrer"
                    startIcon={<PublicIcon />}
                    sx={{ color: "white", borderColor: "rgba(255,255,255,0.2)", "&:hover": { borderColor: cyberBlue } }}
                  >
                    WEB
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    href={CVs.gameEn}
                    download="Tarek_Halloul_CV_Gameplay_EN.pdf"
                    rel="noopener noreferrer"
                    startIcon={<VideogameAssetIcon />}
                    sx={{ color: "white", borderColor: "rgba(255,255,255,0.2)", "&:hover": { borderColor: cyberBlue } }}
                  >
                    GAMEDEV
                  </Button>
                </Stack>
              </Box>

              <Divider sx={{ borderColor: "rgba(0, 191, 255, 0.2)" }} />

              <Box>
                <Typography variant="subtitle2" sx={{ color: cyberBlue, fontFamily: "monospace", fontWeight: 'bold', letterSpacing: 1, mb: 1.5 }}>
                  &gt; FRENCH_CV
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="outlined"
                    fullWidth
                    href={CVs.webFr}
                    download="Tarek_Halloul_CV_Web_FR.pdf"
                    rel="noopener noreferrer"
                    startIcon={<PublicIcon />}
                    sx={{ color: "white", borderColor: "rgba(255,255,255,0.2)", "&:hover": { borderColor: cyberBlue } }}
                  >
                    WEB
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    href={CVs.gameFr}
                    download="Tarek_Halloul_CV_Gameplay_FR.pdf"
                    rel="noopener noreferrer"
                    startIcon={<VideogameAssetIcon />}
                    sx={{ backgroundColor: cyberBlue, color: "black", "&:hover": { backgroundColor: "white" } }}
                  >
                    GAMEDEV
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default About;