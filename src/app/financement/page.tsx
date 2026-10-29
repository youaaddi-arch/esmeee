import type { Metadata } from "next";
import {
  AlertTriangle,
  BadgeCheck,
  CalendarClock,
  CircleDollarSign,
  Accessibility,
} from "lucide-react";
import {
  audienceLabels,
  eligibilityLabels,
  fundingEssentials,
  fundingFaq,
  fundingRoutes,
  type FundingAudience,
} from "@/data/financement";
import { contact, qualiopi } from "@/data/site";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Accordion } from "@/components/accordion";
import {
  Badge,
  BulletList,
  ButtonLink,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Financer votre formation",
  description:
    "Tous les dispositifs de financement de la formation professionnelle : plan de développement des compétences, OPCO, FNE-Formation, CPF, Pro-A, projet de transition professionnelle, France Travail, fonds d’assurance formation des indépendants, AGEFIPH. ESME Executive Education, organisme certifié Qualiopi.",
  alternates: { canonical: "/financement" },
};

const audienceOrder: FundingAudience[] = [
  "entreprise",
  "salarie",
  "independant",
  "demandeur-emploi",
];

const eligibilityTone = {
  directe: "mint",
  conditionnelle: "brand",
  "hors-catalogue": "warn",
} as const;

export default function FinancementPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Financement" }]} />
      <PageHero
        eyebrow="Financement"
        title="Financer votre formation : tous les dispositifs"
        lead={
          <>
            Nos formations sont éligibles aux dispositifs de financement de la
            formation professionnelle, quel que soit le format. Voici la carte
            complète des voies possibles — avec, pour chacune, qui la mobilise,
            ce qu’elle couvre et ce qui bloque le plus souvent un dossier.
          </>
        }
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/financement/simulateur" tone="secondary" size="lg">
            Lancer le simulateur
          </ButtonLink>
          <ButtonLink href="#dispositifs" tone="outlineLight" size="lg">
            Voir les {fundingRoutes.length} dispositifs
          </ButtonLink>
        </div>
      </PageHero>

      {/* Qualiopi */}
      <Section id="qualiopi" className="py-14 sm:py-16">
        <Container size="wide">
          <div className="grid items-start gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Certification qualité"
                title="Qualiopi : la clé d’accès aux fonds publics et mutualisés"
                lead={`${qualiopi.statement} Certification délivrée par l’organisme certificateur ${qualiopi.body}.`}
              />
              <p className="mt-6 max-w-2xl leading-relaxed text-ink-600">
                Sans cette certification, aucun financement public ou mutualisé
                n’est mobilisable — ni OPCO, ni FNE-Formation, ni France
                Travail, ni CPF. C’est la première pièce que tout financeur
                demande, et nous vous la fournissons avec le devis.
              </p>
            </div>

            <div className="rounded-3xl border border-mint-300 bg-mint-100/40 p-8">
              <BadgeCheck
                className="h-8 w-8 text-mint-600"
                strokeWidth={1.5}
                aria-hidden
              />
              <p className="mt-4 text-lg font-semibold text-esme-900">
                Organisme de formation certifié Qualiopi
              </p>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-500">Catégorie</dt>
                  <dd className="text-right font-medium text-esme-900">
                    {qualiopi.scope}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-500">Certificateur</dt>
                  <dd className="text-right font-medium text-esme-900">
                    {qualiopi.body}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink-500">Tarifs</dt>
                  <dd className="text-right font-medium text-esme-900">
                    Sur demande
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {/* Repères */}
      <Section tone="tint" className="py-14 sm:py-16">
        <Container size="wide">
          <SectionHeading
            eyebrow="À savoir avant de commencer"
            title="Quatre règles valables pour tous les dispositifs"
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {fundingEssentials.map((item, index) => (
              <li
                key={item.title}
                className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card"
              >
                <span
                  aria-hidden
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-esme-900 font-mono text-xs font-semibold text-white"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-semibold text-esme-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Dispositifs */}
      <Section id="dispositifs">
        <Container size="wide">
          <SectionHeading
            eyebrow="Les dispositifs"
            title={`${fundingRoutes.length} voies de financement, selon qui porte la demande`}
            lead="Les dispositifs se combinent presque toujours. Repérez d’abord qui porte la demande — employeur, salarié, indépendant ou demandeur d’emploi — puis lisez la fiche correspondante."
          />

          {/* Repères de lecture */}
          <div className="mt-8 flex flex-wrap gap-3">
            {(Object.keys(eligibilityLabels) as (keyof typeof eligibilityLabels)[]).map(
              (key) => (
                <Badge key={key} tone={eligibilityTone[key]}>
                  {eligibilityLabels[key]}
                </Badge>
              ),
            )}
          </div>

          <div className="mt-12 space-y-16">
            {audienceOrder.map((audience) => {
              // Chaque dispositif n'apparaît qu'une fois, dans le groupe du
              // public qui porte la demande ; les autres publics concernés
              // sont rappelés sur la fiche.
              const routes = fundingRoutes.filter(
                (route) => route.audiences[0] === audience,
              );
              if (!routes.length) return null;
              return (
                <div key={audience}>
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-sm font-semibold tracking-[0.1em] text-esme-700 uppercase">
                      {audienceLabels[audience]}
                    </h3>
                    <span className="text-xs text-ink-400">
                      {routes.length} dispositif{routes.length > 1 ? "s" : ""}
                    </span>
                    <span aria-hidden className="h-px flex-1 bg-ink-200" />
                  </div>

                  <ul className="mt-6 space-y-6">
                    {routes.map((route) => (
                      <li
                        key={route.slug}
                        id={route.slug}
                        className="overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-card"
                      >
                        <div className="border-b border-ink-200 bg-ink-50 p-6 lg:p-7">
                          <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                              <h4 className="text-xl font-semibold text-esme-900">
                                {route.name}
                                {route.acronym ? (
                                  <span className="ml-2 font-mono text-sm font-medium text-esme-500">
                                    {route.acronym}
                                  </span>
                                ) : null}
                              </h4>
                              <div className="mt-2.5 flex flex-wrap gap-2">
                                {route.audiences.map((item) => (
                                  <Badge
                                    key={item}
                                    tone={item === audience ? "brand" : "neutral"}
                                  >
                                    {audienceLabels[item]}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Badge tone={eligibilityTone[route.eligibility]}>
                              {eligibilityLabels[route.eligibility]}
                            </Badge>
                          </div>
                          <p className="mt-4 max-w-3xl leading-relaxed text-ink-600">
                            {route.summary}
                          </p>
                        </div>

                        <div className="grid gap-8 p-6 lg:grid-cols-3 lg:p-7">
                          <div>
                            <h5 className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.12em] text-esme-700 uppercase">
                              <CircleDollarSign
                                className="h-3.5 w-3.5"
                                strokeWidth={1.5}
                                aria-hidden
                              />
                              Ce qui est pris en charge
                            </h5>
                            <div className="mt-3">
                              <BulletList items={route.covers} />
                            </div>
                          </div>
                          <div>
                            <h5 className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.12em] text-esme-700 uppercase">
                              <BadgeCheck
                                className="h-3.5 w-3.5"
                                strokeWidth={1.5}
                                aria-hidden
                              />
                              Conditions
                            </h5>
                            <div className="mt-3">
                              <BulletList items={route.conditions} />
                            </div>
                          </div>
                          <div>
                            <h5 className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.12em] text-esme-700 uppercase">
                              <CalendarClock
                                className="h-3.5 w-3.5"
                                strokeWidth={1.5}
                                aria-hidden
                              />
                              La démarche
                            </h5>
                            <ol className="mt-3 space-y-2.5">
                              {route.steps.map((step, index) => (
                                <li key={step} className="flex gap-3">
                                  <span
                                    aria-hidden
                                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-esme-100 font-mono text-[0.65rem] font-semibold text-esme-700"
                                  >
                                    {index + 1}
                                  </span>
                                  <span className="text-sm leading-relaxed text-ink-600">
                                    {step}
                                  </span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>

                        {route.caveat ? (
                          <p className="flex items-start gap-2.5 border-t border-amber-200 bg-amber-50 px-6 py-4 text-sm leading-relaxed text-amber-900 lg:px-7">
                            <AlertTriangle
                              className="mt-0.5 h-4 w-4 shrink-0"
                              strokeWidth={1.5}
                              aria-hidden
                            />
                            <span>
                              <span className="font-semibold">
                                Point de vigilance.
                              </span>{" "}
                              {route.caveat}
                            </span>
                          </p>
                        ) : null}

                        {route.source ? (
                          <p className="border-t border-ink-200 px-6 py-3 text-xs text-ink-400 lg:px-7">
                            Source : {route.source}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Accessibilité */}
      <Section tone="tint" id="accessibilite">
        <Container size="wide">
          <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Accessibilité"
                title="Situation de handicap : les aménagements s’étudient en amont"
                lead="Toute situation particulière, notamment de handicap, fait l’objet d’un échange avant la formation. Notre référente handicap étudie les aménagements possibles : supports, rythme, modalités de participation, aides techniques."
              />
              <p className="mt-6 leading-relaxed text-ink-600">
                Les aides de l’AGEFIPH peuvent compléter le financement de
                droit commun et couvrir la compensation du handicap en situation
                de formation. Écrivez-nous en amont : plus la demande arrive
                tôt, plus les solutions sont larges.
              </p>
            </div>

            <div className="rounded-3xl border border-ink-200 bg-white p-8 shadow-card">
              <Accessibility
                className="h-8 w-8 text-esme-600"
                strokeWidth={1.5}
                aria-hidden
              />
              <p className="mt-4 font-semibold text-esme-900">Référente handicap</p>
              <p className="mt-1 text-sm text-ink-600">
                Aude Bosvieux — Responsable Pédagogique &amp; Opérations
              </p>
              <ButtonLink
                href={`mailto:${contact.accessibilityEmail}`}
                tone="ghost"
                size="sm"
                className="mt-5 w-full"
              >
                {contact.accessibilityEmail}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container size="narrow">
          <Eyebrow>Questions fréquentes</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold text-esme-900">
            Tarifs, prise en charge, annulation
          </h2>
          <Accordion items={fundingFaq} className="mt-10" />
          <p className="mt-8 text-sm leading-relaxed text-ink-500">
            Les règles, plafonds et montants des dispositifs de financement sont
            révisés chaque année. Les informations ci-dessus décrivent le
            fonctionnement général de chaque dispositif : les montants exacts et
            les critères en vigueur relèvent du financeur, que nous vous aidons à
            saisir.
          </p>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Montage du dossier"
        title="Nous fournissons les pièces, vous obtenez l’accord"
        lead="Devis, programme détaillé, convention de formation, attestation Qualiopi : tout ce qu’un financeur demande, transmis en une fois. Appelez-nous, nous vous orientons vers le bon dispositif."
      />
    </>
  );
}
