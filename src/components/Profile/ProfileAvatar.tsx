import Image from 'next/image';

function ProfileAvatar({ img }: { img: string }) {
  return (
    <div className="relative -mt-20 ml-5">
      <Image
        src={img}
        alt="Profile avatar"
        priority
        className="h-32 w-32 rounded-full border-4 border-primary-base/25"
        width={400}
        height={400}
      />
    </div>
  );
}

export default ProfileAvatar;
