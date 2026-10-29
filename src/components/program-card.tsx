import Link from "next/link";
import { ArrowRight, Clock, MapPin, Users } from "lucide-react";
import type { Program } from "@/data/programs";
import { publicLabels } from "@/data/programs";
import { domains } from "@/data/domains";
import { accentClasses } from "./icons";
import { Badge, cx } from "./ui";

export function ProgramCard({
  program,
  showDomain = true,
  className,
}: {
  program: Program;
  showDomain?: boolean;
  className?: string;
}) {
  const domain = domains.find((d) => d.slug === program.domain);
  const accent = accentClasses[domain?.accent ?? "blue"];

  return (
    <article
      className={cx(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-esme-300 hover:shadow-lift",
        className,
      )}
    >
      <span aria-hidden className={cx("h-1 w-full", accent.bar)} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-esme-900 px-2 py-0.5 font-mono text-[0.7rem] font-semibold tracking-wide text-white">
            {program.code}
          </span>
          {showDomain && domain ? (
            <Badge tone="neutral">{domain.name}</Badge>
          ) : (
            <Badge tone="neutral">{program.theme}</Badge>
          )}
          {program.intraOnly ? <Badge tone="warn">Intra uniquement</Badge> : null}
        </div>

        <h3 className="mt-4 text-lg leading-snug font-semibold text-esme-900">
          <Link href={`/formations/${program.slug}`} className="hover:underline">
            <span className="absolute inset-0" aria-hidden />
            {program.title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-600">
          {program.objective}
        </p>

        <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-500">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Durée</dt>
            <Clock className="h-3.5 w-3.5 text-esme-400" aria-hidden />
            <dd>
              {program.duration} · {program.hours.toString().replace(".", ",")} h
            </dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Modalité</dt>
            <MapPin className="h-3.5 w-3.5 text-esme-400" aria-hidden />
            <dd>{program.modality}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Public</dt>
            <Users className="h-3.5 w-3.5 text-esme-400" aria-hidden />
            <dd>{publicLabels[program.publics[0]]}</dd>
          </div>
        </dl>

        <p className="mt-5 flex items-center gap-1.5 text-sm font-medium text-esme-600">
          Voir la fiche
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </p>
      </div>
    </article>
  );
}

/** Variante compacte, pour les listes de programmes liés. */
export function ProgramRow({ program }: { program: Program }) {
  return (
    <Link
      href={`/formations/${program.slug}`}
      className="group flex items-start gap-4 rounded-xl border border-ink-200 bg-white p-4 transition-colors hover:border-esme-300 hover:bg-esme-50/40"
    >
      <span className="mt-0.5 shrink-0 rounded-md bg-esme-900 px-2 py-0.5 font-mono text-[0.7rem] font-semibold text-white">
        {program.code}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-esme-900 group-hover:underline">
          {program.title}
        </span>
        <span className="mt-1 block text-xs text-ink-500">
          {program.duration} · {program.theme}
        </span>
      </span>
      <ArrowRight
        className="mt-1 h-4 w-4 shrink-0 text-esme-400 transition-transform group-hover:translate-x-0.5"
        aria-hidden
      />
    </Link>
  );
}
