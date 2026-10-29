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

export function EsmeLogo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span className={`flex items-center gap-3 ${className ?? ""}`}>
      <Image
        src="/brand/esme-mark.png"
        alt="ESME"
        width={512}
        height={512}
        priority
        className="h-10 w-10 shrink-0 rounded-[0.35rem]"
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[0.95rem] font-bold tracking-tight ${
            tone === "light" ? "text-white" : "text-esme-900"
          }`}
        >
          Executive Education
        </span>
        <span
          className={`mt-1 text-[0.6rem] font-semibold tracking-[0.16em] uppercase ${
            tone === "light" ? "text-mint-300" : "text-esme-500"
          }`}
        >
          Formation continue
        </span>
      </span>
    </span>
  );
}
