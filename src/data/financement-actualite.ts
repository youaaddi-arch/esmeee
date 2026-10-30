/**
 * État des dispositifs de financement — veille au 30 octobre 2026.
 *
 * Aucun OPCO n'expose d'API publique de ses niveaux de prise en charge, et
 * aucun ne publie l'état de ses enveloppes en temps réel. Ce module encode
 * donc une veille datée, avec sa source, et renvoie systématiquement vers la
 * page officielle du financeur. Les montants cités proviennent de sources
 * secondaires et sont signalés comme indicatifs.
 *
 * À réviser : voir CONTENT.md, section « Veille financement ».
 */

export const veille = {
  /** Date de la dernière vérification des informations de ce module. */
  verifieeLe: "2026-10-30",
  verifieeLeTexte: "30 octobre 2026",
} as const;

export type Statut = "ouvert" | "sous-reserve" | "epuise" | "ferme";

export const statutLabels: Record<Statut, string> = {
  ouvert: "Ouvert",
  "sous-reserve": "Ouvert sous réserve",
  epuise: "Enveloppe épuisée",
  ferme: "Fermé",
};

export const statutExplications: Record<Statut, string> = {
  ouvert: "Dispositif actif, dossiers recevables.",
  "sous-reserve":
    "Dispositif actif, mais soumis à des enveloppes limitées ou à des conditions qui se vérifient au cas par cas.",
  epuise:
    "Le dispositif existe mais les crédits de l'exercice en cours sont engagés. Une réouverture est possible, à vérifier auprès du financeur.",
  ferme: "Aucun nouvel engagement n'est possible sur l'exercice en cours.",
};

export type AnneeFormation = "2026" | "2027";

export const anneeLabels: Record<AnneeFormation, string> = {
  "2026": "D'ici la fin 2026",
  "2027": "En 2027",
};

/** Statut d'un dispositif, par année de déroulement de la formation. */
export type StatutParAnnee = {
  slug: string;
  statut: Record<AnneeFormation, Statut>;
  /** Ce qu'il faut savoir, par année. */
  note: Record<AnneeFormation, string>;
  source?: { label: string; url: string };
};

export const statutsDispositifs: StatutParAnnee[] = [
  {
    slug: "plan-developpement-competences",
    statut: { "2026": "ouvert", "2027": "ouvert" },
    note: {
      "2026":
        "Le budget propre de l'entreprise reste mobilisable sans condition ni calendrier. C'est la seule voie qui ne dépende d'aucune enveloppe.",
      "2027":
        "Inchangé. Avec le resserrement annoncé des fonds mutualisés, cette part d'autofinancement est appelée à grandir.",
    },
  },
  {
    slug: "opco",
    statut: { "2026": "sous-reserve", "2027": "sous-reserve" },
    note: {
      "2026":
        "Les fonds mutualisés du plan de développement des compétences sont réservés aux entreprises de moins de 50 salariés. Les enveloppes sont annuelles et peuvent s'épuiser en cours d'exercice : plusieurs OPCO appliquent alors une minoration du taux de prise en charge.",
      "2027":
        "Le projet de loi de finances pour 2027 ramène à zéro la dotation de l'État à France compétences et ne reconduit pas la compensation de TVA aux OPCO, d'environ 160 M€. Les critères 2027 seront arrêtés en fin d'année 2026 par les conseils d'administration : déposez tôt et n'anticipez pas les taux de 2026.",
    },
    source: {
      label: "Annexe « Formation professionnelle » au projet de loi de finances",
      url: "https://www.assemblee-nationale.fr/dyn/contenu/visualisation/1089989/file/7-Jaune2026_Formation_Professionnelle.pdf",
    },
  },
  {
    slug: "fne-formation",
    statut: { "2026": "ferme", "2027": "ferme" },
    note: {
      "2026":
        "Le FNE-Formation a été suspendu au titre de l'exercice 2025 et n'est pas rétabli en 2026 : aucune nouvelle convention n'est signée avec les OPCO. Le dispositif n'est pas abrogé, mais il n'a plus de ligne budgétaire. Les conventions antérieures se poursuivent jusqu'à leur terme.",
      "2027":
        "Aucun rétablissement n'est prévu à ce stade. Les entreprises en transformation se reportent sur les enveloppes thématiques des OPCO — intelligence artificielle, cybersécurité, transition écologique — et sur les actions collectives.",
    },
    source: {
      label: "Annexe « Formation professionnelle » au projet de loi de finances 2026",
      url: "https://www.assemblee-nationale.fr/dyn/contenu/visualisation/1089989/file/7-Jaune2026_Formation_Professionnelle.pdf",
    },
  },
  {
    slug: "fse-plus",
    statut: { "2026": "epuise", "2027": "sous-reserve" },
    note: {
      "2026":
        "Les crédits de la programmation en cours ont été largement engagés et les principaux appels se sont clos au 30 juin 2026. Une réouverture dépend de chaque OPCO : certains ont porté des enveloppes dédiées, jusqu'à 7 M€ pour OPCO EP sur 2025-2026.",
      "2027":
        "Dernière année de la programmation 2021-2027. Des appels peuvent rouvrir, toujours sous forme d'actions collectives et non de demandes individuelles. À surveiller auprès de votre OPCO dès le premier trimestre.",
    },
    source: { label: "fse.gouv.fr", url: "https://fse.gouv.fr/quest-ce-que-le-fse" },
  },
  {
    slug: "contributions-conventionnelles",
    statut: { "2026": "ouvert", "2027": "ouvert" },
    note: {
      "2026":
        "Certaines branches ont instauré, par accord, une contribution supplémentaire à la contribution légale. Elle alimente des enveloppes propres à la branche, souvent accessibles au-delà du seuil de 50 salariés. Le décret n° 2026-259 du 8 avril 2026 organise leur reversement trimestriel aux OPCO par France compétences.",
      "2027":
        "Levier appelé à peser davantage, à mesure que les fonds mutualisés de droit commun se resserrent. Vérifiez si votre branche en a instauré une.",
    },
  },
  {
    slug: "versements-volontaires",
    statut: { "2026": "ouvert", "2027": "ouvert" },
    note: {
      "2026":
        "L'entreprise peut verser volontairement à un OPCO des sommes au-delà de ses obligations, pour se constituer un budget formation géré et sécurisé. Ces versements peuvent être adressés à un OPCO autre que celui dont relève l'entreprise.",
      "2027":
        "Inchangé, et d'autant plus pertinent pour les entreprises de 50 salariés et plus, exclues des fonds mutualisés du plan.",
    },
  },
  {
    slug: "france-travail",
    statut: { "2026": "ouvert", "2027": "sous-reserve" },
    note: {
      "2026":
        "POEI, AFPR et aide individuelle à la formation restent mobilisables. L'accord du conseiller doit précéder tout engagement.",
      "2027":
        "Dispositifs maintenus dans leur principe ; les enveloppes régionales se décident en début d'exercice.",
    },
  },
  {
    slug: "accord-cadre",
    statut: { "2026": "ouvert", "2027": "ouvert" },
    note: {
      "2026":
        "Ne dépend d'aucun financeur public : c'est un accord commercial pluriannuel entre votre organisation et nous.",
      "2027":
        "Pertinent pour sécuriser des conditions sur plusieurs exercices, dans un contexte de financements publics moins lisibles.",
    },
  },
  {
    slug: "faf-independants",
    statut: { "2026": "sous-reserve", "2027": "sous-reserve" },
    note: {
      "2026":
        "Budgets annuels plafonnés par fonds et par bénéficiaire, épuisés en cours d'année dans plusieurs d'entre eux.",
      "2027":
        "Les plafonds se révisent chaque année. Déposez dès janvier : c'est le facteur qui décide le plus souvent de l'issue.",
    },
  },
  {
    slug: "agefiph",
    statut: { "2026": "ouvert", "2027": "ouvert" },
    note: {
      "2026":
        "Aides complémentaires au droit commun, instruites par la délégation régionale.",
      "2027": "Inchangé.",
    },
  },
  {
    slug: "cpf",
    statut: { "2026": "ouvert", "2027": "sous-reserve" },
    note: {
      "2026":
        "Mobilisable uniquement sur des actions certifiantes enregistrées au RNCP ou au Répertoire spécifique. Une participation forfaitaire du titulaire s'applique.",
      "2027":
        "Le projet de loi de finances pour 2027 prévoit 350 M€ d'économies sur le CPF. Les modalités précises restent à arrêter.",
    },
  },
  {
    slug: "autofinancement",
    statut: { "2026": "ouvert", "2027": "ouvert" },
    note: {
      "2026": "Toujours possible, sans condition.",
      "2027": "Inchangé.",
    },
  },
  {
    slug: "pro-a",
    statut: { "2026": "sous-reserve", "2027": "sous-reserve" },
    note: {
      "2026":
        "Suppose une certification enregistrée figurant sur la liste de la branche.",
      "2027": "Inchangé dans son principe.",
    },
  },
  {
    slug: "projet-transition-professionnelle",
    statut: { "2026": "ouvert", "2027": "sous-reserve" },
    note: {
      "2026": "Instruit par Transitions Pro, sur enveloppes régionales annuelles.",
      "2027": "Enveloppes régionales arrêtées en début d'exercice.",
    },
  },
];

export const statutDispositif = (slug: string): StatutParAnnee | undefined =>
  statutsDispositifs.find((s) => s.slug === slug);

/** Seuils d'effectif qui commandent l'accès aux fonds mutualisés. */
export const seuilsEffectif = {
  contributionLegale: [
    { tranche: "Moins de 11 salariés", taux: "0,55 % de la masse salariale" },
    { tranche: "11 salariés et plus", taux: "1 % de la masse salariale" },
  ],
  fondsMutualises:
    "Depuis la loi du 5 septembre 2018, les fonds mutualisés des OPCO ne financent le plan de développement des compétences que pour les entreprises de moins de 50 salariés. Au-delà, l'entreprise mobilise son budget propre, les contributions conventionnelles de sa branche, des versements volontaires ou des enveloppes thématiques.",
} as const;
