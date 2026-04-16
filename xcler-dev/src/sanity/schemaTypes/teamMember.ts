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
      name: 'speciality_en',
      title: 'Speciality (English)',
      type: 'string',
      validation: (rule) => rule.required().min(2),
      description: 'Main expertise line shown under role on English pages.'
    }),
    defineField({
      name: 'speciality_de',
      title: 'Spezialisierung (Deutsch)',
      type: 'string',
      validation: (rule) => rule.required().min(2),
      description: 'Expertise-Zeile unter der Rolle auf deutschen Seiten.'
    }),
    defineField({
      name: 'technologies_en',
      title: 'Technologies (English)',
      type: 'string',
      validation: (rule) => rule.required().min(2),
      description: 'Comma-separated stack, e.g. Next.js, TypeScript, FastAPI'
    }),
    defineField({
      name: 'technologies_de',
      title: 'Technologien (Deutsch)',
      type: 'string',
      validation: (rule) => rule.required().min(2),
      description: 'Kommagetrennter Stack, z. B. Next.js, TypeScript, FastAPI'
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
      description: 'High-quality portrait image. Use hotspot/crop to control face framing.'
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Alignment',
      type: 'string',
      initialValue: 'center',
      options: {
        list: [
          {title: 'Center', value: 'center'},
          {title: 'Top', value: 'top'},
          {title: 'Bottom', value: 'bottom'},
          {title: 'Top Left', value: 'top-left'},
          {title: 'Top Right', value: 'top-right'}
        ],
        layout: 'radio'
      },
      description: 'Controls how the profile image sits in the card frame.'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role_de',
      media: 'image'
    }
  }
})
