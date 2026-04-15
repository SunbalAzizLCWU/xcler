export const BLOG_TITLE_BY_LOCALE = `coalesce(
  select($locale == "de" => title_de, title_en),
  select($locale == "de" => title_en, title_de),
  title,
  "Untitled"
)`

export const BLOG_SLUG_BY_LOCALE = `coalesce(
  select($locale == "de" => slug_de.current, slug_en.current),
  select($locale == "de" => slug_en.current, slug_de.current),
  slug.current
)`

export const BLOG_IMAGE_BY_LOCALE = `coalesce(
  select($locale == "de" => mainImage_de, mainImage_en),
  select($locale == "de" => mainImage_en, mainImage_de),
  mainImage
)`

export const BLOG_IMAGE_ALT_BY_LOCALE = `coalesce(
  select($locale == "de" => mainImage_de.alt, mainImage_en.alt),
  select($locale == "de" => mainImage_en.alt, mainImage_de.alt),
  mainImage.alt,
  title_de,
  title_en,
  title,
  "Blog post image"
)`

export const BLOG_BODY_BY_LOCALE = `coalesce(
  select($locale == "de" => body_de, body_en),
  select($locale == "de" => body_en, body_de),
  body,
  []
)`

export const BLOG_MATCH_BY_ANY_SLUG = `($slug in [slug.current, slug_en.current, slug_de.current])`
