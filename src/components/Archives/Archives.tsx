import { useLanguage } from '../../context/LanguageContext';
import { Reveal } from '../Reveal/Reveal';
import './Archives.scss';

export interface ArchiveItem {
  title: string;
  sub?: string;
  meta: string;
  link?: string;
}

interface ArchivesProps {
  eyebrow: string;
  title: string;
  items: ArchiveItem[];
}

export function Archives({ eyebrow, title, items }: ArchivesProps) {
  const { lang } = useLanguage();

  return (
    <section className="archives">
      <div className="container">
        <header className="archives__head">
          <span className="t-label">{eyebrow}</span>
          <h2 className="archives__title t-h3">{title}</h2>
        </header>

        <ul className="archives__list">
          {items.map((item, i) => {
            const inner = (
              <>
                <span className="archives__num t-mono">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="archives__title-col">
                  <span className="archives__item-title t-body">{item.title}</span>
                  {item.sub && <span className="archives__item-sub t-small">{item.sub}</span>}
                </span>
                <span className="archives__meta t-caption">{item.meta}</span>
                {item.link && <span className="archives__arrow" aria-hidden="true">→</span>}
              </>
            );
            return (
              <Reveal variant="up" key={i} delay={(i % 4) * 0.05} className="archives__item-wrap">
                {item.link ? (
                  <a
                    className="archives__item"
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    hrefLang={lang}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="archives__item">{inner}</div>
                )}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
