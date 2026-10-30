import type { Metadata } from "next";
import Link from "next/link";
import { Quote } from "lucide-react";
import { observatory, site } from "@/data/site";
import { articleBySlug } from "@/data/blog";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import {
  ButtonLink,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: `Observatoire ${observatory.year} de l’ingénieur et des compétences stratégiques`,
  description:
    "Observatoire 2026 ESME Executive Education : 84 % constatent que les compétences de l’ingénieur ont déjà évolué en trois ans, 82 % identifient l’IA comme premier moteur de transformation, 6/10 de préparation moyenne. Enquête auprès de plus de 400 ingénieurs, managers, recruteurs et responsables de formation.",
  alternates: { canonical: "/observatoire" },
};

export default function ObservatoirePage() {
  const analysis = articleBySlug("observatoire-2026-six-sur-dix");
  const maxShare = Math.max(...observatory.priorities.map((p) => p.share));

  return (
    <>
      <Breadcrumbs items={[{ label: `Observatoire ${observatory.year}` }]} />
      <PageHero
        eyebrow={`Étude ${observatory.year}`}
        title={observatory.title}
        lead={`${observatory.headline}. Enquête menée auprès de ${observatory.sample}.`}
      />

      {/* Chiffres clés */}
      <Section>
        <Container size="wide">
          <SectionHeading
            eyebrow="Les chiffres clés"
            title="Un constat partagé, une préparation insuffisante"
          />
          <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {observatory.figures.map((figure) => (
              <div
                key={figure.value}
                className="rounded-2xl border border-ink-200 bg-white p-7 shadow-card"
              >
                <dt className="font-display text-4xl font-semibold text-esme-600 sm:text-5xl">
                  {figure.value}
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-ink-600">
                  {figure.label}
                </dd>
              </div>
            ))}
          </dl>

          <figure className="mt-14 max-w-3xl border-l-2 border-framboise-400 pl-6">
            <Quote className="h-5 w-5 text-framboise-400" aria-hidden />
            <blockquote className="mt-3">
              <p className="font-display text-2xl leading-snug font-medium text-esme-800">
                Tous perçoivent l’ampleur des mutations en cours, mais
                évaluent leur niveau de préparation à seulement 6/10 en moyenne.
              </p>
            </blockquote>
            <figcaption className="mt-4 text-sm text-ink-500">
              Hervé Jacques, Directeur {site.name}
            </figcaption>
          </figure>
        </Container>
      </Section>

      {/* Priorités */}
      <Section tone="tint">
        <Container size="wide">
          <SectionHeading
            eyebrow="Domaines prioritaires"
            title="Où les entreprises veulent investir"
            lead="Projets de formation pour les ingénieurs, hors obligations réglementaires, par domaine."
          />

          <div className="mt-12 max-w-3xl">
            <dl className="space-y-5">
              {observatory.priorities.map((priority) => (
                <div key={priority.label}>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-sm font-medium text-esme-900">
                      {priority.label}
                    </dt>
                    <dd className="font-display text-lg font-semibold text-esme-600 tabular-nums">
                      {priority.share} %
                    </dd>
                  </div>
                  <div
                    className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-ink-200"
                    role="presentation"
                  >
                    <div
                      className="h-full rounded-full bg-esme-500"
                      style={{ width: `${(priority.share / maxShare) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </dl>

            <p className="mt-10 leading-relaxed text-ink-600">
              La lecture la plus instructive est la somme : management, gestion
              de projet et soft skills réunis représentent 43 % des projets de
              formation, soit davantage que l’IA et la data. Les
              organisations ont compris que la technologie ne se déploie pas
              toute seule.
            </p>
          </div>
        </Container>
      </Section>

      {/* Conclusion */}
      <Section tone="ink">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div>
              <Eyebrow tone="light">En conclusion</Eyebrow>
              <p className="mt-6 font-display text-2xl leading-snug font-medium text-white sm:text-3xl">
                {observatory.conclusion}
              </p>
              <p className="mt-6 leading-relaxed text-esme-100/75">
                C’est là qu’intervient {site.name} : des parcours
                connectés à vos enjeux, conçus pour l’impact et le retour
                sur investissement sur le terrain. Nous transformons les
                compétences en performance opérationnelle.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {analysis ? (
                <ButtonLink href={`/blog/${analysis.slug}`} tone="secondary" size="lg">
                  Lire notre analyse détaillée
                </ButtonLink>
              ) : null}
              <ButtonLink href="/formations" tone="outlineLight" size="lg">
                Voir le catalogue
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* Méthodologie */}
      <Section>
        <Container size="narrow">
          <Eyebrow>Méthodologie</Eyebrow>
          <h2 className="mt-4 text-2xl font-semibold text-esme-900">
            Comment l’étude a été conduite
          </h2>
          <div className="prose-esme mt-6">
            <p>
              L’Observatoire de l’ingénieur et des compétences
              stratégiques a été réalisé en {observatory.year} par{" "}
              {site.name} auprès de {observatory.sample}. Les répondants ont été
              interrogés sur l’évolution perçue des compétences attendues,
              sur les transformations anticipées à trois ans, sur les moteurs de
              ces transformations et sur le niveau de préparation de leur
              organisation.
            </p>
            <p>
              Les résultats complets figurent dans le catalogue{" "}
              {site.catalogueYear}. Pour une présentation détaillée des résultats
              auprès de vos équipes ou de votre comité de direction,{" "}
              <Link href="/contact">écrivez-nous</Link>.
            </p>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
