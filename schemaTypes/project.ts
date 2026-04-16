import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery (additional photos)',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'showOn',
      title: 'Show on pages',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: '🏠 Homepage', value: 'homepage'},
          {title: '🍳 Kitchen Cabinets', value: 'kitchen-cabinets'},
          {title: '🪨 Kitchen Countertops', value: 'kitchen-countertops'},
          {title: '🛁 Bathroom Remodel', value: 'bathroom-remodel'},
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower = appears first',
      initialValue: 0,
    }),
  ],
  orderings: [
    {title: 'Sort Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      pages: 'showOn',
    },
    prepare({title, media, pages}) {
      return {
        title,
        subtitle: (pages || []).join(', '),
        media,
      }
    },
  },
})
