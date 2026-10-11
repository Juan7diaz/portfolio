import { ProjectFrontmatter } from '@/interfaces/ProjectFrontmatter.interface';
import getAllFiles from './getAllFiles';
import getFrontmatter from './getFrontmatter';

// Todos los proyectos de src/data/projects ordenados por relevancia (level)
const getProjects = () =>
  getAllFiles('projects')
    .map((name) => getFrontmatter<ProjectFrontmatter>(name, 'projects').data)
    .sort((a, b) => b.level - a.level);

export default getProjects;
