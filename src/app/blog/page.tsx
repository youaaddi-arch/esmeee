import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { categories, sortedArticles } from "@/data/blog";
import { domainBySlug } from "@/data/domains";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Badge, Container, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Analyses et décryptages ESME Executive Education : transition énergétique, industrie 4.0, intelligence artificielle, cybersécurité, management de la transformation et compétences des ingénieurs.",
  alternates: { canonical: "/blog" },
};

const dateFormat = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function BlogPage() {
  const articles = sortedArticles();
  const [featured, ...rest] = articles;
  const allCategories = categories();

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog" }]} />
      <PageHero
        eyebrow="Le blog"
        title="Ce que nous observons sur le terrain"
        lead="Décryptages réglementaires, analyses sectorielles et retours de salle. Écrits à partir de ce que nous voyons dans les entreprises que nous formons — et de ce que nos programmes nous apprennent."
      >
        <ul className="flex flex-wrap gap-2">
          {allCategories.map((category) => (
            <li key={category}>
              <Badge tone="light">{category}</Badge>
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Article à la une */}
      {featured ? (
        <Section className="py-14 sm:py-16">
          <Container size="wide">
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid gap-8 rounded-3xl border border-ink-200 bg-white p-8 shadow-card transition-all duration-300 hover:border-esme-300 hover:shadow-lift lg:grid-cols-[1.5fr_1fr] lg:p-10"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone="brand">{featured.category}</Badge>
                  <span className="text-xs text-ink-400">À la une</span>
                </div>
                <h2 className="mt-5 text-3xl leading-tight font-semibold text-esme-900 group-hover:underline">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600">
                  {featured.excerpt}
                </p>
                <p className="mt-6 flex items-center gap-1.5 text-sm font-medium text-esme-600">
                  Lire l’article
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </p>
              </div>
              <dl className="space-y-4 self-start rounded-2xl bg-ink-50 p-6 text-sm">
                <div className="flex items-center gap-2.5">
                  <CalendarDays className="h-4 w-4 text-esme-400" aria-hidden />
                  <dt className="sr-only">Date de publication</dt>
                  <dd className="text-ink-600">
                    <time dateTime={featured.date}>
                      {dateFormat.format(new Date(featured.date))}
                    </time>
                  </dd>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-esme-400" aria-hidden />
                  <dt className="sr-only">Temps de lecture</dt>
                  <dd className="text-ink-600">
                    {featured.readingMinutes} minutes de lecture
                  </dd>
                </div>
                <div className="border-t border-ink-200 pt-4">
                  <dt className="text-xs text-ink-400">Signé</dt>
                  <dd className="mt-0.5 font-medium text-esme-900">
                    {featured.author}
                  </dd>
                </div>
              </dl>
            </Link>
          </Container>
        </Section>
      ) : null}

      {/* Autres articles */}
      <Section tone="tint" className="py-14 sm:py-16">
        <Container size="wide">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => {
              const domain = article.domain ? domainBySlug(article.domain) : undefined;
              return (
                <li key={article.slug} className="flex">
                  <Link
                    href={`/blog/${article.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-esme-300 hover:shadow-lift"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone="brand">{article.category}</Badge>
                      {domain ? <Badge tone="neutral">{domain.name}</Badge> : null}
                    </div>
                    <h2 className="mt-4 text-lg leading-snug font-semibold text-esme-900 group-hover:underline">
                      {article.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
                      {article.excerpt}
                    </p>
                    <p className="mt-5 flex items-center justify-between gap-4 border-t border-ink-200 pt-4 text-xs text-ink-400">
                      <time dateTime={article.date}>
                        {dateFormat.format(new Date(article.date))}
                      </time>
                      <span>{article.readingMinutes} min</span>
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Rester informé"
        title="Ces sujets concernent vos équipes ?"
        lead="Chacun de ces articles renvoie aux programmes qui traitent le sujet en salle. Dites-nous votre contexte, nous vous orientons vers le format adapté."
      />
    </>
  );
}
