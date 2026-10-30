import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  ClipboardCheck,
  Clock,
  FileText,
  GraduationCap,
  Layers,
  MapPin,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import {
  programBySlug,
  programByCode,
  programs,
  publicLabels,
} from "@/data/programs";
import { domainBySlug } from "@/data/domains";
import { contact, site } from "@/data/site";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProgramRow } from "@/components/program-card";
import { RequestForm } from "@/components/request-form";
import { DomainIcon } from "@/components/icons";
import {
  Badge,
  BulletList,
  ButtonLink,
  Container,
  Eyebrow,
  Section,
  cx,
} from "@/components/ui";

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = programBySlug(slug);
  if (!program) return { title: "Formation introuvable" };
  const domain = domainBySlug(program.domain);
  return {
    title: `${program.title} — ${program.code}`,
    description: `${program.objective}. ${program.duration} en ${program.modality.toLowerCase()}, domaine ${domain?.name}. Formation continue ESME Executive Education, organisme certifié Qualiopi.`,
    alternates: { canonical: `/formations/${program.slug}` },
    openGraph: {
      title: `${program.code} — ${program.title}`,
      description: program.objective,
      type: "article",
    },
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = programBySlug(slug);
  if (!program) notFound();

  const domain = domainBySlug(program.domain);

  const related = programs
    .filter((p) => p.theme === program.theme && p.code !== program.code)
    .slice(0, 5);

  const parcoursModules = (program.parcoursModules ?? [])
    .map((code) => programByCode(code))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const parent = program.partOfParcours
    ? programByCode(program.partOfParcours)
    : undefined;

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.title,
    courseCode: program.code,
    description: program.objective,
    provider: {
      "@type": "EducationalOrganization",
      name: site.name,
      url: site.url,
    },
    educationalLevel: "Formation professionnelle continue",
    teaches: program.objectives,
    coursePrerequisites: program.prerequisites.join(" "),
    audience: { "@type": "Audience", audienceType: program.audience },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode:
        program.modality.toLowerCase().includes("distanciel") &&
        program.modality.toLowerCase().includes("présentiel")
          ? "Blended"
          : program.modality.toLowerCase().includes("distanciel")
            ? "Online"
            : "Onsite",
      courseWorkload: `PT${program.hours}H`,
    },
  };

  const facts = [
    { icon: Clock, label: "Durée", value: `${program.duration} — ${String(program.hours).replace(".", ",")} heures` },
    { icon: MapPin, label: "Modalité pédagogique", value: program.modality },
    { icon: Layers, label: "Thématique", value: program.theme },
    {
      icon: Users,
      label: "Formats disponibles",
      value: program.intraOnly
        ? "Intra-entreprise uniquement"
        : "Inter-entreprises, intra-entreprise ou sur-mesure",
    },
  ];

  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/formations", label: "Formations" },
          { href: `/domaines/${program.domain}`, label: domain?.name ?? "" },
          { label: program.code },
        ]}
      />

      {/* En-tête de fiche */}
      <div className="relative overflow-hidden bg-esme-950 text-esme-100">
        <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
        <div
          aria-hidden
          className="absolute -top-40 -right-20 h-96 w-96 rounded-full bg-esme-600/25 blur-3xl"
        />
        <Container size="wide" className="relative py-14 lg:py-18">
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-md bg-framboise-400 px-2.5 py-1 font-mono text-xs font-bold tracking-wide text-esme-950">
                  {program.code}
                </span>
                {domain ? (
                  <Link
                    href={`/domaines/${domain.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/15 transition-colors hover:bg-white/15"
                  >
                    <DomainIcon icon={domain.icon} className="h-3.5 w-3.5" />
                    {domain.name}
                  </Link>
                ) : null}
                {program.intraOnly ? (
                  <Badge tone="light">Intra-entreprise uniquement</Badge>
                ) : null}
              </div>

              <h1 className="mt-5 max-w-3xl text-3xl leading-[1.12] font-semibold text-white sm:text-4xl lg:text-[2.75rem]">
                {program.title}
              </h1>

              <p className="mt-6 max-w-2xl border-l-2 border-framboise-400 pl-5 text-lg leading-relaxed text-esme-100/85">
                <span className="mb-1 block text-[0.7rem] font-semibold tracking-[0.14em] text-framboise-300 uppercase">
                  Objectif général
                </span>
                {program.objective}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="#devis" tone="secondary" size="lg">
                  Demander un devis
                </ButtonLink>
                <ButtonLink
                  href={`tel:${contact.phone}`}
                  tone="outlineLight"
                  size="lg"
                >
                  {contact.phoneDisplay}
                </ButtonLink>
              </div>
            </div>

            <dl className="space-y-5 self-start rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              {facts.map((fact) => (
                <div key={fact.label} className="flex items-start gap-3">
                  <fact.icon
                    className="mt-0.5 h-4 w-4 shrink-0 text-framboise-400"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <div>
                    <dt className="text-[0.7rem] font-semibold tracking-[0.1em] text-esme-100/50 uppercase">
                      {fact.label}
                    </dt>
                    <dd className="mt-0.5 text-sm font-medium text-white">
                      {fact.value}
                    </dd>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-3 border-t border-white/10 pt-5">
                <FileText
                  className="mt-0.5 h-4 w-4 shrink-0 text-framboise-400"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <div>
                  <dt className="text-[0.7rem] font-semibold tracking-[0.1em] text-esme-100/50 uppercase">
                    Tarif
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium text-white">
                    Communiqué sur demande
                  </dd>
                  <dd className="mt-1 text-xs text-esme-100/60">
                    Fiche {program.code} — catalogue {site.catalogueYear}, page{" "}
                    {program.catalogPage}
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </Container>
      </div>

      {/* Corps de fiche */}
      <Section className="py-14 sm:py-16">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1.9fr_1fr] lg:gap-16">
            <div className="space-y-14">
              {/* Public et objectifs */}
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
                  <h2 className="flex items-center gap-2 text-sm font-semibold tracking-[0.1em] text-esme-700 uppercase">
                    <Users className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                    Public cible
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">
                    {program.audience}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {program.publics.map((item) => (
                      <Badge key={item} tone="brand">
                        {publicLabels[item]}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
                  <h2 className="flex items-center gap-2 text-sm font-semibold tracking-[0.1em] text-esme-700 uppercase">
                    <ClipboardCheck
                      className="h-4 w-4"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    Prérequis
                  </h2>
                  <div className="mt-3">
                    <BulletList items={program.prerequisites} />
                  </div>
                </div>
              </div>

              {/* Objectifs pédagogiques */}
              <div>
                <Eyebrow>Objectifs pédagogiques</Eyebrow>
                <h2 className="mt-4 text-2xl font-semibold text-esme-900">
                  À l’issue de la formation, le participant sera capable de
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {program.objectives.map((objective, index) => (
                    <li
                      key={objective}
                      className="flex gap-4 rounded-2xl border border-ink-200 bg-ink-50 p-5"
                    >
                      <span
                        aria-hidden
                        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-esme-600 font-mono text-[0.7rem] font-semibold text-white"
                      >
                        {index + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-ink-700">
                        {objective}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Programme détaillé */}
              <div>
                <Eyebrow>Programme</Eyebrow>
                <h2 className="mt-4 text-2xl font-semibold text-esme-900">
                  Le détail du programme
                </h2>
                <ol className="mt-8 space-y-8">
                  {program.programme.map((block, index) => (
                    <li key={block.heading} className="relative pl-10">
                      <span
                        aria-hidden
                        className={cx(
                          "absolute top-1 left-0 inline-flex h-7 w-7 items-center justify-center rounded-full font-mono text-[0.7rem] font-semibold text-white",
                          "bg-esme-800",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-sm leading-snug font-semibold tracking-[0.06em] text-esme-800 uppercase">
                        {block.heading}
                      </h3>
                      {block.items.length ? (
                        <div className="mt-3">
                          <BulletList items={block.items} />
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ol>
                {program.evaluation ? (
                  <p className="mt-8 flex items-center gap-2.5 rounded-xl border border-framboise-300 bg-framboise-100/50 px-4 py-3 text-sm font-medium text-framboise-800">
                    <GraduationCap className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                    {program.evaluation}
                  </p>
                ) : null}
              </div>

              {/* Parcours */}
              {parcoursModules.length ? (
                <div>
                  <Eyebrow>Le parcours</Eyebrow>
                  <h2 className="mt-4 text-2xl font-semibold text-esme-900">
                    Les {parcoursModules.length} modules du parcours
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-600">
                    Chaque étape existe également en module autonome, pour les
                    profils qui n’ont pas besoin du parcours complet.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {parcoursModules.map((module) => (
                      <li key={module.code}>
                        <ProgramRow program={module} />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {parent ? (
                <div className="rounded-2xl border border-esme-200 bg-esme-50 p-6">
                  <p className="text-sm text-esme-800">
                    Ce module est l’une des cinq étapes du{" "}
                    <Link
                      href={`/formations/${parent.slug}`}
                      className="font-semibold underline"
                    >
                      {parent.title}
                    </Link>{" "}
                    ({parent.code}, {parent.duration}). Il peut être suivi
                    isolément.
                  </p>
                </div>
              ) : null}

              {/* Méthodes */}
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <h2 className="flex items-center gap-2 text-sm font-semibold tracking-[0.1em] text-esme-700 uppercase">
                    <Target className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                    Méthodes et moyens pédagogiques
                  </h2>
                  <p className="mt-3 text-sm text-ink-600">
                    Une pédagogie active et expérientielle combinant :
                  </p>
                  <div className="mt-3">
                    <BulletList items={program.methods} />
                  </div>
                </div>

                {program.highlights.length ? (
                  <div className="rounded-2xl bg-esme-900 p-6 text-esme-100">
                    <h2 className="flex items-center gap-2 text-sm font-semibold tracking-[0.1em] text-framboise-300 uppercase">
                      <Sparkles className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                      Les +
                    </h2>
                    <div className="mt-3">
                      <BulletList items={program.highlights} tone="light" />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Colonne latérale */}
            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-esme-900">
                  <BadgeCheck
                    className="h-4 w-4 text-framboise-600"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  Financement
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  ESME Executive Education est certifié Qualiopi au titre des
                  actions de formation. Cette formation est éligible aux
                  dispositifs de financement de la formation professionnelle,
                  quel que soit le format retenu.
                </p>
                <ButtonLink
                  href="/financement"
                  tone="ghost"
                  size="sm"
                  className="mt-4 w-full"
                >
                  Voir les dispositifs
                </ButtonLink>
              </div>

              {related.length ? (
                <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
                  <h2 className="text-sm font-semibold text-esme-900">
                    Dans la même thématique
                  </h2>
                  <p className="mt-1 text-xs text-ink-500">{program.theme}</p>
                  <ul className="mt-4 space-y-2.5">
                    {related.map((item) => (
                      <li key={item.code}>
                        <Link
                          href={`/formations/${item.slug}`}
                          className="group block text-sm"
                        >
                          <span className="font-mono text-[0.7rem] font-semibold text-esme-500">
                            {item.code}
                          </span>
                          <span className="mt-0.5 block leading-snug text-ink-600 group-hover:text-esme-700 group-hover:underline">
                            {item.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="rounded-2xl bg-ink-50 p-6">
                <h2 className="text-sm font-semibold text-esme-900">
                  Une question sur ce programme ?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  Prérequis, dates de session, adaptation à vos installations :
                  notre équipe répond directement.
                </p>
                <p className="mt-4 space-y-1.5 text-sm">
                  <a
                    className="block font-medium text-esme-700 hover:underline"
                    href={`tel:${contact.phone}`}
                  >
                    {contact.phoneDisplay}
                  </a>
                  <a
                    className="block font-medium text-esme-700 hover:underline"
                    href={`mailto:${contact.email}?subject=${encodeURIComponent(
                      `Question sur la formation ${program.code}`,
                    )}`}
                  >
                    {contact.email}
                  </a>
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Devis */}
      <Section tone="tint" id="devis">
        <Container size="narrow">
          <Eyebrow>Demande de devis</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold text-esme-900">
            Recevez le devis pour {program.code}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            Vous recevrez le programme détaillé et le devis — les deux pièces
            attendues par tous les financeurs. Précisez le format souhaité et le
            nombre de personnes à former, nous ajustons la proposition.
          </p>
          <div className="mt-10 rounded-3xl border border-ink-200 bg-white p-7 shadow-card lg:p-9">
            <RequestForm variant="devis" presetCode={program.code} />
          </div>
        </Container>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
    </>
  );
}
