import type { Metadata } from "next";
import { BadgeCheck, Clock, Layers, Users } from "lucide-react";
import { CatalogueBrowser } from "@/components/catalogue-browser";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Container, Section, SectionHeading } from "@/components/ui";
import { catalogueStats, upcomingModules } from "@/data/programs";
import { domains } from "@/data/domains";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Catalogue des formations",
  description: `Les ${catalogueStats.programCount} formations continues d’ESME Executive Education : transition énergétique, industrie 4.0, intelligence artificielle, cybersécurité et management de la transformation. Formats de ½ journée à 10 jours, en inter, intra-entreprise ou sur-mesure.`,
  alternates: { canonical: "/formations" },
};

const facts = [
  {
    icon: Layers,
    value: `${catalogueStats.programCount} formations`,
    label: `réparties sur ${catalogueStats.themeCount} thématiques`,
  },
  {
    icon: Clock,
    value: "½ journée à 10 jours",
    label: "des modules courts aux parcours longs",
  },
  {
    icon: Users,
    value: "4 publics",
    label: "dirigeants, managers, métiers, profils techniques",
  },
  {
    icon: BadgeCheck,
    value: "Qualiopi",
    label: "actions de formation — financements mobilisables",
  },
];

export default function FormationsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Formations" }]} />
      <PageHero
        eyebrow={`Catalogue ${site.catalogueYear}`}
        title="Le catalogue des formations"
        lead={
          <>
            Chaque fiche indique le public visé, les objectifs pédagogiques, les
            prérequis, la durée et le programme détaillé. Les tarifs sont
            communiqués sur demande : ils dépendent du format retenu.
          </>
        }
      >
        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.value} className="flex items-start gap-3">
              <fact.icon
                className="mt-0.5 h-5 w-5 shrink-0 text-mint-400"
                strokeWidth={1.5}
                aria-hidden
              />
              <div>
                <dt className="text-sm font-semibold text-white">{fact.value}</dt>
                <dd className="mt-0.5 text-sm text-esme-100/65">{fact.label}</dd>
              </div>
            </div>
          ))}
        </dl>
      </PageHero>

      <Section className="py-12 sm:py-14">
        <Container size="wide">
          <CatalogueBrowser />
        </Container>
      </Section>

      <Section tone="tint">
        <Container size="wide">
          <SectionHeading
            eyebrow="En préparation"
            title="Les prochains modules du catalogue"
            lead="Ces programmes sont en cours de conception. Dites-nous s’ils correspondent à un besoin : les premières sessions se construisent souvent avec les entreprises qui les ont demandées."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {upcomingModules.map((module) => {
              const domain = domains.find((d) => d.slug === module.domain);
              return (
                <li
                  key={module.title}
                  className="rounded-2xl border border-dashed border-ink-300 bg-white p-6"
                >
                  <p className="text-[0.7rem] font-semibold tracking-[0.12em] text-esme-500 uppercase">
                    {domain?.name}
                  </p>
                  <p className="mt-2 font-medium text-esme-900">{module.title}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Rien ne correspond exactement ?"
        title="Un dispositif sur-mesure commence là où le catalogue s’arrête"
        lead="Nous co-construisons le parcours à partir de vos cas réels, de vos outils et de vos indicateurs d’impact — puis nous le déployons sur vos sites et pour vos équipes."
      />
    </>
  );
}
