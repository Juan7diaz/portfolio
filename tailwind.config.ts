import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['selector', '[data-theme="dark"]'],
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
      // Colores como variables RGB: cambian con el tema (ver globals.css)
      colors: {
        background: 'rgb(var(--c-bg) / <alpha-value>)',
        surface: {
          DEFAULT: 'rgb(var(--c-surface) / <alpha-value>)',
          dark: 'rgb(var(--c-surface-dark) / <alpha-value>)',
          raised: 'rgb(var(--c-surface-raised) / <alpha-value>)',
        },
        line: {
          DEFAULT: 'rgb(var(--c-line) / <alpha-value>)',
          strong: 'rgb(var(--c-line-strong) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)',
          soft: 'rgb(var(--c-accent) / 0.12)',
        },
        success: '#3ddc84',
        text: {
          primary: 'rgb(var(--c-text) / <alpha-value>)',
          secondary: 'rgb(var(--c-text-2) / <alpha-value>)',
          tertiary: 'rgb(var(--c-text-3) / <alpha-value>)',
          faint: 'rgb(var(--c-text-4) / <alpha-value>)',
          codeInLine: 'rgb(var(--c-code-inline) / <alpha-value>)',
          code: 'rgb(var(--c-code) / <alpha-value>)',
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
