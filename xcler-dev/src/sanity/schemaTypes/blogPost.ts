import {defineField, defineType} from 'sanity'

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
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (rule) => rule.required(),
      description: 'Used for SEO, sorting, and BlogPosting structured data.'
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      description: 'Update this when content is significantly modified (helps SEO freshness signals).'
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
      name: 'excerpt',
      title: 'SEO Description',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English Description',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.required().min(50).max(160)
        }),
        defineField({
          name: 'de',
          title: 'German Description',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.required().min(50).max(160)
        })
      ],
      description: 'Localized meta description used for search snippets (recommended <= 160 chars).'
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      validation: (rule) => rule.min(1).max(60),
      description: 'Estimated reading time shown to users and usable in structured data. Can be auto-calculated from Portable Text later.'
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      description: 'Add relevant keywords/topics for internal linking and SEO clustering.'
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'SEO Title',
          type: 'object',
          fields: [
            defineField({
              name: 'en',
              title: 'English SEO Title',
              type: 'string',
              validation: (rule) => rule.max(70)
            }),
            defineField({
              name: 'de',
              title: 'German SEO Title',
              type: 'string',
              validation: (rule) => rule.max(70)
            })
          ]
        }),
        defineField({
          name: 'description',
          title: 'SEO Description Override',
          type: 'object',
          fields: [
            defineField({
              name: 'en',
              title: 'English SEO Description',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required().min(50).max(160)
            }),
            defineField({
              name: 'de',
              title: 'German SEO Description',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required().min(50).max(160)
            })
          ]
        }),
        defineField({
          name: 'image',
          title: 'SEO Image',
          type: 'image',
          options: {hotspot: true},
          validation: (rule) =>
            rule.custom((image) => {
              if (!image) return true
              return true
            }),
          description: 'Recommended size: 1200x630 (Open Graph standard). Used for social previews.',
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string'
            })
          ]
        })
      ],
      description: 'Optional overrides for search engines and social link previews.'
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
            },
            defineField({
              name: 'link',
              title: 'Optional Link URL',
              type: 'url',
              validation: (rule) => rule.uri({scheme: ['http', 'https']}),
              description: 'Optional external URL. If set, the image becomes clickable in the blog content.'
            })
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
            },
            defineField({
              name: 'link',
              title: 'Optional Link URL',
              type: 'url',
              validation: (rule) => rule.uri({scheme: ['http', 'https']}),
              description: 'Optional external URL. If set, the image becomes clickable in the blog content.'
            })
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
      title: 'title_de',
      subtitle: 'slug_de.current',
      media: 'mainImage_de'
    }
  }
})
