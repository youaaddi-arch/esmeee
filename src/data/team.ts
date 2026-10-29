/**
 * Équipe pédagogique.
 *
 * Les personnes nommées ici figurent au catalogue 2027 ou sur esme.fr.
 * Les profils d’intervenants décrivent le modèle d’intervention tel qu’il
 * ressort des fiches du catalogue (méthodes et moyens pédagogiques).
 * Les biographies individuelles des intervenants restent à compléter
 * par l’équipe : voir CONTENT.md.
 */

export type Person = {
  name: string;
  role: string;
  /** Rattachement. */
  org: string;
  /** Deux à quatre phrases. */
  bio: string;
  /** Citation authentique, issue des éditos du catalogue 2027. */
  quote?: string;
  email?: string;
  /** Portrait à fournir — chemin sous /public/equipe/. */
  photo?: string;
  initials: string;
};

export const leadership: Person[] = [
  {
    name: "Véronique Bonnet",
    role: "Directrice Générale",
    org: "ESME",
    initials: "VB",
    bio: "Véronique Bonnet dirige l’ESME, école d’ingénieurs fondée en 1905 et membre du Groupe IONIS. Elle a porté la création d’ESME Executive Education, qui met l’expertise de l’école en énergie, électronique et numérique au service des dirigeants, managers, ingénieurs et experts techniques en activité.",
    quote:
      "Vous découvrirez dans ce catalogue une offre de formation fidèle à l’ADN de l’ESME : exigeante, innovante, ancrée dans les réalités du terrain et portée par des experts reconnus.",
  },
  {
    name: "Hervé Jacques",
    role: "Directeur",
    org: "ESME Executive Education",
    initials: "HJ",
    bio: "Hervé Jacques dirige ESME Executive Education. Il a construit l’offre autour des secteurs où l’opérationnalité fait la différence — énergie, industrie, infrastructures, mobilité, transformation digitale — et porte l’Observatoire de l’ingénieur et des compétences stratégiques, dont la première édition a été publiée en 2026.",
    quote:
      "Notre conviction est simple : la performance d’une organisation se construit aussi par sa capacité à faire évoluer les compétences de ses équipes au rythme de ces transformations, sur des enjeux concrets et avec un impact mesurable sur l’activité.",
  },
  {
    name: "Aude Bosvieux",
    role: "Responsable Pédagogique & Opérations",
    org: "ESME Executive Education",
    initials: "AB",
    bio: "Aude Bosvieux pilote l’ingénierie pédagogique et l’organisation des sessions : conception des parcours avec les intervenants, évaluation des acquis, mesure de la satisfaction et amélioration continue. Elle est également référente handicap et étudie en amont, avec chaque participant concerné, les aménagements nécessaires.",
    email: "aude.bosvieux@esme.fr",
  },
];

/**
 * Profils d’intervenants, tels qu’ils ressortent des méthodes et moyens
 * pédagogiques publiés sur les 48 fiches du catalogue.
 */
export const facultyProfiles = [
  {
    title: "Experts et experts d’assurance du secteur énergétique",
    domains: ["Énergies & Services"],
    body: "Ils interviennent sur les filières renouvelables, le photovoltaïque et les réseaux. Leur matière première : de véritables sinistres et des études de cas d’expertises réelles, qui montrent où et pourquoi les installations défaillent.",
    evidence:
      "« Retours d’expérience issus de vrais sinistres », « étude de cas d’expertises réelles » — fiches ENR 100 et PV 110.",
  },
  {
    title: "Ingénieurs de bureau d’études et concepteurs d’installations",
    domains: ["Énergies & Services", "Industrie"],
    body: "Ils forment au dimensionnement et à la conception sur les outils du métier, jusqu’au schéma unifilaire ou au dossier de fabrication. Les contenus suivent les référentiels professionnels en vigueur.",
    evidence:
      "Travaux pratiques sur ArcheliosPro et conception alignée sur le référentiel de qualification OPQIBI 2011 — fiche PV 100.",
  },
  {
    title: "Praticiens de l’IA et de la cybersécurité",
    domains: ["Numérique"],
    body: "Ils prompt en direct devant le groupe, font travailler les participants sur des documents réels anonymisés et configurent les assistants utilisés en atelier. En cybersécurité, ils animent des simulations de crise construites sur le contexte du client.",
    evidence:
      "« Le formateur prompt en direct », « DCE anonymisé fourni par le formateur », « simulation de crise sur-mesure » — fiches IA 200, IA 300 et CYB 110.",
  },
  {
    title: "Dirigeants et chefs de projet expérimentés",
    domains: ["Management de la transformation"],
    body: "Ils animent les parcours de leadership, d’intrapreneuriat et de management de projets complexes. Le Parcours Ingénieur Intrapreneur a été conçu par et pour des profils experts ; les bootcamps s’appuient sur un simulateur numérique professionnel et sur des débriefings individuels.",
    evidence:
      "« Un programme conçu par et pour des profils experts » et 80 % de pratique en immersion sur simulateur — fiches INTR 100 et PROJ 220.",
  },
  {
    title: "Comédiens-formateurs",
    domains: ["Management de la transformation"],
    body: "Ils conduisent les modules de soft skills par les techniques théâtrales : travail du corps, de la voix, du regard et du trac, avec analyse des pratiques et retours personnalisés devant le groupe.",
    evidence:
      "« Une pédagogie fondée sur les techniques théâtrales et l’apprentissage par les pairs » — fiches SOFT 100 et SOFT 110.",
  },
] as const;

/** Ce que l’ingénierie pédagogique garantit sur chacune des 48 fiches. */
export const pedagogyStandards = [
  {
    title: "Un auto-positionnement avant de commencer",
    body: "Chaque participant réalise un auto-positionnement individuel initial. Il situe son niveau de départ et permet à l’intervenant d’ajuster le curseur dès la première heure.",
  },
  {
    title: "Des objectifs formulés en capacités",
    body: "Tous les objectifs pédagogiques sont rédigés sous la forme « à l’issue de la formation, le participant sera capable de… ». Ce qui est annoncé est ce qui est évalué.",
  },
  {
    title: "Une pédagogie active et expérientielle",
    body: "Études de cas réels, mises en situation, ateliers collaboratifs, travaux guidés sur poste, simulations et jeux de rôle. C’est la constante des 48 programmes, quel que soit le domaine.",
  },
  {
    title: "Une évaluation individuelle finale des acquis",
    body: "Chaque formation se conclut par une évaluation individuelle des acquis, suivie d’une attestation de fin de formation. La satisfaction des participants est mesurée et alimente la révision des programmes.",
  },
  {
    title: "Un ancrage après la formation",
    body: "L’engagement se prolonge au-delà de la session, avec un accompagnement destiné à faciliter la mise en pratique dans l’organisation et à renforcer l’ancrage des compétences.",
  },
] as const;
