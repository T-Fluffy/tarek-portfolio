import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import MyPicture from "../assets/Images/Myface.png";
import CanvasBackground from "../components/UI/CanvasBackground";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Home: React.FC = () => {
  return (
    <>
      <CanvasBackground />
      <Container
        sx={{
          mt: 10,
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid size={{ xs: 12, sm: 6 }} component={Box}>
            <Box
              component="img"
              src={MyPicture}
              alt="Tarek"
              sx={{
                width: 350,
                height: 380,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} component={Box}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ mb: 4, color: "white", fontWeight: "bold" }}
            >
              👾Hi, I'm Tarek 👋
            </Typography>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ mb: 3, color: "cyan", fontWeight: 500 }}
            >
              Software engineer and Game developer
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#e0e0e0",
                lineHeight: 1.7,
                fontSize: "1.1rem",
              }}
            >
              I thrive on crafting interactive web experiences and immersive digital
              worlds. I love clean architecture, elegant UI, and pushing the limits with
              modern frameworks like Angular, React, and engines like Unity and Godot.
              When I'm not coding, you'll find me gaming or exploring the latest in tech.
              Let's build something meaningful and creative together!
            </Typography>
            <a href="https://github.com/T-Fluffy" target="github" rel="noopener noreferrer">
              <GitHubIcon fontSize="large" sx={{ color: "white", mt: 2, mx: 1 }} />
            </a>
            <a href="https://www.linkedin.com/in/tarekhalloul/" target="linkedin" rel="noopener noreferrer">
              <LinkedInIcon fontSize="large" sx={{ color: "white", mt: 2, mx: 1 }} />
            </a>
            <a href="halloultarek1@gmail.com">
              <EmailIcon fontSize="large" sx={{ color: "white", mt: 2, mx: 1 }} />
            </a>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
