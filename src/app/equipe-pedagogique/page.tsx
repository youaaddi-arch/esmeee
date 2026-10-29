import type { Metadata } from "next";
import { Mail, Quote } from "lucide-react";
import { facultyProfiles, leadership, pedagogyStandards } from "@/data/team";
import { commitments, contact, keyFigures, site } from "@/data/site";
import { catalogueStats } from "@/data/programs";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { ImageBand } from "@/components/image-band";
import {
  Badge,
  ButtonLink,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
  Stat,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Équipe pédagogique",
  description:
    "L’équipe et les intervenants d’ESME Executive Education : direction, ingénierie pédagogique, experts du secteur énergétique, praticiens de l’IA et de la cybersécurité, dirigeants expérimentés et comédiens-formateurs.",
  alternates: { canonical: "/equipe-pedagogique" },
};

export default function EquipePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Équipe pédagogique" }]} />
      <PageHero
        eyebrow="Équipe pédagogique"
        title="Celles et ceux qui conçoivent et animent nos formations"
        lead="Nos formations s’appuient sur des intervenants qui exercent dans ces métiers et en connaissent les contraintes réelles. Derrière eux, une ingénierie pédagogique issue de 120 ans de formation d’ingénieurs."
      />

      {/* Direction */}
      <Section>
        <Container size="wide">
          <SectionHeading
            eyebrow="Direction"
            title="L’équipe qui porte le projet"
          />
          <ul className="mt-12 grid gap-6 lg:grid-cols-3">
            {leadership.map((person) => (
              <li
                key={person.name}
                className="flex flex-col rounded-3xl border border-ink-200 bg-white p-7 shadow-card"
              >
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden
                    className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-esme-900 font-display text-lg font-semibold text-white"
                  >
                    {person.initials}
                  </span>
                  <div>
                    <h3 className="text-lg leading-tight font-semibold text-esme-900">
                      {person.name}
                    </h3>
                    <p className="mt-1 text-sm text-ink-500">
                      {person.role}
                      <span className="block text-xs text-ink-400">
                        {person.org}
                      </span>
                    </p>
                  </div>
                </div>

                <p className="mt-5 flex-1 text-sm leading-relaxed text-ink-600">
                  {person.bio}
                </p>

                {person.quote ? (
                  <figure className="mt-6 border-t border-ink-200 pt-5">
                    <Quote className="h-4 w-4 text-mint-400" aria-hidden />
                    <blockquote className="mt-2.5">
                      <p className="text-sm leading-relaxed text-esme-800 italic">
                        « {person.quote} »
                      </p>
                    </blockquote>
                  </figure>
                ) : null}

                {person.email ? (
                  <a
                    href={`mailto:${person.email}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-esme-600 hover:underline"
                  >
                    <Mail className="h-4 w-4" aria-hidden />
                    {person.email}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Intervenants */}
      <Section tone="tint">
        <Container size="wide">
          <SectionHeading
            eyebrow="Nos intervenants"
            title="Des praticiens, pas des conférenciers"
            lead="Nos intervenants exercent dans les métiers qu’ils enseignent. C’est ce qui permet d’ancrer les contenus dans des cas réels — et c’est vérifiable programme par programme."
          />
          <ul className="mt-12 space-y-6">
            {facultyProfiles.map((profile) => (
              <li
                key={profile.title}
                className="grid gap-6 rounded-3xl border border-ink-200 bg-white p-7 shadow-card lg:grid-cols-[1.6fr_1fr] lg:p-8"
              >
                <div>
                  <div className="flex flex-wrap gap-2">
                    {profile.domains.map((domain) => (
                      <Badge key={domain} tone="brand">
                        {domain}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-esme-900">
                    {profile.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-600">
                    {profile.body}
                  </p>
                </div>
                <div className="rounded-2xl bg-ink-50 p-5">
                  <p className="text-[0.7rem] font-semibold tracking-[0.12em] text-ink-500 uppercase">
                    Vérifiable au catalogue
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                    {profile.evidence}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Standards pédagogiques */}
      <Section>
        <Container size="wide">
          <SectionHeading
            eyebrow="Ingénierie pédagogique"
            title={`Ce qui est garanti sur chacune des ${catalogueStats.programCount} fiches`}
            lead="Au-delà des contenus, cinq constantes structurent tous nos programmes, quel que soit le domaine ou le format."
          />
          <ol className="mt-12 space-y-6">
            {pedagogyStandards.map((item, index) => (
              <li
                key={item.title}
                className="flex gap-6 border-b border-ink-200 pb-6 last:border-0 last:pb-0"
              >
                <span
                  aria-hidden
                  className="font-display text-2xl font-semibold text-esme-200"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-esme-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-3xl leading-relaxed text-ink-600">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <ImageBand
        src="/photos/band-atelier.webp"
        alt="Ingénieurs au travail dans un laboratoire de robotique et de systèmes embarqués de l’ESME"
        eyebrow="Nos intervenants"
        title="Ils exercent le métier qu’ils enseignent"
        lead="Experts d’assurance du secteur énergétique, ingénieurs de bureau d’études, praticiens de l’IA et de la cybersécurité, dirigeants expérimentés, comédiens-formateurs."
      />

      {/* Adossement à l’école */}
      <Section tone="ink">
        <Container size="wide">
          <SectionHeading
            tone="light"
            eyebrow="Adossé à une école d’ingénieurs"
            title="L’écosystème qui nourrit nos programmes"
            lead={`${site.name} s’appuie sur les laboratoires, les partenariats industriels et le réseau d’alumni de l’ESME. C’est ce qui permet d’actualiser les contenus au rythme des technologies.`}
          />
          <dl className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {keyFigures.map((figure) => (
              <div key={figure.label}>
                <Stat
                  tone="light"
                  value={figure.value}
                  unit={figure.unit || undefined}
                  label={figure.label}
                  detail={figure.detail}
                />
              </div>
            ))}
          </dl>

          <ul className="mt-14 grid gap-6 border-t border-white/10 pt-12 lg:grid-cols-3">
            {commitments.map((item) => (
              <li key={item.title}>
                <h3 className="text-sm font-semibold tracking-[0.1em] text-mint-300 uppercase">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-esme-100/75">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Rejoindre */}
      <Section tone="tint">
        <Container size="narrow">
          <Eyebrow>Intervenir avec nous</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold text-esme-900">
            Vous exercez un métier que nous enseignons ?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-600">
            Nous recherchons en continu des praticiens en activité :
            ingénieurs et experts de l’énergie, spécialistes de l’IA
            et de la cybersécurité, chefs de projet aguerris, dirigeants
            opérationnels. Si transmettre vous intéresse, écrivez-nous — en
            précisant votre domaine et le type de public auquel vous
            souhaiteriez vous adresser.
          </p>
          <div className="mt-8">
            <ButtonLink
              href={`mailto:${contact.email}?subject=${encodeURIComponent(
                "Candidature intervenant — ESME Executive Education",
              )}`}
            >
              <Mail className="h-4 w-4" aria-hidden />
              Proposer sa candidature
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
