const MIN_WORDS = 80;
const MAX_WORDS = 450;
const OVERLAP_WORDS = 40;

export type SourceDocument = {
  slug: string;
  title: string;
  category: string;
  lang: "en" | "de";
  sourceUrl: string;
  sourcePath: string;
  contentHash: string;
  body: string;
};

export type PreparedChunk = {
  chunkIndex: number;
  heading: string;
  content: string;
  tokenCount: number;
  lang: "en" | "de";
  metadata: {
    title: string;
    category: string;
    source_url: string;
    slug: string;
    heading: string;
  };
};

function wordCount(text: string) {
  return text.split(/\s+/).filter(Boolean).length;
}

function splitLongSection(heading: string, body: string) {
  const paragraphs = body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const parts: string[] = [];
  let current = "";

  const flush = () => {
    if (current.trim()) parts.push(current.trim());
    current = "";
  };

  for (const para of paragraphs) {
    const next = current ? `${current}\n\n${para}` : para;
    if (wordCount(next) > MAX_WORDS && current) {
      flush();
      current = para;
    } else {
      current = next;
    }
  }
  flush();

  if (parts.length <= 1) return [{ heading, body }];

  return parts.map((part, index) => {
    if (index === 0) return { heading, body: part };
    const prevWords = parts[index - 1].split(/\s+/).filter(Boolean);
    const overlap = prevWords.slice(-OVERLAP_WORDS).join(" ");
    return {
      heading: `${heading} (${index + 1})`,
      body: `${overlap} ${part}`.trim(),
    };
  });
}

export function chunkDocument(doc: SourceDocument): PreparedChunk[] {
  const sections = doc.body
    .split(/^## /m)
    .slice(1)
    .map((section) => {
      const newline = section.indexOf("\n");
      const heading = (newline === -1 ? section : section.slice(0, newline)).trim();
      const body = (newline === -1 ? "" : section.slice(newline + 1)).trim();
      return { heading, body };
    })
    .filter((section) => section.body);

  if (sections.length === 0 && doc.body.trim()) {
    sections.push({ heading: doc.title, body: doc.body.trim() });
  }

  const merged: Array<{ heading: string; body: string }> = [];
  for (const section of sections) {
    const previous = merged[merged.length - 1];
    if (previous && wordCount(previous.body) < MIN_WORDS) {
      previous.body = `${previous.body}\n\n${section.heading}\n${section.body}`;
    } else {
      merged.push({ ...section });
    }
  }

  const expanded = merged.flatMap((section) =>
    wordCount(section.body) > MAX_WORDS ? splitLongSection(section.heading, section.body) : [section]
  );

  return expanded.map((section, chunkIndex) => {
    const content = `${doc.title} > ${section.heading}\n\n${section.body}`.trim();
    return {
      chunkIndex,
      heading: section.heading,
      content,
      tokenCount: Math.round(wordCount(content) * 1.3),
      lang: doc.lang,
      metadata: {
        title: doc.title,
        category: doc.category,
        source_url: doc.sourceUrl,
        slug: doc.slug,
        heading: section.heading,
      },
    };
  });
}
