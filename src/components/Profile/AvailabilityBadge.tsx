import React from 'react';

function AvailabilityBadge() {
  return (
    <div className="absolute sm:right-0 sm:top-60 sm:z-10 right-2 top-60 z-10">
      <div className="relative overflow-hidden rounded-full bg-primary-base/10 px-4 py-2 sm:text-xs text-xs font-semibold text-white">
        <span className="relative z-10">Disponible para trabajar</span>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 animate-shine bg-gradient-to-r from-transparent via-primary-base/25 to-transparent" />
        </div>
      </div>
    </div>
  );
}

export default AvailabilityBadge;