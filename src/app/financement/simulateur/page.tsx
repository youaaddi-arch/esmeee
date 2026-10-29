import type { Metadata } from "next";
import { AlertTriangle, Clock, Compass, ShieldCheck } from "lucide-react";
import { SimulateurFinancement } from "@/components/simulateur-financement";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { opcos } from "@/data/opco";
import { fundingRoutes } from "@/data/financement";
import { contact } from "@/data/site";
import {
  ButtonLink,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Simulateur de financement",
  description:
    "Identifiez en deux minutes les dispositifs de financement mobilisables pour votre formation : OPCO, plan de développement des compétences, FNE-Formation, France Travail, fonds d'assurance formation. Simulateur entreprise et particulier, ESME Executive Education.",
  alternates: { canonical: "/financement/simulateur" },
};

const principles = [
  {
    icon: Compass,
    title: "Il oriente, il ne promet rien",
    body: `Les ${fundingRoutes.length} dispositifs sont classés par pertinence au regard de votre situation, avec la démarche à suivre pour chacun.`,
  },
  {
    icon: AlertTriangle,
    title: "Aucun montant affiché",
    body: "Barèmes, plafonds et taux de prise en charge sont révisés chaque année et relèvent du financeur. Les annoncer ici serait trompeur.",
  },
  {
    icon: Clock,
    title: "Une règle qui ne change jamais",
    body: "Le dossier se dépose avant le démarrage de la formation. C'est la première cause de rejet, tous dispositifs confondus.",
  },
  {
    icon: ShieldCheck,
    title: "Ce qui ne s'applique pas est dit",
    body: "CPF, Pro-A et projet de transition professionnelle supposent une certification enregistrée. Nos modules n'en relèvent pas, et le simulateur vous le dira.",
  },
];

export default function SimulateurPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/financement", label: "Financement" },
          { label: "Simulateur" },
        ]}
      />
      <PageHero
        eyebrow="Simulateur"
        title="Quels financements pouvez-vous mobiliser ?"
        lead={
          <>
            Trois questions suffisent. Le simulateur identifie votre OPCO parmi
            les {opcos.length} opérateurs de compétences, classe les dispositifs
            par pertinence et vous donne la démarche pour chacun.
          </>
        }
      />

      <Section className="py-14 sm:py-16">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[2fr_1fr] lg:gap-16">
            <div className="rounded-3xl border border-ink-200 bg-white p-7 shadow-card lg:p-9">
              <SimulateurFinancement />
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl bg-ink-50 p-7">
                <Eyebrow>Comment le lire</Eyebrow>
                <ul className="mt-6 space-y-6">
                  {principles.map((item) => (
                    <li key={item.title} className="flex gap-3.5">
                      <item.icon
                        className="mt-0.5 h-5 w-5 shrink-0 text-esme-600"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <div>
                        <p className="text-sm font-semibold text-esme-900">
                          {item.title}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-ink-200 bg-white p-7 shadow-card">
                <p className="text-sm font-semibold text-esme-900">
                  Un montage un peu complexe ?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  Plusieurs sites, plusieurs OPCO, un cofinancement FNE : nous
                  avons l&apos;habitude. Un appel de quinze minutes fait gagner
                  des semaines.
                </p>
                <a
                  href={`tel:${contact.phone}`}
                  className="mt-4 block font-display text-xl font-semibold text-esme-700 hover:underline"
                >
                  {contact.phoneDisplay}
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section tone="tint">
        <Container size="wide">
          <SectionHeading
            eyebrow="Les onze OPCO"
            title="Votre OPCO dépend de votre convention collective"
            lead="Il ne se choisit pas. Son code IDCC figure sur vos bulletins de paie, et votre service RH l'identifie immédiatement. Voici le périmètre de chacun."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {opcos.map((opco) => (
              <li
                key={opco.id}
                className="rounded-2xl border border-ink-200 bg-white p-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-esme-900">{opco.name}</h3>
                  {opco.esmeRelevance === "forte" ? (
                    <span className="rounded-full bg-mint-100 px-2 py-0.5 text-[0.65rem] font-medium text-mint-800">
                      Fréquent chez nos clients
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {opco.scope}
                </p>
                <a
                  href={opco.website}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-3 inline-block text-xs font-medium text-esme-600 hover:underline"
                >
                  {opco.website.replace("https://www.", "")}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ButtonLink href="/financement" tone="ghost">
              Le détail des dispositifs de financement
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Après le simulateur"
        title="Nous fournissons les pièces du dossier"
        lead="Devis, programme détaillé, convention de formation, attestation Qualiopi : tout ce qu'un financeur réclame, transmis en une fois."
      />
    </>
  );
}
