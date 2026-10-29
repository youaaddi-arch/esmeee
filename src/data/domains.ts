export type DomainSlug =
  | "energies-services"
  | "industrie"
  | "numerique"
  | "management-transformation";

export type Domain = {
  slug: DomainSlug;
  name: string;
  /** Intitulé long, utilisé pour le référencement. */
  longName: string;
  /** Promesse courte, affichée sur les cartes. */
  pitch: string;
  /** Texte de présentation du domaine — catalogue 2027. */
  intro: string;
  /** Ce que le domaine permet de faire, en une phrase par public. */
  outcomes: string[];
  themes: { name: string; description: string }[];
  accent: "teal" | "indigo" | "blue" | "rose";
  icon: "bolt" | "cog" | "chip" | "compass";
  catalogPage: number;
};

/**
 * Les quatre domaines du catalogue ESME Executive Education 2027.
 * Textes de présentation repris des pages d’ouverture de domaine
 * (p. 10, 24, 30 et 42 du catalogue).
 */
export const domains: Domain[] = [
  {
    slug: "energies-services",
    name: "Énergies & Services",
    longName: "Transition énergétique, réseaux et efficacité énergétique",
    pitch:
      "Photovoltaïque, smart grids, stockage, réseaux HTA/BT, efficacité énergétique et data center.",
    intro:
      "Face à la transformation des systèmes énergétiques, nous accompagnons les professionnels dans la maîtrise des technologies, des infrastructures et des risques qui façonnent l’énergie de demain. Nos formations associent compréhension des enjeux et appropriation des savoir-faire nécessaires à leur mise en œuvre dans des environnements industriels exigeants.",
    outcomes: [
      "Produire des études d’installations photovoltaïques conformes, jusqu’au dimensionnement sur ArcheliosPro",
      "Concevoir et exploiter des réseaux BT, HTA et des postes HTB en sécurité",
      "Optimiser la performance énergétique d’un bâtiment ou d’un data center, chiffres à l’appui",
    ],
    themes: [
      {
        name: "Smart grids et énergies renouvelables",
        description:
          "Panorama des filières renouvelables, étude et dimensionnement photovoltaïque, performance et maintenance, risques de financement et d’assurance, réseaux intelligents et stockage par batteries.",
      },
      {
        name: "Réseaux et infrastructures électriques",
        description:
          "Ouvrages de distribution publique BT et HTA, conception d’installations HTA/BT et environnement des postes HTB.",
      },
      {
        name: "Efficacité énergétique",
        description:
          "Optimisation énergétique des bâtiments et conception de systèmes énergétiques performants, au croisement de l’électricité et du CVC.",
      },
      {
        name: "Data center",
        description:
          "Conception des installations électriques et de refroidissement d’un data center, de la mise en service aux niveaux Tier.",
      },
    ],
    accent: "teal",
    icon: "bolt",
    catalogPage: 10,
  },
  {
    slug: "industrie",
    name: "Industrie",
    longName: "Industrie 4.0 et fabrication additive",
    pitch:
      "Fabrication additive, numérisation 3D et découpe laser CO2, sur machines professionnelles.",
    intro:
      "Nous accompagnons les entreprises industrielles dans la maîtrise des technologies numériques qui transforment la conception et la fabrication. De la numérisation 3D à la fabrication additive, en passant par la découpe laser CO2, nos formations développent les compétences nécessaires pour intégrer ces technologies au processus de création produit. Une offre technique et appliquée, conçue pour faire du numérique un levier d’innovation et de performance industrielle.",
    outcomes: [
      "Concevoir une pièce réellement adaptée aux contraintes de la fabrication additive",
      "Intégrer une machine — imprimante 3D, découpeuse laser — dans un processus de production",
      "Prototyper rapidement, de la numérisation d’une pièce existante au prototype fonctionnel",
    ],
    themes: [
      {
        name: "Fabrication additive",
        description:
          "Design for additive manufacturing, intégration d’une imprimante 3D FDM en production, numérisation 3D et prototypage, découpe et gravure laser CO2.",
      },
    ],
    accent: "indigo",
    icon: "cog",
    catalogPage: 24,
  },
  {
    slug: "numerique",
    name: "Numérique",
    longName: "Intelligence artificielle et cybersécurité",
    pitch:
      "De la stratégie IA au prompt engineering, de la gouvernance cyber à la gestion de crise.",
    intro:
      "Notre objectif : permettre aux entreprises d’intégrer les technologies numériques dans leurs décisions et leurs processus métiers, aider les ingénieurs et managers à devenir de véritables orchestrateurs des agents IA, et à agir efficacement en situation de cybercrise.",
    outcomes: [
      "Arbitrer un investissement IA — valeur, risques, ROI — et repartir avec une feuille de route",
      "Outiller les fonctions métiers : appels d’offres, prospection, chantiers, assistants métiers",
      "Piloter la cybersécurité au niveau stratégique et éprouver sa préparation à une cyber-crise",
    ],
    themes: [
      {
        name: "Intelligence artificielle",
        description:
          "Stratégie IA pour dirigeants, prompt engineering, analyse de DCE, prospection commerciale, usages dans le BTP et sur les chantiers, conception d’assistants métiers.",
      },
      {
        name: "Cybersécurité",
        description:
          "Pilotage stratégique de la cybersécurité, conduite en situation de cyber-crise et sensibilisation de l’ensemble des collaborateurs.",
      },
    ],
    accent: "blue",
    icon: "chip",
    catalogPage: 30,
  },
  {
    slug: "management-transformation",
    name: "Management de la transformation",
    longName: "Leadership, projets complexes et conduite du changement",
    pitch:
      "Leadership, intrapreneuriat, management de projets complexes, stratégie et soft skills.",
    intro:
      "Nous accompagnons les transformations qui redessinent les métiers des managers et des ingénieurs. Nos parcours placent les professionnels au cœur des situations auxquelles ils sont confrontés : construire une stratégie cohérente, décider dans l’incertitude, adapter leur posture managériale, faciliter la décision dans un projet complexe, coordonner les acteurs d’un projet ou encore agir face à une situation critique. Les formats Bootcamp et simulation de projet complexe renforcent cette orientation vers l’action.",
    outcomes: [
      "Passer de l’expertise technique au pilotage d’un centre de profit",
      "Piloter un projet complexe sur simulateur, coût, délai, qualité et aléas compris",
      "Négocier un contrat sous pression et protéger les droits de son organisation",
    ],
    themes: [
      {
        name: "Leadership",
        description:
          "Clés relationnelles et situationnelles de la performance collective, développement du leadership, prospective et agilité décisionnelle en comité de direction.",
      },
      {
        name: "Intrapreneuriat",
        description:
          "Le Parcours Ingénieur Intrapreneur et ses cinq modules : stratégie, décision, lecture des profils humains, posture et conduite du changement.",
      },
      {
        name: "Management de projets complexes",
        description:
          "Fondamentaux, facilitation de la décision, bootcamp sur simulateur de projet, contract management, négociation sous pression et pilotage des acteurs d’un projet de construction.",
      },
      {
        name: "Stratégie",
        description:
          "Construction d’une vision business, co-construction avec le CoDir, plan d’action sur un sujet critique et management transversal sans lien hiérarchique.",
      },
      {
        name: "Soft skills",
        description:
          "Cohésion intergénérationnelle, prise de parole en public par les techniques théâtrales et communication au service du changement.",
      },
    ],
    accent: "rose",
    icon: "compass",
    catalogPage: 42,
  },
];

export const domainBySlug = (slug: string): Domain | undefined =>
  domains.find((d) => d.slug === slug);

export const domainName = (slug: DomainSlug): string =>
  domains.find((d) => d.slug === slug)?.name ?? slug;
