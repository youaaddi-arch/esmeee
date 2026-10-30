/**
 * Dispositifs de financement de la formation professionnelle continue.
 *
 * Le catalogue ESME Executive Education 2027 indique : « Nos formations sont
 * éligibles aux dispositifs de financement de la formation professionnelle
 * (OPCO, plan de développement des compétences). Tarifs communiqués sur demande. »
 *
 * Cette page recense l’ensemble des voies de financement mobilisables en France.
 * Les règles, plafonds et montants évoluant chaque année, les montants chiffrés
 * ne sont pas affichés : ils sont systématiquement renvoyés vers le financeur.
 * Voir CONTENT.md pour les points à valider avant mise en ligne.
 */

export type FundingAudience =
  | "entreprise"
  | "salarie"
  | "independant"
  | "demandeur-emploi";

export const audienceLabels: Record<FundingAudience, string> = {
  entreprise: "Employeur",
  salarie: "Salarié",
  independant: "Indépendant & dirigeant",
  "demandeur-emploi": "Demandeur d’emploi",
};

export type FundingRoute = {
  slug: string;
  name: string;
  acronym?: string;
  /** Qui mobilise le dispositif. */
  audiences: FundingAudience[];
  /** Résumé en une phrase. */
  summary: string;
  /** Ce que le dispositif prend en charge. */
  covers: string[];
  /** Conditions d’accès. */
  conditions: string[];
  /** Démarche, dans l’ordre. */
  steps: string[];
  /** Point de vigilance — ce qui bloque le plus souvent un dossier. */
  caveat?: string;
  /** Applicabilité aux formations du catalogue ESME Executive Education. */
  eligibility: "directe" | "conditionnelle" | "hors-catalogue";
  source?: string;
};

export const eligibilityLabels: Record<FundingRoute["eligibility"], string> = {
  directe: "Mobilisable sur nos formations",
  conditionnelle: "Sous conditions",
  "hors-catalogue": "Nécessite une certification enregistrée",
};

export const fundingRoutes: FundingRoute[] = [
  {
    slug: "plan-developpement-competences",
    name: "Plan de développement des compétences",
    audiences: ["entreprise"],
    summary:
      "Le budget formation de l’entreprise. C’est la voie la plus directe pour inscrire un collaborateur à l’une de nos formations, en inter comme en intra.",
    covers: [
      "Le coût pédagogique de la formation",
      "Le maintien de la rémunération du salarié, le temps de formation étant du temps de travail",
      "Les frais annexes selon la politique de l’entreprise : déplacement, hébergement, restauration",
    ],
    conditions: [
      "La décision relève de l’employeur, qui construit son plan annuel",
      "L’employeur est tenu d’assurer l’adaptation des salariés à leur poste de travail et de veiller au maintien de leur capacité à occuper un emploi",
      "L’accord écrit du salarié n’est pas requis pour une action d’adaptation au poste, qui relève de l’exécution normale du contrat de travail",
    ],
    steps: [
      "Recensez les besoins avec les managers et les équipes RH",
      "Demandez-nous un devis : nous précisons programme, durée, modalités et tarif",
      "Nous établissons la convention de formation, qui vaut engagement contractuel",
      "Nous adressons la convocation aux participants avant le démarrage",
    ],
    caveat:
      "Pensez à vérifier si tout ou partie de la dépense est remboursable par votre OPCO : les deux dispositifs se combinent.",
    eligibility: "directe",
  },
  {
    slug: "opco",
    name: "Opérateur de compétences",
    acronym: "OPCO",
    audiences: ["entreprise"],
    summary:
      "Les onze OPCO financent la montée en compétences des salariés, en priorité dans les entreprises de moins de 50 salariés. C’est le premier réflexe à avoir avant d’engager une dépense.",
    covers: [
      "Tout ou partie du coût pédagogique, selon les critères de prise en charge de votre branche",
      "Selon les OPCO et les enveloppes : une partie de la rémunération et des frais annexes",
      "Des enveloppes thématiques dédiées, notamment sur les transitions numérique et écologique",
    ],
    conditions: [
      "Votre OPCO est déterminé par votre convention collective, et non par votre choix",
      "L’organisme de formation doit être certifié Qualiopi : c’est notre cas",
      "La demande de prise en charge doit être déposée et validée avant le démarrage de la formation",
    ],
    steps: [
      "Identifiez votre OPCO à partir de votre convention collective ou de votre code IDCC",
      "Demandez-nous le devis et le programme détaillé : ce sont les pièces attendues au dossier",
      "Déposez la demande de prise en charge sur le portail de votre OPCO",
      "Transmettez-nous l’accord de prise en charge : la subrogation de paiement peut alors être mise en place",
    ],
    caveat:
      "Un dossier déposé après le démarrage de la formation est rejeté. Prévoyez trois à six semaines d’instruction selon l’OPCO.",
    eligibility: "directe",
    source:
      "Conditions générales de vente ESME Executive Education, article 9 — Financement par un organisme tiers",
  },
  {
    slug: "cpf",
    name: "Compte personnel de formation",
    acronym: "CPF",
    audiences: ["salarie", "demandeur-emploi", "independant"],
    summary:
      "Les droits acquis par chaque actif, mobilisables depuis Mon Compte Formation. Le CPF ne finance que des actions débouchant sur une certification enregistrée par France Compétences.",
    covers: [
      "Le coût pédagogique d’une action certifiante, dans la limite des droits disponibles",
      "Un abondement complémentaire de l’employeur, d’un OPCO, d’une région ou de France Travail est possible",
    ],
    conditions: [
      "L’action doit être enregistrée au Répertoire national des certifications professionnelles (RNCP) ou au Répertoire spécifique (RS)",
      "Une participation forfaitaire du titulaire s’applique depuis 2024, revalorisée chaque année ; les demandeurs d’emploi et les dossiers abondés par l’employeur en sont exonérés",
      "Le salarié décide seul s’il se forme hors temps de travail ; l’accord de l’employeur est requis pour une formation sur le temps de travail",
    ],
    steps: [
      "Vérifiez vos droits sur moncompteformation.gouv.fr",
      "Contactez-nous pour savoir si la formation visée relève d’une certification enregistrée",
      "Le cas échéant, déposez votre dossier depuis Mon Compte Formation",
    ],
    caveat:
      "Nos modules courts donnent lieu à une évaluation des acquis et à une attestation de fin de formation, non à une certification enregistrée. Le CPF ne s’y applique donc pas directement : parlons-en, nous vous orienterons vers la bonne voie de financement.",
    eligibility: "hors-catalogue",
  },
  {
    slug: "pro-a",
    name: "Reconversion ou promotion par alternance",
    acronym: "Pro-A",
    audiences: ["entreprise", "salarie"],
    summary:
      "Un dispositif d’alternance pour les salariés en poste, destiné à faire évoluer leur qualification sans rompre le contrat de travail.",
    covers: [
      "Le coût pédagogique, pris en charge par l’OPCO selon le niveau de prise en charge de la branche",
      "Une partie de la rémunération durant les périodes de formation, selon les cas",
    ],
    conditions: [
      "La certification visée doit être enregistrée au RNCP et figurer sur la liste de votre branche professionnelle",
      "Le salarié ne doit pas déjà détenir une qualification de niveau supérieur ou égal à celle visée, dans les limites fixées par la loi",
      "Le dispositif prend la forme d’un avenant au contrat de travail",
    ],
    steps: [
      "Vérifiez avec votre OPCO que la certification visée figure sur la liste de votre branche",
      "Formalisez l’avenant au contrat de travail",
      "Déposez le dossier auprès de l’OPCO",
    ],
    caveat:
      "Pro-A ne finance pas des modules courts non certifiants. Il s’inscrit dans un parcours diplômant ou qualifiant.",
    eligibility: "hors-catalogue",
  },
  {
    slug: "projet-transition-professionnelle",
    name: "Projet de transition professionnelle",
    acronym: "PTP",
    audiences: ["salarie"],
    summary:
      "L’ancien congé individuel de formation, instruit par l’association Transitions Pro de votre région. Il finance une reconversion, formation et rémunération comprises.",
    covers: [
      "Le coût pédagogique de la formation",
      "Le maintien de tout ou partie de la rémunération pendant la durée du parcours",
      "Selon les cas, les frais annexes",
    ],
    conditions: [
      "Justifier d’une ancienneté minimale, appréciée par Transitions Pro",
      "Viser une certification enregistrée au RNCP ou au RS",
      "Demander une autorisation d’absence à l’employeur lorsque la formation se tient sur le temps de travail",
    ],
    steps: [
      "Faites le point avec un conseiller en évolution professionnelle : le CEP est gratuit",
      "Construisez le dossier avec Transitions Pro de votre région",
      "Déposez le dossier dans les délais fixés par la commission d’instruction",
    ],
    caveat:
      "Le PTP sert un projet de changement de métier, pas une montée en compétences sur le poste actuel.",
    eligibility: "hors-catalogue",
  },
  {
    slug: "france-travail",
    name: "France Travail",
    audiences: ["demandeur-emploi", "entreprise"],
    summary:
      "Pour un demandeur d’emploi, ou pour une entreprise qui recrute et doit former le futur salarié avant sa prise de poste.",
    covers: [
      "Aide individuelle à la formation (AIF) : tout ou partie du coût pédagogique d’une formation nécessaire au retour à l’emploi",
      "Préparation opérationnelle à l’emploi (POEI) : la formation d’un candidat recruté, préalable à la prise de poste",
      "Action de formation préalable au recrutement (AFPR) : même logique, sur des contrats plus courts",
    ],
    conditions: [
      "Le projet doit être validé par le conseiller France Travail avant tout engagement",
      "Pour la POEI et l’AFPR, une promesse d’embauche ou un besoin de recrutement formalisé est nécessaire",
      "L’organisme doit être certifié Qualiopi : c’est notre cas",
    ],
    steps: [
      "Le candidat, ou l’entreprise qui recrute, saisit le conseiller France Travail du projet",
      "Nous fournissons le devis et le programme détaillé attendus au dossier",
      "La décision de prise en charge intervient avant le démarrage",
    ],
    caveat:
      "L’AIF est une aide subsidiaire : le conseiller vérifie d’abord si une autre voie de financement existe.",
    eligibility: "conditionnelle",
  },
  {
    slug: "faf-independants",
    name: "Fonds d’assurance formation des indépendants",
    acronym: "FIF PL, AGEFICE, FAFCEA",
    audiences: ["independant"],
    summary:
      "Les travailleurs indépendants, professions libérales, dirigeants non salariés et artisans cotisent à la formation professionnelle et disposent d’un budget annuel auprès de leur fonds.",
    covers: [
      "Le coût pédagogique, dans la limite d’un plafond annuel propre à chaque fonds",
      "Selon les fonds, des enveloppes thématiques spécifiques",
    ],
    conditions: [
      "Être à jour de la contribution à la formation professionnelle",
      "Le fonds compétent dépend du statut : FIF PL pour les professions libérales, AGEFICE pour les commerçants et dirigeants non salariés, FAFCEA et conseils de la formation pour les artisans",
      "Les critères et plafonds sont révisés chaque année",
    ],
    steps: [
      "Identifiez votre fonds à partir de votre statut et de votre code d’activité",
      "Demandez-nous devis et programme détaillé",
      "Déposez la demande en respectant le calendrier du fonds, souvent antérieur au démarrage",
    ],
    caveat:
      "Les plafonds annuels sont vite atteints : déposez tôt dans l’année civile.",
    eligibility: "directe",
  },
  {
    slug: "agefiph",
    name: "AGEFIPH",
    audiences: ["salarie", "entreprise", "demandeur-emploi"],
    summary:
      "Des aides spécifiques pour la formation des personnes en situation de handicap, et pour l’adaptation des conditions de formation.",
    covers: [
      "Un cofinancement du coût pédagogique en complément des autres dispositifs",
      "La compensation du handicap en situation de formation : adaptation des supports, interprétariat, aides techniques",
    ],
    conditions: [
      "Être bénéficiaire de l’obligation d’emploi, ou engagé dans une démarche de reconnaissance",
      "L’aide est complémentaire : elle ne se substitue pas au droit commun",
    ],
    steps: [
      "Contactez notre référente handicap, qui étudie en amont les aménagements possibles",
      "Mobilisez le référent handicap de votre entreprise ou votre conseiller Cap emploi",
      "Le dossier est instruit par la délégation régionale AGEFIPH",
    ],
    eligibility: "conditionnelle",
  },
  {
    slug: "fse-plus",
    name: "Fonds social européen +",
    acronym: "FSE+",
    audiences: ["entreprise"],
    summary:
      "Le cofinancement européen des actions de formation, distribué en France par les OPCO et les Régions. Il a pris la suite du FNE-Formation, dont la ligne budgétaire est fermée depuis 2025, et il ignore le seuil des 50 salariés qui ferme les fonds mutualisés du plan.",
    covers: [
      "La moitié des coûts pédagogiques en règle générale, et jusqu'à la totalité pour les moins de 50 salariés chez les OPCO qui abondent sur leurs fonds propres",
      "Des plafonds horaires : chez OPCO EP, 50 € par heure et par stagiaire sous 50 salariés, 25 € au-delà",
      "Selon les dossiers, une rémunération forfaitaire du stagiaire",
    ],
    conditions: [
      "Un échange préalable avec votre conseiller OPCO ouvre le droit au financement",
      "Une durée minimale, souvent quatorze heures, et une thématique qui entre dans les axes de l'appel",
      "Sont exclus le e-learning, les formations internes, l'AFEST, les obligations de sécurité, les bilans de compétences, la VAE et le CACES",
      "Aucun autre cofinancement public, CPF compris, ne peut s'y ajouter ; le reste à charge se règle par versement volontaire",
    ],
    steps: [
      "Demandez à votre conseiller OPCO quelles actions collectives cofinancées sont ouvertes",
      "Vérifiez que la thématique visée entre dans le périmètre de l'appel",
      "Déposez le dossier dans le calendrier de l'appel, toujours avant le démarrage",
    ],
    caveat:
      "Les règles sont propres à chaque OPCO et à chaque millésime : taux, plafonds, axes thématiques et calendrier. Chez OPCO EP, les actions peuvent se dérouler jusqu'au 31 décembre 2027 ; chez OPCO 2i, la campagne publiée est échue. Vérifiez le millésime en cours avant de bâtir un plan de financement.",
    eligibility: "conditionnelle",
    source: "fse.gouv.fr et appels à projets des OPCO",
  },
  {
    slug: "contributions-conventionnelles",
    name: "Contributions conventionnelles de branche",
    audiences: ["entreprise"],
    summary:
      "Certaines branches ont instauré, par accord collectif, une contribution supplémentaire à la contribution légale. Elle alimente des enveloppes propres à la branche, souvent ouvertes au-delà du seuil de 50 salariés.",
    covers: [
      "Des actions fléchées par la branche, selon ses priorités",
      "Selon les accords, une part du coût pédagogique au-delà des fonds mutualisés de droit commun",
    ],
    conditions: [
      "Votre convention collective doit avoir institué une telle contribution",
      "Les priorités et les barèmes sont fixés par la commission paritaire de la branche",
      "Le décret n° 2026-259 du 8 avril 2026 organise le reversement trimestriel de ces contributions aux OPCO par France compétences",
    ],
    steps: [
      "Vérifiez auprès de votre OPCO si votre branche a instauré une contribution conventionnelle",
      "Demandez les priorités et le barème en vigueur pour l'exercice",
      "Déposez la demande selon le circuit de la branche, avant le démarrage",
    ],
    caveat:
      "C'est le levier le plus souvent oublié des entreprises de 50 salariés et plus, précisément celles que les fonds mutualisés du plan n'atteignent pas.",
    eligibility: "conditionnelle",
  },
  {
    slug: "versements-volontaires",
    name: "Versements volontaires à un OPCO",
    audiences: ["entreprise"],
    summary:
      "Au-delà de ses obligations, l'entreprise peut confier des sommes à un OPCO pour se constituer un budget formation géré, fléché et sécurisé d'un exercice sur l'autre.",
    covers: [
      "Les actions que vous décidez, dans le cadre de gestion convenu avec l'OPCO",
      "La contrepartie exigée par certains dispositifs cofinancés, qui doit précisément être financée ainsi",
    ],
    conditions: [
      "Ouvert quelle que soit la taille de l'entreprise",
      "Les versements peuvent être adressés à un OPCO autre que celui dont relève l'entreprise",
      "Ils sont suivis dans une section comptable distincte des contributions obligatoires",
    ],
    steps: [
      "Cadrez le montant et l'horizon avec votre conseiller OPCO",
      "Formalisez le versement et son affectation",
      "Mobilisez-le au fil de vos actions, sans repasser par une instruction à chaque fois",
    ],
    caveat:
      "Pertinent surtout à partir de 50 salariés, et quand un dispositif cofinancé exige une contrepartie.",
    eligibility: "directe",
  },
  {
    slug: "accord-cadre",
    name: "Accord-cadre grands comptes",
    audiences: ["entreprise"],
    summary:
      "Pour les organisations qui engagent des volumes significatifs ou des dispositifs pluriannuels, des conditions particulières sont définies contractuellement.",
    covers: [
      "Des conditions tarifaires préférentielles liées aux volumes",
      "L’organisation de sessions dédiées ou de programmes sur-mesure",
      "Des modalités de facturation adaptées : échéancier, regroupement",
      "Des modalités de pilotage et de suivi des actions de formation",
    ],
    conditions: [
      "Un volume ou un engagement pluriannuel qui justifie un accord-cadre",
      "Des engagements réciproques en matière de planification",
    ],
    steps: [
      "Nous cadrons ensemble le périmètre pluriannuel et les publics concernés",
      "Nous formalisons l’accord-cadre ou les conditions particulières de la convention",
      "Le pilotage s’organise autour des indicateurs définis à la conception",
    ],
    eligibility: "directe",
    source:
      "Conditions générales de vente ESME Executive Education, article 16 — Dispositions spécifiques grands comptes",
  },
  {
    slug: "autofinancement",
    name: "Financement personnel",
    audiences: ["salarie", "independant", "demandeur-emploi"],
    summary:
      "L’inscription à titre individuel reste possible sur nos sessions inter-entreprises, sans passer par un dispositif.",
    covers: ["Le coût pédagogique, réglé selon l’échéancier prévu à la convention"],
    conditions: [
      "Les prix sont exprimés en euros hors taxes et majorés de la TVA en vigueur",
      "Un acompte peut être demandé à la signature de la convention",
    ],
    steps: [
      "Demandez-nous un devis pour la session visée",
      "La convention de formation signée vaut inscription définitive",
    ],
    caveat:
      "Avant d’autofinancer, vérifiez vos droits : un salarié passe presque toujours par son employeur ou son OPCO, un indépendant par son fonds d’assurance formation.",
    eligibility: "directe",
    source: "Conditions générales de vente, article 4 — Conditions financières",
  },
];

/** Repères communs à tous les dispositifs. */
export const fundingEssentials = [
  {
    title: "Une demande toujours déposée avant le démarrage",
    body: "C’est la cause de rejet la plus fréquente, tous dispositifs confondus. Un accord de prise en charge obtenu après la première heure de formation ne vaut rien. Comptez trois à six semaines d’instruction.",
  },
  {
    title: "Qualiopi, condition d’accès aux fonds publics et mutualisés",
    body: "La certification Qualiopi au titre des actions de formation est la porte d’entrée de tous les financements publics et mutualisés. ESME Executive Education en est titulaire.",
  },
  {
    title: "Le client reste redevable en cas de refus",
    body: "En cas de refus ou de prise en charge partielle par un organisme tiers, le client reste redevable de l’intégralité des sommes dues. C’est une règle de droit commun, reprise à nos conditions générales de vente.",
  },
  {
    title: "Les dispositifs se combinent",
    body: "Plan de développement des compétences et OPCO, OPCO et FNE-Formation, CPF et abondement employeur : la plupart des montages réels associent plusieurs sources. Nous vous aidons à les articuler.",
  },
] as const;

export const fundingFaq = [
  {
    q: "Quels sont vos tarifs ?",
    a: "Les tarifs ne figurent pas au catalogue : ils sont communiqués sur demande, car ils dépendent du format retenu. Une session inter-entreprises se facture par participant ; une session intra ou un dispositif sur-mesure se chiffrent au périmètre, selon le niveau de personnalisation et les ressources mobilisées. Demandez un devis, vous l’obtiendrez avec le programme détaillé — les deux pièces attendues par tous les financeurs.",
  },
  {
    q: "Vos formations sont-elles finançables quel que soit le format ?",
    a: "Oui. Inter-entreprises, intra-entreprise et sur-mesure sont éligibles aux dispositifs de financement de la formation professionnelle. Le montage se définit avec vous au moment du devis.",
  },
  {
    q: "Mes formations sont-elles mobilisables sur le CPF ?",
    a: "Pas directement. Le CPF ne finance que des actions débouchant sur une certification enregistrée au RNCP ou au Répertoire spécifique. Nos modules courts donnent lieu à une évaluation des acquis et à une attestation de fin de formation. Pour un salarié, la voie efficace passe par le plan de développement des compétences de l’employeur et par l’OPCO.",
  },
  {
    q: "Comment savoir quel est mon OPCO ?",
    a: "Votre OPCO découle de votre convention collective, repérable par son code IDCC figurant sur vos bulletins de paie. Il ne se choisit pas. En cas de doute, votre service RH ou votre expert-comptable l’identifie immédiatement.",
  },
  {
    q: "Qu’est-ce que la subrogation de paiement ?",
    a: "C’est le mécanisme par lequel l’OPCO nous règle directement la part qu’il prend en charge, sans que vous avanciez les fonds. Elle se met en place à réception de l’accord de prise en charge.",
  },
  {
    q: "Que se passe-t-il si j’annule ?",
    a: "Au-delà de quinze jours ouvrés avant le début de la formation, aucune pénalité. Entre quinze et cinq jours ouvrés, 50 % du montant total est facturé. À moins de cinq jours ouvrés, ou en cas d’absence du participant, la facturation est de 100 %. Vous pouvez remplacer un participant, sous réserve que le remplaçant dispose des prérequis.",
  },
  {
    q: "Et si c’est vous qui annulez la session ?",
    a: "Nos sessions inter-entreprises requièrent un effectif minimum. S’il n’est pas atteint, nous pouvons reporter ou annuler : vous êtes informé dans les meilleurs délais et une solution de report ou de remplacement vous est proposée, sans indemnité de part ni d’autre.",
  },
  {
    q: "Proposez-vous un accompagnement dans le montage du dossier ?",
    a: "Oui. Nous fournissons les pièces attendues — devis, programme détaillé, convention, attestation Qualiopi — et notre équipe vous oriente vers le dispositif adapté à votre situation. Appelez le 01 56 20 62 04.",
  },
] as const;
