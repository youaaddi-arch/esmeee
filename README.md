# ESME Executive Education — site de la formation continue

Site dédié à l'offre de formation continue de l'ESME. Il couvre les
48 formations du catalogue 2027, les formats de déploiement, les dispositifs de
financement, l'équipe pédagogique et un blog sectoriel.

Construit avec **Next.js 16** (App Router), **React 19**, **TypeScript** et
**Tailwind CSS 4**. 80 pages, intégralement prérendues en statique.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
```

| Commande | Effet |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production (prérendu statique) |
| `npm run start` | Sert le build de production |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, sans émission |

## Structure

```
src/
  app/                  Routes (App Router)
    formations/         Catalogue + 48 fiches programme
    domaines/           4 domaines d'expertise
    formats/            Inter, intra, sur-mesure
    financement/        11 dispositifs de financement
    equipe-pedagogique/ Direction, intervenants, ingénierie pédagogique
    notre-approche/     Méthode et engagement
    observatoire/       Résultats de l'étude 2026
    blog/               6 articles sectoriels
    contact/ devis/     Formulaires
    cgv/ mentions-legales/ plan-du-site/
  components/           Composants partagés (UI, en-tête, catalogue, formulaires)
  data/                 Toute la matière éditoriale, typée
scripts/                Reprise du catalogue PDF vers TypeScript
data-source/            JSON intermédiaire produit par ces scripts
```

## La couche de données

Tout le contenu vit dans `src/data/`, typé et sans CMS. Modifier le site, c'est
modifier ces fichiers.

| Fichier | Contenu | Origine |
| --- | --- | --- |
| `programs.ts` | Les 48 fiches : référence, intitulé, public, objectifs, prérequis, méthodes, programme détaillé, durée | Généré depuis le catalogue PDF 2027 |
| `domains.ts` | Les 4 domaines et leurs thématiques | Pages d'ouverture du catalogue |
| `site.ts` | Coordonnées, chiffres clés, Observatoire, méthode, formats, Qualiopi, navigation | Catalogue 2027 et esme.fr |
| `financement.ts` | Les 11 dispositifs de financement, les repères et la FAQ | Rédigé — voir CONTENT.md |
| `team.ts` | Direction, profils d'intervenants, standards pédagogiques | Catalogue 2027 |
| `blog.ts` | Les 6 articles, en blocs typés | Rédigé — voir CONTENT.md |
| `cgv.ts` | Les 16 articles des conditions générales de vente | Pages 66-67 du catalogue |

`programs.ts` est **généré** : ne le modifiez pas à la main si vous comptez
rejouer la génération. Voir `scripts/README.md`.

Les totaux affichés (nombre de formations, de thématiques, de jours) sont
toujours dérivés des données via `catalogueStats` : ajouter un programme met
l'ensemble du site à jour.

## Formulaires

Les formulaires de devis et de contact fonctionnent **sans back-end** : à défaut
d'endpoint configuré, ils ouvrent le logiciel de messagerie du visiteur avec une
demande pré-remplie adressée à `executive-education@esme.fr`.

Pour recevoir les demandes par programme, renseignez `NEXT_PUBLIC_FORM_ENDPOINT`
(voir `.env.example`). Le formulaire enverra alors un POST JSON :

```json
{
  "type": "devis",
  "firstName": "...", "lastName": "...", "role": "...", "company": "...",
  "email": "...", "phone": "...",
  "format": "Intra-entreprise", "headcount": "...", "deadline": "...",
  "funding": "OPCO",
  "programmes": ["IA 100", "CYB 110"],
  "message": "...", "consent": "oui", "page": "/formations/..."
}
```

Toute URL acceptant ce POST convient : service d'e-mail transactionnel, webhook,
endpoint CRM. Le formulaire affiche un état d'erreur explicite avec les
coordonnées de repli si la requête échoue.

## Design

Palette reprise de la charte ESME, déclarée en jetons Tailwind dans
`src/app/globals.css` :

| Jeton | Valeur | Usage |
| --- | --- | --- |
| `esme-600` | `#17418F` | Bleu ESME, couleur primaire |
| `esme-950` / `esme-900` | `#03142F` / `#062050` | Fonds de marque |
| `esme-400` | `#4486FF` | Bleu clair, accents |
| `mint-400` | `#2ED9A3` | Vert d'accent, appels à l'action |
| `ink-*` | — | Neutres de texte et de surface |

Typographie : **Inter Tight** pour les titres, **Inter** pour le texte, via
`next/font`. Le site est conçu en thème clair ; `color-scheme: light` neutralise
l'inversion automatique afin de garder des contrastes cohérents sur les fonds de
marque.

## Accessibilité

Lien d'évitement, navigation clavier avec focus visible sur toute la page,
structure de titres cohérente, libellés de formulaire associés, états d'erreur
annoncés, `aria-live` sur les résultats du catalogue, et respect de
`prefers-reduced-motion`. Aucun débordement horizontal de 390 px à 1440 px.

## Référencement

Métadonnées par page, canoniques, Open Graph, `sitemap.xml` et `robots.txt`
générés, et données structurées JSON-LD : `EducationalOrganization` sur le
gabarit, `Course` sur chaque fiche programme, `Article` sur chaque billet.

## Déploiement

Le site est entièrement statique : n'importe quel hébergeur Node ou plateforme
compatible Next.js convient. Pensez à renseigner `site.url` dans
`src/data/site.ts` avec le domaine définitif — il sert aux canoniques, au
sitemap et aux données structurées.

Avant mise en ligne, parcourez **CONTENT.md** : il liste les éléments à valider
ou à compléter par l'équipe.
