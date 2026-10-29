import type { Metadata } from "next";
import Link from "next/link";
import { contact, qualiopi, site } from "@/data/site";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { Container, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${site.name} : éditeur, hébergement, propriété intellectuelle, données personnelles et certification Qualiopi.`,
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Mentions légales" }]} />
      <PageHero tone="tint" title="Mentions légales" />

      <Section className="py-14 sm:py-16">
        <Container size="narrow">
          <div className="prose-esme">
            <h2>Éditeur du site</h2>
            <p>
              {site.name} est la marque de formation professionnelle continue de
              l’{site.school}, école d’ingénieurs membre du{" "}
              {site.group}.
            </p>
            <ul>
              <li>
                Raison sociale : {contact.legalEntity.name}
              </li>
              <li>
                Siège : {contact.legalEntity.street},{" "}
                {contact.legalEntity.postalCode} {contact.legalEntity.city}
              </li>
              <li>SIRET : {contact.legalEntity.siret}</li>
              <li>
                Téléphone :{" "}
                <a href={`tel:${contact.phone}`}>{contact.phoneDisplay}</a>
              </li>
              <li>
                Courriel :{" "}
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
            </ul>

            <h2>Certification qualité</h2>
            <p>
              {qualiopi.statement} Certification délivrée par l’organisme
              certificateur {qualiopi.body}. À ce titre, les actions de
              formation proposées sont éligibles aux dispositifs de financement
              de la formation professionnelle. Les conditions sont détaillées
              sur la page{" "}
              <Link href="/financement">financement</Link>.
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
              Les supports pédagogiques, contenus et méthodes utilisés dans le
              cadre des formations, y compris des formations sur-mesure, sont
              protégés par le droit de la propriété intellectuelle. Ils restent
              la propriété exclusive de {site.name}. Toute reproduction,
              diffusion ou exploitation, totale ou partielle, sans autorisation
              préalable est interdite.
            </p>
            <p>
              Il en va de même des éléments composant ce site : textes,
              identité visuelle, structure et mise en forme. Les intitulés,
              références et descriptifs de programmes sont repris du catalogue{" "}
              {site.name} {site.catalogueYear}.
            </p>

            <h2>Données personnelles</h2>
            <p>
              Les données personnelles collectées via les formulaires de ce site
              sont utilisées dans le seul but de traiter votre demande
              d’information, de devis ou d’inscription. Elles font
              l’objet d’un traitement conforme au Règlement général
              sur la protection des données (RGPD) et ne sont pas cédées à des
              tiers.
            </p>
            <p>
              Les personnes concernées disposent de droits d’accès, de
              rectification et de suppression de leurs données. Pour les
              exercer, écrivez à{" "}
              <a href={`mailto:${contact.email}`}>{contact.email}</a>. Les
              modalités d’exercice de ces droits sont également précisées
              dans la politique de confidentialité de l’ESME.
            </p>

            <h2>Accessibilité</h2>
            <p>
              Ce site a été conçu pour être utilisable au clavier, avec un
              contraste de texte conforme et une structure de titres cohérente.
              Si vous rencontrez une difficulté d’accès à une information,
              signalez-le à{" "}
              <a href={`mailto:${contact.email}`}>{contact.email}</a> : nous
              corrigerons et vous transmettrons l’information par un autre
              moyen.
            </p>
            <p>
              Pour les besoins d’aménagement liés à une situation de
              handicap en situation de formation, notre référente handicap est
              joignable à{" "}
              <a href={`mailto:${contact.accessibilityEmail}`}>
                {contact.accessibilityEmail}
              </a>
              .
            </p>

            <h2>Conditions de vente</h2>
            <p>
              Les conditions applicables aux prestations de formation figurent
              dans nos{" "}
              <Link href="/cgv">conditions générales de vente</Link>.
            </p>

            <h2>Hébergement</h2>
            <p>
              À compléter par l’équipe technique au moment de la mise en
              ligne : raison sociale, adresse et contact de l’hébergeur du
              site.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
