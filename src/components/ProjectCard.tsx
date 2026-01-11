import React from "react";
import type { Project } from "../types/Project";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box
} from "@mui/material";

interface Props {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<Props> = ({ project, onClick }) => {
  const displayImage = project.images?.[0] || project.image;

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        backgroundColor: "#121212",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(0, 191, 255, 0.3)",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 0 20px rgba(0, 191, 255, 0.4)", // Glow effect
          borderColor: "#00bfff",
        }
      }}
    >
      <CardActionArea onClick={onClick}>
        <Box
          sx={{
            width: "100%",
            height: 200,
            overflow: "hidden",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <img
            src={displayImage}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h6">
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
