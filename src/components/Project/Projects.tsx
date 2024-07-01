import getAllFiles from "@/utils/getAllFiles";
import getFrontmatter from "@/utils/getFrontmatter";
import ProjectCard, { Project } from "./ProjectCard";

interface ProjectFrontmatter extends Project {
  level: number
  fileName: string
}

function Projects() {

  // obtiene todos los archivos dentro la carpeta src/data/projects
  const arrProjectsName = getAllFiles("projects")

  // obtiene el frontmatter de cada archivo y lo guarda en un array
  const projects  = arrProjectsName.map((name) => getFrontmatter(name, "projects")) as ProjectFrontmatter[]

  const projectsSorted = projects.sort((a, b) =>  b.level -  a.level)

  return (
    <div className="mt-2 space-y-5">
      {projectsSorted.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </div>
  );
}
export default Projects