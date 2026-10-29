"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cx } from "./ui";

export type AccordionItem = { q: string; a: string };

export function Accordion({
  items,
  className,
}: {
  items: readonly AccordionItem[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={cx("divide-y divide-ink-200 border-y border-ink-200", className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-start justify-between gap-6 py-5 text-left"
              >
                <span className="text-base font-medium text-esme-900">
                  {item.q}
                </span>
                <ChevronDown
                  className={cx(
                    "mt-0.5 h-5 w-5 shrink-0 text-esme-500 transition-transform duration-300",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-6"
            >
              <p className="max-w-3xl text-sm leading-relaxed text-ink-600">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
