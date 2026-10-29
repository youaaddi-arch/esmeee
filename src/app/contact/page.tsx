import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { contact, site } from "@/data/site";
import { RequestForm } from "@/components/request-form";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import {
  ButtonLink,
  Container,
  Eyebrow,
  Section,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Nous contacter",
  description: `Contactez ESME Executive Education : ${contact.phoneDisplay} — ${contact.email}. Campus Paris et Ivry-sur-Seine.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <PageHero
        eyebrow="Restons en contact"
        title="Échangeons sur vos enjeux"
        lead="Notre équipe vous accompagne et vous conseille dans la construction de projets de formation adaptés à vos enjeux. Une question sur un programme, un format, un financement : nous répondons sous deux jours ouvrés."
      />

      {/* Galerie des campus */}
      <Section className="py-12 sm:py-14">
        <Container size="wide">
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { src: "/photos/campus-paris.webp", label: "Campus Paris", alt: "Le campus parisien de l’ESME et ses espaces extérieurs" },
              { src: "/photos/campus-ivry.webp", label: "Campus Ivry-sur-Seine", alt: "Le bâtiment du campus d’Ivry-sur-Seine" },
              { src: "/photos/campus-lille.webp", label: "Campus Lille", alt: "La façade du campus lillois de l’ESME" },
              { src: "/photos/campus-bordeaux.webp", label: "Campus Bordeaux", alt: "Le campus bordelais de l’ESME" },
            ].map((place) => (
              <li key={place.label} className="group relative overflow-hidden rounded-2xl">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={place.src}
                    alt={place.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.05]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-esme-950/85 via-esme-950/15 to-transparent"
                  />
                </div>
                <p className="absolute right-4 bottom-4 left-4 text-sm font-semibold text-white">
                  {place.label}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink-500">
            Les formations inter-entreprises se tiennent sur nos campus ; l’intra
            et le sur-mesure, sur votre site ou chez nous, au choix.
          </p>
        </Container>
      </Section>

      <Section className="py-14 sm:py-16">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            {/* Coordonnées */}
            <div className="space-y-6">
              <div className="rounded-3xl bg-esme-950 p-8 text-esme-100">
                <Eyebrow tone="light">Contact direct</Eyebrow>
                <a
                  href={`tel:${contact.phone}`}
                  className="mt-5 flex items-center gap-3 font-display text-2xl font-semibold text-white transition-colors hover:text-mint-300"
                >
                  <Phone className="h-5 w-5 text-mint-400" strokeWidth={1.5} aria-hidden />
                  {contact.phoneDisplay}
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-4 flex items-center gap-3 text-sm transition-colors hover:text-mint-300"
                >
                  <Mail className="h-4 w-4 shrink-0 text-mint-400" strokeWidth={1.5} aria-hidden />
                  <span className="break-all">{contact.email}</span>
                </a>
              </div>

              <div className="rounded-3xl border border-ink-200 bg-white p-7 shadow-card">
                <h2 className="text-sm font-semibold tracking-[0.1em] text-esme-700 uppercase">
                  Nos adresses
                </h2>
                <ul className="mt-5 space-y-5">
                  {contact.sites.map((place) => (
                    <li key={place.label} className="flex items-start gap-3">
                      <MapPin
                        className="mt-0.5 h-4 w-4 shrink-0 text-esme-400"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <div>
                        <p className="text-sm font-medium text-esme-900">
                          {place.label}
                        </p>
                        <p className="mt-0.5 text-sm text-ink-600">
                          {place.street}
                          <br />
                          {place.postalCode} {place.city}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-ink-200 pt-5 text-xs leading-relaxed text-ink-500">
                  Les formations intra-entreprise et sur-mesure peuvent se tenir
                  sur votre site comme sur un campus ESME.
                </p>
              </div>

              <div className="rounded-3xl bg-ink-50 p-7">
                <h2 className="text-sm font-semibold tracking-[0.1em] text-esme-700 uppercase">
                  Accessibilité
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  En cas de besoin spécifique, notamment en situation de
                  handicap, notre référente handicap étudie en amont les
                  aménagements possibles.
                </p>
                <ButtonLink
                  href={`mailto:${contact.accessibilityEmail}`}
                  tone="ghost"
                  size="sm"
                  className="mt-4 w-full"
                >
                  {contact.accessibilityEmail}
                </ButtonLink>
              </div>

              <div className="rounded-3xl border border-ink-200 bg-white p-7 shadow-card">
                <h2 className="text-sm font-semibold tracking-[0.1em] text-esme-700 uppercase">
                  Vous cherchez autre chose ?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  Ce site est consacré à la formation continue. Pour les
                  programmes diplômants de l’ESME — cycle ingénieur,
                  bachelor, MSc, alternance — rendez-vous sur le site de
                  l’école.
                </p>
                <ButtonLink
                  href={contact.esmeSite}
                  tone="ghost"
                  size="sm"
                  className="mt-4 w-full"
                >
                  esme.fr
                </ButtonLink>
              </div>
            </div>

            {/* Formulaire */}
            <div>
              <div className="rounded-3xl border border-ink-200 bg-white p-7 shadow-card lg:p-9">
                <h2 className="text-2xl font-semibold text-esme-900">
                  Écrivez-nous
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  Pour une demande de devis, utilisez plutôt le{" "}
                  <a className="font-medium text-esme-600 underline" href="/devis">
                    formulaire dédié
                  </a>{" "}
                  : il nous permet de préparer directement la proposition.
                </p>
                <div className="mt-8">
                  <RequestForm variant="contact" />
                </div>
              </div>

              <p className="mt-6 text-xs leading-relaxed text-ink-500">
                {site.name} est la marque de formation continue de l’ESME,
                membre du {site.group}. Vos données font l’objet d’un
                traitement conforme au RGPD : vous disposez de droits
                d’accès, de rectification et de suppression, dont les
                modalités d’exercice sont précisées dans nos{" "}
                <a className="underline" href="/mentions-legales">
                  mentions légales
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
