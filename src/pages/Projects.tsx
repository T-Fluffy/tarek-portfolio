import React, { useState } from "react";
import { Grid, Container, Typography } from "@mui/material";
import type { Project } from "../types/Project";
import ProjectCard from "../components/ProjectCard";
import CanvasBackground from "../components/CanvasBackground";
import ProjectViewer from "../components/ProjectViewer";

const Portfolio: Project[] = [
  {
    id: 1,
    title: "Game Portfolio Site",
    description: "A 3D developer desk scene using Three.js and React Three Fiber.",
    image: "/assets/project1.png",
    images: [
    "/assets/project1.png",
    "/assets/project1-scene.png",
    "/assets/project1-code.png"
    ],
    githubLink: "https://github.com/yourusername/game-portfolio",
    live: "https://yourportfolio.vercel.app"
  },
  {
    id: 2,
    title: "Document Editor",
    description: "React app for editing PDFs and images with .NET backend + Google Drive support.",
    image: "/assets/project2.png",
    images: [
    "/assets/project1.png",
    "/assets/project1-scene.png",
    "/assets/project1-code.png"
    ],
    githubLink: "https://github.com/yourusername/document-editor"
  },
  {
    id: 3,
    title: "Raidraptor Deck Optimizer",
    description: "Yu-Gi-Oh! Duel Links helper tool for building anti-Subterror Raidraptor decks.",
    image: "/assets/raidraptor.png",
    images: [
    "/assets/project1.png",
    "/assets/project1-scene.png",
    "/assets/project1-code.png"
    ],
    githubLink: "https://github.com/yourusername/duellinks-raidraptor"
  }
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <CanvasBackground />
      <Container sx={{ py: 10, position: "relative", zIndex: 1 }}>
        <Typography variant="h3" align="center" color="cyan" gutterBottom>
          Projects
        </Typography>
        <Grid container spacing={4}>
          {Portfolio.map((project) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
              <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
            </Grid>
          ))}
        </Grid>
        <ProjectViewer open={!!selectedProject} project={selectedProject} onClose={() => setSelectedProject(null)} />
      </Container>
    </>
  );
};

export default Projects;
