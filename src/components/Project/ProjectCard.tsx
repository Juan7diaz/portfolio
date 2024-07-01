import Image from 'next/image';
import CustomLink from '../common/CustomLink';

export interface Project {
  name: string;
  uniqueName: string;
  date: string;
  resumen: string;
  coverImage: string;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col sm:flex-row rounded-md hover:cursor-pointer">
      <div className="w-full sm:w-1/3">
        <Image
          src={project.coverImage}
          alt={project.name}
          className="rounded-lg aspect-[640/480] object-cover h-full w-full"
          width={300}
          height={200}
        />
      </div>
      <div className="mt-4 w-full sm:ml-4 sm:mt-0 sm:w-2/3">
        <h2 className="text-xl font-bold text-text-secondary">
          {project.name}
        </h2>
        <p className="text-sm text-text-tertiary">{project.date}</p>
        <p className="mt-2 text-text-secondary">{project.resumen}</p>
        <CustomLink text='Ver más' url={`/project/${encodeURI(project.uniqueName)}`} OpenAnotherTab={false}/>
      </div>
    </div>
  );
}

export default ProjectCard;
