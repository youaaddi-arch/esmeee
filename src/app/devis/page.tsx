import type { Metadata } from "next";
import { CheckCircle2, FileText, Phone } from "lucide-react";
import { contact } from "@/data/site";
import { catalogueStats } from "@/data/programs";
import { RequestForm } from "@/components/request-form";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { BulletList, Container, Eyebrow, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Demander un devis",
  description:
    "Demandez votre devis de formation ESME Executive Education : programme détaillé, format, tarif et pièces attendues par les financeurs. Réponse sous deux jours ouvrés.",
  alternates: { canonical: "/devis" },
};

export default function DevisPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Demande de devis" }]} />
      <PageHero
        eyebrow="Demande de devis"
        title="Recevez votre devis et le programme détaillé"
        lead="Les tarifs ne figurent pas au catalogue : ils dépendent du format retenu, du niveau de personnalisation et des ressources mobilisées. Décrivez-nous votre besoin, nous revenons avec une proposition chiffrée."
      />

      <Section className="py-14 sm:py-16">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div className="rounded-3xl border border-ink-200 bg-white p-7 shadow-card lg:p-9">
              <RequestForm variant="devis" />
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl bg-esme-950 p-7 text-esme-100">
                <Eyebrow tone="light">Ce que vous recevez</Eyebrow>
                <div className="mt-5">
                  <BulletList
                    tone="light"
                    items={[
                      "Le programme détaillé de la ou des formations retenues",
                      "Le devis chiffré, en euros hors taxes",
                      "L’attestation Qualiopi, exigée par tous les financeurs",
                      "Le modèle de convention de formation",
                    ]}
                  />
                </div>
                <p className="mt-6 flex items-start gap-2.5 border-t border-white/10 pt-5 text-sm text-esme-100/70">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-mint-400" strokeWidth={1.5} aria-hidden />
                  Ces pièces constituent le dossier attendu par votre OPCO, par
                  France Travail ou par votre fonds d’assurance formation.
                </p>
              </div>

              <div className="rounded-3xl border border-ink-200 bg-white p-7 shadow-card">
                <h2 className="text-sm font-semibold tracking-[0.1em] text-esme-700 uppercase">
                  Comment ça se passe
                </h2>
                <ol className="mt-5 space-y-5">
                  {[
                    {
                      title: "Vous décrivez votre besoin",
                      body: "Contexte, publics concernés, échéance. Le choix exact du programme peut venir après.",
                    },
                    {
                      title: "Nous vous rappelons",
                      body: "Sous deux jours ouvrés, pour cadrer le format : inter, intra ou sur-mesure.",
                    },
                    {
                      title: "Vous recevez la proposition",
                      body: "Programme, durée, modalités, indicateurs d’impact et devis.",
                    },
                    {
                      title: "Vous montez le financement",
                      body: "Avant le démarrage, impérativement. Nous fournissons toutes les pièces.",
                    },
                  ].map((step, index) => (
                    <li key={step.title} className="flex gap-3.5">
                      <span
                        aria-hidden
                        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-esme-100 font-mono text-[0.7rem] font-semibold text-esme-700"
                      >
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-esme-900">
                          {step.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-ink-600">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-3xl bg-ink-50 p-7">
                <p className="flex items-center gap-2 text-sm font-semibold text-esme-900">
                  <Phone className="h-4 w-4 text-esme-600" strokeWidth={1.5} aria-hidden />
                  Plus rapide par téléphone
                </p>
                <a
                  href={`tel:${contact.phone}`}
                  className="mt-3 block font-display text-xl font-semibold text-esme-700 hover:underline"
                >
                  {contact.phoneDisplay}
                </a>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  Pour un projet qui concerne plusieurs équipes ou plusieurs
                  sites, un échange de quinze minutes fait gagner plusieurs
                  jours.
                </p>
              </div>

              <p className="flex items-start gap-2.5 text-xs leading-relaxed text-ink-500">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint-600" aria-hidden />
                {catalogueStats.programCount} formations au catalogue, et un
                dispositif sur-mesure dès que votre besoin sort du cadre.
              </p>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
