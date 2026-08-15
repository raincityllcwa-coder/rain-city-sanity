import {defineField, defineType} from 'sanity'

// Homepage hero texts. Single document with id copy.home.
export default defineType({
  name: 'homeCopy',
  title: 'Homepage Texts',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({name: 'heroTitle', title: 'Hero H1', type: 'string'}),
    defineField({name: 'heroSubtitle', title: 'Hero subtitle', type: 'text', rows: 2}),
    defineField({name: 'heroSubtitleExtra', title: 'Hero subtitle, desktop-only sentence', type: 'text', rows: 2}),
  ],
  preview: {prepare: () => ({title: 'Homepage Texts'})},
})
