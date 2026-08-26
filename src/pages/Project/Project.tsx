import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { getAdjacent, getProject, projects } from '../../data/projects';
import { asset } from '../../utils/asset';
import { orientationOf } from '../../utils/imageMeta';
import { useParallaxY } from '../../hooks/useParallaxY';
import { ProjectGallery } from '../../components/ProjectGallery/ProjectGallery';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { Reveal } from '../../components/Reveal/Reveal';
import { Lightbox } from '../../components/Lightbox/Lightbox';
import './Project.scss';

export function Project() {
  const { slug = '' } = useParams();
  const { t, tx } = useLanguage();
  const project = getProject(slug);
  const { ref: heroRef, y: heroY } = useParallaxY<HTMLDivElement>(0.18);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!project) {
    return (
      <main className="project project--missing container">
        <h1 className="t-h1">404</h1>
        <Link to="/" className="project__back">
          {t.common.backToWork}
        </Link>
      </main>
    );
  }

  const { prev, next } = getAdjacent(slug);
  const [lightbox, setLightbox] = useState<{ src: string; alt?: string } | null>(null);
  const related = projects.filter((p) => p.slug !== slug).slice(0, 3);
  // Landscape photos lead as the wide tile; the rest are half-width.
  const relatedSorted = [...related].sort(
    (a, b) => (orientationOf(a.cover) === 'landscape' ? 0 : 1) - (orientationOf(b.cover) === 'landscape' ? 0 : 1),
  );

  return (
    <main className="project page-enter" key={slug}>
      <section className="project__hero">
        <motion.div ref={heroRef} className="project__hero-media" style={{ y: heroY }}>
          <img
            src={asset(project.cover)}
            alt={tx(project.title)}
            className="project__hero-img"
            fetchPriority="high"
            decoding="sync"
            role="button"
            tabIndex={0}
            onClick={() => setLightbox({ src: project.cover, alt: tx(project.title) })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setLightbox({ src: project.cover, alt: tx(project.title) });
              }
            }}
          />
        </motion.div>
        <div className="project__hero-scrim" aria-hidden="true" />
        <div className="project__hero-content container">
          <span className="project__hero-cat t-label">{tx(project.category)}</span>
          <h1 className="project__hero-title t-display">{tx(project.title)}</h1>
        </div>
      </section>

      <section className="project__intro container">
        <Reveal variant="fade" className="project__meta">
          <div className="project__meta-item">
            <span className="t-label">{t.meta.year}</span>
            <span className="project__meta-val t-body">{project.year}</span>
          </div>
          <div className="project__meta-item">
            <span className="t-label">{t.meta.location}</span>
            <span className="project__meta-val t-body">{project.location}</span>
          </div>
          <div className="project__meta-item">
            <span className="t-label">{t.meta.category}</span>
            <span className="project__meta-val t-body">{tx(project.category)}</span>
          </div>
        </Reveal>

        <Reveal variant="up" delay={0.1} className="project__statement">
          <span className="t-label">{t.project.about}</span>
          <p className="project__desc t-lead">{tx(project.description)}</p>
        </Reveal>
      </section>

      <section className="project__gallery">
        <ProjectGallery
          images={project.images}
          mono={project.mono}
          onImageClick={(src) => setLightbox({ src, alt: tx(project.title) })}
        />
      </section>

      <section className="project__related container">
        <Reveal variant="fade" className="project__related-head">
          <span className="t-label">{t.common.related}</span>
          <Link to="/#work" className="project__related-all">
            {t.common.allWork} <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
        <div className="bento__grid">
          {relatedSorted.map((p, i) => (
            <div
              key={p.id}
              className={`bento__cell ${i === 0 ? 'bento--wide' : 'bento--small'}`}
            >
              <ProjectCard project={p} index={i} variant="default" fill />
            </div>
          ))}
        </div>
      </section>

      <nav className="project__nav container" aria-label="Project navigation">
        {prev && (
          <Link to={`/work/${prev.slug}`} className="project__nav-link project__nav-link--prev">
            <span className="t-label">{t.common.previous}</span>
            <span className="project__nav-title t-h3">{tx(prev.title)}</span>
          </Link>
        )}
        {next && (
          <Link
            to={`/work/${next.slug}`}
            className="project__nav-link project__nav-link--next"
          >
            <span className="t-label">{t.common.next}</span>
            <span className="project__nav-title t-h3">{tx(next.title)}</span>
          </Link>
        )}
      </nav>

      <Lightbox
        src={lightbox?.src ?? null}
        alt={lightbox?.alt}
        onClose={() => setLightbox(null)}
      />
    </main>
  );
}
