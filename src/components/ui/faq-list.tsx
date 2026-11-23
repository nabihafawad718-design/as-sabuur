import { ChevronDown } from "lucide-react";

export function FaqList({
  items,
  defaultOpen = 0,
  groupName = "faq",
}: {
  items: { id: number; question: string; answer: string }[];
  defaultOpen?: number;
  groupName?: string;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details
          key={item.id}
          name={groupName}
          open={i === defaultOpen}
          className="faq group rounded-2xl border border-ivory-200 bg-white/70 p-5 transition-colors hover:bg-white"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-pine-950">
            <span>{item.question}</span>
            <ChevronDown className="faq-chevron h-5 w-5 shrink-0 text-pine-500 transition-transform duration-300" />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
