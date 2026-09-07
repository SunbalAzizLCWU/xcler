import { Link } from "@/navigation";
import type { ComponentProps } from "react";

type Href = ComponentProps<typeof Link>["href"];

type RelatedItem = {
  href: Href;
  label: string;
};

type RelatedServicesProps = {
  locale: "de" | "en";
  items: RelatedItem[];
  heading?: string;
};

export function RelatedServices({ locale, items, heading }: RelatedServicesProps) {
  if (!items.length) return null;

  const title =
    heading ??
    (locale === "de" ? "Verwandte Leistungen" : "Related services");

  return (
    <nav aria-label={title} className="mt-10 border-t border-cream/10 pt-8">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-cream/45">
        {title}
      </p>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
        {items.map((item) => (
          <li key={String(item.href)}>
            <Link
              href={item.href}
              className="text-sm text-sage underline-offset-4 hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
