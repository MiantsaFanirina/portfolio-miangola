import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { brand } from '../../data/content';
import { asset } from '../../utils/asset';
import { handleHashNavigation } from '../../utils/scroll';
import './Navigation.scss';

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <line x1="12" y1="2.5" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="21.5" />
        <line x1="2.5" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="21.5" y2="12" />
        <line x1="5" y1="5" x2="6.8" y2="6.8" />
        <line x1="17.2" y1="17.2" x2="19" y2="19" />
        <line x1="19" y1="5" x2="17.2" y2="6.8" />
        <line x1="6.8" y1="17.2" x2="5" y2="19" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}


const LINKS = [
  { id: 'work', kind: 'hash' as const },
  { id: 'about', kind: 'route' as const },
  { id: 'services', kind: 'hash' as const },
  { id: 'contact', kind: 'hash' as const },
];

export function Navigation() {
  const { t, lang, toggle } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasHero, setHasHero] = useState(false);

  const heroThreshold = () => {
    const hero = document.querySelector('.hero, .project__hero');
    return hero ? hero.getBoundingClientRect().height - 80 : 40;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > heroThreshold());
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setHasHero(!!document.querySelector('.hero, .project__hero'));
      setScrolled(window.scrollY > heroThreshold());
    });
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);

  const labelFor = (id: string) => (t.nav as Record<string, string>)[id] ?? id;

  const close = () => setOpen(false);

  const onLink = (e: React.MouseEvent, link: (typeof LINKS)[number]) => {
    if (link.kind === 'hash') {
      e.preventDefault();
      handleHashNavigation(link.id, navigate, location);
    }
    close();
  };

  const overHeroLight = theme === 'light' && hasHero && !scrolled;

  return (
    <header
      className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''} ${
        overHeroLight ? 'nav--hero-light' : ''
      }`}
    >
      <div className="nav__inner container">
        <Link to="/" className="nav__brand" aria-label="Meja Miangola — home">
          <img
            src={asset(theme === 'light' && scrolled ? brand.logoBlack : brand.logoWhite)}
            alt="Meja Miangola"
            className="nav__logo"
          />
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
            className="nav__theme"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.theme.toLight : t.theme.toDark}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

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
