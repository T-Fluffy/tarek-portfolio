import React from "react";
import { Container, Typography, Box, Card, CardContent, Button } from "@mui/material";
import CanvasBackground from "../components/UI/CanvasBackground";
import DownloadIcon from "@mui/icons-material/Download";
import CV from "../assets/CV_TarekHalloul-fr.pdf"; 

const About: React.FC = () => {
  return (
    <>
      <CanvasBackground />
      <Container
        maxWidth="md"
        sx={{
          mt: 10,
          textAlign: "center",
          color: "white",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" color="#60A5FA">
          About Me
        </Typography>

        <Typography variant="body1"  sx={{ fontSize: "1.2rem", mb: 3 }}>
          Hi! I'm <strong>Tarek Halloul</strong>, a dedicated software engineer and game developer with strong experience in Unity, Godot, and web technologies like React, Angular, and Spring Boot. I love building immersive game worlds and elegant web apps.
        </Typography>

        <Typography variant="body1"  sx={{ fontSize: "1.2rem", mb: 3 }}>
          I hold a Software Engineering degree from EPI School and have worked as an instructor, intern, and developer on various real-world projects. I'm passionate about learning, teaching, and growing in both game and web development fields.
        </Typography>

        <Typography variant="body1"  sx={{ fontSize: "1.2rem", mb: 5 }}>
          I'm currently exploring godot and shader programming while working in another field as a part-time Client consultant and always looking to collaborate on meaningful tech projects that create impact.
        </Typography>
        
        <Box display="flex" justifyContent="center">
          <Card sx={{ minWidth: 275, backgroundColor: "#121212", color: "white", border: "1px solid #00bcd4" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📄 Download My CV
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href={CV}
                download
                startIcon={<DownloadIcon />}
                sx={{ mt: 1 }}
              >
                Download PDF
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default About;
