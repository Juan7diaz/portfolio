import React from 'react';
import cv from '@/data/cv.json';
import CardEducation from './CardEducation';

function Education() {
  return (
    <div className="mt-2 space-y-5">
      {cv.education.map((e) => (
        <CardEducation
          key={e.instituteName + e.degree}
          instituteName={e.instituteName}
          logoSrc={e.linkImg}
          degree={e.degree}
          endDate={e.endDate}
          startDate={e.startDate}
        />
      ))}
    </div>
  );
}

export default Education;
