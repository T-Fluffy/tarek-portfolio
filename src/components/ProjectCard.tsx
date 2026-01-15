import React, { useState } from "react";
import type { Project } from "../types/Project";
import { Card, CardContent, Typography, CardActionArea, Box, Chip, Stack } from "@mui/material";

interface Props {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<Props> = ({ project, onClick }) => {
  const [imgSrc, setImgSrc] = useState(project.imageUrl);
  const [retryCount, setRetryCount] = useState(0);

  const handleError = () => {
    if (retryCount === 0) {
      setImgSrc(`https://socialify.git.ci/T-Fluffy/${project.image}/image?theme=Dark&pattern=Circuit%20Board`);
      setRetryCount(1);
    } else if (retryCount === 1) {
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
        display: "flex",
        flexDirection: "column",
        "&:hover": { borderColor: "cyan", boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)" }
      }}
    >
      <CardActionArea onClick={onClick} sx={{ flexGrow: 1 }}>
        <Box sx={{ width: "100%", height: 200, bgcolor: "#000", overflow: "hidden" }}>
          <img
            src={imgSrc}
            alt={project.title}
            onError={handleError}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </Box>
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" sx={{ color: "cyan", fontFamily: "monospace", mb: 1 }}>
            {project.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "#aaa", mb: 2, minHeight: '3em' }}>
            {project.description}
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 'auto' }}>
            {project.technologies.map((tech) => (
              <Chip 
                key={tech} 
                label={tech} 
                size="small" 
                sx={{ 
                  bgcolor: "rgba(0, 255, 255, 0.05)", 
                  color: "cyan", 
                  border: "1px solid rgba(0, 255, 255, 0.2)",
                  fontSize: "0.65rem",
                  height: "20px"
                }} 
              />
            ))}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProjectCard;