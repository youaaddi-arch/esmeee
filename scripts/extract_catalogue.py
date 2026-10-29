import json, re, sys, collections
import pdfplumber

PDF = sys.argv[1]
OUT = sys.argv[2]

COL_SPLIT = 292.0
TOP_BAND = 95.0

LEFT_HEADERS = [
    "PUBLIC CIBLE",
    "OBJECTIFS PEDAGOGIQUES",
    "PREREQUIS",
    "METHODES ET MOYENS PEDAGOGIQUES",
    "LES +",
]
RIGHT_HEADERS = ["OBJECTIF GENERAL", "PROGRAMME"]

def deaccent(s):
    table = str.maketrans("ÀÁÂÄÃÇÈÉÊËÌÍÎÏÑÒÓÔÖÕÙÚÛÜŸàáâäãçèéêëìíîïñòóôöõùúûüÿ",
                          "AAAAACEEEEIIIINOOOOOUUUUYaaaaaceeeeiiiinooooouuuuy")
    return s.translate(table)

def norm(s):
    return re.sub(r"\s+", " ", deaccent(s).upper()).strip()

def lines_from(words, tol=3.0):
    """Group words into lines by their vertical position."""
    rows = collections.defaultdict(list)
    for w in sorted(words, key=lambda w: (w["top"], w["x0"])):
        key = None
        for k in rows:
            if abs(k - w["top"]) <= tol:
                key = k
                break
        rows[key if key is not None else w["top"]].append(w)
    out = []
    for top in sorted(rows):
        ws = sorted(rows[top], key=lambda w: w["x0"])
        text = ""
        prev = None
        for w in ws:
            if prev is not None and w["x0"] - prev > 1.2:
                text += " "
            text += w["text"]
            prev = w["x1"]
        out.append({"top": top, "text": re.sub(r"\s+", " ", text).strip(),
                    "size": max(w["size"] for w in ws)})
    return out

FOOTER_RE = re.compile(r"Nous contacter|executive-education@esme\.fr|^\d{1,2}$")

def split_sections(lines, headers):
    """Split a column's lines into {header: [lines]} using known headers."""
    sections = collections.OrderedDict()
    current = "_intro"
    sections[current] = []
    for ln in lines:
        t = ln["text"]
        if FOOTER_RE.search(t):
            continue
        n = norm(t)
        matched = next((h for h in headers if n == h), None)
        if matched:
            current = matched
            sections.setdefault(current, [])
            continue
        sections[current].append(ln)
    return sections

def as_bullets(lines):
    """Turn lines into bullet strings, joining wrapped continuation lines."""
    bullets, buf = [], None
    for ln in lines:
        t = ln["text"]
        if t.startswith("•"):
            if buf:
                bullets.append(buf)
            buf = t.lstrip("• ").strip()
        elif buf is not None:
            buf += " " + t
        else:
            buf = t
    if buf:
        bullets.append(buf)
    return [re.sub(r"\s+", " ", b).strip(" .") for b in bullets if b.strip()]

def parse_programme(lines):
    """Right column PROGRAMME: uppercase headings followed by bullet items."""
    blocks, cur = [], None
    for ln in lines:
        t = ln["text"]
        if not t:
            continue
        letters = [c for c in deaccent(t) if c.isalpha()]
        is_heading = (
            not t.startswith("•")
            and letters
            and sum(c.isupper() for c in letters) / len(letters) > 0.85
        )
        if is_heading:
            if cur:
                blocks.append(cur)
            cur = {"heading": t, "raw": []}
        else:
            if cur is None:
                cur = {"heading": None, "raw": []}
            cur["raw"].append(ln)
    if cur:
        blocks.append(cur)
    out = []
    for b in blocks:
        out.append({"heading": b["heading"], "items": as_bullets(b["raw"])})
    return out

REF_RE = re.compile(r"^([A-Z]{2,6})\s?(\d{3})$")

with pdfplumber.open(PDF) as pdf:
    sheets, skipped = [], []
    for idx, page in enumerate(pdf.pages, start=1):
        words = page.extract_words(extra_attrs=["size"])
        if not words:
            continue
        top = [w for w in words if w["top"] < TOP_BAND]
        body = [w for w in words if w["top"] >= TOP_BAND]

        # Reference: big-ish text in the top-right corner
        ref_words = [w for w in top if w["x0"] > 450 and w["size"] > 11]
        ref = norm(" ".join(w["text"] for w in sorted(ref_words, key=lambda w: w["x0"])))
        ref = ref.replace("REF. :", "").strip()
        if not REF_RE.match(ref):
            skipped.append({"page": idx, "ref_guess": ref})
            continue
        code = f"{REF_RE.match(ref).group(1)} {REF_RE.match(ref).group(2)}"

        # Le titre occupe la colonne de gauche du bandeau, en corps 14 pt ou plus
        # (20 pt en général, 16 pt pour les intitulés longs).
        title_words = [w for w in top if w["size"] >= 14 and w["x0"] < 400]
        title = " ".join(
            w["text"] for w in sorted(title_words, key=lambda w: (round(w["top"] / 6), w["x0"]))
        )
        meta_lines = [l["text"] for l in lines_from([w for w in top if 380 < w["x0"] < 500 and w["size"] < 11])]
        meta = " | ".join(meta_lines)

        theme = " ".join(w["text"] for w in sorted((w for w in top if w["size"] < 9 and w["x0"] < 300),
                                                   key=lambda w: w["x0"]))

        left = lines_from([w for w in body if w["x0"] < COL_SPLIT])
        right = lines_from([w for w in body if w["x0"] >= COL_SPLIT])

        ls = split_sections(left, LEFT_HEADERS)
        rs = split_sections(right, RIGHT_HEADERS)

        sheets.append({
            "page": idx,
            "code": code,
            "title": re.sub(r"\s+", " ", title).strip(),
            "theme": theme.strip(),
            "meta_raw": meta,
            "public_cible": " ".join(l["text"] for l in ls.get("PUBLIC CIBLE", [])).strip(),
            "objectif_general": " ".join(l["text"] for l in rs.get("OBJECTIF GENERAL", [])).strip(),
            "objectifs_pedagogiques": as_bullets(ls.get("OBJECTIFS PEDAGOGIQUES", [])),
            "prerequis": as_bullets(ls.get("PREREQUIS", [])),
            "methodes": as_bullets(ls.get("METHODES ET MOYENS PEDAGOGIQUES", [])),
            "les_plus": " ".join(l["text"] for l in ls.get("LES +", [])).strip(),
            "programme": parse_programme(rs.get("PROGRAMME", [])),
        })

with open(OUT, "w", encoding="utf-8") as f:
    json.dump({"sheets": sheets, "skipped": skipped}, f, ensure_ascii=False, indent=1)

print(f"sheets={len(sheets)}  skipped={len(skipped)}")
print("codes:", ", ".join(s["code"] for s in sheets))
print("skipped pages:", [s["page"] for s in skipped])
