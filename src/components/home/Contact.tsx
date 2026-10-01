import { FiMail } from 'react-icons/fi';
import cv from '@/data/cv.json';
import Reveal from '@/components/ui/Reveal';
import CopyEmailButton from '@/components/ui/CopyEmailButton';
import SocialLinks from '@/components/ui/SocialLinks';
import { btnPrimary, container } from '@/lib/styles';

function Contact() {
  const email = cv.contact.email.value;

  return (
    <section id="contacto" className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-[-30%] left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
      </div>

      <div className={`${container} flex flex-col items-center text-center`}>
        <Reveal>
          <p className="eyebrow">Contacto</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-3 text-[44px] font-semibold leading-[1.04] tracking-tightest md:text-[80px]">
            ¿Construimos algo
            <br />
            <span className="text-gradient animate-gradient-pan">juntos?</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-secondary md:text-xl">
            Estoy abierto a nuevas oportunidades y colaboraciones. Escríbeme y
            te responderé lo antes posible.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href={`mailto:${email}`}
              className={`${btnPrimary} min-w-[176px]`}
            >
              <FiMail
                aria-hidden
                className="transition-transform duration-500 ease-spring group-hover:-rotate-12 group-hover:scale-110"
              />
              Enviar correo
            </a>
            <CopyEmailButton email={email} />
          </div>
        </Reveal>
        <Reveal delay={320}>
          <p className="mt-6 font-mono text-sm text-text-tertiary">{email}</p>
        </Reveal>
        <Reveal delay={400} className="mt-8">
          <SocialLinks />
        </Reveal>
      </div>
    </section>
  );
}

export default Contact;
