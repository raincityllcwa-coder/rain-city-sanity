import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'
import {seoFields} from './shared'

// The /contact page. One document (id contactPage). Phone, address and
// hours come from Site Settings.
export default defineType({
  name: 'contactPage',
  title: 'Contact',
  type: 'document',
  icon: EnvelopeIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'title', title: 'Headline (H1)', type: 'string', group: 'content'}),
    defineField({name: 'intro', title: 'Intro line', type: 'text', rows: 2, group: 'content'}),
    ...seoFields('seo'),
  ],
  preview: {prepare: () => ({title: 'Contact'})},
})
