import json, re, sys, collections
import pdfplumber

PDF, OUT = sys.argv[1], sys.argv[2]
SPLIT = 300.0

def lines_from(words, tol=3.0):
    rows = collections.defaultdict(list)
    for w in sorted(words, key=lambda w: (w["top"], w["x0"])):
        key = next((k for k in rows if abs(k - w["top"]) <= tol), None)
        rows[key if key is not None else w["top"]].append(w)
    out = []
    for top in sorted(rows):
        ws = sorted(rows[top], key=lambda w: w["x0"])
        out.append(re.sub(r"\s+", " ", " ".join(w["text"] for w in ws)).strip())
    return out

raw = []
with pdfplumber.open(PDF) as pdf:
    for pno in (66, 67):
        page = pdf.pages[pno - 1]
        words = [w for w in page.extract_words(extra_attrs=["size"]) if w["top"] > 60]
        for col in (
            [w for w in words if w["x0"] < SPLIT],
            [w for w in words if w["x0"] >= SPLIT],
        ):
            raw.extend(lines_from(col))

ART = re.compile(r"^ARTICLE\s+(\d+)\s*[–-]?\s*(.*)$", re.I)
articles, current, trailer = [], None, []

for line in raw:
    if not line or re.fullmatch(r"\d{1,3}", line):
        continue
    # Sur la page 67, le titre courant et le début de l'article 7 partagent
    # la même ligne : on retire le titre courant plutôt que la ligne entière.
    line = re.sub(r"^CONDITIONS\s*(GÉNÉRALES DE VENTE)?\s*", "", line).strip()
    line = re.sub(r"^GÉNÉRALES DE VENTE\s*", "", line).strip()
    if not line:
        continue
    m = ART.match(line)
    if m:
        if current:
            articles.append(current)
        current = {"number": int(m.group(1)), "title": m.group(2).strip(" –-"), "paragraphs": []}
        continue
    if current is None:
        continue
    if line.startswith("Mise à jour"):
        trailer.append(line)
        continue
    # Un titre d'article continué sur la ligne suivante est tout en capitales.
    letters = [c for c in line if c.isalpha()]
    if (
        not current["paragraphs"]
        and letters
        and sum(c.isupper() for c in letters) / len(letters) > 0.85
    ):
        current["title"] = (current["title"] + " " + line).strip()
        continue
    bullet = line.startswith("•")
    text = line.lstrip("• ").strip()
    if bullet:
        current["paragraphs"].append({"kind": "li", "text": text})
    else:
        prev = current["paragraphs"][-1] if current["paragraphs"] else None
        # Recolle les lignes d'un même paragraphe.
        if prev and not re.search(r"[.:;!?]$", prev["text"]):
            prev["text"] = (prev["text"] + " " + text).strip()
        else:
            current["paragraphs"].append({"kind": "p", "text": text})

if current:
    articles.append(current)

ACRONYMS = ["RGPD", "ESME", "CGV", "CLIENT", "OPCO", "PCA", "PRA", "TVA", "CPF"]


def sentence_case(title):
    """Les titres du catalogue sont en capitales : on les repasse en bas de
    casse en restaurant les sigles."""
    title = re.sub(r"\s+", " ", title).strip()
    if not title.isupper():
        return title
    out = title.capitalize()
    for acronym in ACRONYMS:
        out = re.sub(rf"\b{acronym.lower()}\b", acronym, out, flags=re.I)
    out = re.sub(r"\besme executive education\b", "ESME Executive Education", out, flags=re.I)
    return out


articles.sort(key=lambda a: a["number"])
for a in articles:
    a["title"] = sentence_case(a["title"])

json.dump({"articles": articles, "trailer": trailer}, open(OUT, "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)
print("articles:", [(a["number"], a["title"][:60], len(a["paragraphs"])) for a in articles])
print("trailer:", trailer)
