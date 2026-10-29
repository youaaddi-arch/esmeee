import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "./ui";

export type Crumb = { href?: string; label: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d’Ariane" className="border-b border-ink-200 bg-ink-50">
      <Container size="wide">
        <ol className="flex flex-wrap items-center gap-1.5 py-3 text-xs text-ink-500">
          <li>
            <Link href="/" className="transition-colors hover:text-esme-600">
              Accueil
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={item.label} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3 text-ink-400" aria-hidden />
              {item.href && index < items.length - 1 ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-esme-600"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-esme-800" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </nav>
  );
}
