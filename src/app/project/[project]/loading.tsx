// Indicador de actividad al estilo iOS: 8 barras que se desvanecen en secuencia
function Loading() {
  return (
    <div
      role="status"
      aria-label="Cargando proyecto"
      className="flex min-h-screen items-center justify-center"
    >
      <div className="relative h-8 w-8">
        {Array.from({ length: 8 }, (_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-0 h-[30%] w-[9%] -translate-x-1/2 animate-spinner-fade rounded-full bg-text-secondary"
            style={{
              transform: `translateX(-50%) rotate(${i * 45}deg)`,
              transformOrigin: '50% 166%',
              animationDelay: `${-1 + i * 0.125}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Loading;
