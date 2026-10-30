import type { Block } from "@/data/blog";
import { Info } from "lucide-react";

/** Rend le corps d’un article du blog à partir de ses blocs typés. */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-esme text-[1.0625rem]">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        switch (block.type) {
          case "h2":
            return (
              <h2 key={key} className="font-semibold text-esme-900">
                {block.text}
              </h2>
            );
          case "p":
            return <p key={key}>{block.text}</p>;
          case "ul":
            return (
              <ul key={key}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote key={key} className="not-italic">
                <p className="font-display text-xl leading-snug font-medium text-esme-800">
                  « {block.text} »
                </p>
                {block.by ? (
                  <footer className="mt-3 text-sm font-normal text-ink-500 not-italic">
                    — {block.by}
                  </footer>
                ) : null}
              </blockquote>
            );
          case "callout":
            return (
              <aside
                key={key}
                className="rounded-2xl border border-esme-200 bg-esme-50 p-5"
              >
                <p className="flex items-center gap-2 text-sm font-semibold text-esme-800">
                  <Info className="h-4 w-4" aria-hidden />
                  {block.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {block.text}
                </p>
              </aside>
            );
          case "stats":
            return (
              <dl
                key={key}
                className="grid gap-5 rounded-2xl bg-esme-950 p-6 text-left sm:grid-cols-2"
              >
                {block.items.map((item) => (
                  <div key={item.label}>
                    <dt className="font-display text-3xl font-semibold text-framboise-400">
                      {item.value}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-esme-100/80">
                      {item.label}
                    </dd>
                  </div>
                ))}
              </dl>
            );
        }
      })}
    </div>
  );
}
