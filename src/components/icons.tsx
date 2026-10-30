import Image from "next/image";
import { Bolt, Cog, Cpu, Compass } from "lucide-react";
import type { Domain } from "@/data/domains";

const map = {
  bolt: Bolt,
  cog: Cog,
  chip: Cpu,
  compass: Compass,
} as const;

export function DomainIcon({
  icon,
  className,
}: {
  icon: Domain["icon"];
  className?: string;
}) {
  const Component = map[icon];
  return <Component className={className} strokeWidth={1.5} aria-hidden />;
}

/** Couleurs d’accent par domaine, pour les pastilles et les filets. */
export const accentClasses: Record<
  Domain["accent"],
  { chip: string; bar: string; text: string; ring: string }
> = {
  teal: {
    chip: "bg-framboise-100 text-framboise-800",
    bar: "bg-framboise-400",
    text: "text-framboise-800",
    ring: "ring-framboise-300",
  },
  indigo: {
    chip: "bg-indigo-50 text-indigo-800",
    bar: "bg-indigo-400",
    text: "text-indigo-800",
    ring: "ring-indigo-200",
  },
  blue: {
    chip: "bg-esme-100 text-esme-700",
    bar: "bg-esme-400",
    text: "text-esme-700",
    ring: "ring-esme-300",
  },
  rose: {
    chip: "bg-rose-50 text-rose-800",
    bar: "bg-rose-400",
    text: "text-rose-800",
    ring: "ring-rose-200",
  },
};

export function EsmeLogo({
  className,
  tone = "dark",
  size = "md",
}: {
  className?: string;
  tone?: "dark" | "light";
  size?: "md" | "lg";
}) {
  // Deux déclinaisons de la charte : lettrage bleu sur fond clair, réserve
  // blanche sur fond sombre. La hauteur passe par une prop afin d'éviter deux
  // utilitaires de hauteur concurrents sur la même image.
  const src =
    tone === "light" ? "/brand/esme-exed-blanc.png" : "/brand/esme-exed.png";
  const height = size === "lg" ? "h-20" : "h-14";
  return (
    <Image
      src={src}
      alt="ESME Executive Education"
      width={823}
      height={1123}
      priority
      className={`${height} w-auto ${className ?? ""}`}
    />
  );
}
