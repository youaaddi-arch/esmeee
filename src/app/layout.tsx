import type { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { contact, site } from "@/data/site";
import "./globals.css";

// Kumbh Sans : la typographie de la charte ESME Executive Education.
const kumbhSans = Kumbh_Sans({
  variable: "--font-kumbh",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "formation continue ingénieur",
    "executive education",
    "formation professionnelle transition énergétique",
    "formation intelligence artificielle entreprise",
    "formation cybersécurité dirigeants",
    "management de la transformation",
    "formation intra-entreprise",
    "organisme de formation Qualiopi",
    "ESME",
  ],
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

/** Données structurées : l’organisme de formation. */
const organisationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.name,
  alternateName: "ESME Executive Education — formation continue",
  url: site.url,
  description: site.description,
  parentOrganization: { "@type": "EducationalOrganization", name: "ESME", url: contact.esmeSite },
  telephone: contact.phone,
  email: contact.email,
  address: contact.sites.map((place) => ({
    "@type": "PostalAddress",
    streetAddress: place.street,
    postalCode: place.postalCode,
    addressLocality: place.city,
    addressCountry: "FR",
  })),
  sameAs: [contact.linkedin, contact.esmeSite],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${kumbhSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-esme-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd) }}
        />
      </body>
    </html>
  );
}
