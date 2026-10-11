import cv from '@/data/cv.json';
import Reveal from '@/components/ui/Reveal';
import LocalTime from '@/components/ui/LocalTime';
import CopyEmailButton from '@/components/ui/CopyEmailButton';

const arrow = (glyph: string, move: string) => (
  <span
    aria-hidden
    className={`transition-transform duration-500 ease-spring ${move}`}
  >
    {glyph}
  </span>
);

const upRight = 'group-hover:-translate-y-0.5 group-hover:translate-x-0.5';

// Cierre del sitio: llamada a la acción + firma. Actúa como footer global.
function Contact() {
  const { contact, profile } = cv;
  const email = contact.email.value;
  const initials = profile.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toLowerCase();

  return (
    <footer
      id="contacto"
      className="border-t border-line bg-surface-dark px-5 py-24 text-center md:px-10 md:py-[120px]"
    >
      <div className="mx-auto max-w-[720px]">
        <Reveal>
          <h2
            data-thread="end"
            className="font-serif text-[clamp(48px,7vw,88px)] font-light leading-none"
          >
            <a
              href={`mailto:${email}`}
              className="group relative inline-block italic text-accent"
            >
              Hablemos.
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-700 ease-out-quint group-hover:origin-left group-hover:scale-x-100"
              />
            </a>
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mb-9 mt-4 font-mono text-[11px] tracking-[0.1em] text-text-tertiary">
            Disponible para proyectos freelance y posiciones full-time
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mb-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={contact.linkedin.value}
              target="_blank"
              rel="noopener noreferrer"
              className="pill group"
            >
              LinkedIn {arrow('↗', upRight)}
            </a>
            <a
              href={contact.github.value}
              target="_blank"
              rel="noopener noreferrer"
              className="pill group"
            >
              GitHub {arrow('↗', upRight)}
            </a>
            <a href={`mailto:${email}`} className="pill group">
              Email {arrow('→', 'group-hover:translate-x-1')}
            </a>
            <CopyEmailButton email={email} />
            <a href={contact.cv.value} download className="pill group">
              Descargar CV {arrow('↓', 'group-hover:translate-y-0.5')}
            </a>
          </div>
        </Reveal>
        <Reveal delay={240}>
          <div className="flex flex-col items-center justify-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.08em] text-text-tertiary sm:flex-row sm:gap-8">
            <span>{profile.location.split(',')[0]}, CO</span>
            <span>
              <LocalTime /> COT
            </span>
            <span>Building with React</span>
          </div>
        </Reveal>
        <Reveal delay={320}>
          <p className="mt-9 cursor-default font-serif text-[28px] italic text-text-faint transition-colors duration-700 hover:text-text-tertiary">
            — {initials}
          </p>
          <p className="mt-6 font-mono text-[9px] tracking-[0.08em] text-text-tertiary">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </Reveal>
      </div>
    </footer>
  );
}

export default Contact;
