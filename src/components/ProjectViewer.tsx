// src/components/ProjectViewer.tsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Link,
  paperClasses
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "react-slick";
import type { Project } from "../types/Project";

interface Props {
  open: boolean;
  project: Project | null;
  onClose: () => void;
}

const ProjectViewer: React.FC<Props> = ({ open, project, onClose }) => {
  if (!project) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" PaperProps={{ sx: { backgroundColor: "#1F2937" } }}
  style={{ overflow: "hidden" }} >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center",color:"white" }}>
        {project.title}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {project.images && project.images.length > 0 ? (
          <Slider {...settings}>
            {project.images.map((src, i) => (
              <Box key={i} component="img" src={src} alt={`screenshot-${i}`} sx={{ width: "100%", borderRadius: 2 }} />
            ))}
          </Slider>
        ) : (
          <Box component="img" src={project.image} alt={project.title} sx={{ width: "100%", borderRadius: 2, mb: 2 }} />
        )}

        <Typography variant="body1" sx={{ mt: 2, color: "white" }}>{project.description}</Typography>

        <Box sx={{ mt: 2 }}>
          <Link href={project.githubLink} target="_blank" underline="hover" sx={{ mr: 2 }}>
            GitHub
          </Link>
          {project.live && (
            <Link href={project.live} target="_blank" underline="hover" color="success.main">
              Live Demo
            </Link>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectViewer;
