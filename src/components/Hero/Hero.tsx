import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { hero } from '../../data/content';
import { seriesImages } from '../../data/seriesImages';
import { asset } from '../../utils/asset';
import { useParallaxY } from '../../hooks/useParallaxY';
import { scrollToId } from '../../utils/scroll';
import { cssVars } from '../../utils/cssVars';
import './Hero.scss';

const heroBg = seriesImages['instants-chromatiques'][6];
const fillImage = seriesImages['entre-noir-et-blanc'][2];

export function Hero() {
  const { tx } = useLanguage();
  const { ref: heroMediaRef, y } = useParallaxY<HTMLDivElement>(0.16);

  return (
    <section className="hero" id="top">
      <motion.div ref={heroMediaRef} className="hero__media" style={{ y }}>
        <img
          src={asset(heroBg)}
          alt=""
          className="hero__img"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>

      <div className="hero__scrim" aria-hidden="true" />

      <span
        className="hero__fill"
        aria-hidden="true"
        style={{ backgroundImage: `url(${asset(fillImage)})` }}
      >
        RUE
      </span>

      <div className="hero__content container">
        <p className="hero__eyebrow t-label reveal reveal--up is-inview">
          {tx(hero.eyebrow)}
        </p>

        <h1 className="hero__title t-display">
          <span className="hero__title-line reveal reveal--up is-inview" style={cssVars({ '--reveal-delay': '0.1s' })}>
            {tx(hero.title)}
          </span>
        </h1>

        <p
          className="hero__subtitle t-lead reveal reveal--up is-inview"
          style={cssVars({ '--reveal-delay': '0.28s' })}
        >
          {tx(hero.subtitle)}
        </p>

        <button
          type="button"
          className="hero__scroll reveal reveal--up is-inview"
          style={cssVars({ '--reveal-delay': '0.42s' })}
          onClick={() => scrollToId('statement')}
        >
          <span className="hero__scroll-line" />
          <span className="t-mono">Scroll</span>
        </button>
      </div>
    </section>
  );
}
