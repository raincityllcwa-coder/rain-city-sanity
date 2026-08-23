import {defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showOn',
      title: 'Show on pages (old)',
      type: 'array',
      of: [{type: 'string'}],
      deprecated: {reason: 'Questions are now picked on each page (Blocks tab, FAQ).'},
      readOnly: true,
      hidden: ({value}) => value === undefined,
      options: {
        list: [
          {title: 'Kitchen Cabinets', value: 'kitchen-cabinets'},
          {title: 'Kitchen Countertops', value: 'kitchen-countertops'},
          {title: 'Bathroom Remodel', value: 'bathroom-remodel'},
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Sort order (old)',
      type: 'number',
      deprecated: {reason: 'Order is now set by dragging questions on each page.'},
      readOnly: true,
      hidden: ({value}) => value === undefined,
      initialValue: 0,
    }),
  ],
  orderings: [
    {title: 'Sort Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'answer',
    },
  },
})
