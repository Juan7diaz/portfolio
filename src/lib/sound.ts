// Motor de sonido sintetizado con Web Audio: sin archivos, muy sutil.
// Todas las notas salen de una escala pentatónica para que siempre armonicen.
//
// Los navegadores no permiten reproducir audio hasta la primera interacción
// del usuario; `unlock()` se llama en el primer clic/tecla (ver SoundManager).

export type SoundName =
  | 'hover'
  | 'tap'
  | 'pop'
  | 'swipe'
  | 'success'
  | 'themeLight'
  | 'themeDark'
  | 'loadStart'
  | 'loadDone'
  | 'soundOn';

export const SOUND_KEY = 'jdg-sound';
export const SOUND_EVENT = 'portfolio:sound-change';

// Pentatónica de Do mayor (Do, Re, Mi, Sol, La) en dos octavas
const PENTA = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.51];

let ctx: AudioContext | null = null;
let bus: GainNode | null = null;
let unlocked = false;
let enabled: boolean | null = null;
let lastHover = 0;

export function isSoundEnabled() {
  if (enabled === null) {
    try {
      enabled = localStorage.getItem(SOUND_KEY) !== 'off';
    } catch {
      enabled = true;
    }
  }
  return enabled;
}

export function setSoundEnabled(on: boolean) {
  enabled = on;
  try {
    localStorage.setItem(SOUND_KEY, on ? 'on' : 'off');
  } catch {
    /* sin almacenamiento */
  }
  window.dispatchEvent(new CustomEvent(SOUND_EVENT, { detail: on }));
}

// Reverberación corta generada (ruido con caída exponencial): da "aire"
function impulse(c: AudioContext, seconds: number, decay: number) {
  const rate = c.sampleRate;
  const length = Math.floor(rate * seconds);
  const buffer = c.createBuffer(2, length, rate);
  for (let ch = 0; ch < 2; ch += 1) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** decay;
    }
  }
  return buffer;
}

function build() {
  if (ctx || typeof window === 'undefined') return;
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AC) return;
  ctx = new AC();

  const master = ctx.createGain();
  master.gain.value = 0.9;
  // Compresor suave para que nada salte de volumen
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -18;
  comp.ratio.value = 3;
  master.connect(comp).connect(ctx.destination);

  bus = ctx.createGain();
  bus.connect(master);
  const reverb = ctx.createConvolver();
  reverb.buffer = impulse(ctx, 1.4, 3);
  const wet = ctx.createGain();
  wet.gain.value = 0.22;
  bus.connect(reverb).connect(wet).connect(master);
}

export function unlock() {
  if (unlocked) return;
  build();
  if (!ctx) return;
  ctx.resume();
  unlocked = true;
}

// Pausa el audio cuando la pestaña no está visible
export function setSuspended(hidden: boolean) {
  if (!ctx || !unlocked) return;
  if (hidden) ctx.suspend();
  else ctx.resume();
}

function ready(): AudioContext | null {
  if (!isSoundEnabled()) return null;
  build();
  if (!ctx) return null;
  // Antes de la primera interacción solo suena si el navegador ya lo permite
  if (!unlocked && ctx.state !== 'running') return null;
  return ctx;
}

interface Tone {
  freq: number;
  to?: number;
  type?: OscillatorType;
  dur: number;
  gain: number;
  attack?: number;
  delay?: number;
}

function tone(c: AudioContext, t: Tone) {
  const start = c.currentTime + (t.delay ?? 0);
  const osc = c.createOscillator();
  osc.type = t.type ?? 'sine';
  osc.frequency.setValueAtTime(t.freq, start);
  if (t.to) osc.frequency.exponentialRampToValueAtTime(t.to, start + t.dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(t.gain, start + (t.attack ?? 0.006));
  g.gain.exponentialRampToValueAtTime(0.0001, start + t.dur);
  osc.connect(g).connect(bus!);
  osc.start(start);
  osc.stop(start + t.dur + 0.05);
}

// Campana: fundamental + parciales inarmónicos suaves
function bell(
  c: AudioContext,
  freq: number,
  gain: number,
  delay = 0,
  dur = 1.2,
) {
  tone(c, { freq, dur, gain, delay, attack: 0.004 });
  tone(c, { freq: freq * 2.01, dur: dur * 0.6, gain: gain * 0.28, delay });
  tone(c, { freq: freq * 3.02, dur: dur * 0.35, gain: gain * 0.12, delay });
}

// Ráfaga de ruido filtrado (para deslizamientos)
function swoosh(c: AudioContext, gain: number) {
  const dur = 0.18;
  const buffer = c.createBuffer(
    1,
    Math.floor(c.sampleRate * dur),
    c.sampleRate,
  );
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = 'bandpass';
  filter.Q.value = 1.2;
  const t = c.currentTime;
  filter.frequency.setValueAtTime(2400, t);
  filter.frequency.exponentialRampToValueAtTime(700, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(filter).connect(g).connect(bus!);
  src.start(t);
}

export function play(name: SoundName, index = 0) {
  const c = ready();
  if (!c) return;

  switch (name) {
    case 'hover': {
      // Tic casi imperceptible; limitado para no saturar
      const now = performance.now();
      if (now - lastHover < 70) return;
      lastHover = now;
      tone(c, { freq: 2600, dur: 0.035, gain: 0.006, attack: 0.002 });
      break;
    }
    case 'tap':
      tone(c, { freq: 620, to: 420, dur: 0.09, gain: 0.035, attack: 0.003 });
      tone(c, { freq: 1240, dur: 0.03, gain: 0.008, attack: 0.001 });
      break;
    case 'pop':
      tone(c, { freq: 340, to: 720, dur: 0.1, gain: 0.03 });
      break;
    case 'swipe':
      swoosh(c, 0.03);
      tone(c, { freq: PENTA[index % 5], dur: 0.25, gain: 0.012, delay: 0.04 });
      break;
    case 'success':
      bell(c, PENTA[3], 0.03, 0, 0.6); // Sol
      bell(c, PENTA[5], 0.028, 0.09, 0.9); // Do agudo
      break;
    case 'themeLight':
      // Asciende: Mi → Si
      bell(c, PENTA[2], 0.03, 0, 0.8);
      bell(c, 987.77, 0.026, 0.11, 1.1);
      break;
    case 'themeDark':
      // Desciende y más grave: Sol → Do
      bell(c, 392, 0.03, 0, 0.8);
      bell(c, 261.63, 0.03, 0.12, 1.3);
      break;
    case 'loadStart':
      // Respiración ascendente que acompaña la barra
      tone(c, { freq: 196, to: 392, dur: 1.6, gain: 0.012, attack: 0.6 });
      tone(c, { freq: 293.66, to: 587.33, dur: 1.6, gain: 0.006, attack: 0.8 });
      break;
    case 'loadDone':
      // Acorde de Do mayor en arpegio, muy suave
      [PENTA[0], PENTA[2], PENTA[3], PENTA[5]].forEach((f, i) =>
        bell(c, f, 0.022, i * 0.05, 1.8),
      );
      break;
    case 'soundOn':
      bell(c, PENTA[index % PENTA.length], 0.03, 0, 0.6);
      break;
    default:
      break;
  }
}

// Nota según la posición (para la rueda de proyectos)
export function playStep(index: number) {
  const c = ready();
  if (!c) return;
  tone(c, { freq: 1800, dur: 0.02, gain: 0.01, attack: 0.001 });
  bell(c, PENTA[index % PENTA.length], 0.026, 0.02, 0.7);
}
