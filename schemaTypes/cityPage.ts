import {defineArrayMember, defineField, defineType} from 'sanity'
import {PinIcon} from '@sanity/icons'
import {bodyField, faqsField, galleryField, imageField, pagePreview, seoFields, seoUrlFields, slugField, toggle} from './shared'

// City page: Kitchen and Bathroom Remodeling in {City}, WA. Built from the
// approved Kirkland prototype: hero with the docked form, intro with a city
// photo, service cards, city-first projects and reviews, the shared samples /
// why / process blocks, Working in the city notes, nearby cities and FAQ.
export default defineType({
  name: 'cityPage',
  title: 'City page',
  type: 'document',
  icon: PinIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'blocks', title: 'Blocks'},
    {name: 'seo', title: 'SEO'},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    defineField({name: 'title', title: 'Headline (H1)', type: 'string', group: 'content', validation: (r) => r.required()}),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'content'}),
    imageField('heroImage', 'Background photo behind the headline', 'content', 'Landscape, 1600px wide or more.'),
    defineField({name: 'introTitle', title: 'Intro heading (H2)', type: 'string', group: 'content', description: 'City + service for SEO. Empty = "Your Kitchen and Bathroom Remodeling Contractor in {City}".'}),
    bodyField('content', 'Intro text'),
    defineField({
      name: 'cityPhoto', title: 'City photo (below the intro text)', type: 'image', group: 'content',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alt Text (SEO)', type: 'string'}),
        defineField({name: 'caption', title: 'Caption', type: 'string', description: 'Shown under the photo. Keep the author credit here if the photo license requires attribution.'}),
      ],
    }),
    galleryField('content'),

    defineField({
      name: 'services', title: 'Service cards', type: 'array', group: 'blocks',
      description: 'Which services to show as cards. Leave empty to show all top-level service pages.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'servicePage'}]})],
    }),
    faqsField('blocks'),
    defineField({
      name: 'localNotes', title: 'Working in the city: points', type: 'array', group: 'blocks',
      description: 'Short local facts: older homes, permits, living at home during the work, deliveries and debris. Bold lead + text.',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({name: 'title', title: 'Bold lead', type: 'string'}),
          defineField({name: 'text', title: 'Text', type: 'text', rows: 3}),
        ],
        preview: {select: {title: 'title'}},
      })],
    }),
    toggle('showReviews', 'Reviews', 'blocks', 'Reviews from this city first, then the rest.'),
    toggle('showProjects', 'Projects', 'blocks', 'Projects from this city first, then the rest.'),
    defineField({
      name: 'sectionOrder', title: 'Section order', type: 'array', group: 'blocks',
      description: 'Drag to reorder the page blocks between the hero and the bottom form. Empty = the default order. The toggles below still show or hide each block.',
      of: [defineArrayMember({type: 'string'})],
      options: {list: [
        {title: 'Intro', value: 'intro'},
        {title: 'Services', value: 'services'},
        {title: 'Projects', value: 'projects'},
        {title: 'The samples come to you', value: 'samples'},
        {title: 'Reviews', value: 'reviews'},
        {title: 'Why choose us', value: 'why'},
        {title: 'Process', value: 'process'},
        {title: 'Working in the city', value: 'working'},
        {title: 'Nearby cities', value: 'nearby'},
        {title: 'FAQ', value: 'faq'},
      ]},
      validation: (r) => r.unique(),
    }),
    toggle('showRelatedServices', 'Our services (links to service pages)', 'blocks'),
    toggle('showSamples', 'The samples come to you', 'blocks', 'Shared block: texts and the photo live in Shared Sections.'),
    toggle('showWhyChooseUs', 'Why choose us', 'blocks', 'Shared block: texts live in Shared Sections.'),
    toggle('showProcess', 'Process', 'blocks', 'Shared block: the four steps live in Shared Sections.'),
    toggle('showWorking', 'Working in the city', 'blocks', 'The points above plus the owner card from Site Settings.'),
    toggle('showLeadForm', 'Lead form', 'blocks'),

    ...seoFields('seo'),
    ...seoUrlFields('seo'),

    defineField({name: 'cityRef', title: 'City', type: 'reference', to: [{type: 'city'}], group: 'settings', description: 'Used for schema.org areaServed and to pull reviews and projects from this city.', validation: (r) => r.required()}),
    defineField({
      name: 'nearbyCities', title: 'Nearby cities', type: 'array', group: 'blocks',
      description: 'Shown as a links block. Only cities that already have a published page become links; the rest are skipped.',
      of: [{type: 'reference', to: [{type: 'city'}]}],
    }),
    defineField({name: 'city', title: 'City name (old)', type: 'string', group: 'settings', deprecated: {reason: 'Replaced by the City reference above.'}, readOnly: true, hidden: ({value}) => value === undefined}),
    slugField('settings'),
    defineField({name: 'parent', title: 'Parent page', type: 'reference', group: 'settings', to: [{type: 'hubPage'}], description: 'Optional. Nests this page under a hub: URL becomes parent/slug and breadcrumbs follow.'}),
  ],
  preview: pagePreview,
  orderings: [{title: 'Title', name: 'titleAsc', by: [{field: 'title', direction: 'asc'}]}],
})
