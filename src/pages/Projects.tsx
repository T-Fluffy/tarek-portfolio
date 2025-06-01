import type { Project } from "../types/Project";
import ProjectCard from "../components/ProjectCard";
import CanvasBackground from "../components/CanvasBackground";

const projects: Project[] = [
  {
    id: 1,
    title: "Game Portfolio Site",
    description: "A 3D developer desk scene using Three.js and React Three Fiber.",
    image: "/assets/project1.png",
    githubLink: "https://github.com/yourusername/game-portfolio",
    live: "https://yourportfolio.vercel.app"
  },
  {
    id: 2,
    title: "Document Editor",
    description: "React app for editing PDFs and images with .NET backend + Google Drive support.",
    image: "/assets/project2.png",
    githubLink: "https://github.com/yourusername/document-editor"
  },
  {
    id: 3,
    title: "Raidraptor Deck Optimizer",
    description: "Yu-Gi-Oh! Duel Links helper tool for building anti-Subterror Raidraptor decks.",
    image: "/assets/raidraptor.png",
    githubLink: "https://github.com/yourusername/duellinks-raidraptor"
  }
];

const Projects: React.FC = () => {
  return (
    <><CanvasBackground />
    <div className="max-w-5xl mx-auto p-6" style={{ position: "relative", zIndex: 1 , color: "white"}}>
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div></>
  );
};

export default Projects;
