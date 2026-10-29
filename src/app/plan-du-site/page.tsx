import type { Metadata } from "next";
import Link from "next/link";
import { domains } from "@/data/domains";
import { programs, programsByDomain } from "@/data/programs";
import { sortedArticles } from "@/data/blog";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { Container, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Plan du site",
  description:
    "Toutes les pages du site ESME Executive Education : catalogue des formations, domaines, formats, financement, équipe pédagogique et blog.",
  alternates: { canonical: "/plan-du-site" },
};

const mainPages = [
  { href: "/", label: "Accueil" },
  { href: "/formations", label: "Catalogue des formations" },
  { href: "/domaines", label: "Nos domaines" },
  { href: "/formats", label: "Formats : inter, intra, sur-mesure" },
  { href: "/financement", label: "Financer votre formation" },
  { href: "/notre-approche", label: "Notre approche pédagogique" },
  { href: "/equipe-pedagogique", label: "Équipe pédagogique" },
  { href: "/observatoire", label: "Observatoire 2026" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Nous contacter" },
  { href: "/devis", label: "Demander un devis" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "Conditions générales de vente" },
];

export default function PlanDuSitePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Plan du site" }]} />
      <PageHero
        tone="tint"
        title="Plan du site"
        lead={`${mainPages.length} pages principales et ${programs.length} fiches programme.`}
      />

      <Section className="py-14 sm:py-16">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <nav aria-label="Pages principales">
              <h2 className="text-sm font-semibold tracking-[0.1em] text-esme-700 uppercase">
                Pages
              </h2>
              <ul className="mt-5 space-y-2.5">
                {mainPages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="text-sm text-ink-600 transition-colors hover:text-esme-600 hover:underline"
                    >
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 text-sm font-semibold tracking-[0.1em] text-esme-700 uppercase">
                Blog
              </h2>
              <ul className="mt-5 space-y-2.5">
                {sortedArticles().map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="text-sm leading-snug text-ink-600 transition-colors hover:text-esme-600 hover:underline"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Fiches programme">
              <h2 className="text-sm font-semibold tracking-[0.1em] text-esme-700 uppercase">
                Formations
              </h2>
              <div className="mt-6 space-y-10">
                {domains.map((domain) => (
                  <div key={domain.slug}>
                    <h3 className="font-semibold text-esme-900">
                      <Link
                        href={`/domaines/${domain.slug}`}
                        className="hover:underline"
                      >
                        {domain.name}
                      </Link>
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {programsByDomain(domain.slug).map((program) => (
                        <li key={program.code} className="text-sm">
                          <Link
                            href={`/formations/${program.slug}`}
                            className="group flex gap-2.5 text-ink-600"
                          >
                            <span className="shrink-0 font-mono text-xs font-semibold text-esme-500">
                              {program.code}
                            </span>
                            <span className="group-hover:text-esme-600 group-hover:underline">
                              {program.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>
          </div>
        </Container>
      </Section>
    </>
  );
}
