import React, { useState } from "react";
import type { Project } from "../types/Project";
import { Card, CardContent, Typography, CardActionArea, Box } from "@mui/material";

interface Props {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<Props> = ({ project, onClick }) => {
  const [imgSrc, setImgSrc] = useState(project.imageUrl);

  return (
    <Card 
      sx={{ 
        height: "100%", 
        bgcolor: "#121212", 
        border: "1px solid #333",
        position: "relative",
        zIndex: 10, // Force it to the front
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          borderColor: "cyan",
          boxShadow: "0 0 15px cyan",
          cursor: "pointer"
        }
      }}
    >
      <CardActionArea 
        onClick={onClick} 
        sx={{ height: "100%", "& .MuiCardActionArea-focusHighlight": { bgcolor: "transparent" } }}
      >
        <Box sx={{ width: "100%", height: 200, bgcolor: "#1a1a1a", display: "flex", position: "relative" }}>
          <img
            src={imgSrc}
            alt={project.title}
            onError={() => setImgSrc(`https://socialify.git.ci/T-Fluffy/${project.image}/image?theme=Dark`)}
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover",
              display: "block",
              position: "relative",
              zIndex: 2 
            }}
          />
        </Box>
        <CardContent sx={{ position: "relative", zIndex: 2 }}>
          <Typography variant="h6" sx={{ color: "cyan", fontWeight: "bold" }}>
            {project.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProjectCard;