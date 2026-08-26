import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { asset } from '../../utils/asset';
import './Lightbox.scss';

interface LightboxProps {
  src: string | null;
  alt?: string;
  onClose: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function Lightbox({ src, alt = '', onClose }: LightboxProps) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && (
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
          <motion.img
            className="lightbox__img"
            src={asset(src)}
            alt={alt}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="lightbox__close"
            onClick={onClose}
            aria-label="Close viewer"
          >
            <span aria-hidden="true">×</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
