import Image from 'next/image';
import cv from '@/data/cv.json';
import { IoReturnDownBack } from 'react-icons/io5';
import Link from 'next/link';

interface ProjectHeaderProps {
  type: string;
  date: string;
  title: string;
}

function ProjectHeader({ type, date, title }: ProjectHeaderProps) {
  return (
    <header className="mb-10 mt-10 max-w-4xl">
      <Link className="flex flex-row items-center pb-5 text-text-secondary hover:cursor-pointer hover:underline" href="/">
        <IoReturnDownBack className="mr-2" />
        Regresar
      </Link>
      <div className="relative after:absolute after:bottom-2 after:left-0 after:h-[3px] after:w-24 after:bg-primary-base" />
      <h1 className="mb-6 text-5xl font-bold text-text-primary">{title}</h1>
      <div className="mb-8 flex items-center">
        <Image
          src={cv.profile.avatarLink}
          alt="profile picture"
          className="mr-4 h-12 w-12 rounded-full"
          width={100}
          height={100}
        />
        <div>
          <p className="text-xl font-semibold text-text-primary">
            {cv.profile.name}
          </p>
          <div className="flex flex-col items-center text-text-secondary sm:flex-row">
            <span className="mr-2">{type}</span>
            <span className="mr-2 hidden sm:block">•</span>
            <time>{date}</time>
          </div>
        </div>
      </div>
    </header>
  );
}

export default ProjectHeader;
