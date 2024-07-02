import Image from 'next/image';
import { ProjectFrontmatter } from '@/interfaces/ProjectFrontmatter.interface';
import CustomLink from '../common/CustomLink';

function ProjectCard({ project }: { project: ProjectFrontmatter }) {

  return (
    <div
      className="flex flex-col rounded-md hover:cursor-pointer sm:flex-row"
    >
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
        <div className='flex flex-row space-x-4'>
          <p className="my-1 text-sm text-text-tertiary">{project.role}</p>
          <p className="my-1 text-sm text-text-tertiary">{project.date}</p>
        </div>
        <p className="text-text-secondary">{project.resumen}</p>
        <CustomLink
          text="Ver más"
          url={`/project/${encodeURI(project.fileName)}`}
          OpenAnotherTab={false}
        />
      </div>
    </div>
  );
}

export default ProjectCard;
