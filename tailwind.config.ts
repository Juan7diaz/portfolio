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
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          'var(--font-inter)',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: ['"SF Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      colors: {
        background: '#000000',
        surface: {
          DEFAULT: '#161617',
          raised: '#1d1d1f',
          hover: '#232325',
        },
        hairline: 'rgba(255,255,255,0.1)',
        accent: {
          DEFAULT: '#2997ff',
          strong: '#0071e3',
          hover: '#0077ed',
        },
        success: '#30d158',
        text: {
          primary: '#f5f5f7',
          secondary: '#a1a1a6',
          tertiary: '#6e6e73',
          codeInLine: '#ffd60a',
          code: '#d1d1d6',
        },
      },
      letterSpacing: {
        tightest: '-0.045em',
        display: '-0.03em',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        sheet: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        ping: {
          '75%, 100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(0,-24px,0) scale(1.06)' },
        },
        'gradient-pan': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'toast-in': {
          '0%': {
            opacity: '0',
            transform: 'translate3d(-50%, 16px, 0) scale(0.92)',
            filter: 'blur(6px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate3d(-50%, 0, 0) scale(1)',
            filter: 'blur(0)',
          },
        },
        'spinner-fade': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0.15' },
        },
        'scroll-hint': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translateY(10px)', opacity: '0' },
        },
      },
      animation: {
        shine: 'shine 2.4s cubic-bezier(0.25, 0.1, 0.25, 1) infinite',
        ping: 'ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite',
        float: 'float 14s ease-in-out infinite',
        'gradient-pan': 'gradient-pan 8s linear infinite',
        'toast-in': 'toast-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'spinner-fade': 'spinner-fade 1s linear infinite',
        'scroll-hint':
          'scroll-hint 1.8s cubic-bezier(0.16, 1, 0.3, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
