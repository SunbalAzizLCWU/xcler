import { Children, isValidElement, type ReactNode } from "react";

function isJsonLdElement(node: ReactNode): boolean {
  if (!isValidElement(node)) return false;
  const props = node.props as { id?: unknown; data?: unknown };
  // RSC can wrap component identity, so detect by the JsonLd call shape used sitewide.
  return (
    typeof props.id === "string" &&
    props.data !== undefined &&
    props.data !== null &&
    typeof props.data === "object" &&
    /(graph|jsonld|schema|webpage|breadcrumb|service|blog|faq|catalog)/i.test(props.id)
  );
}

/**
 * Hoists top-level JsonLd scripts above <main>.
 * Linked-data parsers (and some SEO tools) strip scripts inside <main> while extracting text.
 */
export function MainWithJsonLdOutside({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  const jsonLd: ReactNode[] = [];
  const content: ReactNode[] = [];

  for (const child of items) {
    if (isJsonLdElement(child)) jsonLd.push(child);
    else content.push(child);
  }

  return (
    <>
      {jsonLd}
      <main id="main-content">{content}</main>
    </>
  );
}
