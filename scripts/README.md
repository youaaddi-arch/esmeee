# Scripts de reprise du catalogue

Ces scripts régénèrent la couche de données du site à partir du catalogue PDF
officiel. Ils ne sont nécessaires qu'au moment où un nouveau catalogue paraît.

```bash
pip install pdfplumber

# 1. Extraction des 48 fiches programme (une par page du PDF)
python3 scripts/extract_catalogue.py chemin/vers/ESME-EE_Catalogue_2027.pdf data-source/sheets.json

# 2. Génération du module TypeScript consommé par le site
python3 scripts/build_programs.py data-source/sheets.json src/data/programs.ts

# 3. Conditions générales de vente (pages 66-67 du PDF)
python3 scripts/extract_cgv.py chemin/vers/ESME-EE_Catalogue_2027.pdf data-source/cgv.json
```

`extract_catalogue.py` lit la géométrie des pages : il sépare les deux colonnes
de chaque fiche, reconstitue les lignes, puis découpe les rubriques
(public cible, objectif général, objectifs pédagogiques, prérequis, méthodes,
programme, « les + »).

`build_programs.py` porte les tables saisies à la main depuis les pages
« NOS FORMATIONS » du catalogue — durées, modalités, thématiques — ainsi que la
qualification des publics et la liste des modules proposés uniquement en intra.
Ces tables sont en tête de fichier et sont les seuls endroits à mettre à jour
quand le catalogue évolue.

Le JSON produit par l'étape 3 a servi à écrire `src/data/cgv.ts` ; ce fichier est
maintenant édité directement, les CGV changeant moins souvent que le catalogue.
