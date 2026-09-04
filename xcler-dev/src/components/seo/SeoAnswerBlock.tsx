import type { ReactNode } from "react";

type SeoAnswerBlockProps = {
  headingId: string;
  heading: string;
  citablePassage: string;
  lede: string;
  listTitle?: string;
  listItems?: string[];
  tableCaption?: string;
  tableRows?: Array<{ label: string; value: string }>;
  numericClaims?: string[];
  citationQuote?: string;
  citationHref?: string;
  citationLabel?: string;
  children?: ReactNode;
};

export function SeoAnswerBlock({
  headingId,
  heading,
  citablePassage,
  lede,
  listTitle,
  listItems = [],
  tableCaption,
  tableRows = [],
  numericClaims = [],
  citationQuote,
  citationHref,
  citationLabel,
  children,
}: SeoAnswerBlockProps) {
  return (
    <section className="mt-16 space-y-8" aria-labelledby={headingId}>
      <h2 id={headingId} className="font-heading text-3xl font-bold tracking-tight text-cream md:text-4xl">
        {heading}
      </h2>
      <p className="max-w-4xl text-lg leading-relaxed text-cream/75">{lede}</p>
      <p className="max-w-4xl text-base leading-relaxed text-cream/70">{citablePassage}</p>

      {listItems.length > 0 ? (
        <div>
          {listTitle ? (
            <h3 id={`${headingId}-list`} className="mb-3 font-heading text-xl font-semibold text-cream">
              {listTitle}
            </h3>
          ) : null}
          <ul className="list-disc space-y-2 pl-6 text-cream/70">
            {listItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {tableRows.length > 0 ? (
        <div className="overflow-x-auto border border-cream/10 bg-charcoal/50">
          {tableCaption ? (
            <p className="border-b border-cream/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-stone-light">
              {tableCaption}
            </p>
          ) : null}
          <table className="min-w-full text-left text-sm">
            <tbody>
              {tableRows.map((row) => (
                <tr key={row.label} className="border-b border-cream/10 last:border-0">
                  <th scope="row" className="px-4 py-3 font-medium text-cream">
                    {row.label}
                  </th>
                  <td className="px-4 py-3 text-cream/70">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {numericClaims.length > 0 ? (
        <p className="text-sm text-cream/65">{numericClaims.join(" ")}</p>
      ) : null}

      {citationQuote && citationHref ? (
        <blockquote cite={citationHref} className="border-l-2 border-sage/60 pl-4 text-cream/70">
          <p>{citationQuote}</p>
          <footer className="mt-2 text-sm">
            —{" "}
            <a
              href={citationHref}
              className="text-sage underline-offset-2 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              {citationLabel || citationHref}
            </a>
          </footer>
        </blockquote>
      ) : null}

      {children}
    </section>
  );
}
