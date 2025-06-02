// src/components/ProjectCard.tsx
import React from "react";
import type { Project } from "../types/Project";
import { Card, CardMedia, CardContent, Typography, CardActionArea } from "@mui/material";

interface Props {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<Props> = ({ project, onClick }) => {
  return (
    <Card sx={{ height: "100%", borderRadius: 3, backgroundColor: "#121212", color: "#fff" }}>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height="180"
          image={project.image}
          alt={project.title}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {project.title}
          </Typography>
          <Typography variant="body2" color="gray">
            {project.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProjectCard;
