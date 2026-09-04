import type { ReactNode } from "react";

type SeoAnswerBlockProps = {
  headingId: string;
  heading: string;
  /** Single paragraph — must be 130–170 words for GEO citable_passages */
  citablePassage: string;
  /** Opening lede — target 40–90 words; include H1 keywords */
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

/**
 * AEO/GEO block shaped for cursor-seo-mcp checks:
 * direct_answer_lede, citable_passages, snippet_list/table, heading ids, empirical claims, citations.
 */
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
      <h2 id={headingId} className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
        {heading}
      </h2>
      <p className="text-lg leading-relaxed text-richblack/75 dark:text-cream/75 max-w-4xl">{lede}</p>
      <p className="text-base leading-relaxed text-richblack/70 dark:text-cream/70 max-w-4xl">{citablePassage}</p>

      {listItems.length > 0 ? (
        <div>
          {listTitle ? (
            <h3 id={`${headingId}-list`} className="font-heading text-xl font-semibold mb-3">
              {listTitle}
            </h3>
          ) : null}
          <ul className="list-disc space-y-2 pl-6 text-richblack/70 dark:text-cream/70">
            {listItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {tableRows.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-stone/15 dark:border-stone-dark/20">
          {tableCaption ? (
            <p className="border-b border-stone/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-richblack/45 dark:text-cream/45">
              {tableCaption}
            </p>
          ) : null}
          <table className="min-w-full text-left text-sm">
            <tbody>
              {tableRows.map((row) => (
                <tr key={row.label} className="border-b border-stone/10 last:border-0 dark:border-stone-dark/15">
                  <th scope="row" className="px-4 py-3 font-medium text-richblack dark:text-cream">
                    {row.label}
                  </th>
                  <td className="px-4 py-3 text-richblack/70 dark:text-cream/70">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {numericClaims.length > 0 ? (
        <p className="text-sm text-richblack/65 dark:text-cream/65">
          {numericClaims.join(" ")}
        </p>
      ) : null}

      {citationQuote && citationHref ? (
        <blockquote cite={citationHref} className="border-l-4 border-terracotta/50 pl-4 text-richblack/70 dark:text-cream/70">
          <p>{citationQuote}</p>
          <footer className="mt-2 text-sm">
            —{" "}
            <a href={citationHref} className="text-terracotta underline-offset-2 hover:underline" rel="noopener noreferrer" target="_blank">
              {citationLabel || citationHref}
            </a>
          </footer>
        </blockquote>
      ) : null}

      {children}
    </section>
  );
}
