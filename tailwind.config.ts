// tailwind.config.ts
import type { Config } from 'tailwindcss';
import lineClamp from '@tailwindcss/line-clamp';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff6a00',
        ink: '#111111',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [lineClamp],
};

export default config;
