import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './NotFound.scss';

export function NotFound() {
  const { t } = useLanguage();

  return (
    <main className="notfound page-enter">
      <div className="container notfound__inner">
        <p className="notfound__code">404</p>
        <h1 className="notfound__title t-display">{t.notFound.title}</h1>
        <p className="notfound__text">{t.notFound.text}</p>
        <Link to="/" className="notfound__btn">
          {t.notFound.back}
        </Link>
      </div>
    </main>
  );
}
