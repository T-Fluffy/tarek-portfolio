import React, { useState } from "react";
import type { Project } from "../types/Project";
import { 
  Card, 
  CardContent, 
  Typography, 
  CardActionArea, 
  Box, 
  Chip, 
  Stack 
} from "@mui/material";

interface Props {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<Props> = ({ project, onClick }) => {
  // Image handling with fallbacks
  const [imgSrc, setImgSrc] = useState(project.imageUrl);
  const [retryCount, setRetryCount] = useState(0);

  const handleError = () => {
    if (retryCount === 0) {
      // Step 1: GitHub failed -> Try Socialify
      setImgSrc(`https://socialify.git.ci/T-Fluffy/${project.image}/image?theme=Dark&pattern=Circuit%20Board`);
      setRetryCount(1);
    } else if (retryCount === 1) {
      // Step 2: Socialify failed -> Try a solid placeholder
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
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          borderColor: "cyan",
          transform: "translateY(-5px)",
          boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)"
        }
      }}
    >
      <CardActionArea 
        onClick={onClick} 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'stretch' 
        }}
      >
        {/* Project Preview Image */}
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

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Project Title */}
          <Typography 
            variant="h6" 
            sx={{ 
              color: "cyan", 
              fontFamily: "monospace", 
              fontSize: "1.1rem", 
              mb: 1,
              textTransform: 'uppercase'
            }}
          >
            {project.title}
          </Typography>
          
          {/* Project Description */}
          <Typography 
            variant="body2" 
            sx={{ 
              color: "#aaa", 
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "3em"
            }}
          >
            {project.description}
          </Typography>

          {/* Technology Chips - Added the ?. mapping to prevent undefined errors */}
          <Stack 
            direction="row" 
            spacing={1} 
            flexWrap="wrap" 
            useFlexGap 
            sx={{ mt: 'auto' }} // Pushes chips to the bottom of the content area
          >
            {project.technologies?.map((tech) => (
              <Chip 
                key={tech} 
                label={tech} 
                size="small" 
                sx={{ 
                  bgcolor: "rgba(0, 255, 255, 0.05)", 
                  color: "cyan", 
                  border: "1px solid rgba(0, 255, 255, 0.2)",
                  fontFamily: "monospace",
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