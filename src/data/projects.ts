import { seriesImages } from './seriesImages';

export interface Bilingual {
  en: string;
  fr: string;
}

export interface ProjectImage {
  src: string;
  caption?: Bilingual;
}

export interface Project {
  id: string;
  slug: string;
  order: number;
  title: Bilingual;
  category: Bilingual;
  year: string;
  location: string;
  description: Bilingual;
  mono?: boolean;
  cover: string;
  images: readonly string[];
}

const make = (
  id: string,
  slug: keyof typeof seriesImages,
  order: number,
  title: Bilingual,
  category: Bilingual,
  year: string,
  location: string,
  description: Bilingual,
  mono = false,
): Project => {
  const images = seriesImages[slug] ?? [];
  return {
    id,
    slug,
    order,
    title,
    category,
    year,
    location,
    description,
    mono,
    cover: images[0] ?? '',
    images,
  };
};

export const projects: Project[] = [
  make(
    'p-entre-noir',
    'entre-noir-et-blanc',
    1,
    { en: 'Between Black & White', fr: 'Entre Noir et Blanc' },
    { en: 'Black & white street', fr: 'Rue en noir et blanc' },
    '2015 — 2025',
    'Paris · Prague · Bordeaux',
    {
      en: 'The choice of black and white refocuses the eye on form, contrast and raw emotion. Each photograph seeks to reveal the fleeting instant, the unexpected, the human within the anonymous. The series invites a silent contemplation in which the mundane becomes visual language.',
      fr: "Le choix du noir et blanc recentre le regard sur les formes, les contrastes et les émotions brutes. Chaque photographie cherche à révéler l'instant fugace, l'inattendu, l'humain dans l'anonyme. La série invite à une contemplation silencieuse, où la banalité devient langage visuel.",
    },
    true,
  ),
  make(
    'p-chromatique',
    'instants-chromatiques',
    2,
    { en: 'Chromatic Instants', fr: 'Instants Chromatiques' },
    { en: 'Colour street', fr: 'Rue en couleur' },
    '2021 — 2025',
    'Paris · Bruxelles · Lyon',
    {
      en: 'Through this work, colour becomes a way to intensify reality, to make visible the emotions and contrasts of the urban environment. Hues draw the eye and tell of a mood, a meeting, a place.',
      fr: "À travers ce travail, la couleur devient un moyen d'intensifier la réalité, de rendre visibles les émotions et les contrastes de l'environnement urbain. Les teintes attirent l'œil et racontent une ambiance, une rencontre, un lieu.",
    },
  ),
  make(
    'p-lignes',
    'lignes-de-ville',
    3,
    { en: 'City Lines, Life Lines', fr: 'Lignes de Ville, Lignes de Vie' },
    { en: 'Architecture & urban', fr: 'Architecture & urbain' },
    '2023 — 2025',
    'Paris · Fabrègues',
    {
      en: "‘City Lines, Life Lines’ explores the interplay between architecture and urban everyday life. Through shadow, perspective and geometry, the series captures the rigour of structures and their dialogue with the people who inhabit them. Monumental staircases, endless corridors and stark contrasts reveal a city sculpted by light and alive with movement.",
      fr: "« Lignes de Ville, Lignes de Vie » explore l'interaction entre l'architecture et le quotidien urbain. Par un jeu d'ombres, de perspectives et de géométrie, cette série capture la rigueur des structures et leur dialogue avec les habitants. Escaliers monumentaux, couloirs infinis et contrastes marqués révèlent une ville sculptée par la lumière et habitée par le mouvement.",
    },
  ),
  make(
    'p-metro',
    'metro-boulot-photo',
    4,
    { en: 'Commute, Work, Photo', fr: 'Métro, Boulot, Photo' },
    { en: 'Transit diary', fr: 'Journal de transit' },
    '2022 — 2025',
    'Paris · Prague · Bruxelles',
    {
      en: '‘Commute, Work, Photo’ captures daily routine through the lens of public transport. The frames seize the suspended instants between two stations, where the everyday mingles with collective solitude. It is a visual exploration of the lives that cross each other daily in this space of passage.',
      fr: "« Métro, Boulot, Photo » capture la routine quotidienne à travers l'objectif des transports en commun. Les clichés saisissent les instants suspendus entre deux stations, où le quotidien se mêle à la solitude collective. C'est une exploration visuelle des vies qui se croisent au quotidien, dans ce lieu de passage.",
    },
  ),
  make(
    'p-double',
    'double-vision',
    5,
    { en: 'Double Vision', fr: 'Double Vision' },
    { en: 'Reflections', fr: 'Reflets' },
    '2024 — 2025',
    'Paris · Lorient',
    {
      en: '‘Double Vision’ plays with reflections to blur the frontier between real and illusion. Each photograph explores the duplication, symmetry or deformation of the world through water, glass or mirrors. These reflections reveal another reading of the everyday — blurrier, more sensitive.',
      fr: "« Double Vision » joue avec les reflets pour brouiller la frontière entre réel et illusion. Chaque photo explore la duplication, la symétrie ou la déformation du monde par l'eau, le verre ou les miroirs. Ces reflets révèlent une autre lecture du quotidien, plus floue, plus sensible.",
    },
  ),
  make(
    'p-fenetre',
    'une-histoire-de-fenetre',
    6,
    { en: 'A Window Story', fr: 'Une histoire de fenêtre' },
    { en: 'Interiors & thresholds', fr: 'Intérieurs & seuils' },
    '2024 — 2025',
    'Paris · Chevreuse',
    {
      en: '‘A Window Story’ explores that fragile threshold between inside and outside. Each photograph catches a gaze, a light, a reflection — so many fragments of life. Windows become frames, barriers or passages.',
      fr: "« Une histoire de fenêtre » explore ce fragile seuil entre l'intérieur et l'extérieur. Chaque photo capte un regard, une lumière, un reflet, comme autant de fragments de vie. Les fenêtres deviennent des cadres, des barrières ou des passages.",
    },
  ),
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const getAdjacent = (slug: string) => {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: undefined, next: undefined };
  const next = projects[(idx + 1) % projects.length];
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  return { prev, next };
};
