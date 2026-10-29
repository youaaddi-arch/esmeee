import Link from "next/link";
import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container size="narrow" className="py-24 text-center lg:py-32">
      <p className="font-mono text-sm font-semibold tracking-[0.14em] text-esme-500 uppercase">
        Erreur 404
      </p>
      <h1 className="mt-5 text-4xl font-semibold text-esme-900">
        Cette page n’existe pas
      </h1>
      <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-ink-600">
        Le lien est peut-être obsolète, ou la référence de formation a changé.
        Le catalogue complet reste accessible, et notre équipe peut vous orienter
        directement.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/formations" size="lg">
          Voir le catalogue
        </ButtonLink>
        <ButtonLink href="/contact" tone="ghost" size="lg">
          Nous contacter
        </ButtonLink>
      </div>
      <p className="mt-8 text-sm text-ink-500">
        Ou consultez le{" "}
        <Link href="/plan-du-site" className="font-medium text-esme-600 underline">
          plan du site
        </Link>
        .
      </p>
    </Container>
  );
}
