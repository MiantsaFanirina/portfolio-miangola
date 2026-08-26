import { useEffect, useState } from 'react';
import { brand } from '../../data/content';
import { asset } from '../../utils/asset';
import { useTheme } from '../../context/ThemeContext';
import './LoadingScreen.scss';

const MARQUEE_TEXT = 'STREET · DOCUMENTARY · URBAN · MEJA MIANGOLA · ';

export function LoadingScreen() {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const START = Date.now();
    const MIN = 5000;
    const SAFETY = 12000;

    let raf = 0;
    let startTs: number | null = null;
    const tick = (t: number) => {
      if (startTs === null) startTs = t;
      const elapsed = t - startTs;
      setProgress(Math.min(90, (elapsed / MIN) * 90));
      if (elapsed < MIN) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const finish = () => {
      setProgress(100);
      setDone(true);
    };

    // Only complete once both the page is loaded AND the minimum 5s has passed.
    const tryFinish = () => {
      const elapsed = Date.now() - START;
      if (elapsed >= MIN) finish();
      else window.setTimeout(tryFinish, MIN - elapsed);
    };

    const attach = window.setTimeout(() => {
      if (document.readyState === 'complete') tryFinish();
      else window.addEventListener('load', tryFinish, { once: true });
    }, 600);

    const safety = window.setTimeout(finish, SAFETY);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(attach);
      window.clearTimeout(safety);
    };
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => setGone(true), 850);
    return () => window.clearTimeout(t);
  }, [done]);

  if (gone) return null;

  return (
    <div className={`loader ${done ? 'loader--hidden' : ''}`} role="status" aria-live="polite">
      <div className="loader__inner">
        <img
          src={asset(theme === 'light' ? brand.logoBlack : brand.logoWhite)}
          alt="Meja Miangola"
          className="loader__logo"
        />

        <div className="loader__marquee" aria-hidden="true">
          <div className="loader__track">
            <span>{MARQUEE_TEXT}</span>
            <span>{MARQUEE_TEXT}</span>
          </div>
        </div>

        <div className="loader__bar">
          <span className="loader__fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
