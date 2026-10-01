import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGit,
  FaGithub,
  FaFigma,
} from 'react-icons/fa';
import {
  SiJavascript,
  SiTypescript,
  SiPostgresql,
  SiChakraui,
  SiMui,
  SiReactquery,
  SiExpress,
  SiAzuredevops,
  SiGnubash,
} from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';
import { BiSolidError } from 'react-icons/bi';

const matcher = {
  html: FaHtml5,
  css: FaCss3Alt,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: FaReact,
  nodejs: FaNodeJs,
  git: FaGit,
  github: FaGithub,
  postgresql: SiPostgresql,
  chakraui: SiChakraui,
  mui: SiMui,
  reactquery: SiReactquery,
  express: SiExpress,
  azuredevops: SiAzuredevops,
  bash: SiGnubash,
  nextjs: TbBrandNextjs,
  figma: FaFigma,
};

export type MatcherKey = keyof typeof matcher;

// Color de marca de cada tecnología (ajustado para fondo oscuro)
export const brandColors: Record<MatcherKey, string> = {
  html: '#ff6b3d',
  css: '#3b9cff',
  javascript: '#f7df1e',
  typescript: '#4d9bff',
  react: '#61dafb',
  nodejs: '#6cc24a',
  git: '#f05032',
  github: '#f5f5f7',
  postgresql: '#6b9dff',
  chakraui: '#4fd1c5',
  mui: '#3399ff',
  reactquery: '#ff4154',
  express: '#f5f5f7',
  azuredevops: '#3aa0ff',
  bash: '#5fd35f',
  nextjs: '#f5f5f7',
  figma: '#a259ff',
};

function MatchIcon({
  name,
  className,
}: {
  name: MatcherKey;
  className?: string;
}) {
  const IconComponent = matcher[name] || BiSolidError;
  return <IconComponent className={className} />;
}

export default MatchIcon;
