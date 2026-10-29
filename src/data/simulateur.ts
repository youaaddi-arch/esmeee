import { fundingRoutes, type FundingRoute } from "./financement";
import type { OpcoId } from "./opco";

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
};

/* ─────────────────────────────── Entreprise ─────────────────────────────── */

export type CompanySize = "tpe" | "pe" | "eti" | "ge";
export type Headcount = "1-3" | "4-10" | "11-30" | "30+";
export type CompanyContext =
  | "adaptation"
  | "transformation"
  | "difficulte"
  | "recrutement";

export const companySizeLabels: Record<CompanySize, string> = {
  tpe: "Moins de 11 salariés",
  pe: "11 à 49 salariés",
  eti: "50 à 249 salariés",
  ge: "250 salariés et plus",
};

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
};

const route = (slug: string): FundingRoute => {
  const found = fundingRoutes.find((r) => r.slug === slug);
  if (!found) throw new Error(`Dispositif inconnu : ${slug}`);
  return found;
};

export function recommendForCompany(input: CompanyInput): Recommendation[] {
  const { size, headcount, context } = input;
  const recos: Recommendation[] = [];

  recos.push({
    route: route("plan-developpement-competences"),
    pertinence: "prioritaire",
    reason:
      "C'est la voie la plus directe, quelle que soit votre situation : l'entreprise décide, inscrit et règle. Tout le reste vient en complément ou en remboursement.",
  });

  const smallCompany = size === "tpe" || size === "pe";
  recos.push({
    route: route("opco"),
    pertinence: "prioritaire",
    reason: smallCompany
      ? "Avec moins de 50 salariés, vous relevez des publics prioritaires de votre OPCO : les niveaux de prise en charge y sont les plus favorables. À instruire avant toute dépense."
      : "Au-delà de 50 salariés, la prise en charge est plus encadrée, mais votre branche peut disposer d'enveloppes conventionnelles ou thématiques. Un appel à votre conseiller OPCO coûte dix minutes et peut changer le plan de financement.",
  });

  if (context === "transformation" || context === "difficulte") {
    recos.push({
      route: route("fne-formation"),
      pertinence: "prioritaire",
      reason:
        context === "difficulte"
          ? "Le FNE-Formation vise précisément les entreprises en difficulté économique. Il s'instruit auprès de votre OPCO, sur des enveloppes annuelles limitées : déposez tôt."
          : "Votre projet relève d'une mutation, ce qui est le cœur de cible du FNE-Formation — en particulier sur les transitions écologique et numérique. Il s'instruit auprès de votre OPCO.",
    });
  } else {
    recos.push({
      route: route("fne-formation"),
      pertinence: "non-applicable",
      reason:
        "Le FNE-Formation suppose une mutation documentée ou une difficulté économique. Une montée en compétence sur le poste actuel n'y ouvre pas droit.",
    });
  }

  if (context === "recrutement") {
    recos.push({
      route: route("france-travail"),
      pertinence: "prioritaire",
      reason:
        "Vous recrutez : la préparation opérationnelle à l'emploi (POEI) finance la formation du candidat avant sa prise de poste. Il faut une promesse d'embauche ou un besoin de recrutement formalisé, et l'accord du conseiller avant le démarrage.",
    });
  }

  if (headcount === "30+" || headcount === "11-30") {
    recos.push({
      route: route("accord-cadre"),
      pertinence: headcount === "30+" ? "prioritaire" : "possible",
      reason:
        headcount === "30+"
          ? "À ce volume, un accord-cadre se justifie : conditions tarifaires liées aux volumes, sessions dédiées, facturation regroupée et pilotage commun."
          : "Si ce besoin se répète d'une année sur l'autre, un accord-cadre pluriannuel devient intéressant.",
    });
  }

  recos.push({
    route: route("agefiph"),
    pertinence: "possible",
    reason:
      "Si l'un des participants est bénéficiaire de l'obligation d'emploi, l'AGEFIPH peut compléter le financement de droit commun et couvrir la compensation du handicap en situation de formation.",
  });

  recos.push({
    route: route("cpf"),
    pertinence: "non-applicable",
    reason:
      "Le CPF appartient au salarié et ne finance que des actions certifiantes enregistrées au RNCP ou au Répertoire spécifique. Nos modules délivrent une attestation de fin de formation : ils n'y sont pas éligibles.",
  });

  return recos;
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
};

export function recommendForPerson(input: PersonInput): Recommendation[] {
  const { status, goal, employer } = input;
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

  return recos;
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
