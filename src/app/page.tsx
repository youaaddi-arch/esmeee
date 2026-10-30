import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock, Quote } from "lucide-react";
import {
  commitments,
  contact,
  formats,
  keyFigures,
  method,
  observatory,
  qualiopi,
  site,
} from "@/data/site";
import { domains } from "@/data/domains";
import { catalogueStats, programByCode, programs } from "@/data/programs";
import { sortedArticles } from "@/data/blog";
import { CtaBand } from "@/components/cta-band";
import { ImageBand } from "@/components/image-band";
import { ProgramCard } from "@/components/program-card";
import { DomainIcon, accentClasses } from "@/components/icons";
import {
  Badge,
  BulletList,
  ButtonLink,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
  Stat,
} from "@/components/ui";

/** Formats pédagogiques marquants, mis en avant en page d’accueil. */
const spotlightCodes = ["IA 100", "PROJ 220", "CYB 110", "INTR 100", "PV 100", "STK 100"];

export default function HomePage() {
  const spotlight = spotlightCodes
    .map((code) => programByCode(code))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const latest = sortedArticles().slice(0, 3);
  const totalDays = Math.round(catalogueStats.totalDays);

  return (
    <>
      {/* ───────────────────────────── Hero ───────────────────────────── */}
      <section className="relative overflow-hidden bg-esme-950 text-esme-100">
        {/* Photo de campus en fond, très assombrie : elle apporte de la
            matière sans jamais disputer la lisibilité au texte. */}
        <Image
          src="/photos/hero-transformation.webp"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-esme-950 via-esme-950/95 to-esme-950/70"
        />
        <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />
        <div
          aria-hidden
          className="absolute -top-40 right-0 h-[32rem] w-[32rem] rounded-full bg-esme-600/30 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-framboise-400/10 blur-3xl"
        />

        <Container size="wide" className="relative py-20 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Eyebrow tone="light">
                La formation continue de l’ESME · Catalogue {site.catalogueYear}
              </Eyebrow>
              <h1 className="mt-6 max-w-2xl text-4xl leading-[1.05] font-semibold text-white sm:text-5xl lg:text-[3.5rem]">
                Conduire les transformations complexes
              </h1>
              <p className="mt-5 max-w-xl text-xl leading-relaxed text-framboise-300">
                Les compétences pour décider, piloter et transformer.
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-esme-100/80">
                {site.intro}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/formations" tone="secondary" size="lg">
                  Voir les {catalogueStats.programCount} formations
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </ButtonLink>
                <ButtonLink href="/devis" tone="outlineLight" size="lg">
                  Demander un devis
                </ButtonLink>
              </div>

              <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-esme-100/60">
                <span className="inline-flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-framboise-400" aria-hidden />
                  Certifié Qualiopi — actions de formation
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-framboise-400" aria-hidden />
                  Formats de ½ journée à 10 jours
                </span>
              </p>
            </div>

            {/* Carte catalogue */}
            <div className="relative">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm">
                <p className="text-[0.7rem] font-semibold tracking-[0.14em] text-framboise-300 uppercase">
                  Le catalogue en bref
                </p>
                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-7 [&>div]:flex [&>div]:flex-col">
                  <div>
                    <dt className="order-2 mt-1 text-sm text-esme-100/70">
                      formations
                    </dt>
                    <dd className="font-display text-4xl font-semibold text-white">
                      {catalogueStats.programCount}
                    </dd>
                  </div>
                  <div>
                    <dt className="order-2 mt-1 text-sm text-esme-100/70">
                      domaines d’expertise
                    </dt>
                    <dd className="font-display text-4xl font-semibold text-white">
                      {catalogueStats.domainCount}
                    </dd>
                  </div>
                  <div>
                    <dt className="order-2 mt-1 text-sm text-esme-100/70">
                      thématiques
                    </dt>
                    <dd className="font-display text-4xl font-semibold text-white">
                      {catalogueStats.themeCount}
                    </dd>
                  </div>
                  <div>
                    <dt className="order-2 mt-1 text-sm text-esme-100/70">
                      jours de formation
                    </dt>
                    <dd className="font-display text-4xl font-semibold text-white">
                      {totalDays}
                    </dd>
                  </div>
                </dl>

                <ul className="mt-7 space-y-2.5 border-t border-white/10 pt-6">
                  {domains.map((domain) => {
                    const count = programs.filter(
                      (p) => p.domain === domain.slug,
                    ).length;
                    return (
                      <li key={domain.slug}>
                        <Link
                          href={`/domaines/${domain.slug}`}
                          className="group flex items-center justify-between gap-4 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-white/5"
                        >
                          <span className="flex items-center gap-2.5 text-esme-100/85">
                            <DomainIcon
                              icon={domain.icon}
                              className="h-4 w-4 text-framboise-400"
                            />
                            {domain.name}
                          </span>
                          <span className="shrink-0 font-mono text-xs text-esme-100/50 group-hover:text-framboise-300">
                            {count}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────────── Chiffres institutionnels ──────────────────── */}
      <Section tone="tint" className="py-14 sm:py-16">
        <Container size="wide">
          <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {keyFigures.map((figure) => (
              <div key={figure.label}>
                <Stat
                  value={figure.value}
                  unit={figure.unit || undefined}
                  label={figure.label}
                  detail={figure.detail}
                />
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* ───────────────────────── Observatoire ─────────────────────────── */}
      <Section>
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow={`Observatoire ${observatory.year}`}
                title={observatory.headline}
                lead={`Nous avons interrogé ${observatory.sample}. Le constat n’est pas celui du déni, mais de la lucidité sans moyens.`}
              />
              <figure className="mt-8 border-l-2 border-framboise-400 pl-5">
                <Quote className="h-5 w-5 text-framboise-400" aria-hidden />
                <blockquote className="mt-3">
                  <p className="font-display text-xl leading-snug font-medium text-esme-800">
                    Sommes-nous capables de faire évoluer les compétences aussi
                    vite que les technologies ?
                  </p>
                </blockquote>
                <figcaption className="mt-3 text-sm text-ink-500">
                  Hervé Jacques, Directeur {site.name}
                </figcaption>
              </figure>
              <div className="mt-8">
                <ButtonLink href="/observatoire" tone="ghost">
                  Lire les résultats de l’Observatoire
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </ButtonLink>
              </div>
            </div>

            <dl className="grid gap-6 self-start sm:grid-cols-2">
              {observatory.figures.map((figure) => (
                <div
                  key={figure.value}
                  className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card"
                >
                  <dt className="font-display text-4xl font-semibold text-esme-600">
                    {figure.value}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-600">
                    {figure.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────── Domaines ─────────────────────────── */}
      <Section tone="tint" id="domaines">
        <Container size="wide">
          <SectionHeading
            eyebrow="Nos domaines"
            title="Quatre terrains où l’opérationnalité fait la différence"
            lead="Énergie, industrie, numérique et management de la transformation. Chaque domaine réunit des modules courts, conçus pour produire un effet observable sur l’activité."
          />
          <ul className="mt-12 grid gap-6 lg:grid-cols-2">
            {domains.map((domain) => {
              const accent = accentClasses[domain.accent];
              const count = programs.filter((p) => p.domain === domain.slug).length;
              return (
                <li key={domain.slug}>
                  <Link
                    href={`/domaines/${domain.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-card transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-esme-300 hover:shadow-lift"
                  >
                    <div className="relative aspect-[16/7] overflow-hidden">
                      <Image
                        src={domain.photo}
                        alt={domain.photoAlt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-esme-950/55 to-transparent"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${accent.chip}`}
                      >
                        <DomainIcon icon={domain.icon} className="h-5 w-5" />
                      </span>
                      <Badge tone="neutral">
                        {count} formation{count > 1 ? "s" : ""}
                      </Badge>
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-esme-900">
                      {domain.name}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-ink-500">
                      {domain.pitch}
                    </p>
                    <div className="mt-5 flex-1">
                      <BulletList items={domain.outcomes} />
                    </div>
                    <p className="mt-6 flex items-center gap-1.5 text-sm font-medium text-esme-600">
                      Explorer le domaine
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden
                      />
                    </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* ───────────────────── Formats pédagogiques forts ───────────────── */}
      <Section>
        <Container size="wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="À la une du catalogue"
              title="Des formats conçus pour l’action"
              lead="Executive bootcamps, simulateur de projet, simulation de cyber-crise, travaux pratiques sur les outils du métier : la densité remplace la durée."
            />
            <ButtonLink href="/formations" tone="ghost">
              Tout le catalogue
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {spotlight.map((program) => (
              <li key={program.code} className="flex">
                <ProgramCard program={program} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ───────────────────────────── Formats ─────────────────────────── */}
      <Section tone="ink">
        <Container size="wide">
          <SectionHeading
            tone="light"
            eyebrow="Inter, intra, sur-mesure"
            title="Trois façons de déployer, un même niveau d’exigence"
            lead="Le bon format dépend du nombre de personnes à former, de l’existence d’un programme correspondant et de la présence ou non d’un projet de transformation."
          />
          <ul className="mt-12 grid gap-6 lg:grid-cols-3">
            {formats.map((format, index) => (
              <li
                key={format.slug}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-7"
              >
                <p className="font-mono text-xs text-framboise-400">
                  0{index + 1}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-white">
                  {format.name}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-framboise-300">
                  {format.pitch}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-esme-100/75">
                  {format.body}
                </p>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="mb-3 text-[0.7rem] font-semibold tracking-[0.12em] text-esme-100/50 uppercase">
                    Le bon choix si
                  </p>
                  <BulletList items={format.bestFor} tone="light" />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ButtonLink href="/formats" tone="light">
              Comprendre les trois formats
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <ImageBand
        src="/photos/band-numerique.webp"
        alt=""
        eyebrow="Pédagogie active"
        title="On n'apprend pas un métier en salle de cours"
        lead="Études de cas réels, mises en situation, ateliers collaboratifs, travaux guidés sur poste et simulateurs : c'est la constante des 48 programmes."
      />

      {/* ───────────────────── Engagement et méthode ────────────────────── */}
      <Section>
        <Container size="wide">
          <SectionHeading
            eyebrow="Notre engagement"
            title="Renforcer durablement vos compétences techniques, managériales et humaines"
          />
          <ul className="mt-10 grid gap-6 lg:grid-cols-3">
            {commitments.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-ink-200 bg-white p-7 shadow-card"
              >
                <h3 className="text-sm font-semibold tracking-[0.1em] text-esme-700 uppercase">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-16 rounded-3xl bg-ink-50 p-8 lg:p-12">
            <Eyebrow>Notre méthode</Eyebrow>
            <h3 className="mt-4 max-w-2xl text-2xl font-semibold text-esme-900 sm:text-3xl">
              Parce qu’une formation n’a de valeur que si elle
              s’ancre durablement dans les pratiques
            </h3>
            <ol className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {method.map((step, index) => (
                <li key={step.step} className="relative pl-12">
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-esme-600 font-mono text-xs font-semibold text-white"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-base font-semibold text-esme-900">
                    {step.step}{" "}
                    <span className="font-normal text-ink-500">
                      {step.subtitle}
                    </span>
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-10">
              <ButtonLink href="/notre-approche" tone="ghost">
                Notre approche pédagogique en détail
                <ArrowRight className="h-4 w-4" aria-hidden />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────── Financement ───────────────────────── */}
      <Section tone="tint">
        <Container size="wide">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Financement"
                title="Vos formations sont finançables, quel que soit le format"
                lead="Plan de développement des compétences, OPCO, FNE-Formation, France Travail, fonds d’assurance formation des indépendants : nous vous orientons vers le dispositif adapté et fournissons les pièces attendues."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/financement">
                  Tous les dispositifs de financement
                </ButtonLink>
                <ButtonLink href="/devis" tone="ghost">
                  Obtenir un devis
                </ButtonLink>
              </div>
            </div>

            <div className="rounded-2xl border border-ink-200 bg-white p-7 shadow-card">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-framboise-100">
                  <BadgeCheck className="h-5 w-5 text-framboise-800" aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-esme-900">
                    Organisme certifié Qualiopi
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {qualiopi.statement} Certification délivrée par{" "}
                    {qualiopi.body}. C’est la condition d’accès aux
                    fonds publics et mutualisés de la formation
                    professionnelle.
                  </p>
                </div>
              </div>
              <dl className="mt-7 space-y-4 border-t border-ink-200 pt-6 text-sm">
                <div className="flex justify-between gap-6">
                  <dt className="text-ink-500">Tarifs</dt>
                  <dd className="text-right font-medium text-esme-900">
                    Communiqués sur demande
                  </dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="text-ink-500">Dépôt du dossier</dt>
                  <dd className="text-right font-medium text-esme-900">
                    Avant le démarrage
                  </dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="text-ink-500">Accessibilité</dt>
                  <dd className="text-right font-medium text-esme-900">
                    Référente handicap dédiée
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─────────────────────────────── Blog ──────────────────────────── */}
      <Section>
        <Container size="wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Le blog"
              title="Ce que nous observons sur le terrain"
              lead="Analyses sectorielles, décryptages réglementaires et retours de salle, écrits par celles et ceux qui conçoivent nos programmes."
            />
            <ButtonLink href="/blog" tone="ghost">
              Tous les articles
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </div>
          <ul className="mt-12 grid gap-6 lg:grid-cols-3">
            {latest.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-esme-300 hover:shadow-lift"
                >
                  <div className="flex items-center gap-3">
                    <Badge tone="brand">{article.category}</Badge>
                    <span className="text-xs text-ink-400">
                      {article.readingMinutes} min
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg leading-snug font-semibold text-esme-900 group-hover:underline">
                    {article.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
                    {article.excerpt}
                  </p>
                  <p className="mt-5 flex items-center gap-1.5 text-sm font-medium text-esme-600">
                    Lire l’article
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand />

      {/* Contact rapide */}
      <Section tone="tint" className="py-12">
        <Container size="wide">
          <div className="flex flex-wrap items-center justify-between gap-6 text-sm">
            <p className="text-ink-600">
              Une question sur un programme, un format ou un financement ?
              Notre équipe vous répond.
            </p>
            <p className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                className="font-medium text-esme-700 hover:underline"
                href={`tel:${contact.phone}`}
              >
                {contact.phoneDisplay}
              </a>
              <a
                className="font-medium text-esme-700 hover:underline"
                href={`mailto:${contact.email}`}
              >
                {contact.email}
              </a>
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
