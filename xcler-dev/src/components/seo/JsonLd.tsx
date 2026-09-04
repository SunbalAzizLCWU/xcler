type JsonLdProps = {
  id: string;
  data: unknown;
};

function serializeJsonLd(data: unknown): string {
  // Prevent </script> breakouts inside JSON string values.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Site/page JSON-LD. Keep as a top-level page child so layout can hoist it outside <main>. */
export function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
