import type { Bilingual } from './projects';

// Brand assets (kept in public/assets)
export const brand = {
  logoWhite: '/assets/2- Logo/Logo blanc.png',
  logoBlack: '/assets/2- Logo/Logo noir.png',
  portrait: '/assets/3- Portrait/Portrait.jpg',
};

export const contact = {
  email: 'mejamiangola@gmail.com',
  instagram: 'https://www.instagram.com/meja_et_mathieu',
  spf: 'https://streetphotographyfrance.fr/meja-mathieu/',
};

// Hero
export const hero: { eyebrow: Bilingual; title: Bilingual; subtitle: Bilingual } = {
  eyebrow: { en: 'Street · Documentary · Urban', fr: 'Rue · Documentaire · Urbain' },
  title: { en: 'Meja Miangola', fr: 'Meja Miangola' },
  subtitle: {
    en: 'A space of freedom, framed between two stations and the light of the everyday.',
    fr: "Un espace de liberté, capté entre deux stations et la lumière du quotidien.",
  },
};

// Photographer statement (home section)
export const statement: { label: Bilingual; lines: Bilingual[] } = {
  label: { en: 'Statement', fr: 'Manifeste' },
  lines: [
    {
      en: 'I photograph the ordinary until it becomes extraordinary.',
      fr: 'Je photographie l’ordinaire jusqu’à ce qu’il devienne extraordinaire.',
    },
    {
      en: 'Film or phone, black or colour — the street is the studio.',
      fr: 'Pellicule ou téléphone, noir ou couleur — la rue est le studio.',
    },
    {
      en: 'A gaze held a fraction of a second longer than chance.',
      fr: 'Un regard retenu une fraction de seconde de plus que le hasard.',
    },
  ],
};

// Editorial / story section
export const editorial: {
  label: Bilingual;
  title: Bilingual;
  lead: Bilingual;
  paragraphs: Bilingual[];
  pullquote: Bilingual;
} = {
  label: { en: 'The Practice', fr: 'La Pratique' },
  title: { en: 'On film and on the phone', fr: 'À l’argentique et au téléphone' },
  lead: {
    en: 'The paradox between film and phone street photography fascinates me.',
    fr: 'Le paradoxe entre la photographie de rue à l’argentique et au téléphone me fascine.',
  },
  paragraphs: [
    {
      en: 'With film, every frame becomes a moment of reflection — an imposed slowness in which I must be more deliberate and choose each image with care. The grain and texture of the emulsion bring an authenticity I particularly treasure.',
      fr: "Avec l'argentique, chaque prise de vue devient un moment de réflexion, une sorte de lenteur imposée où je me dois d'être plus minutieuse et de choisir chaque image avec soin. Le grain et la texture de la pellicule apportent une authenticité que j'apprécie particulièrement.",
    },
    {
      en: 'The phone, on the other hand, lets me capture spontaneous moments instantly without drawing attention, and its ease is a real advantage. Each approach has its merits: the craft of film against the speed of the phone.',
      fr: "Le téléphone, en revanche, me permet de capturer instantanément des moments spontanés sans attirer l'attention, et la facilité d'utilisation est un vrai atout. Chacune de ces approches a ses avantages : l'authenticité et le côté artisanal de l'argentique, contre la rapidité et la commodité du téléphone.",
    },
  ],
  pullquote: {
    en: 'Street photography became, for me, a genuine space of freedom.',
    fr: 'La photographie de rue est devenue pour moi un véritable espace de liberté.',
  },
};

// About page
export const about: {
  label: Bilingual;
  title: Bilingual;
  lead: Bilingual;
  paragraphs: Bilingual[];
  portraitCaption: Bilingual;
  facts: { year: string; text: Bilingual }[];
} = {
  label: { en: 'About', fr: 'À propos' },
  title: { en: 'Meja Miangola', fr: 'Meja Miangola' },
  lead: {
    en: 'Street photographer based between Paris and the world — film and phone, always in motion.',
    fr: 'Photographe de rue, entre Paris et le monde — argentique et téléphone, toujours en mouvement.',
  },
  paragraphs: [
    {
      en: 'My name is Meja Miangola and I practice street photography, on film as well as on my phone. Self-taught at first, I later earned a photography diploma in 2018 after studying at an art school in Paris. Since then, street photography has become a genuine space of freedom for me — a place to nurture my passion beyond professional constraints.',
      fr: "Je m'appelle Meja Miangola et je pratique la photographie de rue, à l'argentique comme au téléphone. Autodidacte à mes débuts, j'ai ensuite obtenu un diplôme de photographie en 2018, à l'issue de mes études dans une école d'art à Paris. Depuis, la photographie de rue est devenue pour moi un véritable espace de liberté, où je cultive ma passion en dehors des contraintes professionnelles.",
    },
    {
      en: 'In 2024 I joined Street Photography France, and in 2026 the Street Is A Woman collective. The diversity of styles and approaches within these communities has fed my creativity and pushed me past my own artistic limits.',
      fr: "En 2024, j'ai rejoint Street Photography France, puis en 2026 le collectif Street Is A Woman. La diversité des styles et des approches au sein de ces communautés a nourri ma créativité et m'a poussée à dépasser mes propres limites artistiques.",
    },
    {
      en: 'I like to seek out beauty in the everyday scenes that often escape other people’s attention. In the street I find moments charged with meaning — gestures, expressions, human interactions that, seen from another angle, become fascinating. Through my eye I try to reveal what may seem ordinary, yet holds its own beauty.',
      fr: "J'aime explorer la beauté dans les scènes de la vie quotidienne qui échappent souvent à l'attention des autres. Dans la rue, je trouve des moments riches en significations, des gestes, des expressions ou des interactions humaines qui, sous un autre angle, deviennent fascinants. C'est à travers mon regard que je cherche à révéler ce qui peut sembler banal, mais qui a sa propre beauté.",
    },
  ],
  portraitCaption: {
    en: 'Self-portrait, Paris',
    fr: 'Autoportrait, Paris',
  },
  facts: [
    { year: '2018', text: { en: 'Photography diploma, art school · Paris', fr: 'Diplôme de photographie, école d’art · Paris' } },
    { year: '2024', text: { en: 'Joins Street Photography France', fr: 'Rejoint Street Photography France' } },
    { year: '2025', text: { en: 'Group shows across France', fr: 'Expositions collectives en France' } },
    { year: '2026', text: { en: 'Joins Street Is A Woman collective', fr: 'Rejoint le collectif Street Is A Woman' } },
  ],
};

// Services
export const services: {
  label: Bilingual;
  title: Bilingual;
  intro: Bilingual;
  items: { title: Bilingual; text: Bilingual }[];
} = {
  label: { en: 'Services', fr: 'Prestations' },
  title: { en: 'Working together', fr: 'Travailler ensemble' },
  intro: {
    en: 'Beyond the street, I collaborate with magazines, brands and institutions on image-driven stories.',
    fr: 'Au-delà de la rue, je collabore avec des magazines, des marques et des institutions sur des récits portés par l’image.',
  },
  items: [
    {
      title: { en: 'Editorial & Reportage', fr: 'Éditorial & Reportage' },
      text: {
        en: 'Documentary series and photo essays for print and digital publications.',
        fr: 'Séries documentaires et récits photographiques pour la presse et le web.',
      },
    },
    {
      title: { en: 'Prints & Collections', fr: 'Tirages & Collections' },
      text: {
        en: 'Fine-art prints from the series, produced in limited editions.',
        fr: 'Tirages d’art des séries, édités en séries limitées.',
      },
    },
    {
      title: { en: 'Street Workshops', fr: 'Ateliers de rue' },
      text: {
        en: 'Guided walks to build a personal, confident street eye.',
        fr: 'Sorties guidées pour construire un regard de rue personnel et confiant.',
      },
    },
    {
      title: { en: 'Collaborations', fr: 'Collaborations' },
      text: {
        en: 'Commissions for brands, festivals and cultural institutions.',
        fr: 'Commandes pour marques, festivals et institutions culturelles.',
      },
    },
  ],
};

// Publications
export const publications: { title: string; detail: string; year: string; link?: string }[] = [
  { title: 'CosMag n°2', detail: 'mai 2021', year: '2021', link: 'https://www.facebook.com/portfoliomm/posts/pfbid02pgEu4ovGsQ79DTsReVLhT2bswh3Q1H5VjQCc3tYu59Gug3W2cgHqBzdzeqhRZdral' },
  { title: 'Street Photography France n°04', detail: 'avril 2024', year: '2024', link: 'https://streetphotographyfrance.fr/boutique/street-photography-france-no-4/' },
  { title: 'Street Photography Women', detail: 'mars 2025', year: '2025', link: 'https://streetphotographyfrance.fr/boutique/street-photography-france-women-edition-speciale/' },
  { title: 'À livres ouverts : lecteurs multiples, un seul monde…', detail: 'juillet 2025', year: '2025', link: 'https://nouveautes-editeurs.bnf.fr/accueil?id_declaration=10000001201496&utitre_livre=A_livres_ouverts' },
  { title: 'La France en rue — Le livre du Salon de Soissons', detail: 'novembre 2025', year: '2025', link: 'https://streetphotographyfrance.fr/boutique/la-france-en-rue-le-livre-du-salon-de-soissons/' },
  { title: 'Street Photography France Tome I', detail: 'décembre 2025', year: '2025', link: 'https://streetphotographyfrance.fr/boutique/street-photography-france-tome-i/' },
  { title: 'Sur un air de photographies, musiques et musiciens', detail: 'décembre 2025', year: '2025', link: 'https://nouveautes-editeurs.bnf.fr/accueil?id_declaration=10000001263688&titre_livre=Sur_un_air_de_photographies_musiques_et_musiciens' },
];

// Competitions
export const competitions: { title: string; detail: string; year: string; link: string }[] = [
  { title: 'Vos rues en noir et blanc', detail: 'Selected on streetphotographyfrance.fr', year: '2024', link: 'https://streetphotographyfrance.fr/resultat-du-concours-vos-rues-en-noir-et-blanc/' },
  { title: 'Reading the Streets', detail: 'Selected by Mustafa Seven', year: '2025', link: 'https://streetphotographyfrance.fr/resultats-du-concours-reading-the-streets/' },
];

// Exhibitions
export const exhibitions: { title: string; detail: string; place: string; date: string; link?: string }[] = [
  { title: 'Rencontres Photographiques du 10e', detail: '“Que sont devenus les enfants fans d’Harry Potter…”', place: 'Bibliothèque François Villon · Paris', date: '2017', link: 'https://lachasseinfo.wordpress.com/2017/08/02/meja-miangola-razafimandimby-une-etoile-montante-de-la-photographie-malagasy/' },
  { title: 'Lumos!', detail: 'Cosplay series', place: 'IKM Antsahavola · Madagascar', date: '2019', link: 'https://midi-madagasikara.mg/exposition-pluridisciplinaire-lumiere-sur-les-potterheads/' },
  { title: 'La Quinzaine des Photographes', detail: 'Group show — reading', place: 'Aubusson · France', date: '2025', link: 'https://lesfilmsdelacaillasse.com/la-quinzaine/' },
  { title: 'Paris on film', detail: 'Film group show', place: 'Sunbath Film-Lab · Paris', date: '2025', link: 'https://www.instagram.com/p/DOQO1BUDNg6/' },
  { title: 'Festival de la Photo Urbaine', detail: '“Lignes de Ville, Lignes de Vie”', place: 'Fabrègues · France', date: '2025', link: 'https://www.festival-photo-urbaine.fr/edition-2025/meja-miangola/' },
  { title: 'Body', detail: '“Mettre en lumière”', place: 'Galerie Kiff & Marais · Paris', date: '2025', link: 'https://www.kiffetmarais.com/agenda-de-la-galerie/event-one-y9tgh' },
];

// Contact section copy
export const contactCopy: {
  label: Bilingual;
  title: Bilingual;
  intro: Bilingual;
  name: Bilingual;
  email: Bilingual;
  message: Bilingual;
  send: Bilingual;
  note: Bilingual;
  follow: Bilingual;
} = {
  label: { en: 'Contact', fr: 'Contact' },
  title: { en: 'Let’s make something', fr: 'Faisons quelque chose' },
  intro: {
    en: 'A commission, a print, a workshop — write me and I’ll reply from my own inbox.',
    fr: 'Une commande, un tirage, un atelier — écrivez-moi, je réponds depuis ma boîte personnelle.',
  },
  name: { en: 'Your name', fr: 'Votre nom' },
  email: { en: 'Your email', fr: 'Votre e-mail' },
  message: { en: 'Your message', fr: 'Votre message' },
  send: { en: 'Send message', fr: 'Envoyer le message' },
  note: {
    en: 'This form opens your mail app — no address is published here.',
    fr: 'Ce formulaire ouvre votre messagerie — aucune adresse n’est affichée ici.',
  },
  follow: { en: 'Follow', fr: 'Suivre' },
};
