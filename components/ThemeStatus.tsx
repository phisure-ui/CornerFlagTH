'use client';
import { useEffect, useState } from 'react';

export default function ThemeStatus() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const update = () => setOn(document.documentElement.classList.contains('dark'));
    update();
    const id = setInterval(update, 200); // เช็กทุก 0.2s ชั่วคราว
    return () => clearInterval(id);
  }, []);
  return (
    <div className="fixed bottom-4 left-4 z-50 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
      dark: {on ? 'ON' : 'OFF'}
    </div>
  );
}
