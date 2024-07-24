import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
 
  theme: {
    extend: {
      
      animation: {
        'neon-1': 'neon-animate1 1s linear infinite',
        'neon-2': 'neon-animate2 1s linear infinite',
        'neon-3': 'neon-animate3 1s linear infinite',
        'neon-4': 'neon-animate4 1s linear infinite',
        'pink-1': 'pink-animate1 1s linear infinite',
        'pink-2': 'pink-animate2 1s linear infinite',
        'pink-3': 'pink-animate3 1s linear infinite',
        'pink-4': 'pink-animate4 1s linear infinite',
      },
      keyframes: {
        'neon-animate1': {
          '0%': { left: '-100%' },
          '50%, 100%': { left: '100%' },
        },
        'neon-animate2': {
          '0%': { top: '-100%' },
          '50%, 100%': { top: '100%' },
        },
        'neon-animate3': {
          '0%': { right: '-100%' },
          '50%, 100%': { right: '100%' },
        },
        'neon-animate4': {
          '0%': { bottom: '-100%' },
          '50%, 100%': { bottom: '100%' },
        },
        'pink-animate1': {
          '0%': { left: '-100%' },
          '50%, 100%': { left: '100%' },
        },
        'pink-animate2': {
          '0%': { top: '-100%' },
          '50%, 100%': { top: '100%' },
        },
        'pink-animate3': {
          '0%': { right: '-100%' },
          '50%, 100%': { right: '100%' },
        },
        'pink-animate4': {
          '0%': { bottom: '-100%' },
          '50%, 100%': { bottom: '100%' },
        },
        'animate': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      colors: {
        'neon':'#38d402',
        'neon-green': '#0f0',
        'pink':'#f502af',
      },
      boxShadow: {
        'neon': '0 0 5px #38d402, 0 0 25px #38d402, 0 0 50px #38d402, 0 0 200px #38d402',
        'neon-green': '0 15px 35px rgba(0, 255, 0, 0.9)',
        'pink':'0 0 5px #f502af, 0 0 25px #f502af, 0 0 50px #f502af, 0 0 200px #f502af',
      },
    },
  },
  plugins: [],
};
export default config;


