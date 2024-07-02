import Image from 'next/image';
import cv from '@/data/cv.json';

function ProjectFooter() {
  return (
    <>
      <div className="relative flex w-full items-center justify-center">
        <div className="absolute h-px w-full bg-primary-base/15" />
        <div className="relative z-10 rounded-full bg-background p-6">
          <Image
            src={cv.profile.avatarLink}
            alt="Profile avatar"
            className="h-16 w-16 rounded-full"
            width={100}
            height={100}
          />
        </div>
      </div>
      <h1 className="text-center text-2xl font-bold text-text-primary">
        {cv.profile.name}
      </h1>
      <p className="mt-2 pb-20 text-center text-text-secondary">
        {cv.profile.description}
      </p>
    </>
  );
}

export default ProjectFooter;
