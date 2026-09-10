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
    {name: 'why', title: 'Why Choose Us', default: true},
    {name: 'process', title: 'Process'},
    {name: 'additional', title: 'Additional services'},
    {name: 'area', title: 'Service area'},
    {name: 'city', title: 'City pages'},
    {name: 'service', title: 'Service pages'},
    {name: 'services', title: 'Old fields'},
  ],
  fields: [
    defineField({name: 'svcFormHeading', title: 'Form strip: heading', type: 'string', group: 'service', initialValue: 'Book Your Free Consultation'}),
    defineField({name: 'svcFormNote', title: 'Form strip: note', type: 'string', group: 'service', initialValue: 'Free in-home visit. Written estimate after the visit.'}),
    defineField({name: 'svcButtonLabel', title: 'Button label', type: 'string', group: 'service', initialValue: 'Book a Free Consultation'}),
    defineField({name: 'svcFinalHeading', title: 'Bottom form: heading', type: 'string', group: 'service', initialValue: 'Ready to start? Book Your Free Consultation'}),
    defineField({name: 'svcFinalText', title: 'Bottom form: text', type: 'text', rows: 2, group: 'service', initialValue: 'Send the form or call (253) 466-8709. We come to your home with the samples, and a written estimate follows the visit.'}),
    defineField({name: 'svcBeforeLabel', title: 'Label on the before photo', type: 'string', group: 'service', initialValue: 'Before'}),
    defineField({name: 'svcAfterLabel', title: 'Label on the after photo', type: 'string', group: 'service', initialValue: 'After'}),
    defineField({name: 'svcGalleryLink', title: 'Gallery link text', type: 'string', group: 'service', initialValue: 'All projects'}),
    defineField({name: 'svcLinksKitchen', title: 'Links block: kitchen column heading', type: 'string', group: 'service', initialValue: 'Kitchen services'}),
    defineField({name: 'svcLinksBathroom', title: 'Links block: bathroom column heading', type: 'string', group: 'service', initialValue: 'Bathroom services'}),
    defineField({name: 'servicesHeading', title: 'Heading (old)', type: 'string', group: 'services', deprecated: {reason: 'Moved to Home > Services.'}, readOnly: true, hidden: ({value}) => value === undefined}),
    defineField({
      name: 'serviceCards', title: 'Three cards (old)', type: 'array', group: 'services',
      deprecated: {reason: 'Moved to the Card tab of each service page.'}, readOnly: true, hidden: ({value}) => value === undefined,
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
    defineField({
      name: 'cityHeroChecks', title: 'Hero: three trust lines', type: 'array', group: 'city',
      description: 'Shown with check marks under the headline on every city page.',
      of: [{type: 'string'}],
      validation: (r) => r.max(3),
    }),
    defineField({name: 'cityWhyHeading', title: 'Why us: heading', type: 'string', group: 'city'}),
    defineField({
      name: 'cityWhyItems', title: 'Why us: four points', type: 'array', group: 'city',
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
    defineField({name: 'citySamplesHeading', title: 'Samples block: heading', type: 'string', group: 'city'}),
    defineField({name: 'citySamplesText', title: 'Samples block: text', type: 'text', rows: 3, group: 'city', description: 'The office address and hours are added automatically from Site Settings.'}),
    defineField({
      name: 'citySamplesPhoto', title: 'Samples block: photo', type: 'image', group: 'city',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt Text (SEO)', type: 'string'})],
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
