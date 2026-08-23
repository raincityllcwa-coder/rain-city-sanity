import {defineField, defineType} from 'sanity'
import {DocumentsIcon} from '@sanity/icons'
import {seoFields} from './shared'

// Overview pages that list other content: Our Services (hub-services) and
// Our Projects (hub-projects). Fixed documents, created by the migration.
export default defineType({
  name: 'hubPage',
  title: 'Overview page',
  type: 'document',
  icon: DocumentsIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'hubKey', title: 'Page', type: 'string', readOnly: true, group: 'content'}),
    defineField({name: 'title', title: 'Headline (H1)', type: 'string', group: 'content'}),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'text', rows: 3, group: 'content'}),
    ...seoFields('seo'),
  ],
  preview: {select: {key: 'hubKey', subtitle: 'title'}, prepare: ({key, subtitle}) => ({title: key === 'our-projects' ? 'Our Projects' : 'Our Services', subtitle})},
})
