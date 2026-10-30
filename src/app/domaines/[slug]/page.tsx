import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { domainBySlug, domains } from "@/data/domains";
import { programs, upcomingModules } from "@/data/programs";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CatalogueBrowser } from "@/components/catalogue-browser";
import { CtaBand } from "@/components/cta-band";
import { DomainIcon } from "@/components/icons";
import {
  BulletList,
  ButtonLink,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui";

export function generateStaticParams() {
  return domains.map((domain) => ({ slug: domain.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const domain = domainBySlug(slug);
  if (!domain) return { title: "Domaine introuvable" };
  const count = programs.filter((p) => p.domain === domain.slug).length;
  return {
    title: `Formations ${domain.name}`,
    description: `${count} formations continues en ${domain.longName.toLowerCase()} : ${domain.pitch} ESME Executive Education, organisme certifié Qualiopi.`,
    alternates: { canonical: `/domaines/${domain.slug}` },
  };
}

export default async function DomainPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const domain = domainBySlug(slug);
  if (!domain) notFound();

  const domainPrograms = programs.filter((p) => p.domain === domain.slug);
  const upcoming = upcomingModules.filter((m) => m.domain === domain.slug);
  const totalDays = Math.round(
    domainPrograms.reduce((sum, p) => sum + p.hours / 7, 0),
  );

  return (
    <>
      <Breadcrumbs
        items={[{ href: "/domaines", label: "Domaines" }, { label: domain.name }]}
      />

      <div className="relative overflow-hidden bg-esme-950 text-esme-100">
        <Image
          src={domain.photo}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-esme-950 via-esme-950/95 to-esme-950/65"
        />
        <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
        <div
          aria-hidden
          className="absolute -top-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-esme-600/25 blur-3xl"
        />
        <Container size="wide" className="relative py-14 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                <DomainIcon icon={domain.icon} className="h-6 w-6 text-framboise-400" />
              </span>
              <Eyebrow tone="light" className="mt-6">
                {domain.name}
              </Eyebrow>
              <h1 className="mt-4 max-w-3xl text-4xl leading-[1.08] font-semibold text-white sm:text-5xl">
                {domain.longName}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-esme-100/80">
                {domain.intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="#catalogue" tone="secondary" size="lg">
                  Voir les {domainPrograms.length} formations
                </ButtonLink>
                <ButtonLink href="/devis" tone="outlineLight" size="lg">
                  Demander un devis
                </ButtonLink>
              </div>
            </div>

            <div className="space-y-6 self-start">
              <dl className="grid grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <div>
                  <dd className="font-display text-3xl font-semibold text-white">
                    {domainPrograms.length}
                  </dd>
                  <dt className="mt-1 text-xs text-esme-100/65">formations</dt>
                </div>
                <div>
                  <dd className="font-display text-3xl font-semibold text-white">
                    {domain.themes.length}
                  </dd>
                  <dt className="mt-1 text-xs text-esme-100/65">thématiques</dt>
                </div>
                <div>
                  <dd className="font-display text-3xl font-semibold text-white">
                    {totalDays}
                  </dd>
                  <dt className="mt-1 text-xs text-esme-100/65">jours au total</dt>
                </div>
              </dl>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <p className="text-[0.7rem] font-semibold tracking-[0.12em] text-framboise-300 uppercase">
                  Ce que vos équipes sauront faire
                </p>
                <div className="mt-4">
                  <BulletList items={domain.outcomes} tone="light" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Thématiques */}
      <Section tone="tint" className="py-14 sm:py-16">
        <Container size="wide">
          <SectionHeading
            eyebrow="Thématiques"
            title={`Comment ce domaine est organisé`}
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {domain.themes.map((theme) => {
              const count = domainPrograms.filter(
                (p) => p.theme === theme.name,
              ).length;
              return (
                <li
                  key={theme.name}
                  className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-esme-900">
                      {theme.name}
                    </h3>
                    <span className="shrink-0 rounded-full bg-ink-100 px-2.5 py-1 text-xs font-medium text-ink-600">
                      {count}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">
                    {theme.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* Catalogue du domaine */}
      <Section id="catalogue" className="py-14 sm:py-16">
        <Container size="wide">
          <SectionHeading
            eyebrow="Catalogue"
            title={`Les ${domainPrograms.length} formations du domaine`}
            lead="Filtrez par public visé et par durée. Chaque fiche détaille les objectifs pédagogiques, les prérequis et le programme complet."
          />
          <div className="mt-10">
            <CatalogueBrowser
              initialDomain={domain.slug}
              programs={domainPrograms}
            />
          </div>
        </Container>
      </Section>

      {upcoming.length ? (
        <Section tone="tint" className="py-14">
          <Container size="wide">
            <Eyebrow>En préparation</Eyebrow>
            <h2 className="mt-4 text-2xl font-semibold text-esme-900">
              Prochains modules de ce domaine
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {upcoming.map((module) => (
                <li
                  key={module.title}
                  className="rounded-2xl border border-dashed border-ink-300 bg-white p-6 font-medium text-esme-900"
                >
                  {module.title}
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <CtaBand
        eyebrow={`Besoin spécifique en ${domain.name.toLowerCase()} ?`}
        title="Nous adaptons le programme à vos installations et à vos cas d’usage"
        lead="En intra-entreprise, les contenus sont ajustés à vos environnements techniques et à vos outils. En sur-mesure, le dispositif est entièrement conçu avec vous."
      />
    </>
  );
}
