import React, { useState, useEffect } from "react";
import { Grid, Container, Typography, CircularProgress, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import type { Project } from "../types/Project";

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGithubRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/T-Fluffy/repos?sort=updated&per_page=50");
        const data = await response.json();

        const mappedProjects: Project[] = data
          .filter((repo: any) => 
            !repo.fork && 
            repo.name.toLowerCase() !== "t-fluffy"
          )
          .map((repo: any) => {
            const githubRawUrl = `https://github.com/T-Fluffy/${repo.name}/blob/${repo.default_branch}/social-preview.png?raw=true`;

            return {
              id: repo.id.toString(),
              title: repo.name.replace(/-/g, ' ').toUpperCase(),
              description: repo.description || "System data encrypted. No description provided.",
              imageUrl: githubRawUrl,
              technologies: [repo.language, ...(repo.topics || [])].filter(Boolean),
              githubLink: repo.html_url,
              liveLink: repo.homepage || "",
              image: repo.name 
            };
          });

        setProjects(mappedProjects);
      } catch (error) {
        console.error("Uplink Failure:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGithubRepos();
  }, []);

  return (
    <Container sx={{ py: 10 }}>
      <Typography variant="h3" align="center" color="cyan" gutterBottom sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}>
        PORTFOLIO_PROJECTS
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress color="inherit" sx={{ color: 'cyan' }} />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {projects.map((project) => (
            <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProjectCard 
                project={project} 
                onClick={() => navigate(`/project/${project.id}`)} 
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Projects;