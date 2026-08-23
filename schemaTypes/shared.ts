import {defineArrayMember, defineField} from 'sanity'

// Field builders shared by the page types. Every page keeps its own SEO
// fields (embedded, not a separate document) and its own block toggles.

export const imageWithAlt = {
  type: 'image',
  options: {hotspot: true},
  fields: [defineField({name: 'alt', title: 'Alt Text (SEO)', type: 'string'})],
}

export const imageField = (name: string, title: string, group: string, description?: string) =>
  defineField({name, title, group, description, ...imageWithAlt})

export const photoGridField = (name: string, title: string, group: string, description: string) =>
  defineField({
    name,
    title,
    type: 'array',
    group,
    description,
    options: {layout: 'grid'},
    of: [defineArrayMember(imageWithAlt)],
  })

// Rich text for page bodies: headings, lists, bold, italic, links, photos.
export const bodyField = (group: string, title = 'Page text') =>
  defineField({
    name: 'body',
    title,
    type: 'array',
    group,
    description: 'Headings, paragraphs, lists, links (internal links like /kitchen-cabinets are fine) and photos.',
    of: [
      defineArrayMember({
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
              name: 'link',
              type: 'object',
              title: 'Link',
              fields: [
                defineField({name: 'href', title: 'URL', type: 'string', description: 'Internal: /kitchen-cabinets. External: https://...', validation: (r) => r.required()}),
                defineField({name: 'blank', title: 'Open in new tab', type: 'boolean', initialValue: false}),
              ],
            },
          ],
        },
      }),
      defineArrayMember({
        type: 'image',
        name: 'image',
        title: 'Photo',
        options: {hotspot: true},
        fields: [defineField({name: 'alt', title: 'Alt Text (SEO)', type: 'string'}), defineField({name: 'caption', title: 'Caption (optional)', type: 'string'})],
      }),
    ],
  })

export const galleryField = (group: string) =>
  photoGridField('gallery', 'Photo gallery (optional)', group, 'Shown as a grid below the text. Order here = order on the page.')

// FAQ on a page: pick shared questions from the FAQ list or write one-off
// questions right here. Order here = order on the page.
export const faqsField = (group: string) =>
  defineField({
    name: 'faqs',
    title: 'FAQ',
    type: 'array',
    group,
    description: 'Pick an existing question from the FAQ list (shared across pages) or add a new one just for this page. Drag to reorder.',
    of: [
      defineArrayMember({
        type: 'reference',
        name: 'faqRef',
        title: 'Existing question',
        to: [{type: 'faq'}],
      }),
      defineArrayMember({
        type: 'object',
        name: 'faqItem',
        title: 'New question (this page only)',
        fields: [
          defineField({name: 'question', title: 'Question', type: 'string', validation: (r) => r.required()}),
          defineField({name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (r) => r.required()}),
        ],
        preview: {select: {title: 'question'}},
      }),
    ],
  })

export const seoFields = (group: string) => [
  defineField({name: 'metaTitle', title: 'Meta title', type: 'string', group, description: 'Browser tab and Google result title. Aim for under 60 characters. Falls back to the headline.'}),
  defineField({name: 'metaDescription', title: 'Meta description', type: 'text', rows: 3, group, description: 'Google snippet. Aim for 140 to 155 characters.'}),
  defineField({name: 'ogImage', title: 'Social sharing image (optional)', type: 'image', group}),
]

// Extra SEO fields for pages that have their own URL (not the fixed pages).
export const seoUrlFields = (group: string) => [
  defineField({name: 'canonicalUrl', title: 'Canonical URL override (rare)', type: 'url', group}),
  defineField({name: 'noindex', title: 'Hide from search (noindex, out of sitemap)', type: 'boolean', group, initialValue: false, description: 'Turn on to publish a page for review without indexing. Turn off when it is ready.'}),
]

export const toggle = (name: string, title: string, group: string, description?: string) =>
  defineField({name, title, type: 'boolean', group, initialValue: true, description})

export const slugField = (group: string) =>
  defineField({
    name: 'slug',
    title: 'URL slug (last part only)',
    type: 'slug',
    group,
    description: "Only this page's own segment, no slashes. Example: tub-to-shower-conversion. The full URL is shown on the Open on site tab after publish.",
    options: {source: 'title', maxLength: 80},
    validation: (r) =>
      r.required().custom((s: any) => (s?.current && s.current.includes('/') ? 'No slashes: put the parent in the Parent field instead' : true)),
  })

export const pagePreview = {
  select: {title: 'title', slug: 'slug.current', parent: 'parent.slug.current', noindex: 'noindex', media: 'heroImage'},
  prepare: ({title, slug, parent, noindex, media}: any) => ({
    title: (noindex ? '[hidden] ' : '') + (title || 'Untitled'),
    subtitle: `/${parent ? parent + '/' : ''}${slug || ''}`,
    media,
  }),
}
