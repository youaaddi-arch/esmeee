import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { articleBySlug, articles, sortedArticles } from "@/data/blog";
import { domainBySlug } from "@/data/domains";
import { programByCode } from "@/data/programs";
import { site } from "@/data/site";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ArticleBody } from "@/components/article-body";
import { ProgramCard } from "@/components/program-card";
import { CtaBand } from "@/components/cta-band";
import { Badge, Container, Eyebrow, Section } from "@/components/ui";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

const dateFormat = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) return { title: "Article introuvable" };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();

  const domain = article.domain ? domainBySlug(article.domain) : undefined;
  const related = article.relatedCodes
    .map((code) => programByCode(code))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const others = sortedArticles()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    articleSection: article.category,
  };

  return (
    <>
      <Breadcrumbs
        items={[{ href: "/blog", label: "Blog" }, { label: article.category }]}
      />

      <article>
        {/* En-tête */}
        <div className="relative overflow-hidden bg-esme-950 text-esme-100">
          <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
          <div
            aria-hidden
            className="absolute -top-32 -right-16 h-80 w-80 rounded-full bg-esme-600/25 blur-3xl"
          />
          <Container size="narrow" className="relative py-14 lg:py-18">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge tone="light">{article.category}</Badge>
              {domain ? (
                <Link href={`/domaines/${domain.slug}`}>
                  <Badge tone="light">{domain.name}</Badge>
                </Link>
              ) : null}
            </div>
            <h1 className="mt-6 text-3xl leading-[1.12] font-semibold text-white sm:text-4xl lg:text-[2.75rem]">
              {article.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-esme-100/80">
              {article.excerpt}
            </p>
            <dl className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-esme-100/60">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-mint-400" aria-hidden />
                <dt className="sr-only">Publié le</dt>
                <dd>
                  <time dateTime={article.date}>
                    {dateFormat.format(new Date(article.date))}
                  </time>
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-mint-400" aria-hidden />
                <dt className="sr-only">Temps de lecture</dt>
                <dd>{article.readingMinutes} min de lecture</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="sr-only">Auteur</dt>
                <dd>{article.author}</dd>
              </div>
            </dl>
          </Container>
        </div>

        {/* Corps */}
        <Section className="py-14 sm:py-16">
          <Container size="narrow">
            <ArticleBody blocks={article.body} />

            <p className="mt-14 border-t border-ink-200 pt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-esme-600 hover:underline"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Tous les articles
              </Link>
            </p>
          </Container>
        </Section>
      </article>

      {/* Programmes liés */}
      {related.length ? (
        <Section tone="tint">
          <Container size="wide">
            <Eyebrow>Se former sur ce sujet</Eyebrow>
            <h2 className="mt-4 text-2xl font-semibold text-esme-900 sm:text-3xl">
              Les programmes qui traitent ce sujet en salle
            </h2>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((program) => (
                <li key={program.code} className="flex">
                  <ProgramCard program={program} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* Autres articles */}
      {others.length ? (
        <Section>
          <Container size="wide">
            <Eyebrow>À lire aussi</Eyebrow>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/blog/${other.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-6 shadow-card transition-colors hover:border-esme-300"
                  >
                    <Badge tone="brand">{other.category}</Badge>
                    <h3 className="mt-4 text-lg leading-snug font-semibold text-esme-900 group-hover:underline">
                      {other.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
                      {other.excerpt}
                    </p>
                    <p className="mt-5 flex items-center gap-1.5 text-sm font-medium text-esme-600">
                      Lire
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <CtaBand />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
