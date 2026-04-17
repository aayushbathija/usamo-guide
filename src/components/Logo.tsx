import * as React from 'react';

const logoSrc = '/images/Test_logo.png';

export default function Logo(): JSX.Element {
  return (
    <div className="flex flex-nowrap items-center space-x-2 whitespace-nowrap">
      <img
        className="h-9 w-9 shrink-0"
        src={logoSrc}
        alt="USAMO Guide"
      />
      <span className="text-xl font-bold tracking-tight text-black dark:text-gray-300">
        USAMO Guide
      </span>
    </div>
  );
}
