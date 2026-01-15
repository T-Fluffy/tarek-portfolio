import React, { useState } from "react";
import type { Project } from "../types/Project";
import { Card, CardContent, Typography, CardActionArea, Box } from "@mui/material";

interface Props {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<Props> = ({ project, onClick }) => {
  // Use state to track which image we are trying to load
  const [imgSrc, setImgSrc] = useState(project.imageUrl);
  const [retryCount, setRetryCount] = useState(0);

  const handleError = () => {
    if (retryCount === 0) {
      // Step 1: GitHub failed -> Try Socialify
      setImgSrc(`https://socialify.git.ci/T-Fluffy/${project.image}/image?theme=Dark&pattern=Circuit%20Board`);
      setRetryCount(1);
    } else if (retryCount === 1) {
      // Step 2: Socialify failed -> Try a solid placeholder with the project name
      setImgSrc(`https://placehold.co/600x400/001219/00BFFF?text=${project.image}`);
      setRetryCount(2);
    }
  };

  return (
    <Card 
      sx={{ 
        height: "100%", 
        bgcolor: "#121212", 
        border: "1px solid rgba(0, 255, 255, 0.2)",
        transition: "0.3s",
        "&:hover": {
          borderColor: "cyan",
          transform: "translateY(-5px)",
          boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)"
        }
      }}
    >
      <CardActionArea onClick={onClick}>
        <Box sx={{ width: "100%", height: 200, bgcolor: "#000", overflow: "hidden" }}>
          <img
            src={imgSrc}
            alt={project.title}
            onError={handleError}
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover",
              display: "block" 
            }}
          />
        </Box>
        <CardContent>
          <Typography variant="h6" sx={{ color: "cyan", fontFamily: "monospace", fontSize: "1.1rem" }}>
            {project.title}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: "#aaa", 
              mt: 1,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
          >
            {project.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProjectCard;