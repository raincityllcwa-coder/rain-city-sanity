import {defineField, defineType} from 'sanity'
import {BlockContentIcon} from '@sanity/icons'

// Texts of sections shared between pages (services grid, why choose us,
// process, additional services, service area). Single document, id copy-shared.
export default defineType({
  name: 'sharedCopy',
  title: 'Shared Sections',
  type: 'document',
  icon: BlockContentIcon,
  groups: [
    {name: 'services', title: 'Services cards', default: true},
    {name: 'why', title: 'Why Choose Us'},
    {name: 'process', title: 'Process'},
    {name: 'additional', title: 'Additional services'},
    {name: 'area', title: 'Service area'},
  ],
  fields: [
    defineField({name: 'servicesHeading', title: 'Heading', type: 'string', group: 'services', description: 'Above the three service cards on the homepage.'}),
    defineField({
      name: 'serviceCards', title: 'Three cards', type: 'array', group: 'services',
      description: 'Card order matches the homepage. Card photos are in Home > Services cards: carousel photos.',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'title', title: 'Card title', type: 'string'}),
          defineField({name: 'text', title: 'Card text', type: 'text', rows: 4}),
        ],
        preview: {select: {title: 'title'}},
      }],
      validation: (r) => r.max(3),
    }),
    defineField({name: 'whyHeading', title: 'Heading', type: 'string', group: 'why'}),
    defineField({name: 'whyIntro1', title: 'Intro paragraph 1', type: 'text', rows: 3, group: 'why'}),
    defineField({name: 'whyIntro2', title: 'Intro paragraph 2', type: 'text', rows: 3, group: 'why'}),
    defineField({
      name: 'whyFeatures', title: 'Four cards', type: 'array', group: 'why',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'title', title: 'Title', type: 'string'}),
          defineField({name: 'description', title: 'Text', type: 'text', rows: 3}),
        ],
        preview: {select: {title: 'title'}},
      }],
      validation: (r) => r.max(4),
    }),
    defineField({name: 'processHeadingHome', title: 'Heading on the homepage', type: 'string', group: 'process'}),
    defineField({name: 'processHeadingService', title: 'Heading on service pages', type: 'string', group: 'process'}),
    defineField({
      name: 'processSteps', title: 'Four steps', type: 'array', group: 'process',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'title', title: 'Step title', type: 'string'}),
          defineField({name: 'description', title: 'Step text', type: 'text', rows: 3}),
        ],
        preview: {select: {title: 'title'}},
      }],
      validation: (r) => r.max(4),
    }),
    defineField({name: 'additionalHeading', title: 'Heading', type: 'string', group: 'additional'}),
    defineField({name: 'additionalIntro1', title: 'Line 1', type: 'string', group: 'additional'}),
    defineField({name: 'additionalIntro2', title: 'Line 2', type: 'string', group: 'additional'}),
    defineField({name: 'additionalItems', title: 'List of services', type: 'array', group: 'additional', of: [{type: 'text', rows: 2}]}),
    defineField({name: 'additionalOutro', title: 'Closing line', type: 'string', group: 'additional'}),
    defineField({name: 'serviceAreaHeading', title: 'Heading', type: 'string', group: 'area'}),
    defineField({name: 'serviceAreaSubheading', title: 'Subheading', type: 'string', group: 'area'}),
  ],
  preview: {prepare: () => ({title: 'Shared Sections'})},
})
