import {defineField, defineType} from 'sanity'

export const pricingPlan = defineType({
  name: 'pricingPlan',
  title: 'Pricing Plan',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Plan Name',
      type: 'string',
      validation: (rule) => rule.required().min(2),
      description: 'Plan label shown in pricing tables.'
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().positive(),
      description: 'Numeric base price. Currency symbol is stored separately.'
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: '€',
      validation: (rule) => rule.required(),
      description: 'Default currency symbol for display.'
    }),
    defineField({
      name: 'features_en',
      title: 'Features (English)',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required().min(1),
      description: 'Feature bullets for English pricing cards.'
    }),
    defineField({
      name: 'features_de',
      title: 'Features (German)',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required().min(1),
      description: 'Feature bullets for German pricing cards.'
    })
  ],
  preview: {
    select: {
      title: 'name',
      price: 'price',
      currency: 'currency'
    },
    prepare(selection) {
      const {title, price, currency} = selection
      return {
        title,
        subtitle: `${currency ?? '€'}${price ?? ''}`
      }
    }
  }
})
