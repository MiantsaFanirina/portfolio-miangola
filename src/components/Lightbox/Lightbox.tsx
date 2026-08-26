import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { asset } from '../../utils/asset';
import './Lightbox.scss';

interface LightboxProps {
  images: string[] | null;
  index: number;
  alt?: string;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function Lightbox({ images, index, alt = '', onClose, onIndexChange }: LightboxProps) {
  const imgs = images ?? [];
  const count = imgs.length;
  const pos = index;
  const [dir, setDir] = useState(0);

  const go = (d: number) => {
    if (count <= 1) return;
    setDir(d);
    onIndexChange(Math.max(0, Math.min(count - 1, pos + d)));
  };

  useEffect(() => {
    if (!count) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, pos]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 50) go(info.offset.x < 0 ? 1 : -1);
  };

  return createPortal(
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt || 'Image viewer'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={onClose}
        >
          <div className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence custom={dir} initial={false} mode="popLayout">
              <motion.img
                key={pos}
                className="lightbox__img"
                src={asset(imgs[pos])}
                alt={alt}
                draggable={false}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: EASE }}
                drag={count > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                dragSnapToOrigin
                onDragEnd={onDragEnd}
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            {count > 1 && pos > 0 && (
              <button
                type="button"
                className="lightbox__nav lightbox__nav--prev"
                onClick={() => go(-1)}
                aria-label="Previous image"
              >
                <span aria-hidden="true">‹</span>
              </button>
            )}
            {count > 1 && pos < count - 1 && (
              <button
                type="button"
                className="lightbox__nav lightbox__nav--next"
                onClick={() => go(1)}
                aria-label="Next image"
              >
                <span aria-hidden="true">›</span>
              </button>
            )}
          </div>

          <button
            type="button"
            className="lightbox__close"
            onClick={onClose}
            aria-label="Close viewer"
          >
            <span aria-hidden="true">×</span>
          </button>

          {count > 1 && (
            <div className="lightbox__dots">
              {imgs.map((_, di) => (
                <button
                  key={di}
                  type="button"
                  className={`lightbox__dot${di === pos ? ' is-active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDir(di > pos ? 1 : -1);
                    onIndexChange(di);
                  }}
                  aria-label={`Go to image ${di + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
