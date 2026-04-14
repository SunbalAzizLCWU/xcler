import {defineArrayMember, defineField, defineType} from 'sanity'

export const priceChart = defineType({
  name: 'priceChart',
  title: 'Price Chart',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string'
    }),
    defineField({
      name: 'currency',
      title: 'Currency Symbol',
      type: 'string',
      initialValue: '€',
      validation: (rule) => rule.required().max(3)
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required()
            }),
            defineField({
              name: 'min',
              title: 'Min Cost',
              type: 'number',
              validation: (rule) => rule.required().min(0)
            }),
            defineField({
              name: 'max',
              title: 'Max Cost',
              type: 'number',
              validation: (rule) => rule.required().min(0)
            }),
            defineField({
              name: 'timeline',
              title: 'Timeline',
              type: 'string',
              validation: (rule) => rule.required()
            })
          ],
          preview: {
            select: {
              title: 'label',
              min: 'min',
              max: 'max',
              timeline: 'timeline'
            },
            prepare({title, min, max, timeline}) {
              const safeTitle = title || 'Pricing row'
              return {
                title: safeTitle,
                subtitle: `${min ?? 0} - ${max ?? 0} | ${timeline || 'Timeline missing'}`
              }
            }
          }
        })
      ],
      validation: (rule) => rule.required().min(1)
    })
  ],
  preview: {
    select: {
      title: 'title',
      rowCount: 'rows'
    },
    prepare({title, rowCount}) {
      return {
        title: title || 'Price Chart',
        subtitle: `${Array.isArray(rowCount) ? rowCount.length : 0} rows`
      }
    }
  }
})