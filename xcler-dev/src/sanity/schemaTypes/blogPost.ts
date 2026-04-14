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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title_en',
        maxLength: 96
      },
      validation: (rule) => rule.required(),
      description: 'URL slug used in locale routes.'
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
      title: 'title_en',
      subtitle: 'slug.current',
      media: 'mainImage_en'
    }
  }
})
