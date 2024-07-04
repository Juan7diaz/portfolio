'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function Carousel({ imgs = [] }: { imgs: string[] }) {
  const [currentImg, setCurrentImg] = useState(
    imgs.length > 0 ? imgs[0] : 'no image',
  );

  const [isLoading, setIsLoading] = useState<boolean[]>(
    Array(imgs.length).fill(true),
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

  const changeLoadingByIndex = (index: number, arrBooleans: boolean[]) => {
    const newIsLoading = [...arrBooleans];
    newIsLoading[index] = false;
    setIsLoading(newIsLoading);
  };

  return (
    <div className="flex flex-col items-center pb-10">
      <div className="relative flex flex-row items-center justify-center pb-2">
        <button
          type="button"
          className="hidden text-2xl text-text-primary hover:bg-slate-50/15 md:block"
          onClick={prevImg}
          aria-label="botón para mostrar la imagen anterior"
        >
          <IoIosArrowBack className="h-10 w-10 text-primary-base" />
        </button>

        <div className="h-500 w-375 relative">
          {isLoading[imgs.indexOf(currentImg)] && (
            <div className="h-500 w-375 absolute inset-0 animate-pulse rounded-md bg-gray-300" />
          )}
          {imgs.map((img, i) => (
            <Image
              key={img}
              src={img}
              alt="Project image h-500 w-375"
              width={500}
              height={375}
              onLoad={() => changeLoadingByIndex(i, isLoading)}
              priority={i === 0}
              className={`rounded-md transition-all duration-300 ease-in-out aspect-[500/375] ${
                img === currentImg ? 'block' : 'hidden'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          className="hidden text-2xl text-text-primary hover:bg-slate-50/15 md:block"
          onClick={nextImg}
          aria-label="botón para mostrar la siguiente imagen"
        >
          <IoIosArrowForward className="h-10 w-10 text-primary-base" />
        </button>
      </div>

      <div className="mt-4 flex flex-row items-center justify-center">
        <button
          type="button"
          className="mx-2 text-2xl text-text-primary hover:bg-slate-50/15 md:hidden"
          onClick={prevImg}
          aria-label="botón para mostrar la imagen anterior"
        >
          <IoIosArrowBack className="h-8 w-8 text-primary-base" />
        </button>

        {imgs.map((img, index) => (
          <button
            key={img}
            type="button"
            className={`mx-2 hidden h-2 w-2 rounded-full md:block ${
              img === currentImg ? 'bg-primary-base' : 'bg-text-tertiary'
            }`}
            onClick={() => setCurrentImg(img)}
            aria-label={`botón para mostrar la imagen ${index + 1}`}
          />
        ))}

        <button
          type="button"
          className="mx-2 text-2xl text-text-primary hover:bg-slate-50/15 md:hidden"
          onClick={nextImg}
          aria-label="botón para mostrar la siguiente imagen"
        >
          <IoIosArrowForward className="h-8 w-8 text-primary-base" />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
