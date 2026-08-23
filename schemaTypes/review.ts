import {defineField, defineType} from 'sanity'
import {StarIcon} from '@sanity/icons'

export default defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  icon: StarIcon,
  groups: [
    {name: 'content', title: 'Review', default: true},
    {name: 'placement', title: 'Where it shows'},
  ],
  fieldsets: [
    {name: 'legacy', title: 'Photo links (old way, leave empty)', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    defineField({
      name: 'author',
      title: 'Author name',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Review text',
      type: 'text',
      rows: 4,
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photoUpload',
      title: 'Photo of the work',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
    }),
    defineField({
      name: 'avatarUpload',
      title: 'Reviewer avatar',
      type: 'image',
      group: 'content',
      description: 'Leave empty to show initials.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'photoUrl',
      title: 'Photo URL',
      type: 'url',
      group: 'content',
      fieldset: 'legacy',
      description: 'Older way of adding a photo. Upload the photo above instead.',
    }),
    defineField({
      name: 'avatarUrl',
      title: 'Avatar URL',
      type: 'url',
      group: 'content',
      fieldset: 'legacy',
      description: 'Older way of adding an avatar. Upload the avatar above instead.',
    }),
    defineField({
      name: 'services',
      title: 'Service pages',
      type: 'array',
      group: 'placement',
      description: 'The service pages this review appears on.',
      of: [{type: 'reference', to: [{type: 'servicePage'}]}],
    }),
    defineField({
      name: 'showOnHomepage',
      title: 'Show on the homepage',
      type: 'boolean',
      group: 'placement',
      initialValue: false,
    }),
    defineField({
      name: 'showOn',
      title: 'Show on pages (old)',
      type: 'array',
      group: 'placement',
      of: [{type: 'string'}],
      deprecated: {reason: 'Replaced by Service pages and Show on the homepage above.'},
      readOnly: true,
      hidden: ({value}) => value === undefined,
      options: {
        list: [
          {title: 'Homepage', value: 'homepage'},
          {title: 'Kitchen Cabinets', value: 'kitchen-cabinets'},
          {title: 'Kitchen Countertops', value: 'kitchen-countertops'},
          {title: 'Bathroom Remodel', value: 'bathroom-remodel'},
        ],
      },
    }),
    defineField({
      name: 'city',
      title: 'City (optional)',
      type: 'string',
      group: 'placement',
      description: 'Example: Kirkland. City pages show reviews from their own city first.',
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      group: 'placement',
      initialValue: 0,
      description: 'Lower numbers show first.',
    }),
  ],
  orderings: [
    {title: 'Sort order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {
      title: 'author',
      text: 'text',
      city: 'city',
      home: 'showOnHomepage',
      s0: 'services.0.cardTitle',
      s1: 'services.1.cardTitle',
      s2: 'services.2.cardTitle',
      avatar: 'avatarUpload',
      photo: 'photoUpload',
    },
    prepare({title, text, city, home, s0, s1, s2, avatar, photo}) {
      const where = [city, home ? 'Homepage' : null, s0, s1, s2].filter(Boolean).join(' · ')
      return {
        title,
        subtitle: where || (text || '').slice(0, 60),
        media: avatar || photo,
      }
    },
  },
})
