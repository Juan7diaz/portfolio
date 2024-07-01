import cv from "@/data/cv.json"
import ProjectCard, { Project } from "./ProjectCard";

function Projects() {

  const projects: Project[] = cv.project;

  return (
    <div>
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </div>
  );
}
export default Projects