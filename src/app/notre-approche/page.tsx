import type { Metadata } from "next";
import { bespokeJourney, commitments, method, observatory, site } from "@/data/site";
import { catalogueStats } from "@/data/programs";
import { pedagogyStandards } from "@/data/team";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { ImageBand } from "@/components/image-band";
import {
  BulletList,
  ButtonLink,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Notre approche pédagogique",
  description:
    "La méthode ESME Executive Education : analyser, nourrir, co-construire, renforcer, évaluer, réinvestir. Une pédagogie active et expérientielle, pour transformer la montée en compétences en impact durable et mesurable.",
  alternates: { canonical: "/notre-approche" },
};

export default function ApprochePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Notre approche" }]} />
      <PageHero
        eyebrow="Notre approche"
        title="Transformer la montée en compétences en impact durable"
        lead="Pragmatisme, proximité avec le terrain et opérationnalité structurent chacun de nos programmes. Une formation n’a de valeur que si elle s’ancre durablement dans les pratiques — tout le reste en découle."
      />

      {/* Pourquoi */}
      <Section>
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Le point de départ"
                title="Former dans un monde qui change plus vite que les compétences"
              />
              <div className="prose-esme mt-6">
                <p>
                  Depuis sa création en 1905, l’ESME a traversé quatre
                  révolutions industrielles. Chacune a transformé les
                  technologies, les entreprises et le rôle des ingénieurs.
                  L’accélération actuelle pose une question nouvelle :
                  sommes-nous capables de faire évoluer les compétences aussi
                  vite que les technologies ?
                </p>
                <p>
                  Notre conviction est simple. La performance d’une
                  organisation se construit aussi par sa capacité à faire
                  évoluer les compétences de ses équipes au rythme de ces
                  transformations — sur des enjeux concrets, et avec un impact
                  mesurable sur l’activité. Investir dans les compétences
                  de ses collaborateurs n’est plus seulement un enjeu RH :
                  c’est un levier de performance et de fidélisation des
                  talents.
                </p>
                <p>
                  C’est pourquoi {site.name} concentre son action sur les
                  secteurs où l’opérationnalité fait la différence : de
                  l’énergie à l’industrie, des infrastructures à la
                  mobilité, jusqu’à la transformation digitale.
                </p>
              </div>
            </div>

            <div className="self-start rounded-3xl bg-esme-950 p-8 text-esme-100">
              <p className="text-[0.7rem] font-semibold tracking-[0.12em] text-framboise-300 uppercase">
                Observatoire {observatory.year}
              </p>
              <dl className="mt-6 space-y-6">
                {observatory.figures.map((figure) => (
                  <div key={figure.value}>
                    <dt className="font-display text-3xl font-semibold text-white">
                      {figure.value}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-esme-100/75">
                      {figure.label}
                    </dd>
                  </div>
                ))}
              </dl>
              <ButtonLink
                href="/observatoire"
                tone="outlineLight"
                size="sm"
                className="mt-7 w-full"
              >
                Lire l’Observatoire
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* Au-delà de la technologie */}
      <Section tone="tint">
        <Container size="wide">
          <SectionHeading
            eyebrow="Ce que nous développons"
            title="Au-delà de la maîtrise des technologies"
            lead="Nos formations développent aussi les capacités devenues stratégiques — celles qui décident de l’issue d’une transformation bien plus que le choix des outils."
          />
          <div className="mt-10 max-w-3xl">
            <BulletList
              items={[
                "Analyser des situations complexes, dans lesquelles les informations sont incomplètes et parfois contradictoires",
                "Exercer son esprit critique, y compris face aux productions d’un outil d’intelligence artificielle",
                "Piloter des projets transversaux, sans lien hiérarchique direct sur les contributeurs",
                "Transformer l’innovation en performance durable, et non en démonstration isolée",
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* Méthode */}
      <Section>
        <Container size="wide">
          <SectionHeading
            eyebrow="Notre méthode"
            title="Six temps, de l’analyse du besoin au réinvestissement sur le terrain"
            lead="Cet engagement se prolonge après la formation, avec un accompagnement dans la durée destiné à faciliter la mise en pratique au sein de l’organisation et à renforcer l’ancrage des compétences."
          />
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {method.map((step, index) => (
              <li
                key={step.step}
                className="rounded-2xl border border-ink-200 bg-white p-7 shadow-card"
              >
                <span
                  aria-hidden
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-esme-600 font-mono text-xs font-semibold text-white"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-esme-900">
                  {step.step}
                </h3>
                <p className="text-sm font-medium text-esme-600">
                  {step.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <ImageBand
        src="/photos/band-ondes.webp"
        alt=""
        eyebrow="Active learning"
        title="Transformer les acquis en réflexes durables"
        lead="Chaque formation se conclut par une évaluation individuelle des acquis, puis par un accompagnement destiné à faciliter la mise en pratique dans l’organisation."
        height="sm"
      />

      {/* Standards */}
      <Section tone="ink">
        <Container size="wide">
          <SectionHeading
            tone="light"
            eyebrow="Nos constantes"
            title={`Ce qui ne change pas, sur les ${catalogueStats.programCount} programmes`}
          />
          <ol className="mt-12 grid gap-8 lg:grid-cols-2">
            {pedagogyStandards.map((item, index) => (
              <li key={item.title} className="flex gap-5">
                <span
                  aria-hidden
                  className="font-display text-2xl font-semibold text-framboise-400"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-esme-100/75">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Engagement */}
      <Section>
        <Container size="wide">
          <SectionHeading
            eyebrow="Notre engagement"
            title="Maîtrise, opérationnalité, terrain"
          />
          <ul className="mt-10 grid gap-6 lg:grid-cols-3">
            {commitments.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl bg-ink-50 p-7"
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

          <div className="mt-16 rounded-3xl border border-ink-200 bg-white p-8 shadow-card lg:p-10">
            <Eyebrow>Sur-mesure</Eyebrow>
            <h3 className="mt-4 max-w-2xl text-2xl font-semibold text-esme-900">
              Quand le besoin sort du catalogue : la démarche en quatre temps
            </h3>
            <ol className="mt-8 grid gap-6 lg:grid-cols-4">
              {bespokeJourney.map((step, index) => (
                <li key={step.step} className="border-t-2 border-esme-200 pt-4">
                  <p className="font-mono text-xs text-esme-500">
                    0{index + 1}
                  </p>
                  <h4 className="mt-1.5 font-semibold text-esme-900">
                    {step.step}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/formats">Comprendre les formats</ButtonLink>
              <ButtonLink href="/equipe-pedagogique" tone="ghost">
                Rencontrer l’équipe pédagogique
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
