import { useLanguage } from '../../context/LanguageContext';
import { asset } from '../../utils/asset';
import { orientationOf, ratioOf } from '../../utils/imageMeta';
import { Reveal } from '../Reveal/Reveal';
import './ProjectGallery.scss';

interface ProjectGalleryProps {
  images: readonly string[];
  mono?: boolean;
  onImageClick?: (src: string) => void;
}

type Row =
  | { type: 'land'; srcs: string[] }
  | { type: 'pair'; srcs: string[] };

export function ProjectGallery({ images, mono = false, onImageClick }: ProjectGalleryProps) {
  const { tx } = useLanguage();

  // Group by real proportions: landscapes take a full-width row at their
  // natural height; portraits are paired two-by-two and share a height (cropped).
  const rows: Row[] = [];
  let pairBuf: string[] = [];
  const flush = () => {
    if (pairBuf.length) {
      rows.push({ type: 'pair', srcs: [...pairBuf] });
      pairBuf = [];
    }
  };

  images.forEach((src) => {
    if (orientationOf(src) === 'landscape') {
      flush();
      rows.push({ type: 'land', srcs: [src] });
    } else {
      pairBuf.push(src);
      if (pairBuf.length === 2) flush();
    }
  });
  // An unpaired portrait is shown full-width at its natural height.
  if (pairBuf.length === 1) rows.push({ type: 'land', srcs: [pairBuf[0]] });

  const alt = tx({ en: 'Series photograph', fr: 'Photographie de la série' });

  return (
    <div className={`pgallery ${mono ? 'pgallery--mono' : ''}`}>
      {rows.map((row, ri) => (
        <Reveal
          key={ri}
          variant="clip"
          delay={(ri % 2) * 0.06}
          className="pgallery__row"
        >
          {row.type === 'land' ? (
            <img
              className="pgallery__img-land"
              src={asset(row.srcs[0])}
              alt={alt}
              loading="lazy"
              decoding="async"
              role="button"
              tabIndex={0}
              onClick={() => onImageClick?.(row.srcs[0])}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onImageClick?.(row.srcs[0]);
                }
              }}
            />
          ) : (
            <div className="pgallery__pair">
              {row.srcs.map((src) => (
                <div
                  key={src}
                  className="pgallery__pcol"
                  style={{ aspectRatio: String(ratioOf(src)) }}
                >
                  <img
                    className="pgallery__img"
                    src={asset(src)}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    role="button"
                    tabIndex={0}
                    onClick={() => onImageClick?.(src)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onImageClick?.(src);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </Reveal>
      ))}
    </div>
  );
}
