import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

// Homepage hero texts. Single document with id copy.home.
export default defineType({
  name: 'homeCopy',
  title: 'Home: hero',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({name: 'heroTitle', title: 'Headline (H1)', type: 'string'}),
    defineField({name: 'heroSubtitle', title: 'Subtitle', type: 'text', rows: 2}),
    defineField({name: 'heroSubtitleExtra', title: 'Subtitle: extra sentence shown on desktop only', type: 'text', rows: 2}),
    defineField({
      name: 'heroImage', title: 'Background photo', type: 'image', options: {hotspot: true},
      description: 'Large photo behind the homepage headline. Landscape, 2000px wide or more.',
      fields: [defineField({name: 'alt', title: 'Alt Text (SEO)', type: 'string'})],
    }),
  ],
  preview: {prepare: () => ({title: 'Home: hero'})},
})
