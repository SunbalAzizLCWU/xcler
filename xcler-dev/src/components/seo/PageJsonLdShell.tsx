import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/JsonLd";

type PageJsonLdShellProps = {
  id: string;
  data: unknown;
  children: ReactNode;
};

/** JSON-LD sibling + <main> so structured data is never nested inside main. */
export function PageJsonLdShell({ id, data, children }: PageJsonLdShellProps) {
  return (
    <>
      <JsonLd id={id} data={data} />
      <main id="main-content">{children}</main>
    </>
  );
}

/** Plain main landmark for pages without a page-level JSON-LD graph. */
export function PageMain({ children }: { children: ReactNode }) {
  return <main id="main-content">{children}</main>;
}
