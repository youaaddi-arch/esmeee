import type { Metadata } from "next";
import { cgvArticles, cgvUpdatedAt } from "@/data/cgv";
import { contact, site } from "@/data/site";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { Container, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: `Conditions générales de vente ${site.name} : contractualisation, conditions financières, annulation, financement par un organisme tiers, confidentialité et propriété intellectuelle. Mise à jour ${cgvUpdatedAt}.`,
  alternates: { canonical: "/cgv" },
  robots: { index: true, follow: true },
};

export default function CgvPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Conditions générales de vente" }]} />
      <PageHero
        tone="tint"
        eyebrow={`Mise à jour ${cgvUpdatedAt}`}
        title="Conditions générales de vente"
        lead={`Les présentes conditions s’appliquent à l’ensemble des prestations de ${site.name}, qu’il s’agisse de formations inter-entreprises, intra-entreprises ou de programmes sur-mesure.`}
      />

      <Section className="py-14 sm:py-16">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
            {/* Sommaire */}
            <nav
              aria-label="Sommaire des conditions générales"
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <p className="text-[0.7rem] font-semibold tracking-[0.12em] text-ink-500 uppercase">
                Sommaire
              </p>
              <ol className="mt-4 space-y-2">
                {cgvArticles.map((article) => (
                  <li key={article.number}>
                    <a
                      href={`#article-${article.number}`}
                      className="block text-sm leading-snug text-ink-600 transition-colors hover:text-esme-600"
                    >
                      <span className="font-mono text-xs text-esme-500">
                        {String(article.number).padStart(2, "0")}
                      </span>{" "}
                      {article.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="max-w-3xl space-y-12">
              {cgvArticles.map((article) => (
                <section key={article.number} id={`article-${article.number}`}>
                  <h2 className="text-xl font-semibold text-esme-900">
                    <span className="mr-2 font-mono text-sm font-medium text-esme-500">
                      Article {article.number}
                    </span>
                    <br />
                    {article.title}
                  </h2>
                  <div className="mt-4 space-y-3">
                    {article.paragraphs.map((paragraph, index) =>
                      paragraph.kind === "li" ? (
                        <p
                          key={index}
                          className="flex gap-3 text-sm leading-relaxed text-ink-600"
                        >
                          <span
                            aria-hidden
                            className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-mint-400"
                          />
                          <span>{paragraph.text}</span>
                        </p>
                      ) : (
                        <p
                          key={index}
                          className="text-sm leading-relaxed text-ink-600"
                        >
                          {paragraph.text}
                        </p>
                      ),
                    )}
                  </div>
                </section>
              ))}

              <div className="rounded-2xl bg-ink-50 p-6 text-sm leading-relaxed text-ink-600">
                <p>
                  Mise à jour en {cgvUpdatedAt}. Pour toute question relative à
                  ces conditions, écrivez-nous à{" "}
                  <a
                    className="font-medium text-esme-600 underline"
                    href={`mailto:${contact.email}`}
                  >
                    {contact.email}
                  </a>{" "}
                  ou appelez le {contact.phoneDisplay}.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
