import { useLanguage } from '../../context/LanguageContext';
import { about, brand } from '../../data/content';
import { asset } from '../../utils/asset';
import { Reveal } from '../Reveal/Reveal';
import { Parallax } from '../Parallax/Parallax';
import './About.scss';

export function About() {
  const { t, tx } = useLanguage();

  return (
    <section className="about" id="about">
      <div className="container about__inner">
        <Reveal variant="clip" className="about__media">
          <Parallax speed={0.06} className="about__media-inner">
            <img
              src={asset(brand.portrait)}
              alt={tx(about.portraitCaption)}
              className="about__img"
              loading="lazy"
              decoding="async"
            />
          </Parallax>
          <span className="about__cap t-caption">{tx(about.portraitCaption)}</span>
        </Reveal>

        <div className="about__text">
          <Reveal variant="fade" className="about__label">
            <span className="t-label">{tx(about.label)}</span>
            <span className="about__index t-mono">05</span>
          </Reveal>

          <Reveal variant="up" delay={0.06}>
            <h2 className="about__title t-h1">{tx(about.title)}</h2>
          </Reveal>

          <Reveal variant="up" delay={0.14} className="about__lead t-lead">
            <p>{tx(about.lead)}</p>
          </Reveal>

          <Reveal variant="up" delay={0.2} className="about__body">
            {about.paragraphs.slice(0, 2).map((p, i) => (
              <p key={i} className="t-body">
                {tx(p)}
              </p>
            ))}
          </Reveal>

          <Reveal variant="up" delay={0.26} className="about__facts">
            {about.facts.map((f) => (
              <div key={f.year} className="about__fact">
                <span className="about__fact-year t-mono">{f.year}</span>
                <span className="about__fact-text t-small">{tx(f.text)}</span>
              </div>
            ))}
          </Reveal>

          <Reveal variant="fade" delay={0.3}>
            <a href="/about" className="about__more">
              {t.nav.about}
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
