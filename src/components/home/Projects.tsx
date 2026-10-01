import getProjects from '@/utils/getProjects';
import Section from '@/components/common/Section';
import ProjectIndex, { ProjectItem } from './ProjectIndex';

// "Feb. 2023 - Jun. 2023" -> "2023"
const lastYear = (date: string) => date.match(/\d{4}/g)?.pop() ?? date;

function Projects() {
  const projects: ProjectItem[] = getProjects().map((p) => ({
    slug: p.fileName,
    name: p.name,
    type: p.type,
    year: lastYear(p.date),
    summary: p.resumen,
    stack: p.technologies ?? [],
    cover: p.coverImage,
  }));

  return (
    <Section
      id="proyectos"
      eyebrow="Proyectos"
      title="Cosas que he construido."
      description="Del diseño de la interfaz a la API que la sostiene. Cada proyecto, una oportunidad para resolver un problema real."
    >
      <ProjectIndex projects={projects} />
    </Section>
  );
}

export default Projects;
