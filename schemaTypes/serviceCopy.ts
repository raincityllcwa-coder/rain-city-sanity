import {defineField, defineType} from 'sanity'

// Unique copy of the three service pages. Fixed ids:
// service.kitchen-cabinets, service.kitchen-countertops, service.bathroom-remodel.
export default defineType({
  name: 'serviceCopy',
  title: 'Service Page Texts',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({name: 'serviceKey', title: 'Page', type: 'string', readOnly: true}),
    defineField({name: 'heroTitle', title: 'Hero H1', type: 'string'}),
    defineField({name: 'heroSubtitle', title: 'Hero subtitle', type: 'text', rows: 2}),
    defineField({name: 'contentTitle', title: 'Content section heading', type: 'string'}),
    defineField({name: 'contentParagraphs', title: 'Content section paragraphs', type: 'array', of: [{type: 'text', rows: 4}]}),
  ],
  preview: {select: {title: 'serviceKey', subtitle: 'heroTitle'}},
})
