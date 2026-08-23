import {defineField, defineType} from 'sanity'
import {SearchIcon} from '@sanity/icons'

// Meta title/description overrides for the existing static pages.
// One document per page, created with fixed ids (meta.home, meta.about, ...).
// Do not create new documents of this type; edit the existing eight.
export default defineType({
  name: 'pageMeta',
  title: 'SEO: title and description',
  type: 'document',
  icon: SearchIcon,
  fields: [
    defineField({name: 'pageKey', title: 'Page', type: 'string', readOnly: true}),
    defineField({name: 'metaTitle', title: 'Meta title', type: 'string', description: 'Browser tab and Google result title. Aim for under 60 characters.'}),
    defineField({name: 'metaDescription', title: 'Meta description', type: 'text', rows: 3, description: 'Google snippet. Aim for 140 to 155 characters.'}),
  ],
  preview: {
    select: {key: 'pageKey', subtitle: 'metaTitle'},
    prepare: ({key, subtitle}) => ({title: `${key}: SEO (old)`, subtitle}),
  },
})
