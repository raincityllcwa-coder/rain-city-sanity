import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Review Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),

    // ── Review Photo (URL or upload) ──
    defineField({
      name: 'photoUrl',
      title: 'Photo — paste URL',
      type: 'url',
      description: 'Link to work photo (e.g. from Google review)',
    }),
    defineField({
      name: 'photoUpload',
      title: 'Photo — or upload image',
      type: 'image',
      options: {hotspot: true},
    }),

    // ── Author Avatar (URL or upload) ──
    defineField({
      name: 'avatarUrl',
      title: 'Avatar — paste URL',
      type: 'url',
      description: 'Link to reviewer avatar. Leave empty for initials.',
    }),
    defineField({
      name: 'avatarUpload',
      title: 'Avatar — or upload image',
      type: 'image',
      options: {hotspot: true},
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
      initialValue: 0,
    }),
  ],
  orderings: [
    {title: 'Sort Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'text',
      media: 'photoUpload',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: (subtitle || '').slice(0, 60) + '...',
        media,
      }
    },
  },
})
