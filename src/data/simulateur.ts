import { fundingRoutes, type FundingRoute } from "./financement";
import { opcoById, type OpcoId } from "./opco";
import {
  statutDispositif,
  type AnneeFormation,
  type Statut,
} from "./financement-actualite";

/**
 * Moteur d'orientation vers les dispositifs de financement.
 *
 * Il ne calcule aucun montant et ne promet aucune prise en charge : les
 * barèmes sont révisés chaque année et relèvent du financeur. Il classe les
 * dispositifs par pertinence au regard de la situation décrite, explique
 * pourquoi, et signale ce qui ne s'applique pas — notamment les dispositifs
 * réservés aux actions certifiantes, que nos modules courts ne sont pas.
 */

export type Pertinence = "prioritaire" | "possible" | "non-applicable";

export const pertinenceLabels: Record<Pertinence, string> = {
  prioritaire: "À mobiliser en priorité",
  possible: "Possible selon votre situation",
  "non-applicable": "Ne s'applique pas ici",
};

export type Recommendation = {
  route: FundingRoute;
  pertinence: Pertinence;
  /** Pourquoi ce dispositif ressort — ou pourquoi il est écarté. */
  reason: string;
  /** État du dispositif pour l'année de formation retenue. */
  statut?: Statut;
  /** Ce que l'actualité impose de savoir pour cette année-là. */
  actualite?: string;
  source?: { label: string; url: string };
};

/** Complète une recommandation avec la veille de l'année visée. */
function avecActualite(reco: Recommendation, annee: AnneeFormation): Recommendation {
  const veille = statutDispositif(reco.route.slug);
  if (!veille) return reco;
  return {
    ...reco,
    statut: veille.statut[annee],
    actualite: veille.note[annee],
    source: veille.source,
  };
}

/* ─────────────────────────────── Entreprise ─────────────────────────────── */

export type CompanySize = "moins-11" | "11-49" | "50-249" | "250-plus";
export type Headcount = "1-3" | "4-10" | "11-30" | "30+";
export type CompanyContext =
  | "adaptation"
  | "transformation"
  | "difficulte"
  | "recrutement";

export const companySizeLabels: Record<CompanySize, string> = {
  "moins-11": "Moins de 11 salariés",
  "11-49": "11 à 49 salariés",
  "50-249": "50 à 249 salariés",
  "250-plus": "250 salariés et plus",
};

/** Le seuil qui commande l'accès aux fonds mutualisés du plan. */
export const sousLeSeuilDe50 = (size: CompanySize): boolean =>
  size === "moins-11" || size === "11-49";

export const headcountLabels: Record<Headcount, string> = {
  "1-3": "1 à 3 personnes",
  "4-10": "4 à 10 personnes",
  "11-30": "11 à 30 personnes",
  "30+": "Plus de 30 personnes, ou plusieurs sites",
};

export const companyContextLabels: Record<CompanyContext, string> = {
  adaptation: "Monter en compétence sur le poste actuel",
  transformation:
    "Accompagner un projet de transformation — technique, organisationnel, métier",
  difficulte: "L'entreprise traverse une difficulté économique",
  recrutement: "Former une personne que nous recrutons",
};

export type CompanyInput = {
  size: CompanySize;
  headcount: Headcount;
  context: CompanyContext;
  opco: OpcoId | null;
  /** L'année de déroulement change l'état des enveloppes. */
  annee: AnneeFormation;
  /**
   * Convention collective ou branche. C'est elle qui fixe les barèmes à
   * l'intérieur d'un même OPCO, et qui ouvre certains soutiens conventionnels.
   */
  branche?: string;
};

const normalise = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, " ")
    .toLowerCase();

/**
 * Repère si la branche déclarée bénéficie, chez cet OPCO, d'un soutien
 * conventionnel complémentaire publié.
 */
function matchBrancheSoutien(
  opcoId: OpcoId | null,
  branche?: string,
): string | null {
  if (!opcoId || !branche || branche.trim().length < 3) return null;
  const opco = opcoById(opcoId);
  const listes = opco?.dispositifs?.flatMap((d) => d.branchesSoutien ?? []) ?? [];
  const needle = normalise(branche.trim());
  return (
    listes.find((b) => {
      const hay = normalise(b);
      return hay.includes(needle) || needle.includes(normalise(b.split("(")[0].trim()));
    }) ?? null
  );
}

const route = (slug: string): FundingRoute => {
  const found = fundingRoutes.find((r) => r.slug === slug);
  if (!found) throw new Error(`Dispositif inconnu : ${slug}`);
  return found;
};

export function recommendForCompany(input: CompanyInput): Recommendation[] {
  const { size, headcount, context, opco, annee, branche } = input;
  const petite = sousLeSeuilDe50(size);
  const recos: Recommendation[] = [];

  recos.push({
    route: route("plan-developpement-competences"),
    pertinence: "prioritaire",
    reason:
      "La seule voie qui ne dépende d'aucune enveloppe ni d'aucun calendrier : l'entreprise décide, inscrit et règle. Tout le reste vient en complément ou en remboursement.",
  });

  recos.push({
    route: route("opco"),
    pertinence: petite ? "prioritaire" : "possible",
    reason: petite
      ? "Sous le seuil de 50 salariés, les fonds mutualisés financent votre plan de développement des compétences. C'est le premier réflexe, et il se déclenche avant toute dépense."
      : "Depuis la loi du 5 septembre 2018, les fonds mutualisés ne financent plus le plan au-delà de 50 salariés. Votre OPCO reste mobilisable sur les niveaux définis par votre branche et sur des cofinancements de projets spécifiques : l'appel à votre conseiller reste utile, mais n'en attendez pas une prise en charge de droit commun.",
  });

  // Les leviers qui prennent le relais au-delà du seuil de 50 salariés.
  const soutienBranche = matchBrancheSoutien(opco, branche);
  recos.push({
    route: route("contributions-conventionnelles"),
    pertinence: soutienBranche || !petite ? "prioritaire" : "possible",
    reason: soutienBranche
      ? `Votre branche — ${soutienBranche} — figure parmi celles auxquelles votre OPCO réserve un soutien conventionnel complémentaire, au-delà de 50 salariés. C'est un levier identifié, pas une hypothèse : demandez-en le barème à votre conseiller.`
      : petite
        ? "Si votre branche a instauré une contribution conventionnelle, elle s'ajoute aux fonds mutualisés et finance des actions fléchées par la commission paritaire."
        : "C'est le levier le plus souvent ignoré des entreprises de votre taille, et précisément celui qui prend le relais des fonds mutualisés. Vérifiez si votre convention collective en a institué une.",
  });

  recos.push({
    route: route("versements-volontaires"),
    pertinence: petite ? "possible" : "prioritaire",
    reason: petite
      ? "Utile si vous voulez sécuriser un budget pluriannuel géré par l'OPCO, ou financer la contrepartie exigée par un dispositif cofinancé."
      : "Exclu des fonds mutualisés du plan, vous pouvez néanmoins confier un budget à un OPCO — y compris un autre que le vôtre — pour le gérer et le flécher. C'est aussi par là que se finance la contrepartie des dispositifs cofinancés.",
  });

  // Le FSE+ a remplacé le FNE-Formation et ignore le seuil des 50 salariés :
  // c'est souvent le meilleur levier quand l'enveloppe du plan est épuisée.
  recos.push({
    route: route("fse-plus"),
    pertinence:
      context === "transformation" || context === "difficulte"
        ? "prioritaire"
        : "possible",
    reason:
      context === "transformation" || context === "difficulte"
        ? petite
          ? "C'est votre meilleure carte. Le FSE+ a pris la suite du FNE-Formation, il vise précisément les formations de transformation, et il ne connaît pas le seuil des 50 salariés. Chez certains OPCO, une entreprise de votre taille atteint 100 % de prise en charge. En revanche il impose ses règles : quatorze heures minimum, pas de e-learning, pas de formation interne, et aucun autre financement public par-dessus."
          : "Le FSE+ a pris la suite du FNE-Formation et, contrairement aux fonds mutualisés du plan, il reste ouvert au-delà de 50 salariés — en général à hauteur de la moitié des coûts pédagogiques. C'est la voie la plus solide pour une entreprise de votre taille engagée dans une mutation."
        : "Le FSE+ finance les formations qui accompagnent une transformation. Votre contexte n'est pas décrit comme tel, mais si le projet s'y rattache — transition numérique, écologique ou démographique — il mérite d'être posé à votre conseiller : il ignore le seuil des 50 salariés.",
  });

  if (context === "recrutement") {
    recos.push({
      route: route("france-travail"),
      pertinence: "prioritaire",
      reason:
        "Vous recrutez : la préparation opérationnelle à l'emploi finance la formation du candidat avant sa prise de poste. Il faut une promesse d'embauche ou un besoin formalisé, et l'accord du conseiller avant tout démarrage.",
    });
  }

  if (headcount === "30+" || headcount === "11-30") {
    recos.push({
      route: route("accord-cadre"),
      pertinence: headcount === "30+" ? "prioritaire" : "possible",
      reason:
        headcount === "30+"
          ? "À ce volume, un accord-cadre se justifie : conditions tarifaires liées aux volumes, sessions dédiées, facturation regroupée et pilotage commun."
          : "Si ce besoin se répète d'un exercice à l'autre, un accord-cadre pluriannuel sécurise vos conditions — utile alors que les financements publics se resserrent.",
    });
  }

  recos.push({
    route: route("agefiph"),
    pertinence: "possible",
    reason:
      "Si l'un des participants est bénéficiaire de l'obligation d'emploi, l'AGEFIPH complète le droit commun et couvre la compensation du handicap en situation de formation.",
  });

  recos.push({
    route: route("cpf"),
    pertinence: "non-applicable",
    reason:
      "Le CPF appartient au salarié et ne finance que des actions certifiantes enregistrées. Nos modules délivrent une attestation de fin de formation : ils n'y sont pas éligibles.",
  });

  return recos.map((r) => avecActualite(r, annee));
}

/* ─────────────────────────────── Particulier ────────────────────────────── */

export type PersonStatus =
  | "salarie-prive"
  | "demandeur-emploi"
  | "independant"
  | "agent-public";

export type PersonGoal =
  | "poste-actuel"
  | "evolution"
  | "reconversion"
  | "creation";

export type EmployerStance = "favorable" | "a-convaincre" | "hors-sujet";

export const personStatusLabels: Record<PersonStatus, string> = {
  "salarie-prive": "Salarié du secteur privé",
  "demandeur-emploi": "Demandeur d'emploi",
  independant: "Indépendant, profession libérale ou dirigeant non salarié",
  "agent-public": "Agent de la fonction publique",
};

export const personGoalLabels: Record<PersonGoal, string> = {
  "poste-actuel": "Être plus efficace sur mon poste actuel",
  evolution: "Évoluer vers de nouvelles responsabilités",
  reconversion: "Changer de métier",
  creation: "Développer ou créer mon activité",
};

export const employerStanceLabels: Record<EmployerStance, string> = {
  favorable: "Mon employeur soutient la démarche",
  "a-convaincre": "Je n'en ai pas encore parlé, ou il reste à convaincre",
  "hors-sujet": "Sans objet",
};

export type PersonInput = {
  status: PersonStatus;
  goal: PersonGoal;
  employer: EmployerStance;
  annee: AnneeFormation;
};

export function recommendForPerson(input: PersonInput): Recommendation[] {
  const { status, goal, employer, annee } = input;
  const recos: Recommendation[] = [];

  if (status === "salarie-prive") {
    recos.push({
      route: route("plan-developpement-competences"),
      pertinence: employer === "favorable" ? "prioritaire" : "possible",
      reason:
        employer === "favorable"
          ? "C'est de loin la voie la plus simple : votre employeur inscrit, règle et vous vous formez sur votre temps de travail, rémunération maintenue. Faites-lui demander un devis."
          : "C'est la voie la plus efficace, mais elle suppose l'accord de l'employeur. Un argumentaire centré sur le gain opérationnel attendu — et non sur votre intérêt personnel — fonctionne généralement mieux.",
    });
    recos.push({
      route: route("opco"),
      pertinence: "possible",
      reason:
        "Votre employeur peut faire prendre en charge tout ou partie du coût par son OPCO. C'est son dossier à déposer, pas le vôtre, mais le lui signaler aide souvent à débloquer la décision.",
    });
  }

  if (status === "demandeur-emploi") {
    recos.push({
      route: route("france-travail"),
      pertinence: "prioritaire",
      reason:
        "L'aide individuelle à la formation peut financer une action nécessaire à votre retour à l'emploi. Elle est subsidiaire : votre conseiller vérifiera d'abord qu'aucune autre voie n'existe, et doit valider avant tout engagement.",
    });
  }

  if (status === "independant") {
    recos.push({
      route: route("faf-independants"),
      pertinence: "prioritaire",
      reason:
        "Vous cotisez à la formation professionnelle et disposez d'un budget annuel auprès de votre fonds : FIF PL pour les professions libérales, AGEFICE pour les dirigeants non salariés, FAFCEA pour les artisans. Les plafonds sont vite atteints : déposez tôt dans l'année.",
    });
  }

  if (status === "agent-public") {
    recos.push({
      route: route("plan-developpement-competences"),
      pertinence: "possible",
      reason:
        "La fonction publique dispose de ses propres dispositifs — plan de formation de l'employeur, CPF public, congé de formation professionnelle. La logique reste la même : la demande passe par votre service formation. Parlons-en, nous avons l'habitude de ces montages.",
    });
  }

  const certifying = goal === "reconversion";
  recos.push({
    route: route("cpf"),
    pertinence: "non-applicable",
    reason: certifying
      ? "Pour une reconversion, le CPF est la voie naturelle — mais il exige une action certifiante enregistrée au RNCP ou au Répertoire spécifique. Nos modules courts délivrent une attestation de fin de formation et une évaluation des acquis, pas une certification enregistrée."
      : "Le CPF ne finance que des actions certifiantes enregistrées. Nos modules n'entrent pas dans ce cadre : visez plutôt le plan de développement des compétences de votre employeur.",
  });

  if (goal === "reconversion" && status === "salarie-prive") {
    recos.push({
      route: route("projet-transition-professionnelle"),
      pertinence: "non-applicable",
      reason:
        "Le projet de transition professionnelle finance une reconversion, rémunération comprise — mais lui aussi suppose une certification enregistrée. Un conseiller en évolution professionnelle, gratuit, vous aidera à bâtir le parcours complet ; nos modules peuvent en constituer une brique, pas la totalité.",
    });
  }

  recos.push({
    route: route("autofinancement"),
    pertinence:
      status === "salarie-prive" && employer === "favorable" ? "non-applicable" : "possible",
    reason:
      status === "salarie-prive" && employer === "favorable"
        ? "Inutile de payer vous-même : votre employeur soutient la démarche, c'est à lui de la porter."
        : "Possible sur nos sessions inter-entreprises, mais à n'envisager qu'après avoir épuisé les autres voies : un salarié passe presque toujours par son employeur, un indépendant par son fonds d'assurance formation.",
  });

  return recos.map((r) => avecActualite(r, annee));
}

/** Ordre d'affichage : le plus actionnable d'abord. */
export const sortRecommendations = (recos: Recommendation[]): Recommendation[] => {
  const rank: Record<Pertinence, number> = {
    prioritaire: 0,
    possible: 1,
    "non-applicable": 2,
  };
  return [...recos].sort((a, b) => rank[a.pertinence] - rank[b.pertinence]);
};
