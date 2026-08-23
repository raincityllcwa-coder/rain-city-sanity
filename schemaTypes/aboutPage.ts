import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'
import {imageField, seoFields} from './shared'

// The /about page. One document (id aboutPage). Three blocks, each a photo
// and a text. The license number comes from Site Settings.
export default defineType({
  name: 'aboutPage',
  title: 'About',
  type: 'document',
  icon: UsersIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'title', title: 'Headline (H1)', type: 'string', group: 'content'}),
    imageField('introPhoto', 'Block 1: photo', 'content'),
    defineField({name: 'introParagraph1', title: 'Block 1: paragraph 1', type: 'text', rows: 6, group: 'content'}),
    defineField({name: 'introParagraph2', title: 'Block 1: paragraph 2', type: 'text', rows: 5, group: 'content'}),
    imageField('gcPhoto', 'Block 2: photo', 'content'),
    defineField({name: 'gcHeading', title: 'Block 2: heading', type: 'string', group: 'content'}),
    defineField({name: 'gcParagraph1', title: 'Block 2: paragraph 1', type: 'text', rows: 4, group: 'content'}),
    defineField({name: 'gcParagraph2', title: 'Block 2: paragraph 2', type: 'text', rows: 4, group: 'content'}),
    defineField({name: 'licenseLabel', title: 'Block 2: license line label', type: 'string', group: 'content', description: 'The number itself is in Site Settings.'}),
    imageField('emotionsPhoto', 'Block 3: photo', 'content'),
    defineField({name: 'emotionsHeading', title: 'Block 3: heading', type: 'string', group: 'content'}),
    defineField({name: 'emotionsParagraph', title: 'Block 3: paragraph', type: 'text', rows: 4, group: 'content'}),
    defineField({name: 'videoButtonLabel', title: 'Block 3: video button label', type: 'string', group: 'content'}),
    ...seoFields('seo'),
  ],
  preview: {prepare: () => ({title: 'About'})},
})
