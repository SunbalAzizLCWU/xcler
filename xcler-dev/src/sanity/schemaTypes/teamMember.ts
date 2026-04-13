import {defineField, defineType} from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().min(2),
      description: 'Full name used for profile and authorship.'
    }),
    defineField({
      name: 'role_en',
      title: 'Role (English)',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Professional role title for English content.'
    }),
    defineField({
      name: 'role_de',
      title: 'Role (German)',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Professional role title for German content.'
    }),
    defineField({
      name: 'bio_en',
      title: 'Bio (English)',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required().min(40),
      description: 'Executive-style bio for English pages.'
    }),
    defineField({
      name: 'bio_de',
      title: 'Bio (German)',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required().min(40),
      description: 'Executive-style bio for German pages.'
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
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
      validation: (rule) => rule.required(),
      description: 'High-quality portrait image.'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role_en',
      media: 'image'
    }
  }
})
