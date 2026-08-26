import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { brand } from '../../data/content';
import { asset } from '../../utils/asset';
import { handleHashNavigation } from '../../utils/scroll';
import './Navigation.scss';

const LINKS = [
  { id: 'work', kind: 'hash' as const },
  { id: 'about', kind: 'route' as const },
  { id: 'services', kind: 'hash' as const },
  { id: 'contact', kind: 'hash' as const },
];

export function Navigation() {
  const { t, lang, toggle } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const labelFor = (id: string) => (t.nav as Record<string, string>)[id] ?? id;

  const close = () => setOpen(false);

  const onLink = (e: React.MouseEvent, link: (typeof LINKS)[number]) => {
    if (link.kind === 'hash') {
      e.preventDefault();
      handleHashNavigation(link.id, navigate, location);
    }
    close();
  };

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__inner container">
        <Link to="/" className="nav__brand" aria-label="Meja Miangola — home">
          <img src={asset(brand.logoWhite)} alt="Meja Miangola" className="nav__logo" />
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((link) =>
            link.kind === 'route' ? (
              <Link key={link.id} to="/about" className="nav__link" onClick={close}>
                {labelFor(link.id)}
              </Link>
            ) : (
              <a
                key={link.id}
                href={`/#${link.id}`}
                className="nav__link"
                onClick={(e) => onLink(e, link)}
              >
                {labelFor(link.id)}
              </a>
            ),
          )}
        </nav>

        <div className="nav__tools">
          <button
            type="button"
            className="nav__lang"
            onClick={toggle}
            aria-label={t.lang.label}
          >
            <span className={lang === 'fr' ? 'is-active' : ''}>FR</span>
            <span className="nav__lang-sep">/</span>
            <span className={lang === 'en' ? 'is-active' : ''}>EN</span>
          </button>

          <button
            type="button"
            className="nav__burger"
            aria-expanded={open}
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="nav__sheet" aria-hidden={!open}>
        {LINKS.map((link) =>
          link.kind === 'route' ? (
            <Link key={link.id} to="/about" className="nav__sheet-link" onClick={close}>
              {labelFor(link.id)}
            </Link>
          ) : (
            <a
              key={link.id}
              href={`/#${link.id}`}
              className="nav__sheet-link"
              onClick={(e) => onLink(e, link)}
            >
              {labelFor(link.id)}
            </a>
          ),
        )}
      </div>
    </header>
  );
}
