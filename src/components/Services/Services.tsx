import { useLanguage } from '../../context/LanguageContext';
import { services } from '../../data/content';
import { Reveal } from '../Reveal/Reveal';
import './Services.scss';

export function Services() {
  const { tx } = useLanguage();

  return (
    <section className="services" id="services">
      <div className="container">
        <header className="services__head">
          <Reveal variant="fade" className="services__head-top">
            <span className="t-label">{tx(services.label)}</span>
            <span className="services__index t-mono">06</span>
          </Reveal>
          <Reveal variant="up" delay={0.08}>
            <h2 className="services__title t-h2">{tx(services.title)}</h2>
          </Reveal>
          <Reveal variant="up" delay={0.16} className="services__intro t-lead">
            <p>{tx(services.intro)}</p>
          </Reveal>
        </header>

        <Reveal variant="up" className="services__grid reveal-group">
          {services.items.map((item, i) => (
            <article key={i} className="services__item">
              <span className="services__num t-mono">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="services__item-title t-h4">{tx(item.title)}</h3>
              <p className="services__item-text t-small">{tx(item.text)}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
