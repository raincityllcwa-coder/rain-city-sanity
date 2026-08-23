import {defineArrayMember, defineField, defineType} from 'sanity'
import {PinIcon} from '@sanity/icons'
import {bodyField, faqsField, galleryField, imageField, pagePreview, seoFields, seoUrlFields, slugField, toggle} from './shared'

// City page: Kitchen and Bathroom Remodeling in {City}, WA. The city-specific
// blocks (at a glance, neighborhoods, nearby cities) are added once the
// Kirkland prototype is approved.
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
    bodyField('content'),
    galleryField('content'),

    defineField({
      name: 'services', title: 'Service cards', type: 'array', group: 'blocks',
      description: 'Which services to show as cards. Leave empty to show all top-level service pages.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'servicePage'}]})],
    }),
    faqsField('blocks'),
    toggle('showReviews', 'Reviews', 'blocks', 'Reviews from this city first, then the rest.'),
    toggle('showProjects', 'Projects', 'blocks', 'Projects from this city first, then the rest.'),
    toggle('showRelatedServices', 'Our services (links to service pages)', 'blocks'),
    toggle('showLeadForm', 'Lead form', 'blocks'),

    ...seoFields('seo'),
    ...seoUrlFields('seo'),

    defineField({name: 'city', title: 'City name', type: 'string', group: 'settings', description: 'Example: Kirkland. Used for schema.org areaServed and to pull reviews and projects from this city.', validation: (r) => r.required()}),
    slugField('settings'),
    defineField({name: 'parent', title: 'Parent page', type: 'reference', group: 'settings', to: [{type: 'hubPage'}], description: 'Optional. Nests this page under a hub: URL becomes parent/slug and breadcrumbs follow.'}),
  ],
  preview: pagePreview,
  orderings: [{title: 'Title', name: 'titleAsc', by: [{field: 'title', direction: 'asc'}]}],
})
