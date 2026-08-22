import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'
import {pageLabel} from './labels'

// Unique copy of the three service pages. Fixed ids:
// service.kitchen-cabinets, service.kitchen-countertops, service.bathroom-remodel.
export default defineType({
  name: 'serviceCopy',
  title: 'Service page: texts and photos',
  type: 'document',
  icon: TextIcon,
  fields: [
    defineField({name: 'serviceKey', title: 'Page', type: 'string', readOnly: true}),
    defineField({name: 'heroTitle', title: 'Headline (H1)', type: 'string'}),
    defineField({name: 'heroSubtitle', title: 'Subtitle', type: 'text', rows: 2}),
    defineField({name: 'contentTitle', title: 'Content section heading', type: 'string'}),
    defineField({name: 'contentParagraphs', title: 'Content section paragraphs', type: 'array', of: [{type: 'text', rows: 4}]}),
    defineField({
      name: 'heroImage', title: 'Background photo behind the headline', type: 'image', options: {hotspot: true},
      description: 'Large photo behind the page title. Landscape, 1600px wide or more.',
      fields: [defineField({name: 'alt', title: 'Alt Text (SEO)', type: 'string'})],
    }),
    defineField({
      name: 'cardImage', title: 'Photo on the Our Services page card', type: 'image', options: {hotspot: true},
      description: 'Optional. If empty, the hero photo is used there.',
      fields: [defineField({name: 'alt', title: 'Alt Text (SEO)', type: 'string'})],
    }),
    defineField({
      name: 'sliderPhotos', title: 'Content section slider photos', type: 'array',
      description: 'Auto-rotating photos next to the content text. Order here = order on the page. Drop several files to add at once, hover a photo for the menu to remove it, click a photo to set its alt text.',
      options: {layout: 'grid'},
      of: [{type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Alt Text (SEO)', type: 'string'})]}],
    }),
  ],
  preview: {
    select: {key: 'serviceKey', subtitle: 'heroTitle'},
    prepare: ({key, subtitle}) => ({title: pageLabel(key), subtitle}),
  },
})
