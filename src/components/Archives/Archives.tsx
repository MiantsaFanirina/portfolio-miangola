import { useState, useRef, type TouchEvent } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { asset } from '../../utils/asset';
import { Reveal } from '../Reveal/Reveal';
import { Lightbox } from '../Lightbox/Lightbox';
import './Archives.scss';

export interface ArchiveItem {
  title: string;
  sub?: string;
  meta: string;
  link?: string;
  images?: string[];
}

interface ArchivesProps {
  eyebrow: string;
  title: string;
  items: ArchiveItem[];
}

export function Archives({ eyebrow, title, items }: ArchivesProps) {
  const [lightbox, setLightbox] = useState<{ src: string; alt?: string } | null>(null);

  return (
    <section className="archives">
      <div className="container">
        <header className="archives__head">
          <span className="t-label">{eyebrow}</span>
          <h2 className="archives__title t-h3">{title}</h2>
        </header>

        <div className="archives__grid">
          {items.map((item, i) => (
            <ArchiveCard key={i} item={item} index={i} onOpen={setLightbox} />
          ))}
        </div>
      </div>

      <Lightbox
        src={lightbox?.src ?? null}
        alt={lightbox?.alt}
        onClose={() => setLightbox(null)}
      />
    </section>
  );
}

function ArchiveCard({
  item,
  index,
  onOpen,
}: {
  item: ArchiveItem;
  index: number;
  onOpen: (v: { src: string; alt?: string }) => void;
}) {
  const { lang } = useLanguage();
  const imgs = item.images ?? [];
  const [pos, setPos] = useState(0);
  const [drag, setDrag] = useState(0);
  const startX = useRef<number | null>(null);
  const swiped = useRef(false);
  const go = (dir: number) =>
    setPos((p) => Math.max(0, Math.min(imgs.length - 1, p + dir)));

  const onTouchStart = (e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
    swiped.current = false;
  };

  const onTouchMove = (e: TouchEvent) => {
    if (startX.current === null) return;
    let dx = e.touches[0].clientX - startX.current;
    if ((pos === 0 && dx > 0) || (pos === imgs.length - 1 && dx < 0)) dx = 0;
    if (Math.abs(dx) > 6) swiped.current = true;
    setDrag(dx);
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    startX.current = null;
    setDrag(0);
  };

  const open = (src: string) => {
    if (swiped.current) return;
    onOpen({ src, alt: item.title });
  };

  const dragging = drag !== 0;

  return (
    <Reveal variant="up" delay={(index % 3) * 0.06} className="archives__entry">
      <div className="archives__media">
        <div
          className="archives__viewport"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="archives__track"
            style={{
              transform: `translate3d(calc(-${pos * 100}% + ${drag}px), 0, 0)`,
              transition: dragging ? 'none' : undefined,
            }}
          >
            {imgs.map((src, ti) => (
              <button
                type="button"
                key={ti}
                className="archives__slide"
                onClick={() => open(src)}
                aria-label={item.title}
              >
                <img src={asset(src)} alt={item.title} loading="lazy" decoding="async" />
              </button>
            ))}
          </div>

        {imgs.length > 1 && (
          <>
            {pos > 0 && (
              <button
                type="button"
                className="archives__nav archives__nav--prev"
                aria-label="Previous image"
                onClick={() => go(-1)}
              >
                <span aria-hidden="true">‹</span>
              </button>
            )}
            {pos < imgs.length - 1 && (
              <button
                type="button"
                className="archives__nav archives__nav--next"
                aria-label="Next image"
                onClick={() => go(1)}
              >
                <span aria-hidden="true">›</span>
              </button>
            )}
            <div className="archives__dots">
                {imgs.map((_, di) => (
                  <button
                    type="button"
                    key={di}
                    className={`archives__dot${di === pos ? ' is-active' : ''}`}
                    onClick={() => setPos(di)}
                    aria-label={`Go to image ${di + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="archives__caption">
        <div className="archives__caption-head">
          <span className="archives__num t-mono">{String(index + 1).padStart(2, '0')}</span>
          {item.link && (
            <span className="archives__arrow" aria-hidden="true">
              →
            </span>
          )}
        </div>
        <div className="archives__caption-body">
          {item.link ? (
            <a
              className="archives__title t-body"
              href={item.link}
              target="_blank"
              rel="noreferrer"
              hrefLang={lang}
            >
              {item.title}
            </a>
          ) : (
            <span className="archives__title t-body">{item.title}</span>
          )}
          {item.sub && <span className="archives__sub t-small">{item.sub}</span>}
        </div>
        <div className="archives__caption-foot">
          <span className="archives__meta t-caption">{item.meta}</span>
        </div>
      </div>
    </Reveal>
  );
}
