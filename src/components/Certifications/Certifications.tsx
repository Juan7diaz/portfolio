import React from 'react';
import cv from '@/data/cv.json';
import CardCertifications from './CardCertifications';

function Certifications() {
  if (!cv.certification) return null;

  return (
    <div className="mt-2 space-y-5">
      {cv.certification.map((certification) => (
        <CardCertifications
          key={certification.credentialId}
          logoSrc={certification.logoSrc}
          title={certification.title}
          issuer={certification.issuer}
          issueDate={certification.issueDate}
          credentialId={certification.credentialId}
          credentialUrl={certification.credentialUrl}
        />
      ))}
    </div>
  );
}

export default Certifications;
