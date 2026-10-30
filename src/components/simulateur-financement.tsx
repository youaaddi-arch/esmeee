"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  CircleDashed,
  ExternalLink,
  RotateCcw,
  Search,
  User,
  XCircle,
} from "lucide-react";
import {
  companyContextLabels,
  companySizeLabels,
  employerStanceLabels,
  headcountLabels,
  personGoalLabels,
  personStatusLabels,
  pertinenceLabels,
  recommendForCompany,
  recommendForPerson,
  sortRecommendations,
  type CompanyContext,
  type CompanySize,
  type EmployerStance,
  type Headcount,
  type PersonGoal,
  type PersonStatus,
  type Pertinence,
  type Recommendation,
} from "@/data/simulateur";
import {
  criteresAccesLabels,
  opcoById,
  searchOpcos,
  type Opco,
  type OpcoId,
} from "@/data/opco";
import {
  anneeLabels,
  statutExplications,
  statutLabels,
  veille,
  type AnneeFormation,
  type Statut,
} from "@/data/financement-actualite";
import { ButtonLink, Button, cx } from "./ui";

type Track = null | "entreprise" | "particulier";

const pertinenceStyles: Record<
  Pertinence,
  { card: string; chip: string; Icon: typeof CheckCircle2 }
> = {
  prioritaire: {
    card: "border-framboise-300 bg-framboise-100/35",
    chip: "bg-framboise-400 text-esme-950",
    Icon: CheckCircle2,
  },
  possible: {
    card: "border-ink-200 bg-white",
    chip: "bg-esme-100 text-esme-700",
    Icon: CircleDashed,
  },
  "non-applicable": {
    card: "border-ink-200 bg-ink-50",
    chip: "bg-ink-200 text-ink-600",
    Icon: XCircle,
  },
};

const statutStyles: Record<Statut, string> = {
  ouvert: "bg-framboise-100 text-framboise-800",
  "sous-reserve": "bg-amber-100 text-amber-900",
  epuise: "bg-orange-100 text-orange-900",
  ferme: "bg-ink-200 text-ink-700",
};

export function SimulateurFinancement() {
  const [track, setTrack] = useState<Track>(null);

  if (track === null) {
    return (
      <div className="grid gap-5 sm:grid-cols-2">
        <TrackCard
          Icon={Building2}
          title="Je représente une entreprise"
          body="Vous formez un ou plusieurs collaborateurs. Nous identifions votre OPCO et les dispositifs mobilisables selon votre taille et votre contexte."
          cta="Démarrer le simulateur entreprise"
          onClick={() => setTrack("entreprise")}
        />
        <TrackCard
          Icon={User}
          title="Je me forme à titre individuel"
          body="Salarié, demandeur d'emploi, indépendant ou agent public : nous vous indiquons quelles voies sont réellement ouvertes dans votre situation."
          cta="Démarrer le simulateur individuel"
          onClick={() => setTrack("particulier")}
        />
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setTrack(null)}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-esme-600 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Changer de situation
      </button>
      {track === "entreprise" ? <CompanyFlow /> : <PersonFlow />}
    </div>
  );
}

function TrackCard({
  Icon,
  title,
  body,
  cta,
  onClick,
}: {
  Icon: typeof Building2;
  title: string;
  body: string;
  cta: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col rounded-3xl border border-ink-200 bg-white p-7 text-left shadow-card transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-esme-300 hover:shadow-lift"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-esme-100">
        <Icon className="h-6 w-6 text-esme-700" strokeWidth={1.5} aria-hidden />
      </span>
      <span className="mt-5 text-xl font-semibold text-esme-900">{title}</span>
      <span className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
        {body}
      </span>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-esme-600">
        {cta}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden
        />
      </span>
    </button>
  );
}

/* ───────────────────────────── Parcours entreprise ──────────────────────── */

function CompanyFlow() {
  const [size, setSize] = useState<CompanySize | null>(null);
  const [headcount, setHeadcount] = useState<Headcount | null>(null);
  const [context, setContext] = useState<CompanyContext | null>(null);
  const [opco, setOpco] = useState<OpcoId | null>(null);
  const [annee, setAnnee] = useState<AnneeFormation>("2026");
  const [submitted, setSubmitted] = useState(false);

  const complete = size && headcount && context;
  const recos = useMemo(
    () =>
      complete
        ? sortRecommendations(
            recommendForCompany({ size, headcount, context, opco, annee }),
          )
        : [],
    [complete, size, headcount, context, opco, annee],
  );

  if (submitted && complete) {
    return (
      <Results
        recos={recos}
        opco={opco ? opcoById(opco) : undefined}
        summary={[
          companySizeLabels[size],
          headcountLabels[headcount],
          companyContextLabels[context],
          anneeLabels[annee],
        ]}
        onReset={() => {
          setSubmitted(false);
          setSize(null);
          setHeadcount(null);
          setContext(null);
          setOpco(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-10">
      <Question
        step={1}
        label="Quel est l'effectif de votre entreprise ?"
        hint="En dessous de 50 salariés, vous relevez des publics prioritaires des OPCO."
      >
        <Choices
          options={Object.entries(companySizeLabels)}
          value={size}
          onChange={(v) => setSize(v as CompanySize)}
        />
      </Question>

      <Question step={2} label="Combien de personnes souhaitez-vous former ?">
        <Choices
          options={Object.entries(headcountLabels)}
          value={headcount}
          onChange={(v) => setHeadcount(v as Headcount)}
        />
      </Question>

      <Question
        step={3}
        label="Dans quel contexte s'inscrit cette formation ?"
        hint="C'est ce critère qui ouvre — ou ferme — l'accès aux dispositifs les plus avantageux."
      >
        <Choices
          options={Object.entries(companyContextLabels)}
          value={context}
          onChange={(v) => setContext(v as CompanyContext)}
        />
      </Question>

      <Question
        step={4}
        label="Quand la formation se déroulerait-elle ?"
        hint="L'exercice compte : les enveloppes sont annuelles, et les critères 2027 seront arrêtés en fin d'année 2026."
      >
        <Choices
          options={Object.entries(anneeLabels)}
          value={annee}
          onChange={(v) => setAnnee(v as AnneeFormation)}
        />
      </Question>

      <Question
        step={5}
        label="Connaissez-vous votre OPCO ?"
        hint="Facultatif. Si vous l'ignorez, cherchez votre secteur ci-dessous : nous vous proposerons l'OPCO le plus probable, à confirmer auprès de votre service RH."
      >
        <OpcoFinder value={opco} onChange={setOpco} />
      </Question>

      <div className="border-t border-ink-200 pt-6">
        <Button
          size="lg"
          disabled={!complete}
          onClick={() => setSubmitted(true)}
        >
          Voir les dispositifs mobilisables
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        {!complete ? (
          <p className="mt-3 text-sm text-ink-500">
            Répondez aux trois premières questions pour obtenir un résultat.
          </p>
        ) : null}
      </div>
    </div>
  );
}

/* ──────────────────────────── Parcours particulier ──────────────────────── */

function PersonFlow() {
  const [status, setStatus] = useState<PersonStatus | null>(null);
  const [goal, setGoal] = useState<PersonGoal | null>(null);
  const [employer, setEmployer] = useState<EmployerStance | null>(null);
  const [annee, setAnnee] = useState<AnneeFormation>("2026");
  const [submitted, setSubmitted] = useState(false);

  const needsEmployer = status === "salarie-prive";
  const complete = status && goal && (!needsEmployer || employer);

  const recos = useMemo(
    () =>
      complete
        ? sortRecommendations(
            recommendForPerson({
              status,
              goal,
              employer: needsEmployer ? employer! : "hors-sujet",
              annee,
            }),
          )
        : [],
    [complete, status, goal, employer, needsEmployer, annee],
  );

  if (submitted && complete) {
    return (
      <Results
        recos={recos}
        summary={[
          personStatusLabels[status],
          personGoalLabels[goal],
          ...(needsEmployer && employer ? [employerStanceLabels[employer]] : []),
          anneeLabels[annee],
        ]}
        onReset={() => {
          setSubmitted(false);
          setStatus(null);
          setGoal(null);
          setEmployer(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-10">
      <Question step={1} label="Quelle est votre situation ?">
        <Choices
          options={Object.entries(personStatusLabels)}
          value={status}
          onChange={(v) => setStatus(v as PersonStatus)}
        />
      </Question>

      <Question step={2} label="Qu'attendez-vous de cette formation ?">
        <Choices
          options={Object.entries(personGoalLabels)}
          value={goal}
          onChange={(v) => setGoal(v as PersonGoal)}
        />
      </Question>

      {needsEmployer ? (
        <Question
          step={3}
          label="Où en êtes-vous avec votre employeur ?"
          hint="C'est souvent le facteur décisif : la voie employeur est la plus simple et la plus rapide."
        >
          <Choices
            options={Object.entries(employerStanceLabels).filter(
              ([k]) => k !== "hors-sujet",
            )}
            value={employer}
            onChange={(v) => setEmployer(v as EmployerStance)}
          />
        </Question>
      ) : null}

      <Question
        step={needsEmployer ? 4 : 3}
        label="Quand la formation se déroulerait-elle ?"
      >
        <Choices
          options={Object.entries(anneeLabels)}
          value={annee}
          onChange={(v) => setAnnee(v as AnneeFormation)}
        />
      </Question>

      <div className="border-t border-ink-200 pt-6">
        <Button size="lg" disabled={!complete} onClick={() => setSubmitted(true)}>
          Voir les dispositifs mobilisables
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}

/* ────────────────────────────── Briques communes ────────────────────────── */

function Question({
  step,
  label,
  hint,
  children,
}: {
  step: number;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="flex items-baseline gap-3">
        <span
          aria-hidden
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-esme-900 font-mono text-[0.7rem] font-semibold text-white"
        >
          {step}
        </span>
        <span className="text-lg font-semibold text-esme-900">{label}</span>
      </legend>
      {hint ? (
        <p className="mt-2 ml-10 text-sm leading-relaxed text-ink-500">{hint}</p>
      ) : null}
      <div className="mt-4 ml-10">{children}</div>
    </fieldset>
  );
}

function Choices({
  options,
  value,
  onChange,
}: {
  options: [string, string][];
  value: string | null;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {options.map(([key, label]) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          aria-pressed={value === key}
          className={cx(
            "rounded-xl border px-4 py-3 text-left text-sm transition-colors",
            value === key
              ? "border-esme-600 bg-esme-50 font-medium text-esme-800"
              : "border-ink-300 bg-white text-ink-600 hover:border-esme-300 hover:bg-ink-50",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function OpcoFinder({
  value,
  onChange,
}: {
  value: OpcoId | null;
  onChange: (value: OpcoId | null) => void;
}) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchOpcos(query).slice(0, 4), [query]);
  const selected = value ? opcoById(value) : undefined;

  if (selected) {
    return (
      <div className="rounded-xl border border-esme-200 bg-esme-50 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-esme-900">{selected.name}</p>
            <p className="mt-1 text-sm text-ink-600">{selected.scope}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              onChange(null);
              setQuery("");
            }}
            className="text-sm font-medium text-esme-600 hover:underline"
          >
            Changer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative">
        <Search
          className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-400"
          aria-hidden
        />
        <label className="sr-only" htmlFor="recherche-opco">
          Rechercher votre secteur d&apos;activité
        </label>
        <input
          id="recherche-opco"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Votre secteur : métallurgie, bureau d'études, BTP, transport…"
          className="w-full rounded-xl border border-ink-300 bg-white py-3 pr-4 pl-11 text-sm text-ink-800 placeholder:text-ink-400 focus:border-esme-400 focus:outline-none"
        />
      </div>

      {query.length >= 2 ? (
        results.length ? (
          <ul className="mt-3 space-y-2">
            {results.map((opco) => (
              <li key={opco.id}>
                <button
                  type="button"
                  onClick={() => onChange(opco.id)}
                  className="w-full rounded-xl border border-ink-200 bg-white p-4 text-left transition-colors hover:border-esme-300 hover:bg-esme-50/40"
                >
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-esme-900">{opco.name}</span>
                    {opco.esmeRelevance === "forte" ? (
                      <span className="rounded-full bg-framboise-100 px-2 py-0.5 text-[0.65rem] font-medium text-framboise-800">
                        Fréquent chez nos clients
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-600">
                    {opco.scope}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-ink-500">
            Aucun OPCO ne ressort pour « {query} ». Votre OPCO dépend de votre
            convention collective : son code IDCC figure sur vos bulletins de
            paie, et votre service RH l&apos;identifie immédiatement.
          </p>
        )
      ) : null}
    </div>
  );
}

function Results({
  recos,
  opco,
  summary,
  onReset,
}: {
  recos: Recommendation[];
  opco?: Opco;
  summary: string[];
  onReset: () => void;
}) {
  const priority = recos.filter((r) => r.pertinence === "prioritaire").length;

  return (
    <div>
      <div className="rounded-3xl bg-esme-950 p-7 text-esme-100 lg:p-9">
        <p className="text-[0.7rem] font-semibold tracking-[0.14em] text-framboise-300 uppercase">
          Votre orientation
        </p>
        <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
          {priority} dispositif{priority > 1 ? "s" : ""} à mobiliser en priorité
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {summary.map((item) => (
            <li
              key={item}
              className="rounded-full bg-white/10 px-3 py-1 text-xs ring-1 ring-white/15"
            >
              {item}
            </li>
          ))}
        </ul>

        {opco ? (
          <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-esme-100/70">Votre OPCO, selon votre secteur</p>
            <p className="mt-1 text-lg font-semibold text-white">{opco.name}</p>
            {opco.note ? (
              <p className="mt-2 text-sm leading-relaxed text-esme-100/75">
                {opco.note}
              </p>
            ) : null}
            <a
              href={opco.website}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-framboise-300 hover:underline"
            >
              {opco.website.replace("https://www.", "")}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
            <p className="mt-3 text-xs text-esme-100/60">
              {criteresAccesLabels[opco.criteresAcces]}
            </p>
            <p className="mt-4 flex items-start gap-2 border-t border-white/10 pt-4 text-xs leading-relaxed text-esme-100/60">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
              Indication, pas une certitude : votre OPCO découle de votre
              convention collective, identifiable par son code IDCC sur vos
              bulletins de paie.
            </p>
          </div>
        ) : null}
      </div>

      {opco?.dispositifs?.length ? (
        <div className="mt-6 space-y-4">
          {opco.dispositifs.map((d) => (
            <article
              key={d.nom}
              className="rounded-2xl border border-esme-200 bg-esme-50 p-6"
            >
              <p className="text-[0.7rem] font-semibold tracking-[0.12em] text-esme-600 uppercase">
                Dispositif propre à {opco.name}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-esme-900">{d.nom}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{d.resume}</p>

              {d.taux?.length ? (
                <dl className="mt-4 grid gap-3 sm:grid-cols-3">
                  {d.taux.map((t) => (
                    <div key={t.tranche} className="rounded-xl bg-white p-3">
                      <dt className="text-xs text-ink-500">{t.tranche}</dt>
                      <dd className="font-display text-xl font-semibold text-esme-700">
                        {t.taux}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              {d.thematiques?.length ? (
                <div className="mt-4">
                  <p className="mb-2 text-[0.7rem] font-semibold tracking-[0.12em] text-ink-500 uppercase">
                    Thématiques couvertes
                  </p>
                  <ul className="space-y-1.5">
                    {d.thematiques.map((t) => (
                      <li key={t} className="flex gap-2.5 text-sm text-ink-600">
                        <span
                          aria-hidden
                          className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-framboise-400"
                        />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {d.exclusions?.length ? (
                <p className="mt-3 text-sm text-ink-600">
                  <span className="font-medium text-esme-900">Exclusions : </span>
                  {d.exclusions.join(" · ")}
                </p>
              ) : null}

              {d.calendrier ? (
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  <span className="font-medium text-esme-900">Calendrier : </span>
                  {d.calendrier}
                </p>
              ) : null}

              {d.vigilance ? (
                <p className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  <span>{d.vigilance}</span>
                </p>
              ) : null}

              <a
                href={d.url}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-esme-600 hover:underline"
              >
                La page officielle du dispositif
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </article>
          ))}
        </div>
      ) : null}

      <ul className="mt-6 space-y-4">
        {recos.map(({ route, pertinence, reason, statut, actualite, source }) => {
          const style = pertinenceStyles[pertinence];
          return (
            <li
              key={route.slug}
              className={cx("rounded-2xl border p-6", style.card)}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-esme-900">
                  {route.name}
                  {route.acronym ? (
                    <span className="ml-2 font-mono text-sm font-medium text-esme-500">
                      {route.acronym}
                    </span>
                  ) : null}
                </h3>
                <span className="flex flex-wrap items-center gap-2">
                  {statut ? (
                    <span
                      title={statutExplications[statut]}
                      className={cx(
                        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                        statutStyles[statut],
                      )}
                    >
                      {statutLabels[statut]}
                    </span>
                  ) : null}
                  <span
                    className={cx(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                      style.chip,
                    )}
                  >
                    <style.Icon className="h-3.5 w-3.5" aria-hidden />
                    {pertinenceLabels[pertinence]}
                  </span>
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-ink-700">{reason}</p>

              {actualite ? (
                <p className="mt-3 rounded-xl bg-white/70 p-4 text-sm leading-relaxed text-ink-600 ring-1 ring-ink-200">
                  <span className="font-medium text-esme-900">
                    Où en est ce dispositif ?{" "}
                  </span>
                  {actualite}
                  {source ? (
                    <>
                      {" "}
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="font-medium text-esme-600 underline"
                      >
                        {source.label}
                      </a>
                    </>
                  ) : null}
                </p>
              ) : null}

              {pertinence !== "non-applicable" ? (
                <div className="mt-5 border-t border-ink-200/70 pt-4">
                  <p className="mb-2.5 text-[0.7rem] font-semibold tracking-[0.12em] text-esme-700 uppercase">
                    La démarche
                  </p>
                  <ol className="space-y-2">
                    {route.steps.map((step, index) => (
                      <li key={step} className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white font-mono text-[0.65rem] font-semibold text-esme-700 ring-1 ring-ink-300"
                        >
                          {index + 1}
                        </span>
                        <span className="text-sm leading-relaxed text-ink-600">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                  <a
                    href={`/financement#${route.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-esme-600 hover:underline"
                  >
                    Le détail de ce dispositif
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-ink-200 pt-6">
        <ButtonLink href="/devis" size="lg">
          Demander un devis
        </ButtonLink>
        <Button tone="ghost" size="lg" onClick={onReset}>
          <RotateCcw className="h-4 w-4" aria-hidden />
          Recommencer
        </Button>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-ink-500">
        Veille mise à jour le {veille.verifieeLeTexte}. Ce simulateur oriente,
        il n&apos;engage pas. Aucun montant n&apos;est
        affiché : barèmes et critères sont révisés chaque année et relèvent du
        financeur. La seule règle valable partout : déposer le dossier avant le
        démarrage de la formation.
      </p>
    </div>
  );
}
