import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { seriesImages } from '../../data/seriesImages';
import { asset } from '../../utils/asset';
import { useParallaxY } from '../../hooks/useParallaxY';
import { Reveal } from '../Reveal/Reveal';
import './Immersive.scss';

const immersive = seriesImages['metro-boulot-photo'][16];

export function Immersive() {
  const { tx } = useLanguage();
  const { ref: immersiveRef, y } = useParallaxY<HTMLDivElement>(0.2);

  return (
    <section className="immersive" aria-label="Immersive photograph">
      <motion.div ref={immersiveRef} className="immersive__media" style={{ y }}>
        <img
          src={asset(immersive)}
          alt="Paris – La Défense transit"
          className="immersive__img"
          loading="lazy"
          decoding="async"
        />
      </motion.div>

      <div className="immersive__overlay container">
        <Reveal variant="up" className="immersive__caption">
          <span className="t-label">Métro, Boulot, Photo</span>
          <p className="immersive__quote t-h3">
            {tx({
              en: 'The suspended instant between two stations.',
              fr: 'L’instant suspendu entre deux stations.',
            })}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
