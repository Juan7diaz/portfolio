import Image from 'next/image';

function ProfileHeader({ img }: { img: string }) {
  return (
    <div className="mx-auto h-[220px] w-full overflow-hidden bg-gray-300 sm:rounded-md">
      <Image
        src={img}
        alt="Profile header"
        className="h-full w-full object-cover"
        width={700}
        height={200}
        unoptimized
      />
    </div>
  );
}

export default ProfileHeader;
