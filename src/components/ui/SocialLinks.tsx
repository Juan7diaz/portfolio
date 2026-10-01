import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import cv from '@/data/cv.json';
import { iconButton } from '@/lib/styles';

const links = [
  {
    href: cv.contact.linkedin.value,
    label: `LinkedIn de ${cv.profile.name}`,
    Icon: FaLinkedinIn,
    external: true,
  },
  {
    href: cv.contact.github.value,
    label: `GitHub de ${cv.profile.name}`,
    Icon: FaGithub,
    external: true,
  },
  {
    href: `mailto:${cv.contact.email.value}`,
    label: `Escribir a ${cv.contact.email.value}`,
    Icon: FiMail,
    external: false,
  },
];

function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {links.map(({ href, label, Icon, external }) => (
        <li key={href}>
          <a
            href={href}
            aria-label={label}
            title={label}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className={`${iconButton} group`}
          >
            <Icon
              size={17}
              aria-hidden
              className="transition-transform duration-500 ease-spring group-hover:scale-110"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SocialLinks;
