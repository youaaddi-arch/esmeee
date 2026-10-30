/**
 * Les onze opérateurs de compétences (OPCO).
 *
 * Point capital, rappelé partout dans l'interface : l'OPCO d'une entreprise
 * découle de sa convention collective (code IDCC), et non de son secteur
 * d'activité apparent ni d'un choix. Les secteurs listés ici servent à
 * orienter vers l'OPCO le plus probable ; la confirmation se lit sur le
 * bulletin de paie ou auprès du service RH.
 */

export type OpcoId =
  | "afdas"
  | "akto"
  | "atlas"
  | "constructys"
  | "ocapiat"
  | "opco2i"
  | "opcoep"
  | "opcomobilites"
  | "opcosante"
  | "uniformation"
  | "opcommerce";

export type Opco = {
  id: OpcoId;
  name: string;
  fullName: string;
  /** Périmètre, en une phrase. */
  scope: string;
  /** Branches et activités couvertes, pour la recherche. */
  sectors: string[];
  website: string;
  /** Page où l'OPCO publie ses critères de prise en charge. */
  criteresUrl: string;
  /**
   * Accessibilité de ces critères, constatée le 30 octobre 2026 :
   * — "public" : barèmes consultables sans compte ;
   * — "identifiant" : réservés aux adhérents connectés ;
   * — "par-branche" : publiés par convention collective, en documents séparés.
   */
  criteresAcces: "public" | "identifiant" | "par-branche";
  /** Pertinence au regard de l'offre ESME Executive Education. */
  esmeRelevance: "forte" | "moyenne" | "faible";
  /** Ce que cet OPCO finance le plus volontiers, de notre expérience. */
  note?: string;
  /** Dispositifs propres à l'OPCO, relevés sur ses pages publiques. */
  dispositifs?: OpcoDispositif[];
};

/** Un dispositif publié par un OPCO, avec sa source et sa date de relevé. */
export type OpcoDispositif = {
  nom: string;
  resume: string;
  /** Taux de prise en charge publiés, par tranche d'effectif. */
  taux?: { tranche: string; taux: string }[];
  thematiques?: string[];
  /** Exclusions explicites. */
  exclusions?: string[];
  /** Plafonds publiés, par tranche d'effectif. */
  plafonds?: { tranche: string; plafond: string }[];
  /** Conditions d'éligibilité propres au dispositif. */
  conditions?: string[];
  /** Branches bénéficiant d'un soutien conventionnel complémentaire. */
  branchesSoutien?: string[];
  /** Calendrier publié ; souvent propre à une campagne annuelle. */
  calendrier?: string;
  /** Mise en garde sur l'actualité du dispositif. */
  vigilance?: string;
  url: string;
  releveLe: string;
};

export const opcos: Opco[] = [
  {
    id: "opco2i",
    name: "OPCO 2i",
    fullName: "OPCO interindustriel",
    scope:
      "L'ensemble des branches industrielles : métallurgie, chimie, énergie, plasturgie, textile, papier-carton, ameublement, industries électriques et gazières.",
    sectors: [
      "métallurgie",
      "industrie",
      "chimie",
      "pétrole",
      "énergie",
      "industries électriques et gazières",
      "plasturgie",
      "textile",
      "papier carton",
      "ameublement",
      "verre",
      "aéronautique",
      "ferroviaire",
      "naval",
      "électronique",
      "mécanique",
      "production industrielle",
      "maintenance industrielle",
    ],
    website: "https://www.opco2i.fr",
    criteresUrl: "https://www.opco2i.fr/formation-et-financement/",
    criteresAcces: "identifiant",
    esmeRelevance: "forte",
    note: "C'est l'OPCO de la majorité de nos clients en Énergies & Services et en Industrie. Il dispose d'enveloppes dédiées aux transitions énergétique et numérique.",
    dispositifs: [
      {
        nom: "FSE+ — Fonds social européen",
        resume:
          "Cofinancement européen des formations qui accompagnent la mutation industrielle, ouvert à toutes les entreprises du champ OPCO 2i quelle que soit leur taille, pour les salariés en CDI comme en CDD.",
        taux: [{ tranche: "Toutes tailles", taux: "50 % des coûts pédagogiques" }],
        thematiques: [
          "Formations liées aux stratégies de transformation, en particulier les transitions numérique et écologique",
          "Sécurisation des parcours des salariés les plus exposés à ces transformations",
        ],
        exclusions: [
          "Formations internes",
          "Formations relevant de l'obligation de sécurité de l'employeur",
          "Entreprises éligibles au Fonds de transition juste, qui doivent mobiliser ce cofinancement-là",
        ],
        conditions: [
          "Le reste à charge se finance par versement volontaire ou par les fonds de branche",
          "La demande se dépose sur Mon Compte 2i, suffisamment en amont pour que la délégation régionale puisse l'instruire",
        ],
        calendrier:
          "La campagne publiée couvre des formations se déroulant entre le 07/02/2025 et le 31/12/2025.",
        vigilance:
          "Les dates de la campagne publiée sont échues : demandez à votre conseiller le millésime en cours avant de bâtir un plan de financement dessus.",
        url: "https://www.opco2i.fr/formation-et-financement/subventions/fse-fond-social-europeen/",
        releveLe: "2026-10-30",
      },
      {
        nom: "Transitions Industrie",
        resume:
          "Cofinancement de type FNE-Formation, porté avec le ministère du Travail, pour les formations liées aux transitions écologique et numérique des entreprises industrielles. Priorité aux TPE-PME ; tous les salariés sont éligibles sauf les alternants, avec une attention portée aux plus de 55 ans.",
        taux: [
          { tranche: "Moins de 50 salariés", taux: "70 %" },
          { tranche: "50 à 250 salariés", taux: "60 %" },
          { tranche: "Plus de 250 salariés", taux: "50 %" },
        ],
        thematiques: [
          "Transition écologique : transition énergétique, gestion des ressources et des déchets, fonctions support R&D et achats",
          "Transition numérique : fabrication additive, robotique, réalité virtuelle et augmentée, logiciels de conception, contrôle non destructif",
        ],
        exclusions: ["Aucune formation bureautique"],
        calendrier:
          "Prise en charge limitée à douze mois à compter de l'engagement du dossier. La campagne publiée porte un engagement au 31/12/2024, une réalisation au 31/12/2025 et un paiement au 30/06/2026.",
        vigilance:
          "L'enveloppe est passée de 75 M€ en 2023 à 21 M€ en 2024, pour cause de restrictions budgétaires. Les dates de la campagne publiée sont échues : demandez à votre conseiller si un nouveau millésime est ouvert. La contrepartie doit être financée par un versement volontaire ou par les fonds de branche.",
        url: "https://www.opco2i.fr/formation-et-financement/subventions/transitions-industrie-solution-pour-accompagner-entreprises-industrielles-dans-leurs-evolutions/",
        releveLe: "2026-10-30",
      },
    ],
  },
  {
    id: "atlas",
    name: "ATLAS",
    fullName: "ATLAS, soutenir les compétences",
    scope:
      "Services financiers et de conseil : banque, assurance, et surtout ingénierie, numérique, bureaux d'études techniques et conseil (branches Syntec et CINOV).",
    sectors: [
      "ingénierie",
      "bureau d'études",
      "bureaux d'études techniques",
      "numérique",
      "informatique",
      "conseil",
      "syntec",
      "cinov",
      "banque",
      "assurance",
      "expertise comptable",
      "notariat",
      "économiste de la construction",
      "études et conseil",
    ],
    website: "https://www.opco-atlas.fr",
    criteresUrl: "https://www.opco-atlas.fr/criteres-financement",
    criteresAcces: "identifiant",
    esmeRelevance: "forte",
    note: "L'OPCO des bureaux d'études et des sociétés d'ingénierie, donc d'une large part de nos participants en Numérique et en management de projets.",
  },
  {
    id: "constructys",
    name: "Constructys",
    fullName: "OPCO de la construction",
    scope:
      "Bâtiment, travaux publics et négoce de matériaux de construction.",
    sectors: [
      "bâtiment",
      "btp",
      "travaux publics",
      "construction",
      "gros œuvre",
      "second œuvre",
      "génie civil",
      "négoce de matériaux",
      "électricité du bâtiment",
      "installation",
      "chantier",
    ],
    website: "https://www.constructys.fr",
    criteresUrl: "https://www.constructys.fr",
    criteresAcces: "par-branche",
    esmeRelevance: "forte",
    note: "Concerné par nos modules photovoltaïque, efficacité énergétique des bâtiments, IA dans le BTP et pilotage des acteurs d'un projet de construction.",
  },
  {
    id: "opcomobilites",
    name: "OPCO Mobilités",
    fullName: "OPCO Mobilités",
    scope:
      "Transport routier, ferroviaire, maritime, aérien, services de l'automobile et logistique.",
    sectors: [
      "transport",
      "logistique",
      "automobile",
      "services de l'automobile",
      "ferroviaire",
      "aérien",
      "maritime",
      "mobilité",
      "transport urbain",
      "distribution de carburants",
    ],
    website: "https://www.opcomobilites.fr",
    criteresUrl: "https://www.opcomobilites.fr",
    criteresAcces: "par-branche",
    esmeRelevance: "moyenne",
    note: "Pertinent pour l'électrification des flottes, les infrastructures de recharge et le management de projets.",
  },
  {
    id: "opcoep",
    name: "OPCO EP",
    fullName: "OPCO des entreprises de proximité",
    scope:
      "Artisanat, professions libérales et commerce de proximité.",
    sectors: [
      "artisanat",
      "professions libérales",
      "commerce de proximité",
      "architecte",
      "géomètre",
      "installateur",
      "artisan",
      "petite entreprise",
      "pharmacie",
      "optique",
    ],
    website: "https://www.opcoep.fr",
    criteresUrl: "https://www.opcoep.fr",
    criteresAcces: "par-branche",
    esmeRelevance: "moyenne",
    note: "Concerne les cabinets d'architectes et de géomètres, ainsi que les artisans installateurs du secteur énergétique.",
    dispositifs: [
      {
        nom: "FSE+ — Fonds social européen",
        resume:
          "Le dispositif le plus détaillé du marché, ouvert à toutes les entreprises du champ OPCO EP sans critère de taille, en métropole comme dans les DROM. Tous les salariés sont éligibles, alternants compris. Publics prioritaires : les 45 ans et plus, les moins de 26 ans et les salariés en situation de handicap.",
        taux: [
          { tranche: "Moins de 50 salariés", taux: "jusqu'à 100 %" },
          { tranche: "50 salariés et plus", taux: "jusqu'à 50 %" },
        ],
        plafonds: [
          { tranche: "Moins de 50 salariés", plafond: "50 € / heure / stagiaire, dans la limite de 2 500 € par jour" },
          { tranche: "50 salariés et plus", plafond: "25 € / heure / stagiaire, dans la limite de 1 250 € par jour" },
        ],
        thematiques: [
          "Formations certifiantes et qualifiantes, hors obligation de l'employeur",
          "Transition écologique et énergétique",
          "Transition numérique",
          "Transition démographique",
          "RSE, qualité de vie au travail et égalité professionnelle",
          "Mixité des métiers",
          "Réapprentissage des savoirs fondamentaux",
          "Formations préparant les Jeux olympiques 2030",
        ],
        exclusions: [
          "E-learning",
          "Formations internes et AFEST",
          "Formations relevant de l'obligation de formation et de sécurité de l'employeur",
          "Bilans de compétences, VAE et CACES",
        ],
        conditions: [
          "Durée minimale de quatorze heures",
          "Un échange préalable avec votre conseiller est nécessaire pour ouvrir le droit au financement",
          "Aucun autre cofinancement public, CPF compris, ne peut compléter la prise en charge",
          "Le reste à charge se règle par versement volontaire",
          "Une rémunération forfaitaire de 12 € HT de l'heure par stagiaire peut être accordée selon le dossier",
        ],
        branchesSoutien: [
          "Maintenance et distribution de matériels agricoles, de travaux publics, de bâtiment et de manutention (SDLM)",
          "Mareyage",
          "Avocats salariés",
          "Cabinets d'expertise automobile",
          "Entreprises d'architecture",
        ],
        calendrier:
          "Les actions doivent être terminées au 31/12/2027. Dossier complet auprès du conseiller au plus tard le 29/10/2027, dépôt en ligne au plus tard le 05/11/2027. La demande précède toujours le démarrage.",
        vigilance:
          "Les financements sont accordés dans la limite des fonds disponibles. Toute annulation ou tout changement de stagiaire ou de dates après validation doit être signalé au plus tard la veille du démarrage.",
        url: "https://www.opcoep.fr/fonds-social-europeen",
        releveLe: "2026-10-30",
      },
    ],
  },
  {
    id: "opcommerce",
    name: "L'OPCOMMERCE",
    fullName: "L'OPCOMMERCE",
    scope:
      "Commerce de gros, grande distribution, commerce de détail et e-commerce.",
    sectors: [
      "commerce",
      "commerce de gros",
      "grande distribution",
      "e-commerce",
      "vente",
      "distribution",
      "import export",
      "négoce",
    ],
    website: "https://www.lopcommerce.com",
    criteresUrl: "https://www.lopcommerce.com",
    criteresAcces: "par-branche",
    esmeRelevance: "faible",
  },
  {
    id: "akto",
    name: "AKTO",
    fullName: "AKTO, opérateur de compétences des services à forte intensité de main-d'œuvre",
    scope:
      "Propreté, sécurité, travail temporaire, hôtellerie-restauration et services à forte intensité de main-d'œuvre.",
    sectors: [
      "propreté",
      "sécurité",
      "travail temporaire",
      "intérim",
      "hôtellerie",
      "restauration",
      "services",
      "nettoyage",
      "gardiennage",
      "facility management",
    ],
    website: "https://www.akto.fr",
    criteresUrl: "https://www.akto.fr",
    criteresAcces: "par-branche",
    esmeRelevance: "faible",
  },
  {
    id: "ocapiat",
    name: "OCAPIAT",
    fullName: "OPCO pour l'agriculture, la pêche, l'agroalimentaire et les territoires",
    scope:
      "Agriculture, pêche, industries alimentaires et coopération agricole.",
    sectors: [
      "agriculture",
      "agroalimentaire",
      "pêche",
      "coopérative agricole",
      "industrie alimentaire",
      "viticulture",
      "élevage",
      "méthanisation agricole",
    ],
    website: "https://www.ocapiat.fr",
    criteresUrl: "https://www.ocapiat.fr",
    criteresAcces: "par-branche",
    esmeRelevance: "moyenne",
    note: "Concerné par nos modules sur la méthanisation et les énergies renouvelables en milieu agricole.",
  },
  {
    id: "afdas",
    name: "AFDAS",
    fullName: "AFDAS, OPCO des industries culturelles et créatives",
    scope:
      "Culture, industries créatives, médias, communication, télécommunications, sport, tourisme et loisirs.",
    sectors: [
      "culture",
      "audiovisuel",
      "médias",
      "communication",
      "publicité",
      "télécommunications",
      "sport",
      "tourisme",
      "loisirs",
      "spectacle",
      "presse",
    ],
    website: "https://www.afdas.com",
    criteresUrl: "https://www.afdas.com",
    criteresAcces: "par-branche",
    esmeRelevance: "faible",
    note: "Couvre les télécommunications, parfois concernées par nos modules numériques et cybersécurité.",
  },
  {
    id: "opcosante",
    name: "OPCO Santé",
    fullName: "OPCO Santé",
    scope:
      "Secteur privé de la santé : hospitalisation privée, médico-social, aide et soins à domicile.",
    sectors: [
      "santé",
      "hôpital privé",
      "clinique",
      "médico-social",
      "ehpad",
      "soins à domicile",
      "laboratoire d'analyses",
    ],
    website: "https://www.opco-sante.fr",
    criteresUrl: "https://opco-sante.fr",
    criteresAcces: "public",
    esmeRelevance: "faible",
    note: "Concerné par nos modules data center, efficacité énergétique des bâtiments et cybersécurité.",
  },
  {
    id: "uniformation",
    name: "Uniformation",
    fullName: "Uniformation, l'OPCO de la cohésion sociale",
    scope:
      "Associations, insertion, habitat social, mutualité, aide à domicile et économie sociale et solidaire.",
    sectors: [
      "association",
      "habitat social",
      "bailleur social",
      "mutuelle",
      "insertion",
      "économie sociale et solidaire",
      "aide à domicile",
      "centre social",
    ],
    website: "https://www.uniformation.fr",
    criteresUrl: "https://www.uniformation.fr",
    criteresAcces: "par-branche",
    esmeRelevance: "moyenne",
    note: "Les bailleurs sociaux font appel à nos modules d'efficacité énergétique et de rénovation du bâtiment.",
  },
];

export const opcoById = (id: OpcoId): Opco | undefined =>
  opcos.find((o) => o.id === id);

/** Recherche d'OPCO par secteur ou activité, insensible aux accents. */
export function searchOpcos(query: string): Opco[] {
  const needle = query
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’']/g, " ")
    .trim()
    .toLowerCase();
  if (needle.length < 2) return [];

  const normalise = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[’']/g, " ")
      .toLowerCase();

  const scored = opcos.map((opco) => {
    const haystacks = [...opco.sectors, opco.name, opco.scope].map(normalise);
    let score = 0;
    for (const h of haystacks) {
      if (h === needle) score += 10;
      else if (h.startsWith(needle)) score += 6;
      else if (h.includes(needle)) score += 3;
    }
    return { opco, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.opco);
}

export const criteresAccesLabels: Record<Opco["criteresAcces"], string> = {
  public: "Barèmes consultables en ligne",
  identifiant: "Barèmes réservés aux adhérents connectés",
  "par-branche": "Barèmes publiés par convention collective",
};
