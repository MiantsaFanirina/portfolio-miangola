import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { projects } from '../../data/projects';
import { Reveal } from '../Reveal/Reveal';
import { Parallax } from '../Parallax/Parallax';
import { asset } from '../../utils/asset';
import { hero } from '../../data/content';
import { aspectFor } from '../../utils/imageMeta';
import './SelectedWork.scss';

export function SelectedWork() {
  const { t, tx } = useLanguage();

  return (
    <section className="work" id="work">
      <div className="container">
        <header className="work__head">
          <Reveal variant="fade" className="work__head-top">
            <span className="t-label">{t.common.selectedWork}</span>
            <span className="work__head-index t-mono">02</span>
          </Reveal>
          <Reveal variant="up" delay={0.08}>
            <h2 className="work__title t-h2">{tx(hero.title)}</h2>
          </Reveal>
          <Reveal variant="up" delay={0.16} className="work__intro t-lead">
            <p>{tx({
              en: 'Six series, one restless eye. Each project is a world to step into.',
              fr: 'Six séries, un regard en alerte. Chaque projet est un monde à traverser.',
            })}</p>
          </Reveal>
        </header>

        <ul className="work__list">
          {projects.map((project, i) => (
            <li key={project.id} className={`work__row ${i % 2 ? 'work__row--rev' : ''}`}>
              <Reveal variant="clip" className="work__media" delay={(i % 2) * 0.05}>
                <Parallax speed={0.06} className="work__media-inner">
                  <img
                    src={asset(project.cover)}
                    alt={tx(project.title)}
                    className="work__img"
                    style={{ aspectRatio: String(aspectFor(project.cover, 'cover')) }}
                    loading="lazy"
                    decoding="async"
                  />
                </Parallax>
                <span className="work__row-num t-display" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </Reveal>

              <Reveal variant="up" delay={0.12} className="work__info">
                <span className="work__cat t-label">{tx(project.category)}</span>
                <h3 className="work__name t-h1">
                  <Link to={`/work/${project.slug}`} data-cursor="grow">
                    {tx(project.title)}
                  </Link>
                </h3>
                <p className="work__desc t-body">{tx(project.description)}</p>
                <div className="work__foot">
                  <span className="t-mono work__year">{project.year}</span>
                  <Link to={`/work/${project.slug}`} className="work__cta">
                    <span>{t.common.viewProject}</span>
                    <span className="work__cta-arrow" aria-hidden="true">→</span>
                  </Link>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
