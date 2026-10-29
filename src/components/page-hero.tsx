import type { ReactNode } from "react";
import { Container, Eyebrow, cx } from "./ui";

/** Bandeau de titre commun aux pages intérieures. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  tone = "deep",
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
  tone?: "deep" | "tint";
}) {
  const dark = tone === "deep";
  return (
    <div
      className={cx(
        "relative overflow-hidden",
        dark ? "bg-esme-950 text-esme-100" : "bg-ink-50",
      )}
    >
      <div
        aria-hidden
        className={cx(
          "absolute inset-0",
          dark ? "bg-grid opacity-60" : "bg-grid-ink opacity-70",
        )}
      />
      {dark ? (
        <div
          aria-hidden
          className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-esme-600/25 blur-3xl"
        />
      ) : null}
      <Container size="wide" className="relative py-14 sm:py-18 lg:py-20">
        {eyebrow ? <Eyebrow tone={dark ? "light" : "dark"}>{eyebrow}</Eyebrow> : null}
        <h1
          className={cx(
            "mt-4 max-w-4xl text-4xl leading-[1.08] font-semibold sm:text-5xl",
            dark && "text-white",
          )}
        >
          {title}
        </h1>
        {lead ? (
          <div
            className={cx(
              "mt-5 max-w-2xl text-lg leading-relaxed",
              dark ? "text-esme-100/80" : "text-ink-600",
            )}
          >
            {lead}
          </div>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </div>
  );
}
