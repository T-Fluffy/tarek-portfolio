import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Grid, Button, Stack, Chip, Paper, Fade, CircularProgress } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";

import type { Project } from "../types/Project";

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const cyberBlue = "#00BFFF";

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        setLoading(true);
        // Fetch specific repo by ID
        const response = await fetch(`https://api.github.com/repositories/${projectId}`);
        if (!response.ok) throw new Error("Repo not found");
        
        const repo = await response.json();

        // Map GitHub API to your Project Type
        const mappedProject: Project = {
          id: repo.id.toString(),
          title: repo.name.replace(/-/g, ' ').toUpperCase(),
          description: repo.description || "No description provided in GitHub logs.",
          imageUrl: `https://raw.githubusercontent.com/T-Fluffy/${repo.name}/${repo.default_branch}/social-preview.png`,
          technologies: [repo.language, ...(repo.topics || [])].filter(Boolean),
          githubLink: repo.html_url,
          live: repo.homepage || ""
        };

        setProject(mappedProject);
      } catch (error) {
        console.error("Uplink Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoDetails();
  }, [projectId]);

  if (loading) {
    return (
      <Container sx={{ py: 20, textAlign: 'center' }}>
        <CircularProgress sx={{ color: cyberBlue }} />
        <Typography sx={{ color: '#aaa', mt: 2 }}>DECRYPTING_PROJECT_DATA...</Typography>
      </Container>
    );
  }

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

  return (
    <Fade in={true} timeout={800}>
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 15 }, position: "relative", zIndex: 1 }}>
        
        <Stack direction="row" sx={{ mb: 4 }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/projects')}
            sx={{ color: "rgba(255,255,255,0.5)", "&:hover": { color: cyberBlue } }}
          >
            BACK_TO_GALLERY
          </Button>
        </Stack>

        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 7 }} >
            <Box sx={{ 
              borderRadius: 2, 
              overflow: 'hidden', 
              border: `1px solid rgba(0, 191, 255, 0.2)`,
              bgcolor: '#000'
            }}>
              <Box 
                component="img" 
                src={project.imageUrl} 
                onError={(e: any) => {
                    e.target.src = `https://socialify.git.ci/T-Fluffy/${project.title.toLowerCase().replace(/ /g, '-')}/image?theme=Dark`;
                }}
                sx={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: "block" }} 
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="overline" sx={{ color: cyberBlue, fontWeight: 'bold', letterSpacing: 3 }}>
              PROJECT_IDENTIFIER: {project.id}
            </Typography>
            <Typography variant="h2" sx={{ color: "white", fontWeight: "bold", mb: 3, textTransform: 'uppercase', fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
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
                  sx={{ color: cyberBlue, border: `1px solid rgba(0, 191, 255, 0.2)`, mb: 1, bgcolor: 'transparent' }} 
                />
              ))}
            </Stack>

            <Stack spacing={2}>
                <Button 
                  component="a"
                  variant="contained" 
                  startIcon={<GitHubIcon />}
                  href={project.githubLink}
                  target="_blank"
                  sx={{ bgcolor: cyberBlue, color: "black", fontWeight: 'bold', "&:hover": { bgcolor: 'white' } }}
                >
                  SOURCE_CODE
                </Button>
                {project.live && (
                  <Button 
                    component="a"
                    variant="outlined" 
                    startIcon={<LaunchIcon />} 
                    href={project.live}
                    target="_blank"
                    sx={{ borderColor: cyberBlue, color: cyberBlue }}
                  >
                    LIVE_DEMO
                  </Button>
                )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Fade>
  );
};

export default ProjectDetails;