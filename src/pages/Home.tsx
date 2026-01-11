import React from "react";
import { Container, Typography, Box, Chip, Grid } from "@mui/material"; 
import Typewriter from 'typewriter-effect'; // Import the typewriter
import MyPicture from "../assets/Images/Myface.png";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Home: React.FC = () => {
  const cyberBlue = "#00BFFF";

  const TechStack = [
    { label: "React", color: cyberBlue },
    { label: "Angular", color: "#dd0031" },
    { label: "TypeScript", color: cyberBlue },
    { label: "JavaScript", color: "#f7df1e" },
    { label: "C#", color: "#00a6cf" },
    { label: "Unity", color: "#1b1b1b" },
    { label: "Godot", color: "#478cbf" },
    { label: ".Net", color: "#b95cf7" },
    { label: "Java", color: "#ffb055" },
    { label: "Spring Boot", color: "#6db33f" },
    { label: "Nestjs", color: "#ff0000" },
    { label: "PHP", color: "#4f5b93" },
    { label: "Symfony", color: "#ff0000" },
    { label: "Laravel", color: "#a72d0e" },
    { label: "Git", color: "#f05032" },
    { label: "Docker", color: "#2496ed" },
    { label: "SQL", color: "#f8f8f8" },
    { label: "NoSQL", color: "#f8f8f8" },
    { label: "Firebase", color: "#f16f18" },
    { label: "PostgreSQL", color: "#66cff8" },
    { label: "MongoDB", color: "#208513" },
    { label: "REST", color: "#f8f8f8" },
    { label: "...", color: "#f8f8f8" },
  ];

  return (
    <Container
      sx={{
        mt: { xs: 5, md: 10 },
        mb: 10,
        position: "relative",
        zIndex: 1,
      }}
    >
      <Grid container spacing={4} alignItems="center">
        
        {/* Profile Image */}
        <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            component="img"
            src={MyPicture}
            alt="Tarek"
            sx={{
              width: { xs: 250, md: 380 },
              height: { xs: 250, md: 380 },
              borderRadius: "50%",
              objectFit: "cover",
              border: `4px solid ${cyberBlue}`,
              boxShadow: `0 0 30px ${cyberBlue}44`,
              transition: "0.5s ease",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: `0 0 50px ${cyberBlue}88`,
              }
            }}
          />
        </Grid>

        {/* Text Content */}
        <Grid size={{ xs: 12, md: 7 }} sx={{ textAlign: 'left' }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: "white", fontWeight: "bold" }}>
            👾 Hi, I'm Tarek 👋
          </Typography>

          {/* THE WAJIH TYPEWRITER EFFECT */}
          <Box sx={{ height: '50px', mb: 2 }}> 
            <Typography variant="h4" component="h2" sx={{ color: cyberBlue, fontWeight: 500, fontFamily: 'monospace' }}>
              <Typewriter
                options={{
                  strings: [
                    'Software Engineer',
                    'Fullstack Developer',
                    'Game Developer',
                    'Procedural Enthusiast'
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                }}
              />
            </Typography>
          </Box>
          
          <Typography variant="body1" sx={{ color: "#e0e0e0", lineHeight: 1.7, fontSize: "1.1rem", mb: 4, maxWidth: "600px" }}>
            I thrive on crafting interactive web experiences and immersive digital worlds. 
            I love clean architecture, elegant UI, and pushing the limits with modern frameworks and engines.
          </Typography>

          {/* Tech Stack Area */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: "white", mb: 2, fontFamily: 'monospace', fontSize: '0.9rem', opacity: 0.7 }}>
              // TECH_STACK_MODULE
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.2 }}>
              {TechStack.map((tech) => (
                <Chip
                  key={tech.label}
                  label={tech.label}
                  variant="outlined"
                  size="small"
                  sx={{
                    color: "white",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    fontSize: "0.75rem",
                    "&:hover": {
                      borderColor: tech.color,
                      backgroundColor: `${tech.color}22`,
                      transform: "translateY(-2px)",
                    },
                    transition: "0.3s",
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Socials */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <a href="https://github.com/T-Fluffy" target="_blank" rel="noopener noreferrer">
              <GitHubIcon fontSize="large" sx={{ color: "white", "&:hover": { color: cyberBlue, transform: 'translateY(-3px)' }, transition: '0.3s' }} />
            </a>
            <a href="https://www.linkedin.com/in/tarekhalloul/" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon fontSize="large" sx={{ color: "white", "&:hover": { color: cyberBlue, transform: 'translateY(-3px)' }, transition: '0.3s' }} />
            </a>
            <a href="mailto:halloultarek1@gmail.com">
              <EmailIcon fontSize="large" sx={{ color: "white", "&:hover": { color: cyberBlue, transform: 'translateY(-3px)' }, transition: '0.3s' }} />
            </a>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;