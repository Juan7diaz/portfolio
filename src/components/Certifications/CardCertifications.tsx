import Image from 'next/image';
import { FaExternalLinkAlt } from 'react-icons/fa';
import CustomLink from '../common/CustomLink';

interface CertificationsProps {
  logoSrc: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  credentialUrl: string;
}

function CardCertifications({
  logoSrc,
  title,
  issuer,
  issueDate,
  credentialId,
  credentialUrl,
}: CertificationsProps) {
  return (
    <div className="flex items-start space-x-5">
      <Image
        src={logoSrc}
        alt={`${issuer} logo`}
        width={48}
        height={48}
        className="rounded-lg"
      />
      <div className="flex-grow">
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
        <p className="text-text-secondary">{
        issuer}</p>
        <p className="text-text-tertiary">Expedición: {issueDate}</p>
        <p className="text-text-tertiary">
          ID de la credencial: {credentialId}
        </p>
        <CustomLink
          url={credentialUrl}
          IconComponent={FaExternalLinkAlt}
          text="Ver credencial"
        />
      </div>
    </div>
  );
}

export default CardCertifications;
