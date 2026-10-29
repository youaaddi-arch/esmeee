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
    chip: "bg-mint-100 text-mint-800",
    bar: "bg-mint-400",
    text: "text-mint-800",
    ring: "ring-mint-300",
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

export function EsmeLogo({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="font-display text-xl leading-none font-bold tracking-tight">
        ESME
      </span>
      <span className="mt-0.5 block text-[0.6rem] leading-none font-semibold tracking-[0.18em] uppercase opacity-80">
        Executive Education
      </span>
    </span>
  );
}
