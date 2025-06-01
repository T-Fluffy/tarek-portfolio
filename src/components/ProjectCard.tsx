import type { Project } from "../types/Project";

interface Props {
  project: Project;
}

const ProjectCard: React.FC<Props> = ({ project }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
      <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded mb-4" />
      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
      <p className="text-gray-700 mb-3">{project.description}</p>
      <div className="flex gap-3">
        <a href={project.githubLink} target="_blank" className="text-blue-500 hover:underline">
          GitHub
        </a>
        {project.live && (
          <a href={project.live} target="_blank" className="text-green-600 hover:underline">
            Live
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
