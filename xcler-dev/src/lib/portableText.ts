import type {PortableTextBlock} from "@portabletext/types";

type PortableTextChild = {
  text?: string;
};

type PortableTextLikeBlock = PortableTextBlock & {
  children?: PortableTextChild[];
};

export function portableTextToPlainText(blocks: PortableTextBlock[] | null | undefined): string {
  if (!Array.isArray(blocks) || blocks.length === 0) return "";

  const lines = blocks
    .map((block) => {
      const value = block as PortableTextLikeBlock;
      if (!Array.isArray(value.children)) return "";

      return value.children
        .map((child) => (typeof child?.text === "string" ? child.text : ""))
        .join("")
        .trim();
    })
    .filter(Boolean);

  return lines.join("\n").replace(/\s+/g, " ").trim();
}

export function truncateText(value: string, maxLength = 160): string {
  const normalized = value.trim();
  if (!normalized) return "";
  if (normalized.length <= maxLength) return normalized;

  const clipped = normalized.slice(0, maxLength + 1).replace(/\s+\S*$/, "").trim();
  const safe = clipped || normalized.slice(0, maxLength).trim();

  return `${safe}...`;
}

export function truncatePortableText(blocks: PortableTextBlock[] | null | undefined, maxLength = 160): string {
  return truncateText(portableTextToPlainText(blocks), maxLength);
}
