import {defineField, defineType} from 'sanity'

// Texts of sections shared between pages (services grid, why choose us,
// process, additional services, service area). Single document, id copy.shared.
export default defineType({
  name: 'sharedCopy',
  title: 'Shared Section Texts',
  type: 'document',
  fields: [
    defineField({name: 'servicesHeading', title: 'Services grid: heading', type: 'string'}),
    defineField({
      name: 'serviceCards', title: 'Services grid: 3 cards', type: 'array',
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
    defineField({name: 'whyHeading', title: 'Why Choose Us: heading', type: 'string'}),
    defineField({name: 'whyIntro1', title: 'Why Choose Us: intro paragraph 1', type: 'text', rows: 3}),
    defineField({name: 'whyIntro2', title: 'Why Choose Us: intro paragraph 2', type: 'text', rows: 3}),
    defineField({
      name: 'whyFeatures', title: 'Why Choose Us: 4 cards', type: 'array',
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
    defineField({name: 'processHeadingHome', title: 'Process heading (homepage)', type: 'string'}),
    defineField({name: 'processHeadingService', title: 'Process heading (service pages)', type: 'string'}),
    defineField({
      name: 'processSteps', title: 'Process: 4 steps', type: 'array',
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
    defineField({name: 'additionalHeading', title: 'Additional services: heading', type: 'string'}),
    defineField({name: 'additionalIntro1', title: 'Additional services: line 1', type: 'string'}),
    defineField({name: 'additionalIntro2', title: 'Additional services: line 2', type: 'string'}),
    defineField({name: 'additionalItems', title: 'Additional services: list', type: 'array', of: [{type: 'text', rows: 2}]}),
    defineField({name: 'additionalOutro', title: 'Additional services: closing line', type: 'string'}),
    defineField({name: 'serviceAreaHeading', title: 'Service area: heading', type: 'string'}),
    defineField({name: 'serviceAreaSubheading', title: 'Service area: subheading', type: 'string'}),
  ],
  preview: {prepare: () => ({title: 'Shared Section Texts'})},
})
