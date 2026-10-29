/**
 * Informations institutionnelles.
 * Source : catalogue officiel « ESME Executive Education — Formations 2027 »
 * (mise à jour septembre 2026) et esme.fr/executive-education.
 */

export const site = {
  name: "ESME Executive Education",
  shortName: "ESME Exec Ed",
  school: "ESME",
  group: "Groupe IONIS",
  url: "https://executive-education.esme.fr",
  locale: "fr_FR",
  catalogueYear: "2027",
  tagline: "Conduire les transformations complexes",
  baseline: "Les compétences pour décider, piloter et transformer.",
  intro:
    "La formation continue de l’ESME, école d’ingénieurs fondée en 1905. Nous formons les dirigeants, managers, ingénieurs et experts techniques sur les terrains où l’opérationnalité fait la différence : énergie, industrie, infrastructures, mobilité et transformation digitale.",
  description:
    "ESME Executive Education : formation continue pour ingénieurs, managers et dirigeants. 48 formations en transition énergétique, industrie 4.0, IA et cybersécurité, management de la transformation. Certifié Qualiopi, en inter, intra-entreprise ou sur-mesure.",
} as const;

export const contact = {
  phone: "+33156206204",
  phoneDisplay: "01 56 20 62 04",
  email: "executive-education@esme.fr",
  accessibilityEmail: "aude.bosvieux@esme.fr",
  sites: [
    { label: "Campus Paris", street: "34 rue de Fleurus", postalCode: "75006", city: "Paris" },
    { label: "Campus Ivry-sur-Seine", street: "65 bd de Brandebourg", postalCode: "94200", city: "Ivry-sur-Seine" },
  ],
  legalEntity: {
    name: "ESME",
    street: "38 rue Molière",
    postalCode: "94200",
    city: "Ivry-sur-Seine",
    siret: "85210764800028",
  },
  esmeSite: "https://www.esme.fr",
  cataloguePage: "https://www.esme.fr/executive-education/",
  linkedin: "https://www.linkedin.com/school/esme/",
} as const;

/** Chiffres institutionnels ESME — source : catalogue 2027 et esme.fr. */
export const keyFigures = [
  { value: "120", unit: "ans", label: "d’innovation et de transmission", detail: "L’ESME a traversé quatre révolutions industrielles depuis 1905." },
  { value: "18 000", unit: "", label: "alumni en activité", detail: "Une communauté qui contribue aux transformations de l’industrie." },
  { value: "450", unit: "", label: "entreprises partenaires", detail: "Des contenus nourris par les réalités du terrain." },
  { value: "4", unit: "", label: "laboratoires de recherche", detail: "Énergie, numérique, systèmes embarqués et santé." },
] as const;

/**
 * Observatoire 2026 de l’ingénieur et des compétences stratégiques.
 * Enquête ESME Executive Education auprès de plus de 400 ingénieurs,
 * managers, recruteurs et responsables de formation.
 */
export const observatory = {
  title: "Observatoire de l’ingénieur et des compétences stratégiques",
  year: "2026",
  sample: "plus de 400 ingénieurs, managers, recruteurs et responsables de formation",
  headline: "Former dans un monde qui change plus vite que les compétences",
  figures: [
    { value: "84 %", label: "constatent que les compétences de l’ingénieur ont déjà évolué en trois ans" },
    { value: "71 %", label: "anticipent de nouvelles transformations majeures des métiers d’ici trois ans" },
    { value: "82 %", label: "identifient l’intelligence artificielle comme premier moteur de transformation" },
    { value: "6/10", label: "niveau moyen de préparation des organisations face à ces transformations" },
  ],
  priorities: [
    { label: "IA et data", share: 34 },
    { label: "Compétences technique métier", share: 26 },
    { label: "Management", share: 15 },
    { label: "Gestion de projet", share: 14 },
    { label: "Soft skills & développement personnel", share: 14 },
    { label: "Sécurité, cybersécurité", share: 11 },
  ],
  conclusion:
    "84 % des organisations investissent déjà dans la formation. La question n’est plus de savoir s’il faut former, mais comment former efficacement, avec un impact mesurable.",
} as const;

/** Les trois piliers de l’engagement ESME Executive Education — catalogue 2027, p. 8. */
export const commitments = [
  {
    title: "Maîtrise",
    body: "L’expérience de la formation des ingénieurs, une expertise pédagogique et la proximité avec les écosystèmes technologiques garantissent la qualité de l’accompagnement de vos transformations.",
  },
  {
    title: "Opérationnalité",
    body: "Des méthodes et des outils immédiatement mobilisables, pour un impact mesurable sur l’activité.",
  },
  {
    title: "Terrain",
    body: "Des formations co-construites à partir de vos réalités métier et animées par des intervenants expérimentés.",
  },
] as const;

/**
 * Notre méthode en six temps — catalogue 2027, p. 9.
 * « Parce qu’une formation n’a de valeur que si elle s’ancre durablement
 * dans les pratiques. »
 */
export const method = [
  { step: "Analyser", subtitle: "vos besoins, vos attentes", body: "Pour s’ancrer dans la réalité de vos métiers et vos enjeux opérationnels." },
  { step: "Nourrir", subtitle: "votre projet", body: "Des expertises, des expériences et des méthodes portées par l’écosystème de notre école d’ingénieurs." },
  { step: "Co-construire", subtitle: "une solution sur-mesure", body: "Adaptée à vos attentes et à vos objectifs." },
  { step: "Renforcer", subtitle: "les acquis", body: "Par l’active learning, via des études de cas et des mises en situation, pour transformer les acquis en réflexes durables." },
  { step: "Évaluer", subtitle: "la montée en compétences", body: "Par un accompagnement post-formation adapté." },
  { step: "Réinvestir", subtitle: "sur le terrain", body: "Pour que la formation se traduise en résultats concrets." },
] as const;

/** Démarche sur-mesure, de l’enjeu métier à l’impact terrain — catalogue 2027, p. 7. */
export const bespokeJourney = [
  { step: "Comprendre", body: "Vos priorités stratégiques, votre contexte, les publics concernés, vos attentes opérationnelles." },
  { step: "Concevoir", body: "Un parcours bâti sur vos cas réels et vos outils : objectifs, modalités, indicateurs d’impact." },
  { step: "Déployer", body: "Un déploiement homogène, conforme à vos exigences, sur tous vos sites et pour toutes vos équipes." },
  { step: "Mesurer", body: "L’impact évalué sur le terrain, à partir des indicateurs définis ensemble en phase de conception." },
] as const;

/** Les trois formats de déploiement. */
export const formats = [
  {
    slug: "inter",
    name: "Inter-entreprises",
    pitch: "Former un ou quelques collaborateurs",
    body: "Vos collaborateurs rejoignent une session ouverte, aux côtés de participants venus d’autres organisations. Le programme est celui du catalogue, aux dates publiées. Les échanges entre secteurs font partie de la valeur du format.",
    bestFor: [
      "Un à trois collaborateurs à former sur un sujet donné",
      "Un besoin couvert par un programme existant du catalogue",
      "Une volonté de confronter ses pratiques à d’autres secteurs",
    ],
  },
  {
    slug: "intra",
    name: "Intra-entreprise",
    pitch: "Former une équipe entière",
    body: "Un programme du catalogue, dispensé pour vos seules équipes et adapté à vos installations, vos outils et vos cas d’usage. La session se tient sur votre site ou sur un campus ESME.",
    bestFor: [
      "Une équipe complète ou plusieurs équipes à mettre à niveau",
      "Un contenu à ancrer dans vos environnements techniques",
      "Un besoin de cohérence des pratiques au sein d’un même service",
    ],
  },
  {
    slug: "sur-mesure",
    name: "Sur-mesure",
    pitch: "Accompagner un projet de transformation",
    body: "Un dispositif entièrement conçu pour votre organisation, de l’analyse du besoin à la mesure de l’impact. Objectifs pédagogiques, contenus, rythme, modalités et indicateurs sont définis avec vous.",
    bestFor: [
      "Un projet de transformation : déploiement technique, réorganisation, évolution métier",
      "Plusieurs publics et plusieurs sites à embarquer",
      "Un besoin d’indicateurs d’impact définis dès la conception",
    ],
  },
] as const;

/** Certification qualité — catalogue 2027 et esme.fr. */
export const qualiopi = {
  certified: true,
  scope: "Actions de formation",
  statement:
    "La certification qualité a été délivrée au titre de la catégorie d’action suivante : ACTIONS DE FORMATION.",
  body: "PRONÉO",
  validUntil: "20/08/2026",
} as const;

export const nav = [
  { href: "/formations", label: "Formations" },
  { href: "/formats", label: "Formats" },
  { href: "/financement", label: "Financement" },
  { href: "/equipe-pedagogique", label: "Équipe pédagogique" },
  { href: "/blog", label: "Blog" },
] as const;

export const footerNav = [
  {
    title: "Formations",
    links: [
      { href: "/formations", label: "Tout le catalogue" },
      { href: "/domaines/energies-services", label: "Énergies & Services" },
      { href: "/domaines/industrie", label: "Industrie" },
      { href: "/domaines/numerique", label: "Numérique" },
      { href: "/domaines/management-transformation", label: "Management de la transformation" },
    ],
  },
  {
    title: "Modalités",
    links: [
      { href: "/formats", label: "Inter, intra et sur-mesure" },
      { href: "/financement", label: "Financement" },
      { href: "/financement/simulateur", label: "Simulateur de financement" },
      { href: "/financement#qualiopi", label: "Certification Qualiopi" },
      { href: "/financement#accessibilite", label: "Accessibilité et handicap" },
    ],
  },
  {
    title: "À propos",
    links: [
      { href: "/notre-approche", label: "Notre approche" },
      { href: "/equipe-pedagogique", label: "Équipe pédagogique" },
      { href: "/observatoire", label: "Observatoire 2026" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "/contact", label: "Nous contacter" },
      { href: "/devis", label: "Demander un devis" },
      { href: "/mentions-legales", label: "Mentions légales" },
      { href: "/cgv", label: "Conditions générales de vente" },
    ],
  },
] as const;
