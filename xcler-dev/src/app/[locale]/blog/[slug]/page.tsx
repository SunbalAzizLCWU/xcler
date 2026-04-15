import type { Metadata } from "next";
import type { PortableTextBlock } from "@portabletext/types";
import { groq, PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { getCanonicalPath, getLanguageAlternates } from "@/lib/canonical";

type PriceChartRow = {
  _key?: string;
  label?: string;
  title?: string;
  name?: string;
  min?: number | string;
  max?: number | string;
  timeline?: string;
};

type PriceChartValue = {
  title?: string;
  subtitle?: string;
  currency?: string;
  rows?: PriceChartRow[];
  items?: PriceChartRow[];
  bars?: PriceChartRow[];
};

type RichTableCell = {
  _key?: string;
  content?: PortableTextBlock[];
};

type RichTableRow = {
  _key?: string;
  cells?: RichTableCell[];
};

type RichTableValue = {
  rows?: RichTableRow[];
};

type PortableImageValue = {
  asset?: unknown;
  alt?: string;
};

type SanityBlogPost = {
  _id: string;
  title: string;
  slug_en?: string;
  slug_de?: string;
  mainImage?: unknown;
  imageAlt: string;
  body: PortableTextBlock[];
};

type BlogSlugRow = {
  slug_en?: string;
  slug_de?: string;
};

const parseAmount = (value: number | string | undefined) => {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value !== "string") return 0;

  const normalized = Number(value.replace(/[^\d.,-]/g, "").replace(/,/g, ""));
  return Number.isFinite(normalized) ? normalized : 0;
};

const formatCurrency = (amount: number, currencySymbol: string) => {
  if (!Number.isFinite(amount)) return `${currencySymbol}0`;
  return `${currencySymbol}${amount.toLocaleString("en-US")}`;
};

const tableCellPortableTextComponents = {
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-richblack dark:text-cream">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic text-richblack dark:text-cream">{children}</em>
    ),
    underline: ({ children }: { children?: React.ReactNode }) => (
      <span className="underline decoration-terracotta/60 underline-offset-2">{children}</span>
    ),
    highlight: ({ children }: { children?: React.ReactNode }) => (
      <mark className="rounded bg-terracotta/20 px-1 py-0.5 text-richblack dark:text-cream">{children}</mark>
    ),
  },
};

const createPortableTextComponents = (locale: string) => ({
  types: {
    image: ({ value }: { value: PortableImageValue }) => {
      if (!value?.asset) return null;

      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={urlFor(value).url()}
          alt={value.alt || "Xcler Blog Image"}
          className="my-8 h-auto w-full rounded-2xl"
        />
      );
    },
    table: ({ value }: { value: { rows?: Array<{ _key?: string; cells?: unknown[] }> } }) => {
      const rows = value?.rows ?? [];

      if (!rows.length) return null;

      return (
        <div className="my-8 overflow-x-auto">
          <table className="w-full border border-stone/20 border-collapse">
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={row._key ?? `row-${rowIndex}`} className={rowIndex === 0 ? "bg-stone/5" : undefined}>
                  {(row.cells ?? []).map((cell, cellIndex) => {
                    const content = typeof cell === "string" ? cell : String(cell ?? "");
                    const CellTag = rowIndex === 0 ? "th" : "td";

                    return (
                      <CellTag key={`cell-${rowIndex}-${cellIndex}`} className="border border-stone/20 p-3 text-left align-top">
                        {content}
                      </CellTag>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
    richTable: ({ value }: { value: RichTableValue }) => {
      const rows = value?.rows ?? [];

      if (!rows.length) return null;

      return (
        <div className="my-8 overflow-x-auto">
          <table className="w-full border border-stone/20 border-collapse">
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={row._key ?? `rich-row-${rowIndex}`} className={rowIndex === 0 ? "bg-stone/5" : undefined}>
                  {(row.cells ?? []).map((cell, cellIndex) => {
                    const CellTag = rowIndex === 0 ? "th" : "td";
                    const cellValue = Array.isArray(cell?.content) ? cell.content : [];

                    return (
                      <CellTag key={cell._key ?? `rich-cell-${rowIndex}-${cellIndex}`} className="border border-stone/20 p-3 text-left align-top">
                        <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-0 prose-p:text-richblack/85 dark:prose-p:text-cream/85">
                          <PortableText value={cellValue as PortableTextBlock[]} components={tableCellPortableTextComponents} />
                        </div>
                      </CellTag>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
    priceChart: ({ value }: { value: PriceChartValue }) => {
      const currencySymbol = value?.currency ?? "€";
      const rows = (value?.rows ?? value?.items ?? value?.bars ?? [])
        .map((row) => {
          const min = parseAmount(row.min);
          const max = parseAmount(row.max);

          return {
            ...row,
            min: Math.min(min, max),
            max: Math.max(min, max),
          };
        })
        .filter((row) => row.max > 0);

      if (!rows.length) return null;

      const maxValue = Math.max(...rows.map((row) => row.max), 1);
      const timelineLabel = locale === "de" ? "Zeitrahmen" : "Timeline";

      return (
        <section className="my-10 rounded-2xl border border-stone/20 bg-gradient-to-br from-stone/5 to-transparent p-5 md:p-7">
          {value?.title ? <h3 className="font-heading text-xl text-richblack dark:text-cream">{value.title}</h3> : null}
          {value?.subtitle ? <p className="mt-2 text-sm text-richblack/60 dark:text-cream/60">{value.subtitle}</p> : null}

          <div className="mt-6 space-y-5">
            {rows.map((row, index) => {
              const start = (row.min / maxValue) * 100;
              const width = ((row.max - row.min) / maxValue) * 100;
              const barLabel = row.label ?? row.title ?? row.name ?? `Option ${index + 1}`;

              return (
                <div key={row._key ?? `price-row-${index}`} className="space-y-2">
                  <div className="flex items-end justify-between gap-4">
                    <p className="text-sm font-medium text-richblack dark:text-cream">{barLabel}</p>
                    <p className="text-xs text-richblack/60 dark:text-cream/60">
                      {formatCurrency(row.min, currencySymbol)} - {formatCurrency(row.max, currencySymbol)}
                    </p>
                  </div>

                  <div className="relative h-3 w-full overflow-hidden rounded-full bg-stone/10">
                    <div
                      className="absolute inset-y-0 rounded-full bg-terracotta"
                      style={{ left: `${start}%`, width: `${Math.max(width, 3)}%` }}
                    />
                  </div>

                  <p className="text-xs text-richblack/50 dark:text-cream/55">
                    <span className="font-medium text-richblack/70 dark:text-cream/70">{timelineLabel}:</span>{" "}
                    {row.timeline ?? (locale === "de" ? "Individuell" : "Custom")}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      );
    },
  },
});

const postBySlugQuery = groq`
  *[_type == "blogPost" && select($locale == "de" => slug_de.current == $slug, slug_en.current == $slug)][0] {
    _id,
    "title": select($locale == "de" => coalesce(title_de, title_en), coalesce(title_en, title_de)),
    "slug_en": slug_en.current,
    "slug_de": slug_de.current,
    "mainImage": select($locale == "de" => mainImage_de, mainImage_en),
    "imageAlt": coalesce(select($locale == "de" => mainImage_de.alt, mainImage_en.alt), title_en, title_de, "Blog post image"),
    "body": select($locale == "de" => body_de, body_en)
  }
`;

const blogSlugsQuery = groq`
  *[_type == "blogPost"] {
    "slug_en": slug_en.current,
    "slug_de": slug_de.current
  }
`;

export async function generateStaticParams(): Promise<Array<{ locale: "en" | "de"; slug: string }>> {
  const rows = await client.fetch<BlogSlugRow[]>(blogSlugsQuery);

  const params = new Map<string, { locale: "en" | "de"; slug: string }>();

  for (const row of rows) {
    if (row.slug_en) {
      params.set(`en:${row.slug_en}`, { locale: "en", slug: row.slug_en });
    }
    if (row.slug_de) {
      params.set(`de:${row.slug_de}`, { locale: "de", slug: row.slug_de });
    }
  }

  return Array.from(params.values());
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await client.fetch<SanityBlogPost | null>(postBySlugQuery, { slug, locale });

  if (!post) {
    return {
      title: "Post Not Found | XCLER",
      alternates: {
        canonical: getCanonicalPath(locale, `/blog/${slug}`),
        languages: getLanguageAlternates(`/blog/${slug}`),
      },
    };
  }

  return {
    title: `${post.title} | XCLER`,
    alternates: {
      canonical: getCanonicalPath(locale, `/blog/${locale === "de" ? post.slug_de ?? slug : post.slug_en ?? slug}`),
      languages: getLanguageAlternates(`/blog/${slug}`, {
        enPath: `/blog/${post.slug_en ?? slug}`,
        dePath: `/blog/${post.slug_de ?? slug}`,
      }),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPage" });
  const portableTextComponents = createPortableTextComponents(locale);

  const post = await client.fetch<SanityBlogPost | null>(postBySlugQuery, { slug, locale });
  if (!post) {
    notFound();
  }

  return (
    <section className="section-padding pt-32">
      <article className="container-custom max-w-3xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-richblack/40 dark:text-cream/40 transition-colors hover:text-terracotta"
        >
          <span aria-hidden="true">←</span>
          <span>{t("backToBlog")}</span>
        </Link>

        {post.mainImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={urlFor(post.mainImage).width(1400).height(780).fit("crop").quality(82).url()}
            alt={post.imageAlt}
            className="mb-10 h-auto w-full rounded-2xl border border-stone/10 dark:border-stone-dark/20 object-cover"
          />
        ) : null}

        <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          {post.title}
        </h1>

        <div className="prose prose-lg mt-10 max-w-none dark:prose-invert prose-headings:font-heading prose-headings:text-richblack dark:prose-headings:text-white prose-p:text-richblack/70 dark:prose-p:text-cream/70 prose-a:text-terracotta hover:prose-a:text-terracotta-light">
          <PortableText value={post.body as PortableTextBlock[]} components={portableTextComponents} />
        </div>
      </article>
    </section>
  );
}