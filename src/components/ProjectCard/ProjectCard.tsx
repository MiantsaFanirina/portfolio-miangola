import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import type { Project } from '../../data/projects';
import { asset } from '../../utils/asset';
import { aspectFor } from '../../utils/imageMeta';
import './ProjectCard.scss';

const MotionLink = motion(Link);
const EASE = [0.16, 1, 0.3, 1] as const;

const cardVariants = {
  rest: { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
  inview: { opacity: 1, clipPath: 'inset(0% 0 0 0)' },
  hover: { opacity: 1, clipPath: 'inset(0% 0 0 0)' },
};

const imgVariants = {
  rest: { scale: 1.02 },
  inview: { scale: 1.02 },
  hover: { scale: 1.08 },
};

interface ProjectCardProps {
  project: Project;
  index?: number;
  variant?: 'default' | 'tall' | 'wide';
  fill?: boolean;
}

export function ProjectCard({ project, index = 0, variant = 'default', fill = false }: ProjectCardProps) {
  const { tx } = useLanguage();

  return (
    <MotionLink
      to={`/work/${project.slug}`}
      className={`pcard pcard--${variant}`}
      data-cursor="grow"
      aria-label={tx(project.title)}
      variants={cardVariants}
      initial="rest"
      animate="rest"
      whileInView="inview"
      whileHover="hover"
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div
        className="pcard__frame"
        style={fill ? undefined : { aspectRatio: String(aspectFor(project.cover, 'cover')) }}
      >
        <motion.img
          src={asset(project.cover)}
          alt={tx(project.title)}
          className="pcard__img"
          loading="lazy"
          decoding="async"
          variants={imgVariants}
          transition={{ duration: 0.7, ease: EASE }}
        />
        <span className="pcard__veil" aria-hidden="true" />
      </div>

      <div className="pcard__meta">
        <span className="pcard__num t-mono">{String(index + 1).padStart(2, '0')}</span>
        <div className="pcard__text">
          <h3 className="pcard__title t-h4">{tx(project.title)}</h3>
          <p className="pcard__cat t-caption">{tx(project.category)}</p>
        </div>
        <span className="pcard__year t-mono">{project.year}</span>
      </div>
    </MotionLink>
  );
}
