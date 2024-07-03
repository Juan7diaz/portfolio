import Image from 'next/image';
import { ProjectFrontmatter } from '@/interfaces/ProjectFrontmatter.interface';
import { FaGithub } from 'react-icons/fa';
import CustomLink from '../common/CustomLink';

function ProjectCard({ project }: { project: ProjectFrontmatter }) {
  return (
    <div className="flex flex-col rounded-md hover:cursor-pointer sm:flex-row">
      <div className="w-full sm:w-1/3">
        <Image
          src={project.coverImage}
          alt={project.name}
          className="aspect-[640/480] h-full w-full rounded-lg object-cover"
          width={300}
          height={200}
        />
      </div>
      <div className="mt-4 w-full sm:ml-4 sm:mt-0 sm:w-2/3">
        <h2 className="text-xl font-bold text-text-secondary">
          {project.name}
        </h2>
        <div className="my-1 flex flex-row space-x-2 text-sm text-text-tertiary">
          <p>{project.role}</p>
          <p>•</p>
          <p>{project.date}</p>
        </div>
        <p className="text-text-secondary">{project.resumen}</p>
        {project?.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-x-1 pt-2 text-sm">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="mb-1 rounded-md bg-[#d9d9d9] p-[2px] px-2 text-background"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-row space-x-4">
          <CustomLink
            text="Ver más"
            url={`/project/${encodeURI(project.fileName)}`}
            OpenAnotherTab={false}
          />
          <CustomLink
            text="GitHub"
            url={project.github || '/hola'}
            IconComponent={FaGithub}
            positionIcon="left"
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
