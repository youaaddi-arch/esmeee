import type { DomainSlug } from "./domains";

/**
 * Blog ESME Executive Education.
 *
 * Les articles sont rédigés à partir du contenu des programmes du catalogue 2027
 * et des résultats de l’Observatoire 2026 de l’ingénieur et des compétences
 * stratégiques. Les citations attribuées à une personne sont reprises des
 * éditos signés du catalogue.
 *
 * Signature : « La rédaction » par défaut. L’équipe peut attribuer chaque
 * article à son auteur réel avant publication — voir CONTENT.md.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; by?: string }
  | { type: "callout"; title: string; text: string }
  | { type: "stats"; items: { value: string; label: string }[] };

export type Article = {
  slug: string;
  title: string;
  /** Chapô : deux phrases maximum. */
  excerpt: string;
  /** Rubrique éditoriale. */
  category: string;
  domain?: DomainSlug;
  date: string;
  readingMinutes: number;
  author: string;
  /** Programmes du catalogue à mettre en avant en fin d’article. */
  relatedCodes: string[];
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "observatoire-2026-six-sur-dix",
    title: "6/10 : le chiffre que les directions techniques devraient regarder en face",
    excerpt:
      "Les organisations voient les mutations arriver et s’attribuent 6/10 en préparation. L’écart entre lucidité et capacité d’agir est devenu le vrai sujet.",
    category: "Observatoire",
    date: "2026-10-14",
    readingMinutes: 6,
    author: "La rédaction",
    relatedCodes: ["IA 100", "LEAD 300", "PROJ 100"],
    body: [
      {
        type: "p",
        text: "En 2026, nous avons interrogé plus de 400 ingénieurs, managers, recruteurs et responsables de formation sur l’évolution de leur métier. Le résultat le plus parlant n’est pas celui que l’on attendait : ce n’est pas le déni qui domine, c’est la lucidité sans moyens.",
      },
      {
        type: "stats",
        items: [
          { value: "84 %", label: "constatent que les compétences de l’ingénieur ont déjà évolué en trois ans" },
          { value: "71 %", label: "anticipent de nouvelles transformations majeures d’ici trois ans" },
          { value: "82 %", label: "identifient l’IA comme premier moteur de transformation" },
          { value: "6/10", label: "niveau moyen de préparation que les organisations s’attribuent" },
        ],
      },
      {
        type: "p",
        text: "Lues ensemble, ces quatre données décrivent une situation précise. Le diagnostic est posé — 84 % constatent, 71 % anticipent, 82 % nomment le moteur. Et malgré ce diagnostic, la préparation plafonne à 6/10. Personne ne découvre le problème. Tout le monde peine à le traiter.",
      },
      { type: "h2", text: "Le diagnostic n’est plus le goulot d’étranglement" },
      {
        type: "p",
        text: "Pendant une quinzaine d’années, la fonction formation a passé beaucoup d’énergie à convaincre : convaincre que le numérique allait changer les métiers techniques, que la transition énergétique n’était pas qu’une affaire de réglementation, que les compétences managériales comptaient autant que l’expertise. Ce travail est fait. Un comité de direction qui place l’IA en premier moteur de transformation à 82 % n’a pas besoin d’être sensibilisé.",
      },
      {
        type: "p",
        text: "Ce qui bloque s’est déplacé en aval : traduire un constat partagé en décisions d’investissement, en parcours, en compétences effectivement acquises sur le terrain. C’est un problème d’exécution, et il se traite avec d’autres méthodes que la sensibilisation.",
      },
      { type: "h2", text: "Là où les entreprises veulent investir" },
      {
        type: "p",
        text: "Interrogées sur leurs projets de formation hors obligations réglementaires, les organisations placent l’IA et la data en tête (34 %), devant les compétences techniques métier (26 %). Suivent le management (15 %), la gestion de projet et les soft skills (14 % chacun), puis la sécurité et la cybersécurité (11 %).",
      },
      {
        type: "p",
        text: "La lecture intéressante est la somme : management, gestion de projet et soft skills réunis représentent 43 % des projets, soit plus que l’IA et la data. Autrement dit, les organisations ont compris que la technologie ne se déploie pas toute seule. Une transition énergétique, une migration industrielle, un projet IA échouent rarement sur la technique. Ils échouent sur la décision, la coordination et la capacité à embarquer des équipes.",
      },
      {
        type: "quote",
        text: "Sommes-nous capables de faire évoluer les compétences aussi vite que les technologies ?",
        by: "Hervé Jacques, Directeur ESME Executive Education",
      },
      { type: "h2", text: "Le temps, et non le budget" },
      {
        type: "p",
        text: "84 % des organisations investissent déjà dans la formation. Le budget n’est donc plus le premier obstacle. Ce qui manque, c’est du temps disponible sur des agendas déjà saturés — et c’est précisément ce qui disqualifie les formats longs pour les profils les plus exposés.",
      },
      {
        type: "p",
        text: "C’est une contrainte de conception, pas une excuse. Elle explique pourquoi un dirigeant se forme sur une journée et non sur un semestre, pourquoi un module de prompt engineering tient en une demi-journée, et pourquoi un bootcamp de deux jours sur simulateur produit davantage d’effet qu’un cycle étalé sur six mois que personne ne termine. La densité remplace la durée.",
      },
      { type: "h2", text: "Trois questions utiles pour 2027" },
      {
        type: "ul",
        items: [
          "Sur quels gestes métier concrets attendons-nous un changement observable dans six mois ? Si la réponse reste au niveau des intentions, le parcours n’est pas prêt.",
          "Qui décide, et avec quelles informations ? Un investissement technologique sans montée en compétence de ceux qui arbitrent produit des pilotes qui n’atteignent jamais la production.",
          "Quels indicateurs avons-nous définis avant de démarrer ? Un dispositif dont l’impact se mesure après coup ne se mesure jamais.",
        ],
      },
      {
        type: "callout",
        title: "Méthode",
        text: "L’Observatoire de l’ingénieur et des compétences stratégiques a été conduit en 2026 par ESME Executive Education auprès de plus de 400 ingénieurs, managers, recruteurs et responsables de formation. Les résultats complets figurent au catalogue 2027.",
      },
    ],
  },
  {
    slug: "obligation-solarisation-equipes-techniques",
    title: "Obligation de solarisation : ce que vos équipes techniques doivent savoir avant de chiffrer",
    excerpt:
      "Entre obligations sur les bâtiments et les parkings, arrêté tarifaire et autoconsommation collective, un dossier photovoltaïque se joue autant sur le cadre réglementaire que sur le dimensionnement.",
    category: "Transition énergétique",
    domain: "energies-services",
    date: "2026-09-30",
    readingMinutes: 7,
    author: "La rédaction",
    relatedCodes: ["PV 100", "PV 110", "PV 250"],
    body: [
      {
        type: "p",
        text: "Un projet photovoltaïque qui déraille le fait rarement sur la physique du module. Il déraille sur une obligation mal lue, un régime d’exploitation mal choisi, un ombrage sous-estimé ou une tenue à la charge non vérifiée. Ce sont quatre sujets distincts, et aucun n’est purement technique.",
      },
      { type: "h2", text: "Le régime d’exploitation est une décision, pas une conséquence" },
      {
        type: "p",
        text: "Vente en totalité, autoconsommation individuelle, autoconsommation collective : ces trois régimes n’impliquent ni la même architecture de raccordement, ni le même schéma unifilaire, ni le même modèle économique. Le réflexe courant consiste à dimensionner d’abord et à choisir le régime ensuite. C’est l’inverse qui tient : le régime conditionne la puissance pertinente, la courbe de charge visée et la structure des produits d’exploitation.",
      },
      {
        type: "p",
        text: "Les mesures de soutien se lisent dans le même mouvement. Arrêté tarifaire pour les installations qui y sont éligibles, appel d’offres simplifié de la Commission de régulation de l’énergie au-delà : le seuil retenu déplace à la fois le calendrier du projet et la nature des pièces à produire.",
      },
      { type: "h2", text: "L’analyse de site reste le poste le plus sous-traité" },
      {
        type: "p",
        text: "Surface, orientation, inclinaison, complexe de toiture, tenue à la charge, analyse du sol : rien d’exotique. Pourtant c’est là que se logent les écarts les plus coûteux entre le productible annoncé et le productible constaté.",
      },
      {
        type: "ul",
        items: [
          "Les ombrages proches sont souvent modélisés, les ombrages lointains rarement — et ce sont eux qui dégradent les productions d’hiver.",
          "La tenue à la charge d’un complexe de toiture existant se vérifie, elle ne s’estime pas. Un avis technique ou une enquête de techniques nouvelles peut être requis selon le procédé de pose.",
          "Une ombrière de parking n’est pas une toiture inclinée avec des poteaux : les contraintes de structure et les procédés d’évaluation technique diffèrent.",
        ],
      },
      { type: "h2", text: "Du dimensionnement au dossier défendable" },
      {
        type: "p",
        text: "Un maître d’ouvrage n’achète pas un calepinage, il achète une étude qui tient devant un financeur, un assureur et un bureau de contrôle. Cela suppose un enchaînement complet : analyse de site, évaluation du gisement solaire, calepinage, dimensionnement des modules et des onduleurs, simulation de production, puis bilan économique — investissement, produits et charges d’exploitation.",
      },
      {
        type: "p",
        text: "Dans nos formations, cet enchaînement se travaille sur ArcheliosPro et sur des études de cas réelles, en cohérence avec les exigences du référentiel de qualification OPQIBI 2011. La raison est simple : un chargé d’études qui a produit l’étude complète une fois, outil en main, ne rend pas le même livrable qu’un chargé d’études qui a seulement compris le principe.",
      },
      { type: "h2", text: "La performance se joue après la mise en service" },
      {
        type: "p",
        text: "Une centrale installée n’est pas une centrale performante. Lire les indicateurs de production, détecter une perte anormale, diagnostiquer un défaut de module ou d’onduleur, construire une stratégie de maintenance proportionnée aux risques du site : c’est un second métier, et il décide du rendement réel de l’actif sur vingt ans.",
      },
      {
        type: "callout",
        title: "Pour les fonctions non techniques",
        text: "Instruire un dossier de financement ou d’assurance photovoltaïque demande de savoir lire un dossier technique sans être concepteur : identifier les risques techniques, réglementaires et contractuels, et reconnaître les pièces et garanties qui manquent. C’est l’objet du module PV 250, proposé en intra-entreprise.",
      },
    ],
  },
  {
    slug: "stockage-batteries-bess-ou-se-cree-la-valeur",
    title: "Stockage par batteries : la valeur n’est pas dans la batterie",
    excerpt:
      "Un projet BESS se gagne sur le raccordement, le cadre réglementaire et la stratégie de valorisation. Le choix du container vient après.",
    category: "Transition énergétique",
    domain: "energies-services",
    date: "2026-09-16",
    readingMinutes: 6,
    author: "La rédaction",
    relatedCodes: ["STK 100", "SGRID 100", "HT 200"],
    body: [
      {
        type: "p",
        text: "Le marché du stockage par batteries attire pour une bonne raison : la file d’attente de raccordement en HTA et HTB témoigne d’un appétit réel. Mais l’entrée sur ce marché se joue sur une chaîne complète, et la plupart des acteurs la découvrent par son maillon le plus visible — le produit.",
      },
      { type: "h2", text: "Le produit est la partie facile" },
      {
        type: "p",
        text: "Les batteries conditionnées en containers sont disponibles chez des fournisseurs identifiés et comparables sur catalogue. Ce choix se tranche en quelques semaines. Ce qui prend des mois, et ce qui fait échouer les projets, se situe ailleurs : le point de livraison, l’architecture électrique, les autorisations et la stratégie de revenus.",
      },
      { type: "h2", text: "Le raccordement décide du projet" },
      {
        type: "ul",
        items: [
          "La puissance limite de raccordement dépend du domaine de tension, et la capacité d’accueil du réseau se vérifie site par site : un projet dimensionné avant cette vérification est un projet à reprendre.",
          "L’architecture HTA — boucle ouverte ou antenne, choix des transformateurs HTA/BT — conditionne la disponibilité et le coût d’exploitation.",
          "L’alimentation des auxiliaires en basse tension est systématiquement sous-estimée dans les premiers chiffrages.",
        ],
      },
      { type: "h2", text: "Réglementation : trois procédures, trois calendriers" },
      {
        type: "p",
        text: "Évaluation environnementale, autorisation d’urbanisme, déclaration ICPE : ces procédures ne s’enchaînent pas, elles se mènent en parallèle avec des calendriers propres. Un planning de projet qui les traite en série se trompe de plusieurs trimestres.",
      },
      { type: "h2", text: "La valorisation, c’est le modèle économique" },
      {
        type: "p",
        text: "Un BESS ne gagne pas d’argent en stockant, il en gagne en arbitrant. Marchés SPOT et Intraday continu d’un côté, réserves de fréquence FCR et aFRR de l’autre : ce sont des logiques différentes, avec des principes de contractualisation et d’activation distincts, et des exigences de disponibilité qui ne se cumulent pas librement.",
      },
      {
        type: "p",
        text: "Concrètement, l’élaboration du programme d’appel du BESS à J-1 est l’exercice qui révèle si un modèle économique tient. C’est aussi celui qui manque le plus souvent dans les dossiers présentés en comité d’investissement : on y trouve un coût d’investissement précis et des revenus indicatifs.",
      },
      {
        type: "callout",
        title: "L’exercice qui change le regard",
        text: "Travailler soi-même le schéma unifilaire d’une installation de stockage, puis utiliser l’application Caparéseau pour vérifier la capacité d’accueil, suffit généralement à réviser l’ordre des priorités d’un projet. C’est la logique du module STK 100, sur deux jours.",
      },
    ],
  },
  {
    slug: "ia-generative-pourquoi-les-pilotes-echouent",
    title: "IA générative : pourquoi vos pilotes n’atteignent jamais la production",
    excerpt:
      "Les démonstrations convainquent, les déploiements calent. L’écart se creuse sur trois points précis — et aucun n’est technologique.",
    category: "Numérique",
    domain: "numerique",
    date: "2026-10-07",
    readingMinutes: 7,
    author: "La rédaction",
    relatedCodes: ["IA 100", "IA 300", "IA 420"],
    body: [
      {
        type: "p",
        text: "82 % des organisations interrogées en 2026 identifient l’intelligence artificielle comme premier moteur de transformation. Dans le même temps, la majorité des expérimentations ne quitte jamais le stade du pilote. Ce n’est pas un problème de modèle : les modèles disponibles font largement l’affaire pour les usages visés.",
      },
      { type: "h2", text: "Premier point : personne n’arbitre" },
      {
        type: "p",
        text: "Un pilote IA naît souvent d’une initiative métier, porté par quelqu’un de curieux et compétent. Il meurt au moment où il faut décider : industrialiser coûte, expose à des risques juridiques, impose des choix de souveraineté et d’hébergement. Ces arbitrages relèvent de la direction — et une direction qui n’a pas les repères pour les trancher ne tranche pas, elle reporte.",
      },
      {
        type: "p",
        text: "D’où l’inversion de séquence que nous observons chez les organisations qui avancent : elles forment d’abord ceux qui arbitrent. Une journée suffit à poser ce qu’est un LLM, à évaluer investissements, risques et retour sur investissement, à cadrer les enjeux réglementaires et éthiques, et à sortir avec une feuille de route priorisée. Ce n’est pas de la culture générale, c’est une mise en capacité de décider.",
      },
      { type: "h2", text: "Deuxième point : l’usage reste individuel" },
      {
        type: "p",
        text: "Dans la plupart des entreprises, l’IA générative est déjà utilisée — individuellement, sans méthode, sans cadre, et souvent sans que l’organisation le sache. Le résultat est double : des gains réels mais non capitalisés, et des pratiques de confidentialité hasardeuses.",
      },
      {
        type: "p",
        text: "Structurer des prompts professionnels réutilisables, savoir évaluer et corriger une production générée, connaître les limites — biais, hallucinations, périmètre de fiabilité — et appliquer les règles de confidentialité et de sobriété : c’est une compétence qui s’apprend en une demi-journée et qui transforme un usage privé en pratique d’équipe.",
      },
      { type: "h2", text: "Troisième point : les cas d’usage ne viennent pas du haut" },
      {
        type: "p",
        text: "Une direction ne connaît pas les tâches où ses équipes perdent réellement du temps. Les cas d’usage qui tiennent remontent du terrain : analyser un dossier de consultation volumineux et instruire un go/no-go, préparer la documentation technique d’un chantier, structurer le suivi après un rendez-vous commercial, outiller une fonction QHSE.",
      },
      {
        type: "p",
        text: "C’est pourquoi nos formats consacrent la moitié du temps aux cas d’usage apportés par les participants eux-mêmes : chacun identifie les siens, les décline en exercices sur ses propres documents, puis restitue devant le groupe. Les participants repartent avec une feuille de route co-construite et des fiches mémo, pas avec une liste d’outils.",
      },
      {
        type: "quote",
        text: "La question n’est plus de savoir s’il faut former, mais comment former efficacement, avec un impact mesurable.",
        by: "Observatoire 2026 de l’ingénieur et des compétences stratégiques",
      },
      { type: "h2", text: "Ce qui reste à traiter dès le premier jour" },
      {
        type: "ul",
        items: [
          "RGPD et confidentialité : quelles données peuvent entrer dans quel outil, et qui le vérifie.",
          "Fiabilité : à quelles conditions une production générée peut être transmise à un client ou versée à un dossier.",
          "Sobriété : à quels usages l’IA apporte un gain net, et à quels usages elle en consomme davantage qu’elle n’en crée.",
        ],
      },
    ],
  },
  {
    slug: "cyber-crise-ce-que-revele-une-simulation",
    title: "Cyber-crise : ce qu’une simulation révèle et qu’aucun audit ne montre",
    excerpt:
      "Les procédures existent, les sauvegardes sont testées. Ce qu’on découvre sous pression, c’est que personne ne sait qui décide.",
    category: "Numérique",
    domain: "numerique",
    date: "2026-08-26",
    readingMinutes: 5,
    author: "La rédaction",
    relatedCodes: ["CYB 110", "CYB 100", "CYB 300"],
    body: [
      {
        type: "p",
        text: "La plupart des organisations disposent d’un plan de continuité et d’un plan de reprise d’activité. Beaucoup les ont révisés récemment. Très peu savent ce qui se passe dans les quatre-vingt-dix premières minutes d’une attaque majeure, quand il faut décider avec des informations incomplètes et contradictoires.",
      },
      { type: "h2", text: "La zone d’ombre n’est pas technique" },
      {
        type: "p",
        text: "Un audit vérifie des dispositifs. Une simulation met à l’épreuve une organisation. Et ce que révèle une simulation, invariablement, ce ne sont pas des failles techniques : ce sont des défauts de coordination et des zones de flou sur les rôles.",
      },
      {
        type: "ul",
        items: [
          "Qui décide d’un arrêt de production, et sous quel délai cette décision doit-elle être prise ?",
          "Qui parle — aux clients, aux salariés, à la presse, à l’autorité de contrôle — et dans quel ordre ?",
          "À quel moment la direction juridique entre dans la boucle, et avec quel mandat ?",
          "Qui arbitre entre préserver les preuves et rétablir le service au plus vite ?",
        ],
      },
      {
        type: "p",
        text: "Ces questions ont des réponses écrites dans la plupart des organisations. Elles cessent d’en avoir dès que trois informations arrivent en même temps et que deux d’entre elles se contredisent.",
      },
      { type: "h2", text: "Pourquoi un scénario générique ne sert à rien" },
      {
        type: "p",
        text: "Une simulation n’a de valeur que si le scénario est construit sur le contexte réel : les systèmes de l’organisation, ses clients, ses contraintes contractuelles, ses interlocuteurs. C’est pourquoi notre module s’appuie sur un questionnaire préparatoire avant de bâtir le scénario, et pourquoi la mise en situation s’adresse en priorité au COMEX, aux directeurs fonctionnels, au juridique et à la communication — ceux qui décideront vraiment.",
      },
      {
        type: "p",
        text: "Pendant l’exercice, un facilitateur observe et analyse en temps réel les décisions, les blocages et les défauts de coordination. Le débriefing porte ensuite sur les décisions critiques et les écarts aux bonnes pratiques, et non sur la performance individuelle.",
      },
      { type: "h2", text: "Le livrable compte autant que l’exercice" },
      {
        type: "p",
        text: "Une simulation qui se termine sur un sentiment partagé — « on a vu, il faut qu’on s’organise » — ne change rien. Celle qui produit un rapport structuré, un ajustement du PCA et du PRA, une gouvernance de crise clarifiée et un plan d’amélioration priorisé change l’état de préparation de l’organisation en une journée.",
      },
      {
        type: "callout",
        title: "Et le reste de l’entreprise",
        text: "La préparation du COMEX ne remplace pas la vigilance quotidienne. Reconnaître les principales techniques d’attaque et savoir qui alerter en cas de doute relève d’un module de sensibilisation ouvert à tous les collaborateurs — la première ligne de défense reste la plus nombreuse.",
      },
    ],
  },
  {
    slug: "ingenieur-vers-pilotage-le-passage-mal-prepare",
    title: "De l’expertise au pilotage : le passage que peu d’ingénieurs préparent",
    excerpt:
      "On promeut un expert pour sa technicité, puis on lui demande d’arbitrer, de vendre et de décider dans l’incertitude. Ce n’est pas le même métier.",
    category: "Management",
    domain: "management-transformation",
    date: "2026-07-15",
    readingMinutes: 6,
    author: "La rédaction",
    relatedCodes: ["INTR 100", "PROJ 210", "LEAD 200"],
    body: [
      {
        type: "p",
        text: "Le scénario est connu dans toutes les entreprises techniques. Un ingénieur excelle, on lui confie une agence, un centre de profit, une direction régionale. Ses réflexes — chercher la solution juste, documenter, arbitrer sur les faits — l’ont porté jusque-là. Ce sont ces mêmes réflexes qui le freinent désormais.",
      },
      { type: "h2", text: "Trois réflexes à déconstruire" },
      {
        type: "ul",
        items: [
          "Chercher la bonne réponse. Un dirigeant décide souvent sans réponse juste disponible, et le coût de l’attente dépasse celui d’une décision imparfaite mais révisable.",
          "Convaincre par la démonstration. Une stratégie se partage, elle ne se prouve pas. L’adhésion d’un comité de direction ne s’obtient pas comme la validation d’un calcul.",
          "Traiter l’humain comme une variable. Les profils, les motivations et les résistances d’une équipe ne se modélisent pas : ils se lisent, et cela s’apprend.",
        ],
      },
      { type: "h2", text: "Ce qu’il faut acquérir, dans l’ordre" },
      {
        type: "p",
        text: "Le passage se structure autour de cinq compétences qui s’enchaînent. Construire une stratégie cohérente d’abord — maîtriser SWOT, PESTEL et Porter pour définir un avantage concurrentiel, et non pour remplir une matrice. Savoir décider ensuite, y compris en situation critique, avec des méthodes dédiées. Lire les profils humains pour adapter son management. Mener un changement en en devenant l’architecte. Et tenir une posture qui incarne l’exemplarité.",
      },
      {
        type: "p",
        text: "C’est l’itinéraire du Parcours Ingénieur Intrapreneur : dix jours, cinq étapes, conçu par et pour des profils experts. Chaque étape existe aussi en module autonome de deux jours, pour ceux qui n’ont pas besoin du parcours complet.",
      },
      { type: "h2", text: "Du rapporteur au facilitateur" },
      {
        type: "p",
        text: "Il existe un indicateur simple pour situer où en est quelqu’un dans ce passage : ce qu’il produit en comité de pilotage. Un rapporteur d’avancement présente un état des lieux et attend des instructions. Un facilitateur de décision structure l’arbitrage, expose les options, en chiffre les conséquences et permet au comité de trancher dans la séance.",
      },
      {
        type: "p",
        text: "La différence n’est pas une question de séniorité ni de charisme : c’est une compétence outillée — analyse technique, analyse financière, décision multicritère, techniques de décision face aux risques. Elle s’acquiert, et elle se mesure à la durée des comités.",
      },
      {
        type: "quote",
        text: "Dix jours pour déconstruire vos réflexes techniques et bâtir une posture de dirigeant hybride.",
        by: "Parcours Ingénieur Intrapreneur, catalogue 2027",
      },
      {
        type: "callout",
        title: "Le format compte",
        text: "Ces compétences ne s’acquièrent pas en salle de cours. Jeux de rôle, simulations, débriefings individuels et retours personnalisés en représentent l’essentiel — jusqu’au pilotage d’un projet de douze semaines sur simulateur numérique professionnel, avec 80 % de pratique.",
      },
    ],
  },
];

export const articleBySlug = (slug: string): Article | undefined =>
  articles.find((a) => a.slug === slug);

export const sortedArticles = (): Article[] =>
  [...articles].sort((a, b) => b.date.localeCompare(a.date));

export const categories = (): string[] =>
  Array.from(new Set(articles.map((a) => a.category)));
