import {defineArrayMember, defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'
import {imageField, seoFields} from './shared'

// The homepage. One document (id homePage). Service cards come from the
// Card tab of the service pages picked in Featured services; Why Choose Us
// and Process texts are in Shared Sections.
export default defineType({
  name: 'homePage',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'services', title: 'Services'},
    {name: 'about', title: 'About block'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'heroTitle', title: 'Headline (H1)', type: 'string', group: 'hero'}),
    defineField({name: 'heroSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'hero'}),
    defineField({name: 'heroSubtitleExtra', title: 'Subtitle: extra sentence shown on desktop only', type: 'text', rows: 2, group: 'hero'}),
    imageField('heroImage', 'Background photo', 'hero', 'Large photo behind the headline. Landscape, 2000px wide or more.'),

    defineField({name: 'servicesHeading', title: 'Heading', type: 'string', group: 'services'}),
    defineField({
      name: 'featuredServices', title: 'Featured services', type: 'array', group: 'services',
      description: 'Cards in this order. Card title, text and carousel photos are edited on each service page (Card tab).',
      of: [defineArrayMember({type: 'reference', to: [{type: 'servicePage'}]})],
    }),

    defineField({
      name: 'about', title: 'About block', type: 'object', group: 'about',
      options: {collapsible: false},
      fields: [
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({name: 'introParagraph1', title: 'Intro paragraph 1', type: 'text', rows: 5}),
        defineField({name: 'introParagraph2', title: 'Intro paragraph 2', type: 'text', rows: 5}),
        defineField({name: 'gcHeading', title: 'General Contractors heading', type: 'string'}),
        defineField({name: 'gcParagraph1', title: 'General Contractors paragraph 1', type: 'text', rows: 4}),
        defineField({name: 'gcParagraph2', title: 'General Contractors paragraph 2', type: 'text', rows: 4}),
        defineField({name: 'emotionsHeading', title: 'Emotions heading', type: 'string'}),
        defineField({name: 'emotionsParagraph', title: 'Emotions paragraph', type: 'text', rows: 4}),
        defineField({name: 'officeHeading', title: 'Office heading', type: 'string'}),
        defineField({name: 'officeParagraph', title: 'Office paragraph', type: 'text', rows: 4}),
        defineField({name: 'photo1', title: 'Photo 1 (kitchen project)', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Alt Text (SEO)', type: 'string'})]}),
        defineField({name: 'photo2', title: 'Photo 2 (team)', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Alt Text (SEO)', type: 'string'})]}),
        defineField({name: 'photo3', title: 'Photo 3 (happy customers)', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Alt Text (SEO)', type: 'string'})]}),
      ],
    }),

    ...seoFields('seo'),
  ],
  preview: {prepare: () => ({title: 'Home'})},
})
