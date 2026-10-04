import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#050505',
        surface: {
          DEFAULT: '#0c0c0c',
          dark: '#0a0a0a',
          raised: '#111111',
        },
        line: {
          DEFAULT: '#1a1a1a',
          strong: '#2a2a2a',
        },
        accent: {
          DEFAULT: '#ff5a36',
          soft: 'rgba(255, 90, 54, 0.12)',
        },
        success: '#3ddc84',
        text: {
          primary: '#f5f0eb',
          secondary: '#9a958f',
          tertiary: '#68645f',
          codeInLine: '#ffb199',
          code: '#cfc9c2',
        },
      },
      letterSpacing: {
        label: '0.14em',
      },
      transitionTimingFunction: {
        // Curvas del diseño original
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        'out-quint': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'line-up': {
          '0%': { transform: 'translate3d(0, 110%, 0)' },
          '100%': { transform: 'translate3d(0, 0, 0)' },
        },
        // Recorta el texto mientras sube y luego lo libera (para que el marco
        // de "Figma" pueda sobresalir de la línea)
        'line-mask': {
          '0%, 99.9%': { clipPath: 'inset(0 -20% 0 -20%)' },
          '100%': { clipPath: 'inset(-80% -20% -80% -20%)' },
        },
        'frame-in': {
          '0%': { opacity: '0', transform: 'scale(1.06)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        'handle-in': {
          '0%': { opacity: '0', transform: 'scale(0)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translate3d(0, 12px, 0)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'load-bar': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'soft-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        'scroll-line': {
          '0%': {
            opacity: '0',
            transform: 'scaleY(0)',
            transformOrigin: 'top',
          },
          '50%': {
            opacity: '1',
            transform: 'scaleY(1)',
            transformOrigin: 'top',
          },
          '51%': { transformOrigin: 'bottom' },
          '100%': {
            opacity: '0',
            transform: 'scaleY(0)',
            transformOrigin: 'bottom',
          },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': {
            transform: 'translate3d(0, var(--drift, -20px), 0) scale(1.3)',
          },
        },
        'toast-in': {
          '0%': {
            opacity: '0',
            transform: 'translate3d(-50%, 14px, 0) scale(0.96)',
          },
          '100%': { opacity: '1', transform: 'translate3d(-50%, 0, 0)' },
        },
      },
      animation: {
        'line-up': 'line-up 0.9s cubic-bezier(0.23, 1, 0.32, 1) both',
        'line-mask': 'line-mask 0.9s linear both',
        'frame-in': 'frame-in 0.6s cubic-bezier(0.23, 1, 0.32, 1) both',
        'handle-in': 'handle-in 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.23, 1, 0.32, 1) both',
        'fade-in': 'fade-in 0.6s ease both',
        'load-bar': 'load-bar 1.4s cubic-bezier(0.65, 0, 0.35, 1) both',
        'soft-pulse': 'soft-pulse 2s ease infinite',
        'scroll-line':
          'scroll-line 1.8s cubic-bezier(0.65, 0, 0.35, 1) infinite',
        drift: 'drift var(--dur, 6s) ease-in-out var(--delay, 0s) infinite',
        'toast-in': 'toast-in 0.45s cubic-bezier(0.23, 1, 0.32, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
