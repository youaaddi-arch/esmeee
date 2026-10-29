import Image from "next/image";
import type { ReactNode } from "react";
import { Container, Eyebrow, cx } from "./ui";

/**
 * Bandeau photo pleine largeur, avec une accroche posée dessus.
 * Le voile dégradé garantit le contraste du texte quelle que soit la photo.
 */
export function ImageBand({
  src,
  alt,
  eyebrow,
  title,
  lead,
  children,
  height = "md",
}: {
  src: string;
  alt: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  children?: ReactNode;
  height?: "sm" | "md" | "lg";
}) {
  const heights = {
    sm: "min-h-64 sm:min-h-72",
    md: "min-h-80 sm:min-h-96",
    lg: "min-h-96 sm:min-h-[28rem]",
  } as const;

  return (
    <section className={cx("relative isolate flex items-end overflow-hidden", heights[height])}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-esme-950 via-esme-950/70 to-esme-950/20"
      />
      <Container size="wide" className="py-10 sm:py-12">
        {eyebrow ? <Eyebrow tone="light">{eyebrow}</Eyebrow> : null}
        {title ? (
          <h2 className="mt-4 max-w-2xl text-2xl leading-tight font-semibold text-white sm:text-3xl">
            {title}
          </h2>
        ) : null}
        {lead ? (
          <p className="mt-3 max-w-xl leading-relaxed text-esme-100/80">{lead}</p>
        ) : null}
        {children ? <div className="mt-6">{children}</div> : null}
      </Container>
    </section>
  );
}
