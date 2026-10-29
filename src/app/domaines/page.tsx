import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { domains } from "@/data/domains";
import { programs } from "@/data/programs";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { DomainIcon, accentClasses } from "@/components/icons";
import { Badge, BulletList, Container, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Nos domaines de formation",
  description:
    "Quatre domaines de formation continue : Énergies & Services, Industrie, Numérique, Management de la transformation. ESME Executive Education.",
  alternates: { canonical: "/domaines" },
};

export default function DomainesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Domaines" }]} />
      <PageHero
        eyebrow="Nos domaines"
        title="Quatre domaines, une même exigence d’opérationnalité"
        lead="ESME Executive Education concentre son action sur les secteurs où l’opérationnalité fait la différence : de l’énergie à l’industrie, des infrastructures à la mobilité, jusqu’à la transformation digitale."
      />

      <Section>
        <Container size="wide">
          <ul className="space-y-8">
            {domains.map((domain) => {
              const accent = accentClasses[domain.accent];
              const count = programs.filter((p) => p.domain === domain.slug).length;
              return (
                <li key={domain.slug}>
                  <Link
                    href={`/domaines/${domain.slug}`}
                    className="group grid gap-8 rounded-3xl border border-ink-200 bg-white p-8 shadow-card transition-all duration-300 hover:border-esme-300 hover:shadow-lift lg:grid-cols-[1.4fr_1fr] lg:p-10"
                  >
                    <div>
                      <div className="flex items-center gap-4">
                        <span
                          className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${accent.chip}`}
                        >
                          <DomainIcon icon={domain.icon} className="h-6 w-6" />
                        </span>
                        <Badge tone="neutral">
                          {count} formation{count > 1 ? "s" : ""} ·{" "}
                          {domain.themes.length} thématique
                          {domain.themes.length > 1 ? "s" : ""}
                        </Badge>
                      </div>
                      <h2 className="mt-5 text-2xl font-semibold text-esme-900">
                        {domain.name}
                      </h2>
                      <p className="mt-3 max-w-2xl leading-relaxed text-ink-600">
                        {domain.intro}
                      </p>
                      <p className="mt-6 flex items-center gap-1.5 text-sm font-medium text-esme-600">
                        Voir les {count} formations
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden
                        />
                      </p>
                    </div>
                    <div className="rounded-2xl bg-ink-50 p-6">
                      <p className="mb-3 text-[0.7rem] font-semibold tracking-[0.12em] text-ink-500 uppercase">
                        Thématiques
                      </p>
                      <BulletList items={domain.themes.map((t) => t.name)} />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
