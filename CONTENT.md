# Contenu : ce qui vient du catalogue, ce qui reste à valider

Ce document distingue ce qui est **repris de sources officielles** de ce qui a
été **rédigé** pour le site. À relire avant mise en ligne.

## Sources utilisées

1. **Catalogue « ESME Executive Education — Formations 2027 »**, 68 pages, mise à
   jour septembre 2026. Source principale.
2. **esme.fr/executive-education** et ses pages de domaine, consultées le
   29 octobre 2026.

## Repris tel quel des sources

Ces éléments n'ont pas été réécrits et ne demandent qu'une relecture de forme.

- **Les 48 fiches programme** : référence, intitulé, durée, modalité, public
  cible, objectif général, objectifs pédagogiques, prérequis, méthodes et moyens
  pédagogiques, programme détaillé, rubrique « les + », mention d'évaluation
  finale. Extraits page par page du PDF.
- **Les 16 articles des conditions générales de vente** (pages 66-67).
- **Les textes de présentation des quatre domaines** (pages 10, 24, 30, 42).
- **Les chiffres de l'Observatoire 2026** : 84 %, 71 %, 82 %, 6/10, et la
  répartition des domaines prioritaires (34 / 26 / 15 / 14 / 14 / 11 %).
- **La méthode en six temps** (analyser, nourrir, co-construire, renforcer,
  évaluer, réinvestir) et la **démarche sur-mesure en quatre temps**
  (comprendre, concevoir, déployer, mesurer).
- **Les trois piliers de l'engagement** : maîtrise, opérationnalité, terrain.
- **Les coordonnées** : 01 56 20 62 04, executive-education@esme.fr,
  34 rue de Fleurus 75006 Paris, 65 bd de Brandebourg 94200 Ivry-sur-Seine,
  ESME 38 rue Molière 94200 Ivry-sur-Seine, SIRET 85210764800028.
- **Les citations** attribuées à Véronique Bonnet et Hervé Jacques, reprises de
  leurs éditos signés au catalogue.
- **Les modules en préparation** annoncés au catalogue.

## Rédigé pour le site — à valider

### 1. Page financement — `src/data/financement.ts`

Le catalogue mentionne l'OPCO et le plan de développement des compétences. La
page va au-delà et décrit **onze dispositifs** : plan de développement des
compétences, OPCO, FNE-Formation, CPF, Pro-A, projet de transition
professionnelle, France Travail, fonds d'assurance formation des indépendants,
AGEFIPH, accord-cadre grands comptes, financement personnel.

Points à faire valider :

- **Aucun montant n'est affiché** : plafonds, taux et participation forfaitaire
  CPF changent chaque année. Les fiches renvoient systématiquement au financeur.
  Si vous souhaitez afficher des montants, datez-les et prévoyez une revue
  annuelle.
- **CPF, Pro-A et PTP sont présentés comme non applicables en direct**, parce
  qu'ils supposent une certification enregistrée au RNCP ou au Répertoire
  spécifique, et que les modules du catalogue délivrent une attestation de fin
  de formation et une évaluation des acquis. **À confirmer** : si une
  certification est enregistrée ou en cours d'enregistrement, ces trois fiches
  doivent être réécrites.
- Les délais annoncés — « trois à six semaines d'instruction » — sont un ordre
  de grandeur. À ajuster selon votre expérience réelle avec les OPCO concernés.
- Les mentions d'annulation et de refus de prise en charge reprennent les
  articles 6, 7 et 9 des CGV.

### 2. Blog — `src/data/blog.ts`

Six articles, écrits à partir du contenu des programmes et de l'Observatoire.
Tous sont signés **« La rédaction »** : aucun nom d'auteur n'a été inventé.
Attribuez-les à leurs auteurs réels avant publication.

| Article | Appuyé sur |
| --- | --- |
| 6/10 : le chiffre que les directions techniques devraient regarder en face | Observatoire 2026 |
| Obligation de solarisation | Fiches PV 100, PV 110, PV 250 |
| Stockage par batteries : la valeur n'est pas dans la batterie | Fiche STK 100 |
| IA générative : pourquoi vos pilotes n'atteignent jamais la production | Fiches IA 100, IA 300, IA 420 |
| Cyber-crise : ce qu'une simulation révèle | Fiche CYB 110 |
| De l'expertise au pilotage | Fiches INTR 100, PROJ 210 |

Les analyses et mises en perspective sont rédigées : elles engagent la parole de
l'école et demandent donc une validation éditoriale. Les dates de publication
sont fictives et à ajuster.

### 3. Équipe pédagogique — `src/data/team.ts`

- **Véronique Bonnet, Hervé Jacques et Aude Bosvieux** figurent au catalogue.
  Leurs fonctions et citations sont exactes ; les biographies de deux à quatre
  phrases sont **rédigées** et à relire par les intéressés.
- **Les cinq profils d'intervenants** décrivent le modèle d'intervention tel
  qu'il ressort des rubriques « méthodes et moyens pédagogiques » des fiches.
  Chaque profil cite la fiche qui l'atteste. Aucun intervenant n'est nommé : le
  catalogue n'en nomme aucun. Pour nommer vos intervenants, ajoutez-les dans
  `facultyProfiles` ou créez une liste dédiée.
- Le champ `photo` de `Person` est prévu mais non utilisé : déposez les
  portraits dans `public/equipe/` et renseignez-le pour remplacer les
  monogrammes.

### 4. Qualification des publics — `scripts/build_programs.py`

Chaque programme est rattaché à un ou plusieurs publics — dirigeants, managers,
équipes métiers, profils techniques — afin d'alimenter les filtres du catalogue.
Cette qualification est **déduite** du champ « public cible » de chaque fiche.
Elle se corrige dans la table `PUBLICS` du script, puis régénération.

### 5. Modules proposés uniquement en intra

Sept modules sont marqués « intra uniquement » : PV 250, LEAD 100, STRA 100,
STRA 101, STRA 110, SOFT 100, SOFT 300. Information issue d'esme.fr, **absente
du catalogue PDF**. À confirmer. Table `INTRA_ONLY` du script de génération.

### 6. Textes d'accroche et de navigation

Titres de section, chapôs et appels à l'action des pages d'accueil, catalogue,
formats, approche et observatoire sont rédigés dans l'esprit du catalogue. Ils
relèvent de votre ligne éditoriale.

## À compléter avant mise en ligne

- [ ] **Domaine définitif** dans `site.url` (`src/data/site.ts`) — sert aux
      canoniques, au sitemap et aux données structurées.
- [ ] **Hébergeur** dans les mentions légales : la section est présente et
      signalée comme à compléter.
- [ ] **Numéro de certificat Qualiopi**, s'il doit être affiché : il n'est pas
      publié sur esme.fr. `qualiopi.validUntil` porte la date du 20/08/2026 lue
      sur le site : **à vérifier**, cette date est passée.
- [ ] **Endpoint des formulaires** (`NEXT_PUBLIC_FORM_ENDPOINT`) ou validation
      du repli par messagerie.
- [ ] **Lien vers le catalogue PDF** en téléchargement, si vous souhaitez
      l'offrir : déposez le fichier dans `public/` et ajoutez le lien.
- [ ] **Portraits de l'équipe** dans `public/equipe/`.
- [ ] **Dates des prochaines sessions inter-entreprises** : elles ne figurent
      pas au catalogue. Si vous souhaitez les publier, ajoutez un champ
      `sessions` au type `Program` et affichez-le sur la fiche.
- [ ] **Tarifs** : volontairement absents, conformément au catalogue
      (« communiqués sur demande »). Si vous décidez de les publier, le type
      `Program` et la fiche programme sont prêts à les recevoir.
- [ ] **Relecture juridique** des CGV telles que reproduites.
- [ ] **Politique de confidentialité** : les mentions légales y renvoient via
      celle de l'ESME. Ajoutez une page dédiée si nécessaire.

## Mettre à jour le catalogue

Au prochain catalogue, voir `scripts/README.md`. Les tables à reprendre à la
main — durées, modalités, thématiques, publics, modules intra — sont groupées en
tête de `scripts/build_programs.py`.
