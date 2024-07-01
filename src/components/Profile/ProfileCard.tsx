import cv from '@/data/cv.json';
import { BiWorld } from 'react-icons/bi';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import ProfileAvatar from './ProfileAvatar';
import ProfileSocial from './ProfileSocial';
import ProfileEducationBadge from './ProfileEducationBadge';
import ProfileHeader from './ProfileHeader';
import SectionLayout from '../common/SectionLayout';
import AvailabilityBadge from './AvailabilityBadge';

function ProfileCard() {
  return (
    <section className="relative">
      <ProfileHeader img={cv.profile.bannerLink} />
      <ProfileAvatar img={cv.profile.avatarLink} />
      {cv.profile.openToWork && <AvailabilityBadge />}
      <SectionLayout>
        {Boolean(cv.profile.name) && (
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-text-primary">
              {cv.profile.name}
            </h1>
            <BsFillPatchCheckFill className="ml-2 text-primary-base" />
          </div>
        )}

        {Boolean(cv.profile.description) && (
          <p className="mt-1 text-text-secondary">{cv.profile.description}</p>
        )}

        {Boolean(cv.profile.location) && (
          <p className="mt-1 flex items-center text-sm text-text-tertiary">
            <BiWorld className="mr-2 text-text-tertiary" />
            {cv.profile.location}
          </p>
        )}

        {cv.education.length > 0 && (
          <ProfileEducationBadge
            universityName={cv.education[0].instituteName}
          />
        )}
        <ProfileSocial />
      </SectionLayout>
    </section>
  );
}

export default ProfileCard;
