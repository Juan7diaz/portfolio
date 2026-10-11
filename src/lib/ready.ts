// El preloader marca <html data-ready> al terminar; las animaciones de
// entrada (contadores, etc.) esperan esa señal para no ocurrir tras la cortina.
export function whenReady(cb: () => void) {
  const html = document.documentElement;
  if (html.hasAttribute('data-ready')) {
    cb();
    return () => {};
  }
  const mo = new MutationObserver(() => {
    if (html.hasAttribute('data-ready')) {
      mo.disconnect();
      cb();
    }
  });
  mo.observe(html, { attributes: true, attributeFilter: ['data-ready'] });
  return () => mo.disconnect();
}

// Generador pseudoaleatorio con semilla (Park–Miller): mismas posiciones en
// servidor y cliente
export function seeded(seed: number) {
  let a = seed % 2147483647;
  if (a <= 0) a += 2147483646;
  return () => {
    a = (a * 16807) % 2147483647;
    return (a - 1) / 2147483646;
  };
}
