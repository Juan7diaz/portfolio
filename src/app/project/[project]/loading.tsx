import React from 'react';

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-row gap-2">
        <div className="h-4 w-4 animate-bounce rounded-full bg-primary-base [animation-delay:.7s]" />
        <div className="h-4 w-4 animate-bounce rounded-full bg-primary-base [animation-delay:.3s]" />
        <div className="h-4 w-4 animate-bounce rounded-full bg-primary-base [animation-delay:.7s]" />
      </div>
    </div>
  );
}

export default Loading;
