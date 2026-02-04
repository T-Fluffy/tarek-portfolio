import React from "react";
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Chip, 
  Stack 
} from "@mui/material";
import type { Project } from "../types/Project";

// 1. This Interface is what fixes the "IntrinsicAttributes" error
interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

// 2. We tell the component to use that Interface
const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const cyberBlue = "#00BFFF";

  return (
    <Card 
      onClick={onClick}
      sx={{ 
        height: '100%',
        bgcolor: "rgba(255, 255, 255, 0.03)", 
        border: `1px solid rgba(0, 191, 255, 0.1)`,
        borderRadius: 2,
        cursor: "pointer",
        transition: "all 0.3s ease-in-out",
        position: 'relative',
        overflow: 'hidden',
        "&:hover": { 
          transform: "translateY(-8px)",
          borderColor: cyberBlue,
          boxShadow: `0 0 20px ${cyberBlue}33`,
          "& .project-image": { transform: "scale(1.05)" }
        }
      }}
    >
      <Box sx={{ overflow: 'hidden', aspectRatio: '16/9' }}>
        <CardMedia
          className="project-image"
          component="img"
          image={project.imageUrl}
          alt={project.title}
          onError={(e: any) => { 
            e.target.src = `https://socialify.git.ci/T-Fluffy/${project.image}/image?theme=Dark&pattern=Circuit%20Board`; 
          }}
          sx={{ transition: "transform 0.5s ease" }}
        />
      </Box>
      
      <CardContent sx={{ p: 3 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: "white", 
            fontFamily: 'monospace', 
            fontWeight: 'bold',
            mb: 1 
          }}
        >
          {project.title}
        </Typography>

        <Typography 
          variant="body2" 
          sx={{ 
            color: "rgba(255,255,255,0.6)", 
            mb: 2,
            height: '3.6em',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {project.description}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {project.technologies.slice(0, 3).map((tech) => (
            <Chip 
              key={tech} 
              label={tech} 
              size="small" 
              sx={{ 
                color: cyberBlue, 
                borderColor: `${cyberBlue}44`, 
                bgcolor: 'rgba(0, 191, 255, 0.05)',
                fontSize: '0.65rem',
                fontFamily: 'monospace'
              }} 
              variant="outlined" 
            />
          ))}
          {project.technologies.length > 3 && (
            <Typography variant="caption" sx={{ color: 'gray', alignSelf: 'center' }}>
              +{project.technologies.length - 3}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;