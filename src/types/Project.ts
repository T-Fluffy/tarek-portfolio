export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[]; // No longer optional
  imageUrl: string;
  githubLink: string;
  live: string;
  image: string; // The raw repo name
}