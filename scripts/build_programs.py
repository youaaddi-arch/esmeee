"""Transforme les fiches extraites du catalogue PDF en module TypeScript."""
import json, re, sys, unicodedata

SHEETS = sys.argv[1]
OUT_TS = sys.argv[2]

# ── Tables relevées sur les pages « NOS FORMATIONS » du catalogue (p. 11/25/31/43)
DURATIONS = {
    "ENR 100": ("2 jours", 14), "PV 100": ("3 jours", 21), "PV 110": ("1 jour", 7),
    "PV 250": ("1 jour", 7), "SGRID 100": ("1 jour", 7), "STK 100": ("2 jours", 14),
    "HT 100": ("3 jours", 21), "HT 200": ("3 jours", 21), "HT 300": ("4 jours", 28),
    "ENRJ 200": ("2 jours", 14), "ENRJ 210": ("2 jours", 14), "DATAC 200": ("2 jours", 14),
    "FA 400": ("2 jours", 14), "FA 410": ("1 jour", 7), "FA 420": ("1 jour", 7),
    "DL 100": ("1 jour", 7),
    "IA 100": ("1 jour", 7), "IA 200": ("1 jour", 7), "IA 300": ("½ jour", 3.5),
    "IA 310": ("1 jour", 7), "IA 400": ("½ jour", 3.5), "IA 410": ("½ jour", 3.5),
    "IA 420": ("1 jour", 7), "CYB 100": ("1 jour", 7), "CYB 110": ("1 jour", 7),
    "CYB 300": ("1 jour", 7),
    "LEAD 100": ("2 jours", 14), "LEAD 200": ("2 jours", 14), "LEAD 300": ("3 jours", 21),
    "INTR 100": ("10 jours", 70), "INTR 110": ("2 jours", 14), "INTR 120": ("2 jours", 14),
    "INTR 130": ("2 jours", 14), "INTR 140": ("2 jours", 14), "INTR 150": ("2 jours", 14),
    "PROJ 100": ("4 jours", 28), "PROJ 210": ("1 jour", 7), "PROJ 220": ("2 jours", 14),
    "PROJ 230": ("2 jours", 14), "PROJ 240": ("1 jour", 7), "PROJ 250": ("2 jours", 14),
    "STRA 100": ("2 jours", 14), "STRA 101": ("4 jours", 28), "STRA 110": ("4 jours", 28),
    "STRA 300": ("2 jours", 14),
    "SOFT 100": ("1 jour", 7), "SOFT 110": ("2 jours", 14), "SOFT 300": ("2 jours", 14),
}

# Modalité pédagogique publiée au catalogue
MODALITE = {"ENRJ 210": "Présentiel ou distanciel", "IA 300": "Distanciel ou présentiel"}

# Domaine et thème, déduits du préfixe de référence (structure du catalogue)
PREFIX = {
    "ENR": ("energies-services", "Smart grids et énergies renouvelables"),
    "PV": ("energies-services", "Smart grids et énergies renouvelables"),
    "SGRID": ("energies-services", "Smart grids et énergies renouvelables"),
    "STK": ("energies-services", "Smart grids et énergies renouvelables"),
    "HT": ("energies-services", "Réseaux et infrastructures électriques"),
    "ENRJ": ("energies-services", "Efficacité énergétique"),
    "DATAC": ("energies-services", "Data center"),
    "FA": ("industrie", "Fabrication additive"),
    "DL": ("industrie", "Fabrication additive"),
    "IA": ("numerique", "Intelligence artificielle"),
    "CYB": ("numerique", "Cybersécurité"),
    "LEAD": ("management-transformation", "Leadership"),
    "INTR": ("management-transformation", "Intrapreneuriat"),
    "PROJ": ("management-transformation", "Management de projets complexes"),
    "STRA": ("management-transformation", "Stratégie"),
    "SOFT": ("management-transformation", "Soft skills"),
}

# Modules proposés uniquement en intra-entreprise (source : esme.fr)
INTRA_ONLY = {"PV 250", "LEAD 100", "STRA 100", "STRA 101", "STRA 110", "SOFT 100", "SOFT 300"}

# Publics visés, qualifiés à partir du champ « PUBLIC CIBLE » de chaque fiche
PUBLICS = {
    "ENR 100": ["dirigeants", "metiers"], "PV 100": ["techniques"], "PV 110": ["techniques", "metiers"],
    "PV 250": ["metiers", "managers"], "SGRID 100": ["techniques", "managers"],
    "STK 100": ["techniques", "managers"], "HT 100": ["techniques"], "HT 200": ["techniques"],
    "HT 300": ["techniques"], "ENRJ 200": ["techniques", "metiers"], "ENRJ 210": ["techniques"],
    "DATAC 200": ["techniques", "managers"],
    "FA 400": ["techniques"], "FA 410": ["techniques"], "FA 420": ["techniques"], "DL 100": ["techniques"],
    "IA 100": ["dirigeants"], "IA 200": ["metiers", "managers"],
    "IA 300": ["metiers", "managers", "techniques"], "IA 310": ["metiers"],
    "IA 400": ["metiers", "managers"], "IA 410": ["metiers", "managers"],
    "IA 420": ["metiers", "techniques"], "CYB 100": ["dirigeants", "managers"],
    "CYB 110": ["dirigeants", "managers", "techniques"],
    "CYB 300": ["dirigeants", "managers", "metiers", "techniques"],
    "LEAD 100": ["managers"], "LEAD 200": ["managers"], "LEAD 300": ["dirigeants"],
    "INTR 100": ["managers", "techniques"], "INTR 110": ["managers", "techniques"],
    "INTR 120": ["managers", "techniques"], "INTR 130": ["managers"], "INTR 140": ["managers"],
    "INTR 150": ["managers"],
    "PROJ 100": ["managers", "techniques"], "PROJ 210": ["managers"], "PROJ 220": ["managers", "techniques"],
    "PROJ 230": ["managers", "metiers"], "PROJ 240": ["managers", "metiers"], "PROJ 250": ["managers", "techniques"],
    "STRA 100": ["dirigeants"], "STRA 101": ["dirigeants"], "STRA 110": ["dirigeants"],
    "STRA 300": ["managers"],
    "SOFT 100": ["managers", "metiers"], "SOFT 110": ["dirigeants", "managers"], "SOFT 300": ["managers", "dirigeants"],
}

# Les cinq modules qui composent le Parcours Ingénieur Intrapreneur (INTR 100)
PARCOURS_INTR = ["INTR 110", "INTR 120", "INTR 130", "INTR 140", "INTR 150"]

# L'indice « 2 » de « CO2 » est un caractère en exposant que l'extraction
# ne peut pas replacer dans le fil du titre.
TITLE_OVERRIDE = {
    "DL 100": "Intégrez la découpe laser CO2 dans vos processus de création produit",
}

# Corrections ponctuelles : certains libellés du catalogue sont composés avec
# un crénage négatif que l'extraction restitue sans espaces.
TEXT_FIX = {
    "Unitinéraireen5étapesclés(10jours)": "Un itinéraire en 5 étapes clés (10 jours)",
}

# Rubrique de programme sans titre dans la maquette du catalogue.
HEADING_FALLBACK = {"INTR 100": "LE PARCOURS EN 5 ÉTAPES"}

INTRO_OBJ = "sera capable de"
INTRO_METH = "combinant"


def slugify(s):
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = s.replace("’", " ").replace("'", " ").replace("œ", "oe")
    s = re.sub(r"[^a-zA-Z0-9]+", "-", s).strip("-").lower()
    return re.sub(r"-{2,}", "-", s)


def clean(s):
    """Normalise les apostrophes et les espaces insécables du PDF."""
    s = s.replace("’", "’").replace(" ", " ").replace("ﬁ", "fi").replace("ﬂ", "fl")
    s = re.sub(r"\s+", " ", s).strip()
    # Typographie française : pas d'espace avant la virgule ou le point,
    # une espace avant les deux-points, point-virgule, « ! » et « ? ».
    s = re.sub(r"\s+([,.…])", r"\1", s)
    s = re.sub(r"\s*([:;!?])", r" \1", s)
    s = re.sub(r"«\s*", "« ", s).replace("«  ", "« ")
    s = re.sub(r"\s*»", " »", s)
    s = re.sub(r"\s{2,}", " ", s).strip()
    return TEXT_FIX.get(s, s)


def merge_headings(blocks):
    """Recolle les titres de rubrique coupés sur deux lignes par la mise en page."""
    out = []
    pending = []
    for b in blocks:
        head = clean(b["heading"] or "")
        items = [clean(i) for i in b["items"] if clean(i)]
        if head and not items:
            pending.append(head)
            continue
        if head or items:
            full = " ".join(pending + ([head] if head else []))
            out.append({"heading": clean(full), "items": items})
            pending = []
    if pending:
        out.append({"heading": clean(" ".join(pending)), "items": []})
    return out


def split_programme(blocks):
    """Sépare le programme de la mention d'évaluation finale."""
    programme, evaluation = [], None
    for b in blocks:
        h = b["heading"].upper()
        if "ÉVALUATION" in h and "ACQUIS" in h and not b["items"]:
            evaluation = b["heading"]
            continue
        programme.append(b)
    return programme, evaluation


def sentences(s):
    s = clean(s)
    if not s:
        return []
    parts = re.split(r"(?<=[.!?])\s+(?=[A-ZÀÂÉÈÊËÎÏÔÙÛÜÇ«])", s)
    return [p.strip() for p in parts if p.strip()]


def ts(value, indent=2):
    """Sérialise en littéral TypeScript lisible."""
    pad = " " * indent
    if value is None:
        return "null"
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, (int, float)):
        return repr(value)
    if isinstance(value, str):
        return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'
    if isinstance(value, list):
        if not value:
            return "[]"
        inner = ",\n".join(pad + "  " + ts(v, indent + 2) for v in value)
        return "[\n" + inner + ",\n" + pad + "]"
    if isinstance(value, dict):
        inner = ",\n".join(
            f"{pad}  {k}: {ts(v, indent + 2)}" for k, v in value.items()
        )
        return "{\n" + inner + ",\n" + pad + "}"
    raise TypeError(type(value))


data = json.load(open(SHEETS, encoding="utf-8"))
out = []
seen = set()

for s in data["sheets"]:
    code = s["code"]
    prefix = code.split()[0]
    domain, theme = PREFIX[prefix]
    duration, hours = DURATIONS[code]

    objectives = [clean(o) for o in s["objectifs_pedagogiques"]]
    objectives = [o for o in objectives if INTRO_OBJ not in o and o]

    methods = [clean(m) for m in s["methodes"]]
    methods = [m for m in methods if INTRO_METH not in m and m]

    prerequisites = [clean(p) for p in s["prerequis"] if clean(p)]

    programme, evaluation = split_programme(merge_headings(s["programme"]))
    for block in programme:
        if not block["heading"]:
            block["heading"] = HEADING_FALLBACK.get(code, "PROGRAMME")

    title = TITLE_OVERRIDE.get(code, clean(s["title"]))
    slug = f"{slugify(code)}-{slugify(title)}"
    if len(slug) > 72:
        slug = slug[:72].rsplit("-", 1)[0]
    slug = slug.strip("-")
    assert slug not in seen, slug
    seen.add(slug)

    entry = {
        "code": code,
        "slug": slug,
        "title": title,
        "domain": domain,
        "theme": theme,
        "objective": clean(s["objectif_general"]).rstrip("."),
        "audience": clean(s["public_cible"]).rstrip("."),
        "publics": PUBLICS[code],
        "objectives": objectives,
        "prerequisites": prerequisites,
        "methods": methods,
        "highlights": sentences(s["les_plus"]),
        "duration": duration,
        "hours": hours,
        "modality": MODALITE.get(code, "Présentiel"),
        "intraOnly": code in INTRA_ONLY,
        "programme": programme,
        "evaluation": evaluation,
        "catalogPage": s["page"],
    }
    if code == "INTR 100":
        entry["parcoursModules"] = PARCOURS_INTR
    if code in PARCOURS_INTR:
        entry["partOfParcours"] = "INTR 100"
    out.append(entry)

header = '''import type { DomainSlug } from "./domains";

/**
 * Catalogue ESME Executive Education — Formations 2027.
 *
 * Ce fichier est généré à partir du catalogue officiel
 * « ESME-EE_Catalogue_2027.pdf » (68 pages, mise à jour septembre 2026).
 * Références, intitulés, durées, publics cibles, objectifs, prérequis,
 * méthodes pédagogiques et programmes sont repris des fiches du catalogue.
 *
 * Les tarifs ne figurent pas au catalogue : ils sont communiqués sur demande.
 */

/** Publics visés — sert de filtre dans le catalogue en ligne. */
export type Public = "dirigeants" | "managers" | "metiers" | "techniques";

export const publicLabels: Record<Public, string> = {
  dirigeants: "Dirigeants & CoDir",
  managers: "Managers & chefs de projet",
  metiers: "Équipes métiers",
  techniques: "Profils techniques",
};

export const publicOrder: Public[] = ["dirigeants", "managers", "metiers", "techniques"];

export type ProgramFormat = "inter" | "intra" | "sur-mesure";

export const formatLabels: Record<ProgramFormat, string> = {
  inter: "Inter-entreprises",
  intra: "Intra-entreprise",
  "sur-mesure": "Sur-mesure",
};

/** Une rubrique du programme détaillé. */
export type ProgrammeBlock = {
  heading: string;
  items: string[];
};

export type Program = {
  /** Référence catalogue, ex. « PV 100 ». */
  code: string;
  slug: string;
  title: string;
  domain: DomainSlug;
  theme: string;
  /** Objectif général de la fiche catalogue. */
  objective: string;
  /** Public cible tel que publié au catalogue. */
  audience: string;
  /** Qualification du public, pour le filtrage. */
  publics: Public[];
  /** Objectifs pédagogiques : « à l'issue de la formation, le participant sera capable de… ». */
  objectives: string[];
  prerequisites: string[];
  methods: string[];
  /** Rubrique « Les + » de la fiche catalogue. */
  highlights: string[];
  duration: string;
  hours: number;
  modality: string;
  /** Modules proposés uniquement en intra-entreprise. */
  intraOnly: boolean;
  programme: ProgrammeBlock[];
  /** Mention d'évaluation finale des acquis. */
  evaluation: string | null;
  /** Page de la fiche dans le catalogue PDF. */
  catalogPage: number;
  /** Pour le Parcours Ingénieur Intrapreneur : les modules qui le composent. */
  parcoursModules?: string[];
  /** Pour un module de parcours : la référence du parcours parent. */
  partOfParcours?: string;
};

export const programs: Program[] = '''

footer = '''

export const programByCode = (code: string): Program | undefined =>
  programs.find((p) => p.code.toLowerCase() === code.toLowerCase());

export const programBySlug = (slug: string): Program | undefined =>
  programs.find((p) => p.slug === slug);

export const programsByDomain = (domain: DomainSlug): Program[] =>
  programs.filter((p) => p.domain === domain);

/** Totaux affichés dans l'interface — toujours dérivés des données. */
export const catalogueStats = {
  programCount: programs.length,
  domainCount: new Set(programs.map((p) => p.domain)).size,
  themeCount: new Set(programs.map((p) => p.theme)).size,
  totalDays: programs.reduce((sum, p) => sum + p.hours / 7, 0),
};

/** Modules annoncés « en préparation » au catalogue 2027. */
export const upcomingModules: { domain: DomainSlug; title: string }[] = [
  { domain: "energies-services", title: "Cyber-résilience des réseaux énergétiques" },
  { domain: "energies-services", title: "Comprendre et accélérer l'électrification des usages" },
  { domain: "numerique", title: "Esprit critique de l'ingénieur à l'âge de l'IA" },
  { domain: "numerique", title: "Créer et orchestrer des agents IA pour ingénieurs" },
];
'''

with open(OUT_TS, "w", encoding="utf-8") as f:
    f.write(header + ts(out, 0) + ";\n" + footer)

print(f"{len(out)} programmes écrits dans {OUT_TS}")
by_domain = {}
for e in out:
    by_domain.setdefault(e["domain"], []).append(e["code"])
for d, codes in by_domain.items():
    print(f"  {d}: {len(codes)}")
empty = [e["code"] for e in out if not e["programme"]]
print("fiches sans programme:", empty or "aucune")
noobj = [e["code"] for e in out if not e["objectives"]]
print("fiches sans objectifs:", noobj or "aucune")
