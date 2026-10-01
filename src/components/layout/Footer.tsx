import Link from 'next/link';
import cv from '@/data/cv.json';
import { container } from '@/lib/styles';

const footerLinks = [
  { href: cv.contact.linkedin.value, label: 'LinkedIn', external: true },
  { href: cv.contact.github.value, label: 'GitHub', external: true },
  {
    href: `mailto:${cv.contact.email.value}`,
    label: 'Correo',
    external: false,
  },
  {
    href: cv.contact.cv.value,
    label: 'Currículum',
    external: false,
    download: true,
  },
];

function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface/40">
      <div
        className={`${container} flex flex-col gap-4 py-8 text-xs text-text-tertiary sm:flex-row sm:items-center sm:justify-between`}
      >
        <p>
          Diseñado y desarrollado por{' '}
          <span className="text-text-secondary">{cv.profile.name}</span>. ©{' '}
          {new Date().getFullYear()}
        </p>
        <ul className="flex flex-wrap items-center gap-x-1 gap-y-2">
          {footerLinks.map((l, i) => (
            <li key={l.label} className="flex items-center">
              {i > 0 && (
                <span aria-hidden className="mr-1 text-white/15">
                  |
                </span>
              )}
              <Link
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noopener noreferrer' : undefined}
                download={l.download || undefined}
                className="rounded px-1.5 py-0.5 transition-colors duration-300 hover:text-text-primary"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
