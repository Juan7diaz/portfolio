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
        background: "#010a1a",
        primary: {
          base: "#94e4dc",
        },
        text: {
          primary: "#FFFFFFE6",
          secondary: "#FFFFFFBF",
          tertiary: "#AAAAAA",
          codeInLine: "#FFD700",
          code: "#AAAAAA",
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

// 282c34
// 15191d