import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { brand, contact } from '../../data/content';
import { asset } from '../../utils/asset';
import { scrollToId } from '../../utils/scroll';
import './Footer.scss';

export function Footer() {
  const { t, tx } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src={asset(brand.logoWhite)} alt="Meja Miangola" className="footer__logo" />
          <p className="footer__tag t-small">{tx({
            en: 'Street · Documentary · Urban photography',
            fr: 'Photographie de rue · documentaire · urbaine',
          })}</p>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <span className="footer__col-title t-label">{t.footer.navTitle}</span>
          <Link to="/" className="footer__link">— {t.common.selectedWork}</Link>
          <Link to="/about" className="footer__link">— {t.nav.about}</Link>
          <a href="/#services" className="footer__link" onClick={(e) => { e.preventDefault(); scrollToId('services'); }}>— {t.nav.services}</a>
          <a href="/#contact" className="footer__link" onClick={(e) => { e.preventDefault(); scrollToId('contact'); }}>— {t.nav.contact}</a>
        </nav>

        <div className="footer__contact">
          <span className="footer__col-title t-label">{t.footer.contactTitle}</span>
          <a href={`mailto:${contact.email}`} className="footer__link">— {contact.email}</a>
          <a href={contact.instagram} target="_blank" rel="noreferrer" className="footer__link">— Instagram</a>
          <a href={contact.spf} target="_blank" rel="noreferrer" className="footer__link">— Street Photography France</a>
        </div>

        <button type="button" className="footer__top" onClick={() => scrollToId('top')}>
          {t.footer.backToTop}
          <span aria-hidden="true">↑</span>
        </button>
      </div>

      <div className="container footer__base">
        <span className="t-caption">© {year} Meja Miangola. {t.footer.rights}</span>
        <span className="t-caption">{t.footer.builtWith}</span>
      </div>
    </footer>
  );
}
