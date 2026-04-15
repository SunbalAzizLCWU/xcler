import {defineArrayMember, defineField, defineType} from 'sanity'

type PortableTextChild = {
  text?: string
}

type PortableTextBlock = {
  children?: PortableTextChild[]
}

const richCellBlock = defineArrayMember({
  type: 'block',
  styles: [{title: 'Normal', value: 'normal'}],
  lists: [],
  marks: {
    decorators: [
      {title: 'Bold', value: 'strong'},
      {title: 'Italic', value: 'em'},
      {title: 'Underline', value: 'underline'},
      {title: 'Highlight', value: 'highlight'}
    ],
    annotations: []
  }
})

export const richTable = defineType({
  name: 'richTable',
  title: 'Table (Rich Text)',
  type: 'object',
  fields: [
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  title: 'Cell',
                  fields: [
                    defineField({
                      name: 'content',
                      title: 'Content',
                      type: 'array',
                      of: [richCellBlock],
                      validation: (rule) => rule.required().min(1)
                    })
                  ],
                  preview: {
                    select: {
                      content: 'content'
                    },
                    prepare({content}) {
                      const blocks = Array.isArray(content) ? content : []
                      const text = blocks
                        .flatMap((block) => {
                          const typedBlock = block as PortableTextBlock
                          return Array.isArray(typedBlock?.children) ? typedBlock.children : []
                        })
                        .map((child) => {
                          const typedChild = child as PortableTextChild
                          return typedChild?.text ?? ''
                        })
                        .join('')
                        .trim()

                      return {
                        title: text || 'Empty cell'
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
              cells: 'cells'
            },
            prepare({cells}) {
              return {
                title: `Row (${Array.isArray(cells) ? cells.length : 0} cells)`
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
      rows: 'rows'
    },
    prepare({rows}) {
      return {
        title: 'Table (Rich Text)',
        subtitle: `${Array.isArray(rows) ? rows.length : 0} rows`
      }
    }
  }
})