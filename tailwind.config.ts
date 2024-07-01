import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#15191d",
        primary: {
          base: "#FFD700",
          hover: "#caaa00",
          transparent: "#ffd60259",
        },
        text: {
          primary: "#FFFFFFE6",
          secondary: "#FFFFFFBF",
          tertiary: "#AAAAAA",
        }
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        shine: 'shine 2s linear infinite'
      }
    },
  },
  plugins: [],
};

export default config;