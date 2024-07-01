import React from 'react';

function TitleSection({ title }: { title: string }) {
  return (
    <>
      <h2 className="pb-5 text-[24px] font-normal text-text-primary">
        {title}
      </h2>
      <div className="relative after:absolute after:bottom-4 after:left-0 after:h-[3px] after:w-20 after:bg-primary-base" />
    </>
  );
}

export default TitleSection;
