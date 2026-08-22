import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

// About Us texts shown on the homepage About section. Single document, id copy.about.
export default defineType({
  name: 'aboutCopy',
  title: 'Home: About block',
  type: 'document',
  icon: TextIcon,
  fields: [
    defineField({name: 'heading', title: 'Section heading', type: 'string'}),
    defineField({name: 'introParagraph1', title: 'Intro paragraph 1', type: 'text', rows: 5}),
    defineField({name: 'introParagraph2', title: 'Intro paragraph 2', type: 'text', rows: 5}),
    defineField({name: 'gcHeading', title: 'General Contractors heading', type: 'string'}),
    defineField({name: 'gcParagraph1', title: 'General Contractors paragraph 1', type: 'text', rows: 4}),
    defineField({name: 'gcParagraph2', title: 'General Contractors paragraph 2', type: 'text', rows: 4}),
    defineField({name: 'emotionsHeading', title: 'Emotions heading', type: 'string'}),
    defineField({name: 'emotionsParagraph', title: 'Emotions paragraph', type: 'text', rows: 4}),
    defineField({name: 'officeHeading', title: 'Office heading', type: 'string'}),
    defineField({name: 'officeParagraph', title: 'Office paragraph', type: 'text', rows: 4}),
  ],
  preview: {prepare: () => ({title: 'Home: About block'})},
})
