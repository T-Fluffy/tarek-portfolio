import React from "react";
import { Grid, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import type { Project } from "../types/Project";
import ProjectCard from "../components/ProjectCard";

// Load projects from external JSON file
import Portfolio from "../data/projects.json";

const Projects: React.FC = () => {
  const navigate = useNavigate(); // 2. Initialize the hook

  return (
    <Container sx={{ py: 10, position: "relative", zIndex: 1 }}>
      <Typography variant="h3" align="center" color="cyan" gutterBottom sx={{ fontWeight: 'bold' }}>
        PORTFOLIO
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.2rem", mb: 3, textAlign: "center", color: "#aaa" }}>
        Here are some of the projects I've developed so far.
      </Typography>
      
      <Grid container spacing={4}>
        {Portfolio.map((project: Project) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
            <ProjectCard 
              project={project} 
              // 3. Change the onClick to use navigate instead of state
              onClick={() => navigate(`/project/${project.id}`)} 
            />
          </Grid>
        ))}
      </Grid>

      {/* 4. ProjectViewer is GONE from here. This prevents the popup. */}
    </Container>
  );
};

export default Projects;