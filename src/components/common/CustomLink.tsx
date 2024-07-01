import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface CustomLinkProps {
  url: string;
  text: string;
  IconComponent?: IconType;
  OpenAnotherTab?: boolean;
}

function CustomLink({ url, text, IconComponent, OpenAnotherTab }: CustomLinkProps) {

  return (
    <Link
      href={url}
      target={OpenAnotherTab ? '_blank' : '_self'}
      className="mt-2 flex items-center space-x-5 text-sm font-semibold text-primary-base hover:underline"
    >
      <span className="inline-flex items-center space-x-2 rounded-md px-2 py-1 hover:bg-primary-transparent">
        {text}
        {IconComponent && <IconComponent className="ml-2" />}
      </span>
    </Link>
  );
}

CustomLink.defaultProps = {
  IconComponent: FaExternalLinkAlt,
  OpenAnotherTab: true,
};

export default CustomLink;
