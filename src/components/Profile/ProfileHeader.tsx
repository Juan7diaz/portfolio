'use client'

import Image from 'next/image';
import { useState } from 'react';

function ProfileHeader({ img }: { img: string }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="mx-auto h-[220px] w-full overflow-hidden sm:rounded-md">
      {isLoading && <div className="h-full w-full animate-pulse object-cover bg-gray-300" />}
      <Image
        src={img}
        alt="Profile header"
        className="h-full w-full object-cover"
        onLoad={() => setIsLoading(false)}
        width={700}
        height={200}
        unoptimized
      />
    </div>
  );
}

export default ProfileHeader;
