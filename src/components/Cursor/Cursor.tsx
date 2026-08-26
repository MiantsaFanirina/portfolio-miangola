import { useEffect, useRef } from 'react';
import './Cursor.scss';

export function Cursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (reduce || !fine) return;

    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;

    document.documentElement.classList.add('cursor-custom');

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let frame = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      d.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      frame = requestAnimationFrame(loop);
    };

    const over = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor="grow"]')) {
        r.classList.add('is-grow');
      }
    };
    const out = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor="grow"]')) {
        r.classList.remove('is-grow');
      }
    };

    window.addEventListener('mousemove', move);
    frame = requestAnimationFrame(loop);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(frame);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      document.documentElement.classList.remove('cursor-custom');
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor cursor--ring" aria-hidden="true" />
      <div ref={dot} className="cursor cursor--dot" aria-hidden="true" />
    </>
  );
}
