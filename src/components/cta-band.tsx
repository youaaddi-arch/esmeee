import { Phone } from "lucide-react";
import { contact } from "@/data/site";
import { ButtonLink, Container, Eyebrow } from "./ui";

export function CtaBand({
  eyebrow = "Parlons de vos enjeux",
  title = "Construisons ensemble les compétences dont vos projets ont besoin",
  lead = "Dites-nous le contexte, les publics concernés et l’échéance. Nous revenons vers vous avec un programme, un format et un devis — les deux pièces attendues par tous les financeurs.",
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-esme-900 text-esme-100">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-mint-400/10 blur-3xl"
      />
      <Container size="wide" className="relative py-16 lg:py-20">
        <div className="grid items-end gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
            <h2 className="mt-4 max-w-2xl text-3xl leading-tight font-semibold text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-esme-100/80">
              {lead}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
            <ButtonLink href="/devis" tone="secondary" size="lg">
              Demander un devis
            </ButtonLink>
            <ButtonLink href={`tel:${contact.phone}`} tone="outlineLight" size="lg">
              <Phone className="h-4 w-4" aria-hidden />
              {contact.phoneDisplay}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
