"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { contact, nav, site } from "@/data/site";
import { domains } from "@/data/domains";
import { ButtonLink, Container, cx } from "./ui";
import { EsmeLogo } from "./icons";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Referme le menu mobile à chaque navigation. L'ajustement se fait pendant
  // le rendu, et non dans un effet, pour éviter un rendu en cascade.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Empêche le défilement de l’arrière-plan quand le menu mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-200 bg-white/90 backdrop-blur-md">
      {/* Bandeau de service */}
      <div className="hidden bg-esme-900 text-esme-100 lg:block">
        <Container size="wide">
          <div className="flex h-9 items-center justify-between text-xs">
            <p className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-framboise-400" />
              La formation continue de l’ESME · Organisme certifié Qualiopi
            </p>
            <div className="flex items-center gap-5">
              <a
                className="transition-colors hover:text-framboise-300"
                href={`tel:${contact.phone}`}
              >
                {contact.phoneDisplay}
              </a>
              <a
                className="transition-colors hover:text-framboise-300"
                href={`mailto:${contact.email}`}
              >
                {contact.email}
              </a>
              <a
                className="transition-colors hover:text-framboise-300"
                href={contact.esmeSite}
                target="_blank"
                rel="noreferrer noopener"
              >
                esme.fr
              </a>
            </div>
          </div>
        </Container>
      </div>

      <Container size="wide">
        <div className="flex h-20 items-center justify-between gap-6">
          <Link
            href="/"
            className="shrink-0 text-esme-900"
            aria-label={`${site.name} — accueil`}
          >
            <EsmeLogo />
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cx(
                      "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-esme-50 text-esme-700"
                        : "text-ink-600 hover:bg-ink-50 hover:text-esme-700",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <ButtonLink href="/contact" tone="ghost" size="sm">
              Prendre contact
            </ButtonLink>
            <ButtonLink href="/devis" size="sm">
              Demander un devis
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-ink-300 px-3.5 py-2 text-sm font-medium text-esme-700 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
          >
            {open ? (
              <X className="h-4 w-4" aria-hidden />
            ) : (
              <Menu className="h-4 w-4" aria-hidden />
            )}
            Menu
          </button>
        </div>
      </Container>

      {open ? (
        <div
          id="menu-mobile"
          className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-ink-200 bg-white lg:hidden"
        >
          <Container className="py-6">
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cx(
                      "block rounded-xl px-3 py-2.5 text-base font-medium",
                      isActive(item.href)
                        ? "bg-esme-50 text-esme-700"
                        : "text-ink-700",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-6 mb-2 px-3 text-[0.7rem] font-semibold tracking-[0.14em] text-ink-400 uppercase">
              Domaines
            </p>
            <ul className="space-y-1">
              {domains.map((domain) => (
                <li key={domain.slug}>
                  <Link
                    href={`/domaines/${domain.slug}`}
                    className="block rounded-xl px-3 py-2 text-sm text-ink-600"
                  >
                    {domain.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-2">
              <ButtonLink href="/devis" size="lg">
                Demander un devis
              </ButtonLink>
              <ButtonLink href={`tel:${contact.phone}`} tone="ghost" size="lg">
                <Phone className="h-4 w-4" aria-hidden />
                {contact.phoneDisplay}
              </ButtonLink>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
