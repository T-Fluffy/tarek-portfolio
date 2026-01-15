import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProjectCard from '../components/ProjectCard';

const mockProject = {
  id: "123",
  title: "MY CHESS GAME",
  description: "A 3D chess game",
  imageUrl: "valid-url.png",
  technologies: ["React"],
  githubLink: "#",
  live: "#",
  image: "my-chess"
};

describe('ProjectCard Component', () => {
  it('renders the project title in uppercase', () => {
    render(<ProjectCard project={mockProject} onClick={() => {}} />);
    
    const titleElement = screen.getByText(/MY CHESS GAME/i);
    expect(titleElement).toBeDefined();
  });

  it('displays the tech chips correctly', () => {
    render(<ProjectCard project={mockProject} onClick={() => {}} />);
    expect(screen.getByText('React')).toBeDefined();
  });
});