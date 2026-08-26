import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { contact, contactCopy } from '../../data/content';
import { Reveal } from '../Reveal/Reveal';
import './Contact.scss';

export function Contact() {
  const { tx } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio — message from ${form.name || 'a visitor'}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`,
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <section className="contact" id="contact">
      <div className="container contact__inner">
        <div className="contact__lead-col">
          <Reveal variant="fade" className="contact__label">
            <span className="t-label">{tx(contactCopy.label)}</span>
            <span className="contact__index t-mono">07</span>
          </Reveal>
          <Reveal variant="up" delay={0.08}>
            <h2 className="contact__title t-h1">{tx(contactCopy.title)}</h2>
          </Reveal>
          <Reveal variant="up" delay={0.16} className="contact__intro t-lead">
            <p>{tx(contactCopy.intro)}</p>
          </Reveal>

          <Reveal variant="up" delay={0.22} className="contact__social">
            <span className="t-label">{tx(contactCopy.follow)}</span>
            <a href={contact.instagram} target="_blank" rel="noreferrer" className="contact__social-link">
              Instagram
            </a>
            <a href={contact.spf} target="_blank" rel="noreferrer" className="contact__social-link">
              Street Photography France
            </a>
            <a href={`mailto:${contact.email}`} className="contact__social-link">
              {contact.email}
            </a>
          </Reveal>
        </div>

        <Reveal variant="up" delay={0.12} className="contact__form-col">
          <form className="contact__form" onSubmit={onSubmit}>
            <label className="contact__field">
              <span className="t-caption">{tx(contactCopy.name)}</span>
              <input
                type="text"
                value={form.name}
                onChange={set('name')}
                autoComplete="name"
                required
              />
            </label>
            <label className="contact__field">
              <span className="t-caption">{tx(contactCopy.email)}</span>
              <input
                type="email"
                value={form.email}
                onChange={set('email')}
                autoComplete="email"
                required
              />
            </label>
            <label className="contact__field">
              <span className="t-caption">{tx(contactCopy.message)}</span>
              <textarea rows={4} value={form.message} onChange={set('message')} required />
            </label>
            <button type="submit" className="contact__submit">
              <span>{tx(contactCopy.send)}</span>
              <span aria-hidden="true">→</span>
            </button>
            <p className="contact__note t-caption">{tx(contactCopy.note)}</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
