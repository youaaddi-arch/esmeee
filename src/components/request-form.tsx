"use client";

import { useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { programs } from "@/data/programs";
import { domains } from "@/data/domains";
import { formats } from "@/data/site";
import { contact } from "@/data/site";
import { Button, cx } from "./ui";

/**
 * Formulaire de demande, décliné en « devis » et « contact ».
 *
 * Deux modes d’envoi :
 *  — si NEXT_PUBLIC_FORM_ENDPOINT est défini, la demande est envoyée en POST
 *    JSON vers cette URL (service d’e-mail transactionnel, CRM, webhook) ;
 *  — sinon, le formulaire ouvre le logiciel de messagerie du visiteur avec une
 *    demande pré-remplie, afin que le site reste fonctionnel sans back-end.
 * Voir README.md, section « Formulaires ».
 */

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type Variant = "devis" | "contact";
type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const fundingOptions = [
  "Plan de développement des compétences",
  "OPCO",
  "FNE-Formation",
  "France Travail",
  "Fonds d’assurance formation (indépendant)",
  "Financement personnel",
  "À déterminer avec vous",
];

const headcountOptions = [
  "1 à 3 personnes",
  "4 à 10 personnes",
  "11 à 30 personnes",
  "Plus de 30 personnes",
  "Plusieurs équipes, plusieurs sites",
];

const deadlineOptions = [
  "Dès que possible",
  "Dans le trimestre",
  "Dans les six mois",
  "Exercice suivant",
  "Non arrêtée",
];

export function RequestForm({
  variant = "devis",
  presetCode,
}: {
  variant?: Variant;
  presetCode?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedCodes, setSelectedCodes] = useState<string[]>(
    presetCode ? [presetCode] : [],
  );

  const programsByDomain = useMemo(
    () =>
      domains.map((domain) => ({
        domain,
        items: programs.filter((p) => p.domain === domain.slug),
      })),
    [],
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const required =
      variant === "devis"
        ? ["lastName", "email", "company", "message"]
        : ["lastName", "email", "message"];

    const nextErrors: Record<string, string> = {};
    for (const field of required) {
      if (!String(data.get(field) ?? "").trim()) {
        nextErrors[field] = "Ce champ est requis.";
      }
    }
    const email = String(data.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      nextErrors.email = "Adresse e-mail invalide.";
    }
    if (!data.get("consent")) {
      nextErrors.consent = "Merci d’accepter le traitement de vos données.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }

    const payload: Record<string, unknown> = Object.fromEntries(data.entries());
    payload.programmes = selectedCodes;
    payload.type = variant;
    payload.page = typeof window === "undefined" ? "" : window.location.pathname;

    if (ENDPOINT) {
      setStatus("sending");
      try {
        const response = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(String(response.status));
        setStatus("sent");
        form.reset();
        setSelectedCodes(presetCode ? [presetCode] : []);
      } catch {
        setStatus("error");
      }
      return;
    }

    // Repli sans back-end : ouverture d’un brouillon pré-rempli.
    const subject =
      variant === "devis"
        ? `Demande de devis — ${payload.company || "formation"}`
        : `Demande de contact — ${payload.company || payload.lastName}`;
    const lines = [
      `Nom : ${payload.firstName ?? ""} ${payload.lastName ?? ""}`.trim(),
      payload.role ? `Fonction : ${payload.role}` : "",
      payload.company ? `Organisation : ${payload.company}` : "",
      `E-mail : ${payload.email}`,
      payload.phone ? `Téléphone : ${payload.phone}` : "",
      selectedCodes.length ? `Formations : ${selectedCodes.join(", ")}` : "",
      payload.format ? `Format souhaité : ${payload.format}` : "",
      payload.headcount ? `Personnes à former : ${payload.headcount}` : "",
      payload.deadline ? `Échéance : ${payload.deadline}` : "",
      payload.funding ? `Financement envisagé : ${payload.funding}` : "",
      "",
      String(payload.message ?? ""),
    ].filter(Boolean);

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    setStatus("mailto");
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-framboise-300 bg-framboise-100/50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-framboise-600" aria-hidden />
        <h2 className="mt-4 text-xl font-semibold text-esme-900">
          Votre demande est partie
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-600">
          Nous revenons vers vous sous deux jours ouvrés avec un programme, un
          format et un devis. Pour une demande urgente, appelez directement le{" "}
          <a className="font-medium text-esme-600" href={`tel:${contact.phone}`}>
            {contact.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-xl border border-ink-300 bg-white px-3.5 py-2.5 text-sm text-ink-800 placeholder:text-ink-400 focus:border-esme-400 focus:outline-none";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <fieldset className="space-y-4">
        <legend className="text-[0.7rem] font-semibold tracking-[0.12em] text-ink-500 uppercase">
          Vous
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Prénom" name="firstName">
            <input name="firstName" type="text" autoComplete="given-name" className={fieldClass} />
          </Field>
          <Field label="Nom" name="lastName" required error={errors.lastName}>
            <input
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              aria-invalid={Boolean(errors.lastName)}
              className={cx(fieldClass, errors.lastName && "border-red-400")}
            />
          </Field>
          <Field label="Fonction" name="role">
            <input name="role" type="text" autoComplete="organization-title" className={fieldClass} />
          </Field>
          <Field
            label="Organisation"
            name="company"
            required={variant === "devis"}
            error={errors.company}
          >
            <input
              name="company"
              type="text"
              autoComplete="organization"
              aria-invalid={Boolean(errors.company)}
              className={cx(fieldClass, errors.company && "border-red-400")}
            />
          </Field>
          <Field label="E-mail professionnel" name="email" required error={errors.email}>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-invalid={Boolean(errors.email)}
              className={cx(fieldClass, errors.email && "border-red-400")}
            />
          </Field>
          <Field label="Téléphone" name="phone">
            <input name="phone" type="tel" autoComplete="tel" className={fieldClass} />
          </Field>
        </div>
      </fieldset>

      {variant === "devis" ? (
        <>
          <fieldset className="space-y-4">
            <legend className="text-[0.7rem] font-semibold tracking-[0.12em] text-ink-500 uppercase">
              Votre besoin
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Format souhaité" name="format">
                <select name="format" className={fieldClass} defaultValue="">
                  <option value="">Je ne sais pas encore</option>
                  {formats.map((item) => (
                    <option key={item.slug} value={item.name}>
                      {item.name} — {item.pitch.toLowerCase()}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Personnes à former" name="headcount">
                <select name="headcount" className={fieldClass} defaultValue="">
                  <option value="">À préciser</option>
                  {headcountOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Échéance" name="deadline">
                <select name="deadline" className={fieldClass} defaultValue="">
                  <option value="">À préciser</option>
                  {deadlineOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Financement envisagé" name="funding">
                <select name="funding" className={fieldClass} defaultValue="">
                  <option value="">À déterminer</option>
                  {fundingOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-[0.7rem] font-semibold tracking-[0.12em] text-ink-500 uppercase">
              Formations concernées
            </legend>
            <p className="mt-2 text-xs text-ink-500">
              Facultatif. Sélectionnez une ou plusieurs références du catalogue,
              ou laissez vide si vous préférez que nous vous orientions.
            </p>
            <div className="mt-3 max-h-64 overflow-y-auto rounded-xl border border-ink-200 bg-ink-50 p-4">
              {programsByDomain.map(({ domain, items }) => (
                <div key={domain.slug} className="mb-4 last:mb-0">
                  <p className="text-[0.7rem] font-semibold tracking-[0.1em] text-esme-700 uppercase">
                    {domain.name}
                  </p>
                  <div className="mt-2 space-y-1.5">
                    {items.map((program) => (
                      <label
                        key={program.code}
                        className="flex cursor-pointer items-start gap-2.5 text-sm text-ink-600"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCodes.includes(program.code)}
                          onChange={() =>
                            setSelectedCodes((current) =>
                              current.includes(program.code)
                                ? current.filter((c) => c !== program.code)
                                : [...current, program.code],
                            )
                          }
                          className="mt-0.5 h-4 w-4 rounded border-ink-300 text-esme-600 focus:ring-esme-400"
                        />
                        <span>
                          <span className="font-mono text-[0.7rem] font-semibold text-esme-700">
                            {program.code}
                          </span>{" "}
                          {program.title}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </fieldset>
        </>
      ) : null}

      <Field
        label={
          variant === "devis"
            ? "Contexte et objectifs"
            : "Votre message"
        }
        name="message"
        required
        error={errors.message}
        hint={
          variant === "devis"
            ? "Le contexte, les publics concernés, les outils ou installations en jeu, et ce qui doit avoir changé à l’issue de la formation."
            : undefined
        }
      >
        <textarea
          name="message"
          rows={6}
          required
          aria-invalid={Boolean(errors.message)}
          className={cx(fieldClass, "resize-y", errors.message && "border-red-400")}
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-ink-600">
          <input
            type="checkbox"
            name="consent"
            value="oui"
            className="mt-0.5 h-4 w-4 rounded border-ink-300 text-esme-600 focus:ring-esme-400"
            aria-invalid={Boolean(errors.consent)}
          />
          <span>
            J’accepte que mes données soient utilisées pour traiter ma
            demande. Elles font l’objet d’un traitement conforme au
            RGPD et ne sont pas cédées à des tiers.{" "}
            <span className="text-red-600" aria-hidden>
              *
            </span>
          </span>
        </label>
        {errors.consent ? (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden />
            {errors.consent}
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>
            L’envoi a échoué. Écrivez-nous directement à{" "}
            <a className="font-medium underline" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>{" "}
            ou appelez le {contact.phoneDisplay}.
          </span>
        </p>
      ) : null}

      {status === "mailto" ? (
        <p
          role="status"
          className="flex items-start gap-2 rounded-xl border border-esme-200 bg-esme-50 p-4 text-sm text-esme-800"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>
            Votre logiciel de messagerie s’ouvre avec la demande
            pré-remplie : il vous reste à l’envoyer. Si rien ne se passe,
            écrivez-nous à{" "}
            <a className="font-medium underline" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            .
          </span>
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4 border-t border-ink-200 pt-6">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <Send className="h-4 w-4" aria-hidden />
          )}
          {variant === "devis" ? "Envoyer ma demande de devis" : "Envoyer mon message"}
        </Button>
        <p className="text-xs text-ink-500">
          Réponse sous deux jours ouvrés. Ou appelez le{" "}
          <a className="font-medium text-esme-600" href={`tel:${contact.phone}`}>
            {contact.phoneDisplay}
          </a>
          .
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  // Le libellé englobe le champ : l’association est implicite, sans avoir à
  // propager un identifiant dans chaque champ.
  return (
    <div data-field={name}>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-esme-900">
          {label}
          {required ? (
            <span className="ml-0.5 text-red-600" aria-hidden>
              *
            </span>
          ) : null}
        </span>
        {hint ? (
          <span className="mb-2 block text-xs text-ink-500">{hint}</span>
        ) : null}
        {children}
      </label>
      {error ? (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
          <AlertCircle className="h-3.5 w-3.5" aria-hidden />
          {error}
        </p>
      ) : null}
    </div>
  );
}
