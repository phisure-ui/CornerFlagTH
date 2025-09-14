// tailwind.config.ts (ตัวอย่างเพิ่มสี)
import type { Config } from 'tailwindcss';


export default {
content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
theme: {
extend: {
colors: {
primary: '#ff6a00', // ส้ม
ink: '#111111',
},
borderRadius: {
'2xl': '1rem',
},
},
},
plugins: [],
} satisfies Config;