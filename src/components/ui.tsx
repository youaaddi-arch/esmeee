import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export { cx };

/* ─────────────────────────────── Mise en page ─────────────────────────────── */

export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const width =
    size === "narrow" ? "max-w-3xl" : size === "wide" ? "max-w-7xl" : "max-w-6xl";
  return (
    <div className={cx("mx-auto w-full px-4 sm:px-6 lg:px-8", width, className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  tone = "white",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "white" | "tint" | "ink" | "deep";
}) {
  const tones = {
    white: "bg-white",
    tint: "bg-ink-50",
    ink: "bg-esme-900 text-esme-100",
    deep: "bg-esme-950 text-esme-100",
  } as const;
  return (
    <section id={id} className={cx("py-16 sm:py-20 lg:py-24", tones[tone], className)}>
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cx(
        "flex items-center gap-2.5 text-[0.7rem] font-semibold tracking-[0.14em] uppercase",
        tone === "dark" ? "text-esme-500" : "text-framboise-300",
        className,
      )}
    >
      <span
        aria-hidden
        className={cx(
          "h-px w-6",
          tone === "dark" ? "bg-esme-300" : "bg-framboise-400/60",
        )}
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "dark",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cx(
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow
          tone={tone}
          className={align === "center" ? "justify-center" : undefined}
        >
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={cx(
          "mt-4 text-3xl leading-tight font-semibold sm:text-4xl",
          tone === "light" && "text-white",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cx(
            "mt-4 text-lg leading-relaxed",
            tone === "light" ? "text-esme-100/80" : "text-ink-600",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/* ──────────────────────────────── Interactifs ─────────────────────────────── */

type ButtonTone = "primary" | "secondary" | "ghost" | "light" | "outlineLight";

const buttonTones: Record<ButtonTone, string> = {
  primary:
    "bg-esme-600 text-white hover:bg-esme-700 shadow-[0_1px_2px_rgb(6_32_80/0.2)]",
  secondary:
    "bg-framboise-400 text-esme-950 hover:bg-framboise-300 font-semibold",
  ghost:
    "border border-ink-300 bg-white text-esme-700 hover:border-esme-400 hover:text-esme-600",
  light: "bg-white text-esme-700 hover:bg-esme-50",
  outlineLight:
    "border border-white/30 text-white hover:border-white/70 hover:bg-white/5",
};

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const buttonSizes = {
  sm: "px-4 py-2",
  md: "px-5 py-2.5",
  lg: "px-6 py-3 text-[0.95rem]",
} as const;

export function ButtonLink({
  href,
  children,
  tone = "primary",
  size = "md",
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  tone?: ButtonTone;
  size?: keyof typeof buttonSizes;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const classes = cx(buttonBase, buttonSizes[size], buttonTones[tone], className);
  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  tone = "primary",
  size = "md",
  className,
  ...rest
}: {
  children: ReactNode;
  tone?: ButtonTone;
  size?: keyof typeof buttonSizes;
} & ComponentProps<"button">) {
  return (
    <button
      className={cx(buttonBase, buttonSizes[size], buttonTones[tone], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ───────────────────────────────── Affichage ──────────────────────────────── */

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "brand" | "mint" | "warn" | "light";
  className?: string;
}) {
  const tones = {
    neutral: "bg-ink-100 text-ink-600",
    brand: "bg-esme-100 text-esme-700",
    mint: "bg-framboise-100 text-framboise-800",
    warn: "bg-amber-50 text-amber-800",
    light: "bg-white/10 text-esme-100 ring-1 ring-white/15",
  } as const;
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  return (
    <Tag
      className={cx(
        "rounded-2xl border border-ink-200 bg-white p-6 shadow-card",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Stat({
  value,
  unit,
  label,
  detail,
  tone = "dark",
}: {
  value: string;
  unit?: string;
  label: string;
  detail?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div>
      <p
        className={cx(
          "font-display text-4xl font-semibold tracking-tight sm:text-5xl",
          tone === "light" ? "text-framboise-400" : "text-esme-600",
        )}
      >
        {value}
        {unit ? (
          <span className="ml-1 text-xl font-medium opacity-80">{unit}</span>
        ) : null}
      </p>
      <p
        className={cx(
          "mt-2 text-sm font-medium",
          tone === "light" ? "text-white" : "text-esme-900",
        )}
      >
        {label}
      </p>
      {detail ? (
        <p
          className={cx(
            "mt-1.5 text-sm leading-relaxed",
            tone === "light" ? "text-esme-100/70" : "text-ink-500",
          )}
        >
          {detail}
        </p>
      ) : null}
    </div>
  );
}

/** Liste à puces « menthe », utilisée partout pour les listes de bénéfices. */
export function BulletList({
  items,
  tone = "dark",
  className,
}: {
  items: readonly string[];
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <ul className={cx("space-y-2.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden
            className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-framboise-400"
          />
          <span
            className={cx(
              "text-sm leading-relaxed",
              tone === "light" ? "text-esme-100/85" : "text-ink-600",
            )}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cx("prose-esme", className)}>{children}</div>;
}
