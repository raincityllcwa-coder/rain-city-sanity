import {defineField, defineType} from 'sanity'

// Meta title/description overrides for the existing static pages.
// One document per page, created with fixed ids (meta.home, meta.about, ...).
// Do not create new documents of this type; edit the existing eight.
export default defineType({
  name: 'pageMeta',
  title: 'Page Meta (SEO)',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({name: 'pageKey', title: 'Page', type: 'string', readOnly: true}),
    defineField({name: 'metaTitle', title: 'Meta title', type: 'string', description: 'Aim for under 60 characters'}),
    defineField({name: 'metaDescription', title: 'Meta description', type: 'text', rows: 3, description: 'Aim for 140-155 characters'}),
  ],
  preview: {select: {title: 'pageKey', subtitle: 'metaTitle'}},
})
