import Image from "next/image";

interface EducationProps {
  logoSrc: string;
  instituteName: string;
  degree: string;
  startDate: string;
  endDate: string;
}

function CardEducation({
  logoSrc,
  instituteName,
  degree,
  startDate,
  endDate,
}: EducationProps) {
  return (
    <div className="flex items-start space-x-5">
      <Image
        src={logoSrc}
        alt={`logo de la ${instituteName}`}
        width={48}
        height={48}
        className="rounded-lg"
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-text-primary">
          {instituteName}
        </h3>
        <p className="text-text-secondary">{degree}</p>
        <p className="text-text-tertiary">
          {startDate} - {endDate}
        </p>
      </div>
    </div>
  );
}

export default CardEducation;