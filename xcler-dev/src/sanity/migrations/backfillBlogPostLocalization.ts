import {createClient} from '@sanity/client'
import {apiVersion, dataset, projectId} from '../env'

type LegacySlug = {
  current?: string
}

type LegacyImage = {
  alt?: string
  [key: string]: unknown
}

type BlogPostMigrationRow = {
  _id: string
  title?: string
  title_en?: string
  title_de?: string
  slug?: LegacySlug
  slug_en?: LegacySlug
  slug_de?: LegacySlug
  mainImage?: LegacyImage
  mainImage_en?: LegacyImage
  mainImage_de?: LegacyImage
  body?: unknown[]
  body_en?: unknown[]
  body_de?: unknown[]
}

const migrationClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false
})

const blogPostsQuery = `
  *[_type == "blogPost"]{
    _id,
    title,
    title_en,
    title_de,
    slug,
    slug_en,
    slug_de,
    mainImage,
    mainImage_en,
    mainImage_de,
    body,
    body_en,
    body_de
  }
`

async function migrate() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    throw new Error('Missing SANITY_API_WRITE_TOKEN environment variable')
  }

  const posts = await migrationClient.fetch<BlogPostMigrationRow[]>(blogPostsQuery)

  let migratedCount = 0
  for (const post of posts) {
    const legacyTitle = post.title?.trim()
    const legacySlug = post.slug?.current?.trim()
    const legacyBody = Array.isArray(post.body) ? post.body : undefined
    const legacyImage = post.mainImage

    const nextTitleEn = post.title_en?.trim() || legacyTitle
    const nextTitleDe = post.title_de?.trim() || legacyTitle
    const nextSlugEn = post.slug_en?.current?.trim() || legacySlug
    const nextSlugDe = post.slug_de?.current?.trim() || legacySlug
    const nextBodyEn = Array.isArray(post.body_en) ? post.body_en : legacyBody
    const nextBodyDe = Array.isArray(post.body_de) ? post.body_de : legacyBody
    const nextImageEn = post.mainImage_en || legacyImage
    const nextImageDe = post.mainImage_de || legacyImage

    const hasUpdates =
      (nextTitleEn && nextTitleEn !== post.title_en) ||
      (nextTitleDe && nextTitleDe !== post.title_de) ||
      (nextSlugEn && nextSlugEn !== post.slug_en?.current) ||
      (nextSlugDe && nextSlugDe !== post.slug_de?.current) ||
      (!post.body_en && nextBodyEn) ||
      (!post.body_de && nextBodyDe) ||
      (!post.mainImage_en && nextImageEn) ||
      (!post.mainImage_de && nextImageDe)

    if (!hasUpdates) {
      continue
    }

    const updates: Record<string, unknown> = {}

    if (nextTitleEn && !post.title_en) updates.title_en = nextTitleEn
    if (nextTitleDe && !post.title_de) updates.title_de = nextTitleDe
    if (nextSlugEn && !post.slug_en?.current) updates.slug_en = {current: nextSlugEn}
    if (nextSlugDe && !post.slug_de?.current) updates.slug_de = {current: nextSlugDe}
    if (nextBodyEn && !post.body_en) updates.body_en = nextBodyEn
    if (nextBodyDe && !post.body_de) updates.body_de = nextBodyDe
    if (nextImageEn && !post.mainImage_en) updates.mainImage_en = nextImageEn
    if (nextImageDe && !post.mainImage_de) updates.mainImage_de = nextImageDe

    if (Object.keys(updates).length === 0) {
      continue
    }

    await migrationClient.patch(post._id).set(updates).commit()
    migratedCount += 1
  }

  console.log(`Backfilled localized fields for ${migratedCount} blog post(s).`)
}

migrate().catch((error: unknown) => {
  console.error('Blog localization migration failed:', error)
  process.exitCode = 1
})
