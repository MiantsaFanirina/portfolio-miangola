import { useLanguage } from '../../context/LanguageContext';
import { editorial } from '../../data/content';
import { seriesImages } from '../../data/seriesImages';
import { asset } from '../../utils/asset';
import { Reveal } from '../Reveal/Reveal';
import { Parallax } from '../Parallax/Parallax';
import './Editorial.scss';

const editorialImg = seriesImages['double-vision'][7];

export function Editorial() {
  const { tx } = useLanguage();

  return (
    <section className="editorial" id="editorial">
      <div className="container editorial__inner">
        <Reveal variant="fade" className="editorial__label">
          <span className="t-label">{tx(editorial.label)}</span>
          <span className="editorial__index t-mono">04</span>
        </Reveal>

        <div className="editorial__grid">
          <div className="editorial__text">
            <Reveal variant="up">
              <h2 className="editorial__title t-h2">{tx(editorial.title)}</h2>
            </Reveal>
            <Reveal variant="up" delay={0.1} className="editorial__lead t-lead">
              <p>{tx(editorial.lead)}</p>
            </Reveal>
            <Reveal variant="up" delay={0.18} className="editorial__body">
              {editorial.paragraphs.map((p, i) => (
                <p key={i} className="t-body">
                  {tx(p)}
                </p>
              ))}
            </Reveal>
          </div>

          <Reveal variant="clip" className="editorial__media">
            <Parallax speed={0.1} className="editorial__media-inner">
              <img
                src={asset(editorialImg)}
                alt={tx(editorial.title)}
                className="editorial__img"
                loading="lazy"
                decoding="async"
              />
            </Parallax>
          </Reveal>
        </div>

        <Reveal variant="up" className="editorial__quote">
          <blockquote className="t-h2">“{tx(editorial.pullquote)}”</blockquote>
        </Reveal>
      </div>
    </section>
  );
}
