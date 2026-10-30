import Link from "next/link";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { contact, footerNav, qualiopi, site } from "@/data/site";
import { catalogueStats } from "@/data/programs";
import { Container } from "./ui";
import { EsmeLogo } from "./icons";

export function SiteFooter() {
  // Année figée au build (voir next.config.ts) : le prérendu reste statique.
  const year = process.env.BUILD_YEAR ?? "2026";

  return (
    <footer className="bg-esme-950 text-esme-100">
      <Container size="wide" className="py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2.7fr]">
          <div>
            <Link href="/" className="inline-block text-white">
              <EsmeLogo tone="light" size="lg" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-esme-100/70">
              {site.tagline}. {site.baseline} {catalogueStats.programCount}{" "}
              formations réparties sur {catalogueStats.domainCount} domaines, en
              inter, intra-entreprise ou sur-mesure.
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-framboise-300"
                  href={`tel:${contact.phone}`}
                >
                  <Phone className="h-4 w-4 text-framboise-400" aria-hidden />
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-framboise-300"
                  href={`mailto:${contact.email}`}
                >
                  <Mail className="h-4 w-4 text-framboise-400" aria-hidden />
                  {contact.email}
                </a>
              </li>
              {contact.sites.map((place) => (
                <li
                  key={place.label}
                  className="flex items-start gap-2.5 text-esme-100/70"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-framboise-400" aria-hidden />
                  <span>
                    {place.street}
                    <br />
                    {place.postalCode} {place.city}
                  </span>
                </li>
              ))}
              <li>
                <a
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-framboise-300"
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Linkedin className="h-4 w-4 text-framboise-400" aria-hidden />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-[0.7rem] font-semibold tracking-[0.14em] text-framboise-300 uppercase">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-esme-100/70 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-sm leading-relaxed text-esme-100/75">
            <span className="font-semibold text-white">
              Organisme de formation certifié Qualiopi.
            </span>{" "}
            {qualiopi.statement} Certification délivrée par {qualiopi.body}.
            Nos formations sont à ce titre éligibles aux dispositifs de
            financement de la formation professionnelle.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-esme-100/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name} — {contact.legalEntity.name},{" "}
            {contact.legalEntity.street}, {contact.legalEntity.postalCode}{" "}
            {contact.legalEntity.city} · SIRET {contact.legalEntity.siret}
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-2">
            <Link className="transition-colors hover:text-white" href="/mentions-legales">
              Mentions légales
            </Link>
            <Link className="transition-colors hover:text-white" href="/cgv">
              CGV
            </Link>
            <Link className="transition-colors hover:text-white" href="/plan-du-site">
              Plan du site
            </Link>
            <span>Membre du {site.group}</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
