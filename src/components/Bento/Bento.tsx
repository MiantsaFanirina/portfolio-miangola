import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { projects } from '../../data/projects';
import { brand, hero } from '../../data/content';
import { asset } from '../../utils/asset';
import { orientationOf } from '../../utils/imageMeta';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import './Bento.scss';

type Size = 'wide' | 'tall' | 'small';
type Tile =
  | { kind: 'project'; project: number; size: Size }
  | { kind: 'text'; size: Size }
  | { kind: 'portrait'; size: Size };

// Landscape photos get a wide (full-width) cell; portrait/square get half-width
// (tall or small). This order + size pattern tiles perfectly at 4-col and 2-col.
const rank = (o: string) => (o === 'landscape' ? 0 : o === 'portrait' ? 1 : 2);
const sorted = [...projects].sort(
  (a, b) => rank(orientationOf(a.cover)) - rank(orientationOf(b.cover)),
);
const idx = (p: (typeof projects)[number]) => projects.findIndex((x) => x.id === p.id);

const tiles: Tile[] = [
  { kind: 'project', project: idx(sorted[0]), size: 'wide' },
  { kind: 'project', project: idx(sorted[1]), size: 'wide' },
  { kind: 'project', project: idx(sorted[2]), size: 'tall' },
  { kind: 'project', project: idx(sorted[3]), size: 'tall' },
  { kind: 'project', project: idx(sorted[4]), size: 'small' },
  { kind: 'project', project: idx(sorted[5]), size: 'small' },
  { kind: 'portrait', size: 'small' },
  { kind: 'text', size: 'small' },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Bento() {
  const { t, tx } = useLanguage();

  const cellMotion = (i: number) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0 },
    transition: { duration: 0.7, ease: EASE, delay: (i % 4) * 0.06 },
  });

  const renderTile = (tile: Tile, key: string, i: number) => {
    if (tile.kind === 'text') {
      return (
        <motion.div key={key} className={`bento__cell bento--${tile.size}`} {...cellMotion(i)}>
          <div className="bento__text">
            <span className="bento__count t-display">06</span>
            <p className="t-label">{tx({ en: 'series', fr: 'séries' })}</p>
            <Link to="/work/lignes-de-ville" className="bento__text-link">
              {t.common.allWork}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </motion.div>
      );
    }
    if (tile.kind === 'portrait') {
      return (
        <motion.div key={key} className={`bento__cell bento--${tile.size}`} {...cellMotion(i)}>
          <div className="bento__portrait">
            <img src={asset(brand.portrait)} alt={tx(hero.title)} loading="lazy" decoding="async" />
            <span className="bento__portrait-cap t-caption">Meja Miangola</span>
          </div>
        </motion.div>
      );
    }
    const project = projects[tile.project];
    return (
      <motion.div key={key} className={`bento__cell bento--${tile.size}`} {...cellMotion(i)}>
        <ProjectCard project={project} index={tile.project} variant="default" fill />
      </motion.div>
    );
  };

  return (
    <section className="bento" id="bento" aria-label="Project collection">
      <div className="container">
        <header className="bento__head">
          <motion.div
            className="bento__head-top"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="t-label">{tx({ en: 'The collection', fr: 'La collection' })}</span>
            <span className="bento__head-index t-mono">03</span>
          </motion.div>
          <motion.h2
            className="bento__title t-h2"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          >
            {tx(hero.title)}
          </motion.h2>
        </header>

        <div className="bento__grid">
          {tiles.map((tile, i) => renderTile(tile, `${tile.kind}-${i}`, i))}
        </div>
      </div>
    </section>
  );
}
