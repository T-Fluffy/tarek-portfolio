import React, { useState } from "react";
import { Grid, Container, Typography } from "@mui/material";
import type { Project } from "../types/Project";
import ProjectCard from "../components/ProjectCard";
import CanvasBackground from "../components/UI/CanvasBackground";
import ProjectViewer from "../components/ProjectViewer";

// Load projects from external JSON file
import Portfolio from "../data/projects.json";

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <CanvasBackground />
      <Container sx={{ py: 10, position: "relative", zIndex: 1 }}>
        <Typography variant="h3" align="center" color="cyan" gutterBottom>
          // Portfolio
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1.2rem", mb: 3, textAlign: "center" }}>
          Here are some of the projects I've worked on.
        </Typography>
        <Grid container spacing={4}>
          {Portfolio.map((project: Project) => (
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
