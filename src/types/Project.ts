export interface Project {
  id: string | number;     // Changed to allow both for compatibility
  title: string;
  description: string;
  technologies?: string[];
  imageUrl: string;       // Added for GitHub Dynamic images
  githubLink?: string;
  liveLink?: string;       // Existing
  live?: any;              // Existing
  image?: string;          // Made optional
  images?: string[];       // Existing
}