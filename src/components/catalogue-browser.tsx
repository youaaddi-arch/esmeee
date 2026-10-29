"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  programs as allPrograms,
  publicLabels,
  publicOrder,
  type Program,
  type Public,
} from "@/data/programs";
import { domains, type DomainSlug } from "@/data/domains";
import { ProgramCard } from "./program-card";
import { Button, cx } from "./ui";

type DurationBucket = "demi" | "1" | "2" | "3+";

const durationBuckets: { id: DurationBucket; label: string; test: (p: Program) => boolean }[] = [
  { id: "demi", label: "½ journée", test: (p) => p.hours <= 3.5 },
  { id: "1", label: "1 jour", test: (p) => p.hours > 3.5 && p.hours <= 7 },
  { id: "2", label: "2 jours", test: (p) => p.hours > 7 && p.hours <= 14 },
  { id: "3+", label: "3 jours et plus", test: (p) => p.hours > 14 },
];

function normalise(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’']/g, " ")
    .toLowerCase();
}

export function CatalogueBrowser({
  initialDomain,
  programs = allPrograms,
}: {
  initialDomain?: DomainSlug;
  programs?: Program[];
}) {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState<DomainSlug | "all">(initialDomain ?? "all");
  const [publics, setPublics] = useState<Public[]>([]);
  const [durations, setDurations] = useState<DurationBucket[]>([]);
  const [interOnly, setInterOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    const needle = normalise(deferredQuery.trim());
    return programs.filter((program) => {
      if (domain !== "all" && program.domain !== domain) return false;
      if (interOnly && program.intraOnly) return false;
      if (publics.length && !publics.some((p) => program.publics.includes(p)))
        return false;
      if (
        durations.length &&
        !durations.some(
          (id) => durationBuckets.find((b) => b.id === id)?.test(program),
        )
      )
        return false;
      if (!needle) return true;
      const haystack = normalise(
        [
          program.code,
          program.title,
          program.objective,
          program.theme,
          program.audience,
          ...program.objectives,
        ].join(" "),
      );
      return needle.split(/\s+/).every((token) => haystack.includes(token));
    });
  }, [programs, deferredQuery, domain, publics, durations, interOnly]);

  const grouped = useMemo(() => {
    const map = new Map<string, Program[]>();
    for (const program of results) {
      const list = map.get(program.theme) ?? [];
      list.push(program);
      map.set(program.theme, list);
    }
    return [...map.entries()];
  }, [results]);

  const activeCount =
    (domain !== "all" && !initialDomain ? 1 : 0) +
    publics.length +
    durations.length +
    (interOnly ? 1 : 0) +
    (query ? 1 : 0);

  const reset = () => {
    setQuery("");
    setDomain(initialDomain ?? "all");
    setPublics([]);
    setDurations([]);
    setInterOnly(false);
  };

  const toggle = <T,>(list: T[], value: T, set: (next: T[]) => void) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  return (
    <div>
      {/* Recherche */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-ink-400"
            aria-hidden
          />
          <label className="sr-only" htmlFor="recherche-formation">
            Rechercher une formation
          </label>
          <input
            id="recherche-formation"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher : photovoltaïque, IA, contract management, PV 100…"
            className="w-full rounded-full border border-ink-300 bg-white py-3 pr-4 pl-11 text-sm text-ink-800 placeholder:text-ink-400 focus:border-esme-400 focus:outline-none"
          />
        </div>
        <Button
          tone="ghost"
          size="lg"
          onClick={() => setFiltersOpen((v) => !v)}
          aria-expanded={filtersOpen}
          aria-controls="filtres-catalogue"
          className="sm:w-auto"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          Filtres
          {activeCount ? (
            <span className="ml-1 rounded-full bg-esme-600 px-1.5 py-0.5 text-[0.65rem] font-semibold text-white">
              {activeCount}
            </span>
          ) : null}
        </Button>
      </div>

      {/* Filtres */}
      <div
        id="filtres-catalogue"
        hidden={!filtersOpen}
        className="mt-4 rounded-2xl border border-ink-200 bg-ink-50 p-5"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {!initialDomain ? (
            <fieldset>
              <legend className="text-[0.7rem] font-semibold tracking-[0.12em] text-ink-500 uppercase">
                Domaine
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                <FilterChip
                  active={domain === "all"}
                  onClick={() => setDomain("all")}
                >
                  Tous
                </FilterChip>
                {domains.map((item) => (
                  <FilterChip
                    key={item.slug}
                    active={domain === item.slug}
                    onClick={() => setDomain(item.slug)}
                  >
                    {item.name}
                  </FilterChip>
                ))}
              </div>
            </fieldset>
          ) : null}

          <fieldset>
            <legend className="text-[0.7rem] font-semibold tracking-[0.12em] text-ink-500 uppercase">
              Public visé
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {publicOrder.map((item) => (
                <FilterChip
                  key={item}
                  active={publics.includes(item)}
                  onClick={() => toggle(publics, item, setPublics)}
                >
                  {publicLabels[item]}
                </FilterChip>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-[0.7rem] font-semibold tracking-[0.12em] text-ink-500 uppercase">
              Durée
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {durationBuckets.map((bucket) => (
                <FilterChip
                  key={bucket.id}
                  active={durations.includes(bucket.id)}
                  onClick={() => toggle(durations, bucket.id, setDurations)}
                >
                  {bucket.label}
                </FilterChip>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-ink-200 pt-5">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-600">
            <input
              type="checkbox"
              checked={interOnly}
              onChange={(event) => setInterOnly(event.target.checked)}
              className="h-4 w-4 rounded border-ink-300 text-esme-600 focus:ring-esme-400"
            />
            Masquer les modules proposés uniquement en intra-entreprise
          </label>
          {activeCount ? (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-esme-600 hover:underline"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
              Réinitialiser les filtres
            </button>
          ) : null}
        </div>
      </div>

      {/* Résultats */}
      <p aria-live="polite" className="mt-8 text-sm text-ink-500">
        <span className="font-semibold text-esme-900">{results.length}</span>{" "}
        {results.length > 1 ? "formations" : "formation"}
        {activeCount ? " correspondant à votre recherche" : " au catalogue"}
      </p>

      {results.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-ink-300 bg-ink-50 p-10 text-center">
          <p className="font-medium text-esme-900">Aucune formation ne correspond.</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-600">
            Élargissez vos critères, ou parlez-nous de votre besoin : un
            dispositif sur-mesure se construit précisément là où le catalogue
            s’arrête.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button tone="ghost" onClick={reset}>
              Réinitialiser les filtres
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-12">
          {grouped.map(([theme, items]) => (
            <div key={theme}>
              <div className="flex items-baseline gap-3">
                <h2 className="text-sm font-semibold tracking-[0.1em] text-esme-700 uppercase">
                  {theme}
                </h2>
                <span className="text-xs text-ink-400">
                  {items.length} {items.length > 1 ? "modules" : "module"}
                </span>
                <span aria-hidden className="h-px flex-1 bg-ink-200" />
              </div>
              <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((program) => (
                  <li key={program.code} className="flex">
                    <ProgramCard
                      program={program}
                      showDomain={domain === "all" && !initialDomain}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-esme-600 bg-esme-600 text-white"
          : "border-ink-300 bg-white text-ink-600 hover:border-esme-300 hover:text-esme-700",
      )}
    >
      {children}
    </button>
  );
}
