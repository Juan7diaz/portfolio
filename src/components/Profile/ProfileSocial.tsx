'use client';

import React from 'react';
import Link from 'next/link';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdEmail, MdFileDownload } from 'react-icons/md';
import cv from '@/data/cv.json';

function ProfileSocial({ showCv = true }: { showCv?: boolean }) {
  const handleEmailClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = `mailto:${cv.contact.email.value}`;
  };

  const commonClasses =
    'group border-1 transform rounded-md border p-2 transition hover:scale-110 hover:cursor-pointer hover:bg-primary-transparent border-text-secondary';
  const iconClasses =
    'text-text-secondary transition-colors group-hover:text-text-primary';
  const textClasses =
    'text-text-secondary leading-none group-hover:text-text-primary';

  return (
    <div className="mt-3 flex flex-row space-x-3">
      <Link
        href={cv.contact.linkedin.value}
        target="_blank"
        rel="noopener noreferrer"
        className={commonClasses}
        aria-label={`Perfil de LinkedIn de ${cv.profile.name}`}
      >
        <FaLinkedin size={20} aria-hidden="true" className={iconClasses} />
      </Link>
      <Link
        href={cv.contact.github.value}
        target="_blank"
        rel="noopener noreferrer"
        className={commonClasses}
        aria-label={`Perfil de Github de ${cv.profile.name}`}
      >
        <FaGithub size={20} aria-hidden="true" className={iconClasses} />
      </Link>
      <button
        type="button"
        onClick={handleEmailClick}
        className={commonClasses}
        aria-label={`Enviar un correo a ${cv.contact.email.value}`}
      >
        <MdEmail size={20} aria-hidden="true" className={iconClasses} />
      </button>
      {showCv && (
        <Link
          href={cv.contact.cv.value}
          download
          target="_self"
          className={`${commonClasses} flex flex-row items-center space-x-1`}
          aria-label={`Enviar un correo a ${cv.contact.email.value}`}
        >
          <MdFileDownload
            size={20}
            aria-hidden="true"
            className={iconClasses}
          />
          <p className={textClasses}>Descargar CV</p>
        </Link>
      )}
    </div>
  );
}

export default ProfileSocial;
