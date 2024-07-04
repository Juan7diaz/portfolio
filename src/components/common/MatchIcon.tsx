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

function MatchIcon({
  name,
  className,
}: {
  name: MatcherKey;
  className: string;
}) {
  const IconComponent = matcher[name] || BiSolidError;
  return <IconComponent className={className} />;
}

export default MatchIcon;
