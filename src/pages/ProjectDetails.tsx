import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Stack, 
  Chip, 
  Paper, 
  Fade, 
  CircularProgress,
  Grid 
} from "@mui/material";
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
    const fetchFullDetails = async () => {
      try {
        setLoading(true);
        const repoRes = await fetch(`https://api.github.com/repositories/${projectId}`);
        if (!repoRes.ok) throw new Error("Repo not found");
        const repo = await repoRes.json();

        const langRes = await fetch(repo.languages_url);
        const langData = await langRes.json();
        const allLanguages = Object.keys(langData);

        const branch = repo.default_branch || "main";

        const mappedProject: Project = {
          id: repo.id.toString(),
          title: repo.name.replace(/-/g, ' ').toUpperCase(),
          description: repo.description || "No description provided in GitHub logs.",
          imageUrl: `https://github.com/T-Fluffy/${repo.name}/blob/${branch}/social-preview.png?raw=true`,
          technologies: Array.from(new Set([...allLanguages, ...(repo.topics || [])])),
          githubLink: repo.html_url,
          live: repo.homepage || "",
          image: repo.name
        };

        setProject(mappedProject);
      } catch (error) {
        console.error("Uplink Error:", error);
      } finally {
        // Adding a slight delay for the "Cyber" feel
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchFullDetails();
  }, [projectId]);

  // 🚀 THEMATIC LOADING OVERLAY
  if (loading) {
    return (
      <Box sx={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        bgcolor: '#050505',
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 9999
      }}>
        <Stack alignItems="center" spacing={3}>
          <CircularProgress size={60} thickness={2} sx={{ color: cyberBlue }} />
          <Typography sx={{ color: cyberBlue, fontFamily: 'monospace', letterSpacing: 4, animation: 'pulse 1.5s infinite' }}>
            DECRYPTING_PROJECT_DATA...
          </Typography>
        </Stack>
        <style>{`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.3; }
            100% { opacity: 1; }
          }
        `}</style>
      </Box>
    );
  }

  if (!project) return null;

  return (
    <Fade in={true} timeout={800}>
      <Container 
        maxWidth="lg" 
        sx={{ 
          // 🚀 BUFFERS: Prevents Navbar/Footer from covering content
          pt: { xs: 12, md: 18 }, 
          pb: { xs: 10, md: 15 } 
        }}
      >
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/projects')}
          sx={{ 
            color: "rgba(255,255,255,0.5)", 
            mb: 4, 
            fontFamily: 'monospace',
            "&:hover": { color: cyberBlue } 
          }}
        >
          BACK_TO_GALLERY
        </Button>

        <Grid container spacing={6}>
          {/* Image Column */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ 
              border: `1px solid rgba(0, 191, 255, 0.2)`, 
              borderRadius: 2, 
              overflow: 'hidden',
              boxShadow: `0 0 30px rgba(0, 191, 255, 0.1)`
            }}>
              <Box 
                component="img" 
                src={project.imageUrl} 
                onError={(e: any) => { 
                  e.target.src = `https://socialify.git.ci/T-Fluffy/${project.image}/image?theme=Dark&pattern=Circuit%20Board`; 
                }}
                sx={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: "block" }} 
              />
            </Box>
          </Grid>

          {/* Info Column */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="h2" sx={{ 
              color: "white", 
              fontWeight: "bold", 
              mb: 2, 
              fontFamily: 'monospace', 
              fontSize: { xs: '2rem', md: '2.5rem' },
              textShadow: `0 0 15px ${cyberBlue}33`
            }}>
              {project.title}
            </Typography>

            <Paper sx={{ 
              p: 3, 
              bgcolor: "rgba(255,255,255,0.03)", 
              borderLeft: `4px solid ${cyberBlue}`, 
              mb: 4,
              borderRadius: '0 4px 4px 0'
            }}>
              <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>
                {project.description}
              </Typography>
            </Paper>

            <Typography variant="subtitle2" sx={{ color: cyberBlue, mb: 2, fontFamily: 'monospace', fontWeight: 'bold' }}>
              &gt; DETECTED_TECHNOLOGIES:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 5 }}>
              {project.technologies.map((tech) => (
                <Chip 
                  key={tech} 
                  label={tech} 
                  size="small" 
                  sx={{ 
                    color: cyberBlue, 
                    border: `1px solid ${cyberBlue}44`, 
                    bgcolor: 'rgba(0, 191, 255, 0.05)', 
                    fontFamily: 'monospace',
                    "&:hover": { bgcolor: 'rgba(0, 191, 255, 0.15)' }
                  }} 
                />
              ))}
            </Stack>

            <Stack spacing={2}>
              <Button 
                variant="contained" 
                startIcon={<GitHubIcon />} 
                href={project.githubLink} 
                target="_blank" 
                sx={{ 
                  bgcolor: cyberBlue, 
                  color: "black", 
                  fontWeight: 'bold', 
                  fontFamily: 'monospace',
                  "&:hover": { bgcolor: "white", boxShadow: `0 0 20px white` }
                }}
              >
                SOURCE_CODE
              </Button>
              {project.live && (
                <Button 
                  variant="outlined" 
                  startIcon={<LaunchIcon />} 
                  href={project.live} 
                  target="_blank" 
                  sx={{ 
                    color: cyberBlue, 
                    borderColor: cyberBlue, 
                    fontFamily: 'monospace',
                    "&:hover": { borderColor: "white", color: "white" }
                  }}
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