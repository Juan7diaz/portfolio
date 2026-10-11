import { Project } from './Project.interface';

export interface ProjectFrontmatter extends Project {
  level: number;
  label: string;
  summary: string;
  fileName: string;
  type: string;
  role: string;
  carouselImages: string[];
  technologies: string[];
  github: string;
}
