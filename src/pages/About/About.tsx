import { useLanguage } from '../../context/LanguageContext';
import { about, brand, publications, competitions, exhibitions } from '../../data/content';
import { asset } from '../../utils/asset';
import { Reveal } from '../../components/Reveal/Reveal';
import { Parallax } from '../../components/Parallax/Parallax';
import { Services } from '../../components/Services/Services';
import { Contact } from '../../components/Contact/Contact';
import { Archives, type ArchiveItem } from '../../components/Archives/Archives';
import './About.scss';

export function AboutPage() {
  const { tx } = useLanguage();

  const pubItems: ArchiveItem[] = publications.map((p) => ({
    title: p.title,
    sub: p.detail,
    meta: p.year,
    link: p.link,
    images: p.images,
  }));

  const compItems: ArchiveItem[] = competitions.map((c) => ({
    title: c.title,
    sub: c.detail,
    meta: c.year,
    link: c.link,
    images: c.images,
  }));

  const expItems: ArchiveItem[] = exhibitions.map((e) => ({
    title: e.title,
    sub: e.detail,
    meta: `${e.place} · ${e.date}`,
    link: e.link,
    images: e.images,
  }));

  return (
    <main className="page-enter aboutpage">
      <header className="aboutpage__hero container">
        <Reveal variant="fade" className="aboutpage__hero-top">
          <span className="t-label">{tx(about.label)}</span>
          <span className="aboutpage__hero-index t-mono">A</span>
        </Reveal>
        <Reveal variant="up" delay={0.08}>
          <h1 className="aboutpage__title t-display">{tx(about.title)}</h1>
        </Reveal>
        <Reveal variant="up" delay={0.16} className="aboutpage__lead t-lead">
          <p>{tx(about.lead)}</p>
        </Reveal>
      </header>

      <section className="aboutpage__bio container">
        <Reveal variant="clip" className="aboutpage__media">
          <Parallax speed={0.1} className="aboutpage__media-inner">
            <img
              src={asset(brand.portrait)}
              alt={tx(about.portraitCaption)}
              className="aboutpage__img"
              loading="lazy"
              decoding="async"
            />
          </Parallax>
          <span className="aboutpage__cap t-caption">{tx(about.portraitCaption)}</span>
        </Reveal>

        <div className="aboutpage__text">
          <Reveal variant="up" className="aboutpage__paragraphs">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="t-body">
                {tx(p)}
              </p>
            ))}
          </Reveal>

          <Reveal variant="up" delay={0.1} className="aboutpage__facts">
            {about.facts.map((f) => (
              <div key={f.year} className="aboutpage__fact">
                <span className="aboutpage__fact-year t-mono">{f.year}</span>
                <span className="aboutpage__fact-text t-small">{tx(f.text)}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <Services />
      <Archives
        eyebrow={tx({ en: 'Selected publications', fr: 'Publications sélectionnées' })}
        title={tx({ en: 'In print', fr: 'Dans les livres' })}
        items={pubItems}
      />
      <Archives
        eyebrow={tx({ en: 'Recognition', fr: 'Distinctions' })}
        title={tx({ en: 'Competitions', fr: 'Concours' })}
        items={compItems}
      />
      <Archives
        eyebrow={tx({ en: 'On the walls', fr: 'Sur les murs' })}
        title={tx({ en: 'Exhibitions', fr: 'Expositions' })}
        items={expItems}
      />
      <Contact />
    </main>
  );
}
