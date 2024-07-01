import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';

interface ProfileEducationBadgeProps {
  universityName: string;
}

function ProfileEducationBadge({ universityName }: ProfileEducationBadgeProps) {
  return (
    <div className="mt-1 flex items-center">
      <FaGraduationCap className="mr-2 text-text-tertiary" />
      <span className="text-sm font-semibold text-primary-base hover:cursor-pointer hover:text-primary-hover hover:underline">
        {universityName}
      </span>
    </div>
  );
}

export default ProfileEducationBadge;
