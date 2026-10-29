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
  /** Pertinence au regard de l'offre ESME Executive Education. */
  esmeRelevance: "forte" | "moyenne" | "faible";
  /** Ce que cet OPCO finance le plus volontiers, de notre expérience. */
  note?: string;
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
    esmeRelevance: "forte",
    note: "C'est l'OPCO de la majorité de nos clients en Énergies & Services et en Industrie. Il dispose d'enveloppes dédiées aux transitions énergétique et numérique.",
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
    esmeRelevance: "moyenne",
    note: "Concerne les cabinets d'architectes et de géomètres, ainsi que les artisans installateurs du secteur énergétique.",
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
