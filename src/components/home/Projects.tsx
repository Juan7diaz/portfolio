import getProjects from '@/utils/getProjects';
import Section from '@/components/common/Section';
import Reveal from '@/components/ui/Reveal';
import ProjectCard from './ProjectCard';

function Projects() {
  const projects = getProjects();

  return (
    <Section
      id="proyectos"
      eyebrow="Proyectos"
      title="Cosas que he construido."
      description="Del diseño de la interfaz a la API que la sostiene. Cada proyecto, una oportunidad para resolver un problema real."
    >
      <ul className="grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            as="li"
            key={project.fileName}
            delay={(i % 2) * 120}
            className={i === 0 ? 'md:col-span-2' : ''}
          >
            <ProjectCard project={project} featured={i === 0} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

export default Projects;
