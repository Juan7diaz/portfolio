import React from 'react';

function TextWithLineBreaks({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const generateKey = (line: string, index: number) =>
    `${line.length}-${index}-${new Date().getTime()}`;

  if (!text) {
    return null;
  }

  const textArray = text.split('\n');

  return (
    <>
      {textArray.map((line, index) => (
        <p
          className={`${index + 1 !== textArray.length && 'mb-5'} leading-6 text-text-secondary md:leading-8 ${className}`}
          key={generateKey(line, index)}
        >
          {line}
        </p>
      ))}
    </>
  );
}

TextWithLineBreaks.defaultProps = {
  className: '',
};

export default TextWithLineBreaks;
