import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Grid, Button, Stack, Chip, Paper, Fade } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Slider from "react-slick";

import type { Project } from "../types/Project";
import Portfolio from "../data/projects.json";

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const cyberBlue = "#00BFFF";

  const projects = Portfolio as Project[];
  const projectIndex = projects.findIndex((p) => String(p.id) === projectId);
  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  // Helper to fix broken paths on sub-routes
  const formatPath = (path: string) => {
    if (!path) return "";
    return path.startsWith("/") ? path : `/${path}`;
  };

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Tarek.Dev`;
      window.scrollTo(0, 0);
    }
    return () => { document.title = "Tarek Halloul | Portfolio"; };
  }, [project]);

  if (!project) {
    return (
      <Container sx={{ py: 20, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: 'white' }}>[ERROR]: PROJECT_NOT_FOUND</Typography>
        <Button onClick={() => navigate('/projects')} sx={{ mt: 4, color: cyberBlue }}>
          RETURN_TO_BASE
        </Button>
      </Container>
    );
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <Fade in={true} timeout={800}>
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 15 }, position: "relative", zIndex: 1 }}>
        
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/projects')}
            sx={{ color: "rgba(255,255,255,0.5)", "&:hover": { color: cyberBlue, bgcolor: 'transparent' } }}
          >
            BACK_TO_GALLERY
          </Button>
        </Stack>

        {/* Grid Syntax matching your Projects.tsx exactly */}
        <Grid container spacing={6}>
          
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ 
              borderRadius: 2, 
              overflow: 'hidden', 
              border: `1px solid rgba(0, 191, 255, 0.2)`,
              bgcolor: '#000'
            }}>
              {project.images && project.images.length > 0 ? (
                <Slider {...sliderSettings}>
                  {project.images.map((img, i) => (
                    <Box 
                      key={i} 
                      component="img" 
                      src={formatPath(img)} 
                      sx={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: "block" }} 
                    />
                  ))}
                </Slider>
              ) : (
                <Box 
                  component="img" 
                  src={formatPath(project.image)} 
                  sx={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: "block" }} 
                />
              )}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="overline" sx={{ color: cyberBlue, fontWeight: 'bold', letterSpacing: 3 }}>
              TECHNICAL_SPECIFICATIONS
            </Typography>
            <Typography variant="h2" sx={{ color: "white", fontWeight: "bold", mb: 3, textTransform: 'uppercase' }}>
              {project.title}
            </Typography>

            <Paper sx={{ 
              p: 3, 
              bgcolor: "rgba(255,255,255,0.02)", 
              borderLeft: `4px solid ${cyberBlue}`,
              mb: 4 
            }}>
              <Typography variant="body1" sx={{ color: "#aaa", lineHeight: 1.8 }}>
                {project.description}
              </Typography>
            </Paper>

            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 5 }}>
              {project.technologies?.map((tech) => (
                <Chip 
                  key={tech} 
                  label={tech} 
                  size="small"
                  sx={{ color: cyberBlue, border: `1px solid rgba(0, 191, 255, 0.2)`, mb: 1 }} 
                />
              ))}
            </Stack>

            <Button 
              component="a"
              variant="contained" 
              fullWidth
              startIcon={<GitHubIcon />}
              href={project.githubLink}
              target="_blank"
              sx={{ bgcolor: cyberBlue, color: "black", fontWeight: 'bold' }}
            >
              SOURCE_CODE
            </Button>
            {project.live && (
              <Button 
                component="a"
                variant="outlined" 
                fullWidth
                startIcon={<LaunchIcon />} 
                href={project.live}
                target="_blank"
                sx={{ borderColor: cyberBlue, color: cyberBlue }}
              >
                LIVE_DEMO
              </Button>
            )}
          </Grid>
        </Grid>

        <Box sx={{ mt: 10, pt: 4, borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <Button 
            onClick={() => navigate(`/project/${nextProject.id}`)}
            endIcon={<ArrowForwardIcon />}
            sx={{ color: 'white', '&:hover': { color: cyberBlue } }}
          >
            NEXT: {nextProject.title}
          </Button>
        </Box>

      </Container>
    </Fade>
  );
};

export default ProjectDetails;