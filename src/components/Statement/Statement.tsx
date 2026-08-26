import { useLanguage } from '../../context/LanguageContext';
import { statement } from '../../data/content';
import { Reveal } from '../Reveal/Reveal';
import './Statement.scss';

export function Statement() {
  const { t, tx } = useLanguage();

  return (
    <section className="statement" id="statement">
      <div className="container statement__inner">
        <Reveal variant="fade" className="statement__label">
          <span className="t-label">{tx(statement.label)}</span>
          <span className="statement__index t-mono">01</span>
        </Reveal>

        <Reveal variant="up" className="statement__lines reveal-group">
          {statement.lines.map((line, i) => (
            <p key={i} className="statement__line t-h3">
              {tx(line)}
            </p>
          ))}
        </Reveal>

        <p className="statement__meta t-caption">{t.footer.builtWith}</p>
      </div>
    </section>
  );
}
