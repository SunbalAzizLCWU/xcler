import {defineField, defineType} from 'sanity'
import type {PreviewValue} from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title_en',
      title: 'Title (English)',
      type: 'string',
      validation: (rule) => rule.required().min(10),
      description: 'SEO-ready English title.'
    }),
    defineField({
      name: 'title_de',
      title: 'Title (German)',
      type: 'string',
      validation: (rule) => rule.required().min(10),
      description: 'SEO-ready German title.'
    }),
    defineField({
      name: 'slug_en',
      title: 'English Slug',
      type: 'slug',
      options: {
        source: 'title_en',
        maxLength: 96
      },
      validation: (rule) =>
        rule
          .custom((value, context) => {
            const document = context.document as {title_en?: string} | undefined
            if (document?.title_en && !value?.current) {
              return 'Add an English slug when English title is set.'
            }
            return true
          })
          .warning(),
      description: 'URL slug used for English locale routes.'
    }),
    defineField({
      name: 'slug_de',
      title: 'German Slug',
      type: 'slug',
      options: {
        source: 'title_de',
        maxLength: 96
      },
      validation: (rule) =>
        rule
          .custom((value, context) => {
            const document = context.document as {title_de?: string} | undefined
            if (document?.title_de && !value?.current) {
              return 'Add a German slug when German title is set.'
            }
            return true
          })
          .warning(),
      description: 'URL slug used for German locale routes.'
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'teamMember'}],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'mainImage_en',
      title: 'Main Image (English)',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required()
        })
      ],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'mainImage_de',
      title: 'Main Image (German)',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required()
        })
      ],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'body_en',
      title: 'Body (English)',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              validation: (rule) => rule.required(),
              description: 'Critical for SEO and accessibility. Describe what is in the image.'
            }
          ]
        },
        {type: 'richTable'},
        {type: 'table'},
        {type: 'priceChart'}
      ],
      validation: (rule) => rule.required().min(1),
      description: 'Portable Text content for English locale.'
    }),
    defineField({
      name: 'body_de',
      title: 'Body (German)',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              validation: (rule) => rule.required(),
              description: 'Critical for SEO and accessibility. Describe what is in the image.'
            }
          ]
        },
        {type: 'richTable'},
        {type: 'table'},
        {type: 'priceChart'}
      ],
      validation: (rule) => rule.required().min(1),
      description: 'Portable Text content for German locale.'
    })
  ],
  preview: {
    select: {
      title_en: 'title_en',
      title_de: 'title_de',
      legacy_title: 'title',
      slug_en: 'slug_en.current',
      slug_de: 'slug_de.current',
      slug_legacy: 'slug.current',
      media_en: 'mainImage_en',
      media_de: 'mainImage_de',
      legacy_media: 'mainImage'
    },
    prepare(selection: unknown) {
      const safeSelection = selection && typeof selection === 'object' ? selection : {}
      const {title_en, title_de, legacy_title, slug_en, slug_de, slug_legacy, media_en, media_de, legacy_media} = safeSelection as {
        title_en?: unknown
        title_de?: unknown
        legacy_title?: unknown
        slug_en?: unknown
        slug_de?: unknown
        slug_legacy?: unknown
        media_en?: unknown
        media_de?: unknown
        legacy_media?: unknown
      }

      const title = [title_en, title_de, legacy_title].find(
        (value): value is string => typeof value === 'string' && value.trim().length > 0
      ) || 'Untitled Post'

      const subtitle = [slug_en, slug_de, slug_legacy].find(
        (value): value is string => typeof value === 'string' && value.trim().length > 0
      ) || 'No slug defined'
      const media = (media_en || media_de || legacy_media) as PreviewValue['media']

      return {
        title,
        subtitle,
        media
      }
    }
  }
})
