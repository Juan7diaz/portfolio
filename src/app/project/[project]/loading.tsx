// Barra fina en acento, igual que el preloader
function Loading() {
  return (
    <div
      role="status"
      aria-label="Cargando proyecto"
      className="flex min-h-screen flex-col items-center justify-center gap-4"
    >
      <div className="relative h-px w-[180px] overflow-hidden bg-line-strong">
        <span className="absolute inset-0 origin-left animate-[load-bar_1.4s_ease-in-out_infinite] bg-accent" />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary">
        Cargando
      </span>
    </div>
  );
}

export default Loading;
