'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function Carousel({ imgs = [] }: { imgs: string[] }) {
  const [currentImg, setCurrentImg] = useState(
    imgs.length > 0 ? imgs[0] : 'no image',
  );

  if (imgs.length === 0) return <div />;



  const nextImg = () => {

    const currentIndex = imgs.indexOf(currentImg);

    const newIndex = currentIndex + 1 === imgs.length ? 0 : currentIndex + 1;

    setCurrentImg(imgs[newIndex]);
  };

  const prevImg = () => {
    const currentIndex = imgs.indexOf(currentImg);

    const newIndex =
      currentIndex - 1 === -1 ? imgs.length - 1 : currentIndex - 1;

    setCurrentImg(imgs[newIndex]);
  };

  return (
    <div className="flex flex-col items-center pb-10">
      <div className="flex flex-row items-center justify-center pb-2">
        <button
          type="button"
          className="text-2xl text-text-primary hover:bg-slate-50/15"
          onClick={prevImg}
          aria-label="botón para mostrar la siguiente imagen"
        >
          <IoIosArrowBack className="h-10 w-10 text-primary-base" />
        </button>

        {imgs.map((img) => (
          <Image
            key={img}
            src={img}
            alt="Project image h-500 w-500"
            width={500}
            height={500}
            className={`rounded-md transition-all duration-300 ease-in-out ${
              img === currentImg ? 'block' : 'hidden'
            }`}
          />
        ))}

        <button
          type="button"
          className="text-2xl text-text-primary hover:bg-slate-50/15"
          onClick={nextImg}
          aria-label="botón para mostrar la siguiente imagen"
        >
          <IoIosArrowForward className="h-10 w-10 text-primary-base" />
        </button>
      </div>

      <div className="flex flex-row items-center justify-center">
        {imgs.map((img, index) => (
          <button
            key={img}
            type="button"
            className={`mx-2 h-2 w-2 rounded-full ${
              img === currentImg ? 'bg-primary-base' : 'bg-text-tertiary'
            }`}
            onClick={() => setCurrentImg(img)}
            aria-label={`botón para mostrar la imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
