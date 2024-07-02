import ReactMarkdown from 'react-markdown';
import getFrontmatter from '@/utils/getFrontmatter';
import MarkdownComponents from '@/components/common/MarkdownComponents';
import ProjectFooter from '@/components/Project/ProjectFooter';
import ProjectHeader from '@/components/Project/ProjectHeader';
import { ProjectFrontmatter } from '@/interfaces/ProjectFrontmatter.interface';

function ProjectPage({ params }: { params: { project: string } }) {
  const { content, data } = getFrontmatter<ProjectFrontmatter>(params.project, 'projects')

  return (
    <div className="m-5 md:m-0">
      <ProjectHeader date={data.date} title={data.name} type={data.type}/>
      <ReactMarkdown components={MarkdownComponents as any}>
        {content}
      </ReactMarkdown>
      <ProjectFooter/>
    </div>
  );
}

export default ProjectPage;
