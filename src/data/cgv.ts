/**
 * Conditions générales de vente ESME Executive Education.
 * Texte intégral repris du catalogue « Formations 2027 » (pages 66-67),
 * mise à jour septembre 2026.
 */

export type CgvParagraph = { kind: "p" | "li"; text: string };
export type CgvArticle = { number: number; title: string; paragraphs: CgvParagraph[] };

export const cgvUpdatedAt = "septembre 2026";

export const cgvArticles: CgvArticle[] = [
  {
    number: 1,
    title: "Objet et champ d’application",
    paragraphs: [
      { kind: "p", text: "Les présentes conditions générales de vente (CGV) ont pour objet de définir les modalités selon lesquelles ESME Executive Education conçoit et dispense des actions de formation professionnelle continue à destination de clients entreprises et institutions." },
      { kind: "p", text: "Elles s’appliquent à l’ensemble des prestations proposées, qu’il s’agisse de formations inter-entreprises, intra-entreprises ou de programmes sur-mesure, sauf dispositions particulières expressément prévues dans la convention de formation ou un accord contractuel spécifique." },
      { kind: "p", text: "Toute commande implique l’adhésion pleine et entière du CLIENT aux présentes CGV, qui prévalent sur tout autre document, sauf dérogation écrite et acceptée par ESME Executive Education." },
    ],
  },
  {
    number: 2,
    title: "Offre de formation",
    paragraphs: [
      { kind: "p", text: "Les caractéristiques essentielles des formations (objectifs, contenu, modalités pédagogiques, durée, conditions d’accès) sont précisées dans les documents contractuels transmis au CLIENT." },
      { kind: "p", text: "Les programmes peuvent être dispensés en présentiel, à distance ou en format hybride. ESME Executive Education se réserve la possibilité d’adapter les modalités pédagogiques afin de garantir la qualité de l’expérience d’apprentissage, notamment en cas de contraintes opérationnelles." },
    ],
  },
  {
    number: 3,
    title: "Contractualisation",
    paragraphs: [
      { kind: "p", text: "Toute prestation fait l’objet d’une convention de formation établie entre ESME Executive Education et le CLIENT." },
      { kind: "p", text: "L’inscription devient définitive à réception de la convention de formation dûment signée par les deux parties." },
      { kind: "p", text: "Aucun autre document ou échange ne saurait valoir engagement contractuel en l’absence de signature formelle." },
    ],
  },
  {
    number: 4,
    title: "Conditions financières",
    paragraphs: [
      { kind: "p", text: "Les prix sont exprimés en euros hors taxes et majorés de la TVA en vigueur." },
      { kind: "p", text: "Sauf disposition contraire :" },
      { kind: "li", text: "Les offres sont valables deux (2) mois," },
      { kind: "li", text: "Un acompte peut être exigé à la signature," },
      { kind: "li", text: "Le solde est payable selon les modalités prévues dans la convention." },
      { kind: "p", text: "Les frais annexes (déplacements, hébergement, logistique spécifique) peuvent être facturés en complément." },
      { kind: "p", text: "Dans le cadre de prestations sur-mesure, les conditions tarifaires sont ajustées en fonction du périmètre, du niveau de personnalisation et des ressources mobilisées." },
      { kind: "p", text: "DE VENTE" },
    ],
  },
  {
    number: 5,
    title: "Organisation des formations",
    paragraphs: [
      { kind: "p", text: "Une convocation précisant les modalités pratiques (dates, horaires, lieu ou modalités de connexion) est adressée aux participants en amont du démarrage de la formation." },
      { kind: "p", text: "ESME Executive Education se réserve le droit de modifier l’organisation de la formation, notamment en ce qui concerne les intervenants, le planning ou les modalités de réalisation, dès lors que ces modifications n’altèrent pas la qualité globale de la prestation." },
      { kind: "p", text: "ESME Executive Education peut faire intervenir tout prestataire ou intervenant externe de son choix. Elle demeure responsable de la qualité des prestations délivrées." },
      { kind: "p", text: "Dans le cadre des formations dispensées à distance ou selon des modalités hybrides, ESME Executive Education met à disposition des participants des accès individualisés aux plateformes et ressources pédagogiques associées." },
      { kind: "p", text: "Ces accès sont strictement personnels, confidentiels et non cessibles. Ils ne peuvent en aucun cas être partagés, transmis ou utilisés par un tiers, à titre gratuit ou onéreux." },
      { kind: "p", text: "La durée d’accès aux contenus et outils pédagogiques est limitée à la période définie dans la convention de formation ou les documents contractuels associés. À l’issue de cette période, les accès sont automatiquement désactivés." },
      { kind: "p", text: "Le CLIENT s’engage à veiller au respect de ces conditions par les participants. Toute utilisation non conforme, frauduleuse ou détournée des accès, notamment en cas de partage d’identifiants ou d’accès non autorisé, relève de la responsabilité du CLIENT et pourra entraîner la suspension immédiate des accès, sans préjudice d’éventuelles actions engagées par ESME Executive Education." },
    ],
  },
  {
    number: 6,
    title: "Annulation ou report à l’initiative du CLIENT",
    paragraphs: [
      { kind: "p", text: "Toute demande d’annulation ou de report doit être formulée par écrit." },
      { kind: "p", text: "Sauf dispositions particulières prévues dans la convention :" },
      { kind: "li", text: "Plus de quinze (15) jours ouvrés avant le début de la formation :" },
      { kind: "p", text: "aucune pénalité ;" },
      { kind: "li", text: "Entre quinze (15) et cinq (5) jours ouvrés : facturation de 50 % du montant total ;" },
      { kind: "li", text: "Moins de cinq (5) jours ouvrés ou absence du participant :" },
      { kind: "p", text: "facturation de 100 % ;" },
      { kind: "p", text: "Le CLIENT a la possibilité de remplacer un participant, sous réserve que le remplaçant dispose des prérequis nécessaires." },
    ],
  },
  {
    number: 7,
    title: "Annulation ou report à l’initiative d’ESME Executive Education",
    paragraphs: [
      { kind: "p", text: "ESME Executive Education se réserve le droit de reporter ou d’annuler une formation, notamment en cas de force majeure, d’effectif insuffisant ou de contrainte exceptionnelle." },
      { kind: "p", text: "Pour les formations inter-entreprises, un nombre minimum de participants peut être requis. À défaut, ESME Executive Education se réserve le droit de reporter ou d’annuler la session sans indemnité, en proposant une solution alternative." },
      { kind: "p", text: "Dans ce cas, le CLIENT est informé dans les meilleurs délais et une solution de report ou de remplacement est proposée." },
      { kind: "p", text: "Aucune indemnité ne pourra être réclamée à ce titre." },
    ],
  },
  {
    number: 8,
    title: "Facturation et modalités de paiement",
    paragraphs: [
      { kind: "p", text: "Les modalités de facturation et de règlement sont précisées dans la convention de formation." },
      { kind: "p", text: "Un acompte peut être exigé à la signature de la convention selon les projets, le solde est payable à réception de facture ou selon l’échéancier convenu. Les factures sont payables à trente (30) jours nets." },
      { kind: "p", text: "En cas de prise en charge par un organisme tiers, le CLIENT reste responsable du règlement en cas de refus de financement." },
      { kind: "p", text: "Tout retard de paiement entraîne l’application de pénalités calculées sur la base de trois fois le taux d’intérêt légal, ainsi qu’une indemnité forfaitaire pour frais de recouvrement de quarante (40) euros." },
    ],
  },
  {
    number: 9,
    title: "Financement par un organisme tiers",
    paragraphs: [
      { kind: "p", text: "En cas de financement par un organisme tiers (OPCO ou autre), le CLIENT s’engage à :" },
      { kind: "li", text: "Effectuer les démarches de prise en charge en amont," },
      { kind: "li", text: "S’assurer de leur validation avant le démarrage," },
      { kind: "li", text: "Transmettre les accords correspondants." },
      { kind: "p", text: "En cas de refus ou de prise en charge partielle, le CLIENT reste redevable de l’intégralité des sommes dues." },
    ],
  },
  {
    number: 10,
    title: "Engagement des parties",
    paragraphs: [
      { kind: "p", text: "ESME Executive Education s’engage à mettre en œuvre tous les moyens nécessaires à la bonne réalisation des prestations, notamment en mobilisant des intervenants qualifiés et des contenus adaptés aux objectifs définis." },
      { kind: "p", text: "Le CLIENT s’engage à :" },
      { kind: "li", text: "S’assurer de l’adéquation du profil des participants avec les formations suivies" },
      { kind: "li", text: "Garantir leur disponibilité et leur implication" },
      { kind: "li", text: "Respecter les conditions d’organisation définies L’absence ou le manque d’implication d’un participant ne saurait donner lieu à remboursement." },
    ],
  },
  {
    number: 11,
    title: "Confidentialité",
    paragraphs: [
      { kind: "p", text: "Les informations échangées dans le cadre des prestations, qu’elles soient de nature pédagogique, technique ou commerciale, sont considérées comme confidentielles." },
      { kind: "p", text: "Chaque partie s’engage à ne pas les divulguer à des tiers sans accord préalable." },
      { kind: "p", text: "Cette obligation s’applique pendant toute la durée de la relation contractuelle et pendant une période de deux (2) ans après sa cessation." },
    ],
  },
  {
    number: 12,
    title: "Données personnelles",
    paragraphs: [
      { kind: "p", text: "Les données personnelles collectées dans le cadre des prestations font l’objet d’un traitement conforme à la réglementation en vigueur, notamment au Règlement Général sur la Protection des Données (RGPD)." },
      { kind: "p", text: "Les personnes concernées disposent de droits d’accès, de rectification et de suppression de leurs données." },
      { kind: "p", text: "Les modalités d’exercice de ces droits sont précisées dans la politique de confidentialité de l’ESME." },
    ],
  },
  {
    number: 13,
    title: "Propriété intellectuelle",
    paragraphs: [
      { kind: "p", text: "Les supports pédagogiques, contenus et méthodes utilisées dans le cadre des formations (y compris formations sur mesure) sont protégés par le droit de la propriété intellectuelle. Ils restent la propriété exclusive d’ESME Executive Education." },
      { kind: "p", text: "Toute reproduction, diffusion ou exploitation, totale ou partielle, sans autorisation préalable est interdite." },
    ],
  },
  {
    number: 14,
    title: "Responsabilité",
    paragraphs: [
      { kind: "p", text: "ESME Executive Education est tenue à une obligation de moyens dans l’exécution de ses prestations." },
      { kind: "p", text: "Sa responsabilité ne saurait être engagée en cas d’utilisation inappropriée des connaissances acquises ou de décisions prises par le CLIENT à l’issue de la formation." },
    ],
  },
  {
    number: 15,
    title: "Droit applicable et règlement des litiges",
    paragraphs: [
      { kind: "p", text: "Les présentes CGV sont soumises au droit français." },
      { kind: "p", text: "En cas de différend, les parties s’engagent à rechercher une solution amiable." },
      { kind: "p", text: "À défaut d’accord, le litige sera porté devant les juridictions compétentes du siège d’ESME Executive Education, sauf disposition légale contraire." },
    ],
  },
  {
    number: 16,
    title: "Dispositions spécifiques clients grands comptes",
    paragraphs: [
      { kind: "p", text: "Pour les clients entreprises engageant des volumes significatifs ou des dispositifs pluriannuels, des conditions particulières peuvent être définies dans un accord-cadre ou dans la convention, notamment :" },
      { kind: "li", text: "Modalités de pilotage et de suivi des actions de formation" },
      { kind: "li", text: "Conditions tarifaires préférentielles liées aux volumes" },
      { kind: "li", text: "Organisation de sessions dédiées ou programmes sur-mesure" },
      { kind: "li", text: "Modalités de facturation adaptées (échéancier, regroupement)" },
      { kind: "li", text: "Engagements réciproques en matière de planification" },
      { kind: "p", text: "Ces dispositions prévalent sur les présentes CGV en cas de contradiction." },
    ],
  },
];
