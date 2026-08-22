import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

// Universal SEO page: services, sub-services, city pages and hubs.
// URL = parent's URL + "/" + slug. With no parent the page lives at the root
// (/kitchen-remodel). With a parent it nests (/bathroom-remodel/tub-to-shower-
// conversion). Breadcrumbs follow the same chain. Static site pages always win
// over a page document with the same URL, so a document can act purely as a
// parent for nesting while the static page still renders the URL itself.
const imageWithAlt = {
  type: 'image',
  options: {hotspot: true},
  fields: [defineField({name: 'alt', title: 'Alt Text (SEO)', type: 'string'})],
}

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    defineField({name: 'title', title: 'Internal name', type: 'string', group: 'content', description: 'Shown only in this list. Example: Kitchen Remodel (Bellevue) or Kirkland city page.', validation: (r) => r.required()}),
    defineField({
      name: 'pageType', title: 'Page type', type: 'string', group: 'settings',
      options: {list: [
        {title: 'Service page', value: 'service'},
        {title: 'City page (service area)', value: 'city'},
        {title: 'Hub page (lists other pages)', value: 'hub'},
      ], layout: 'radio'},
      initialValue: 'service',
      validation: (r) => r.required(),
    }),
    defineField({name: 'parent', title: 'Parent page', type: 'reference', to: [{type: 'page'}], group: 'settings', description: 'Optional. Nests this page under another one: URL becomes parent/slug and breadcrumbs follow.'}),
    defineField({name: 'slug', title: 'URL slug (last part only)', type: 'slug', group: 'settings', description: 'Only this page\'s own segment, no slashes. Example: tub-to-shower-conversion. Full URL is shown on the site after publish.', options: {source: 'title', maxLength: 80}, validation: (r) => r.required().custom((s) => (s?.current && s.current.includes('/') ? 'No slashes: put the parent in the Parent field instead' : true))}),
    defineField({name: 'city', title: 'City (city pages)', type: 'string', group: 'settings', description: 'Example: Kirkland. Used for schema areaServed and to pull projects and reviews from this city.'}),
    defineField({
      name: 'contentKey', title: 'Reviews and projects source', type: 'string', group: 'settings',
      description: 'Which existing pool of reviews and projects this page shows (city pages first try their own city, then this pool).',
      options: {list: [
        {title: 'Homepage pool', value: 'homepage'},
        {title: 'Kitchen Cabinets pool', value: 'kitchen-cabinets'},
        {title: 'Kitchen Countertops pool', value: 'kitchen-countertops'},
        {title: 'Bathroom Remodel pool', value: 'bathroom-remodel'},
      ]},
      initialValue: 'homepage',
    }),

    defineField({name: 'heroTitle', title: 'H1 heading', type: 'string', group: 'content', validation: (r) => r.required()}),
    defineField({name: 'heroSubtitle', title: 'Subtitle under H1', type: 'text', rows: 2, group: 'content'}),
    defineField({name: 'heroImage', title: 'Hero photo (optional)', ...imageWithAlt, group: 'content'}),
    defineField({
      name: 'body', title: 'Page text', type: 'array', group: 'content',
      description: 'Headings, paragraphs, lists, links (internal links like /kitchen-cabinets are fine) and photos.',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Paragraph', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Heading 4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [{title: 'Bullets', value: 'bullet'}, {title: 'Numbers', value: 'number'}],
          marks: {
            decorators: [{title: 'Bold', value: 'strong'}, {title: 'Italic', value: 'em'}],
            annotations: [
              {
                name: 'link', type: 'object', title: 'Link',
                fields: [
                  defineField({name: 'href', title: 'URL', type: 'string', description: 'Internal: /kitchen-cabinets. External: https://...', validation: (r) => r.required()}),
                  defineField({name: 'blank', title: 'Open in new tab', type: 'boolean', initialValue: false}),
                ],
              },
            ],
          },
        },
        {...imageWithAlt, name: 'image', title: 'Photo', fields: [...imageWithAlt.fields, defineField({name: 'caption', title: 'Caption (optional)', type: 'string'})]},
      ],
    }),
    defineField({name: 'gallery', title: 'Photo gallery (optional)', type: 'array', group: 'content', description: 'Shown as a grid below the text. Order here = order on the page.', options: {layout: 'grid'}, of: [imageWithAlt]}),
    defineField({
      name: 'faqs', title: 'FAQ (optional)', type: 'array', group: 'content',
      of: [{type: 'object', fields: [defineField({name: 'question', title: 'Question', type: 'string'}), defineField({name: 'answer', title: 'Answer', type: 'text', rows: 4})], preview: {select: {title: 'question'}}}],
    }),

    defineField({name: 'showReviews', title: 'Show reviews section', type: 'boolean', group: 'settings', initialValue: true}),
    defineField({name: 'showProjects', title: 'Show projects section', type: 'boolean', group: 'settings', initialValue: true}),
    defineField({name: 'showAreas', title: 'Show "Areas we serve" block (links to city pages)', type: 'boolean', group: 'settings', initialValue: true}),
    defineField({name: 'showRelatedServices', title: 'Show "Our services" block (links to service pages)', type: 'boolean', group: 'settings', initialValue: true}),
    defineField({name: 'showLeadForm', title: 'Show lead form', type: 'boolean', group: 'settings', initialValue: true}),

    defineField({name: 'metaTitle', title: 'Meta title', type: 'string', group: 'seo', description: 'Browser tab / Google title. Aim for under 60 characters. Falls back to the H1.'}),
    defineField({name: 'metaDescription', title: 'Meta description', type: 'text', rows: 3, group: 'seo', description: 'Google snippet, 140 to 155 characters.'}),
    defineField({name: 'ogImage', title: 'Social sharing image (optional)', type: 'image', group: 'seo'}),
    defineField({name: 'canonicalUrl', title: 'Canonical URL override (rare)', type: 'url', group: 'seo'}),
    defineField({name: 'noindex', title: 'Hide from search (noindex, out of sitemap)', type: 'boolean', group: 'seo', initialValue: false, description: 'Turn on to publish a page for review without indexing. Turn off when it is ready.'}),
  ],
  preview: {
    select: {title: 'title', type: 'pageType', slug: 'slug.current', parent: 'parent.slug.current', noindex: 'noindex'},
    prepare: ({title, type, slug, parent, noindex}) => ({
      title: (noindex ? '[hidden] ' : '') + (title || 'Untitled'),
      subtitle: `${type || ''} · /${parent ? parent + '/' : ''}${slug || ''}`,
    }),
  },
})
