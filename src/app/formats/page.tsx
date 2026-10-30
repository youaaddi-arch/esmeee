import type { Metadata } from "next";
import { ArrowRight, Building2, Layers, Users } from "lucide-react";
import { bespokeJourney, formats } from "@/data/site";
import { programs } from "@/data/programs";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Accordion } from "@/components/accordion";
import { ProgramRow } from "@/components/program-card";
import {
  BulletList,
  ButtonLink,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Formats : inter, intra-entreprise et sur-mesure",
  description:
    "Inter-entreprises, intra-entreprise ou sur-mesure : comment choisir le bon format de formation continue. Démarche de co-conception en quatre étapes. ESME Executive Education.",
  alternates: { canonical: "/formats" },
};

const icons = { inter: Users, intra: Building2, "sur-mesure": Layers } as const;

const faq = [
  {
    q: "Quelle est la différence entre une formation inter et intra-entreprise ?",
    a: "Une session intra-entreprise est réservée aux équipes d’une même organisation : vous seuls êtes dans la salle, et le contenu est ajusté à vos installations et vos outils. Une session inter-entreprises réunit des participants venus de plusieurs entreprises, sur le programme du catalogue, aux dates publiées.",
  },
  {
    q: "Quelle différence entre formation intra-entreprise et formation sur-mesure ?",
    a: "L’intra-entreprise repose sur un programme existant du catalogue, adapté à votre cas. Le sur-mesure est entièrement conçu pour votre organisation : objectifs pédagogiques, contenus, rythme, modalités et indicateurs d’évaluation sont définis avec vous.",
  },
  {
    q: "Comment choisir entre les trois formats ?",
    a: "Trois critères suffisent : le nombre de collaborateurs à former, l’existence ou non d’un programme du catalogue qui correspond, et la présence d’un projet de transformation. Un ou quelques collaborateurs sur un sujet couvert par le catalogue : inter. Une équipe entière : intra. Un projet de transformation — déploiement technique, réorganisation, évolution métier : sur-mesure.",
  },
  {
    q: "Qui participe à la co-conception ?",
    a: "Vos équipes RH et formation, vos responsables métiers et les équipes opérationnelles concernées, côté client. Côté ESME, les équipes pédagogiques et les intervenants qui animeront la formation.",
  },
  {
    q: "Quels formats de déploiement sont possibles ?",
    a: "Présentiel, distanciel ou hybride, selon la formation et vos contraintes. Session courte ou parcours en plusieurs temps. Sur votre site ou sur un campus ESME. Pour les formations à distance ou hybrides, des accès individualisés aux plateformes et ressources pédagogiques sont mis à disposition — ils sont strictement personnels et non cessibles.",
  },
  {
    q: "Les formations sont-elles finançables quel que soit le format ?",
    a: "Oui. ESME Executive Education étant certifié Qualiopi, ses formations sont éligibles aux dispositifs de financement de la formation professionnelle, en inter comme en intra ou en sur-mesure. Le montage se définit avec vous au moment du devis.",
  },
  {
    q: "Un minimum de participants est-il requis ?",
    a: "Pour les sessions inter-entreprises, un effectif minimum peut être nécessaire. S’il n’est pas atteint, nous nous réservons le droit de reporter ou d’annuler la session : vous êtes informé dans les meilleurs délais et une solution de report ou de remplacement vous est proposée, sans indemnité.",
  },
];

export default function FormatsPage() {
  const intraOnly = programs.filter((p) => p.intraOnly);

  return (
    <>
      <Breadcrumbs items={[{ label: "Formats" }]} />
      <PageHero
        eyebrow="Nos formats de formation"
        title="Inter, intra et sur-mesure"
        lead="Le bon format ne dépend pas du sujet, mais de trois choses : combien de personnes vous formez, si un programme du catalogue correspond, et s’il existe un projet de transformation derrière la demande."
      />

      {/* Les trois formats */}
      <Section>
        <Container size="wide">
          <ul className="grid gap-6 lg:grid-cols-3">
            {formats.map((format, index) => {
              const Icon = icons[format.slug];
              return (
                <li
                  key={format.slug}
                  id={format.slug}
                  className="flex flex-col rounded-3xl border border-ink-200 bg-white p-8 shadow-card"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-esme-100">
                      <Icon
                        className="h-5 w-5 text-esme-700"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </span>
                    <span className="font-mono text-xs text-ink-400">
                      0{index + 1}
                    </span>
                  </div>
                  <h2 className="mt-5 text-xl font-semibold text-esme-900">
                    {format.name}
                  </h2>
                  <p className="mt-1.5 text-sm font-medium text-esme-600">
                    {format.pitch}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-600">
                    {format.body}
                  </p>
                  <div className="mt-6 flex-1 border-t border-ink-200 pt-6">
                    <p className="mb-3 text-[0.7rem] font-semibold tracking-[0.12em] text-ink-500 uppercase">
                      Le bon choix si
                    </p>
                    <BulletList items={format.bestFor} />
                  </div>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* Démarche sur-mesure */}
      <Section tone="ink">
        <Container size="wide">
          <SectionHeading
            tone="light"
            eyebrow="Nos solutions sur-mesure"
            title="Un chemin clair, de l’enjeu métier à l’impact terrain"
            lead="Vos enjeux sont uniques, nos solutions aussi. La démarche se déroule en quatre temps, et les indicateurs d’impact sont définis dès la conception — pas après."
          />
          <ol className="mt-12 grid gap-6 lg:grid-cols-4">
            {bespokeJourney.map((step, index) => (
              <li
                key={step.step}
                className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-7"
              >
                <span
                  aria-hidden
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-framboise-400 font-mono text-xs font-bold text-esme-950"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {step.step}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-esme-100/75">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <ButtonLink href="/devis" tone="secondary" size="lg">
              Lancer un projet sur-mesure
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* Ce que comprend le sur-mesure */}
      <Section>
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Ce qui est inclus"
                title="Ce que change réellement un dispositif sur-mesure"
              />
              <div className="mt-8">
                <BulletList
                  items={[
                    "Des contenus ancrés dans vos cas d’usage, vos environnements techniques et vos projets en cours",
                    "Des formats adaptés à vos contraintes de durée, de rythme, de modalités et de lieux",
                    "Une cohérence avec vos référentiels métiers et vos démarches de transformation",
                    "Un accompagnement du projet, de la conception jusqu’au bilan",
                    "Des formateurs-experts, une approche par projets et une évaluation des acquis en fin de parcours",
                  ]}
                />
              </div>
            </div>

            <div className="rounded-3xl bg-ink-50 p-8">
              <Eyebrow>Proposés uniquement en intra</Eyebrow>
              <h3 className="mt-4 text-xl font-semibold text-esme-900">
                {intraOnly.length} modules réservés à l’intra-entreprise
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                Ces programmes supposent de travailler sur votre contexte
                propre : vision d’entité, sujet critique en cours, dossier
                de financement, dynamique d’équipe. Ils n’ont pas de
                sens dans une session ouverte.
              </p>
              <ul className="mt-6 space-y-3">
                {intraOnly.map((program) => (
                  <li key={program.code}>
                    <ProgramRow program={program} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="tint">
        <Container size="narrow">
          <SectionHeading eyebrow="Questions fréquentes" title="Choisir son format" />
          <Accordion items={faq} className="mt-10" />
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
