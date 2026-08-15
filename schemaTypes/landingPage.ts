import {defineField, defineType} from 'sanity'

// SEO landing pages (service + city). Each published document becomes a page
// at raincityllc.com/<slug> on the next site build. Create one document per
// local query, e.g. "Kitchen Renovation Kirkland" with slug
// kitchen-renovation-kirkland.
export default defineType({
  name: 'landingPage',
  title: 'Landing Page (SEO)',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Internal name', type: 'string', description: 'Only for the Studio list, not shown on the site', validation: (r) => r.required()}),
    defineField({name: 'slug', title: 'URL slug', type: 'slug', description: 'Page address: raincityllc.com/<slug>. Example: kitchen-renovation-kirkland', options: {source: 'title', maxLength: 80}, validation: (r) => r.required()}),
    defineField({
      name: 'service', title: 'Service', type: 'string',
      options: {list: [
        {title: 'Kitchen Renovation', value: 'kitchen-renovation'},
        {title: 'Kitchen Countertops', value: 'kitchen-countertops'},
        {title: 'Bathroom Remodel', value: 'bathroom-remodel'},
      ]},
      validation: (r) => r.required(),
    }),
    defineField({name: 'city', title: 'City', type: 'string', description: 'Example: Kirkland. Used in the Service schema areaServed.', validation: (r) => r.required()}),
    defineField({name: 'metaTitle', title: 'Meta title', type: 'string', description: 'Browser tab / Google title. Aim for under 60 characters.'}),
    defineField({name: 'metaDescription', title: 'Meta description', type: 'text', rows: 3, description: 'Google snippet. Aim for 140-155 characters.'}),
    defineField({name: 'h1', title: 'H1 heading', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'subtitle', title: 'Subtitle under H1', type: 'text', rows: 2}),
    defineField({
      name: 'sections', title: 'Content sections', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'heading', title: 'Heading (H2)', type: 'string'}),
          defineField({name: 'body', title: 'Text', type: 'text', rows: 8, description: 'Blank line = new paragraph'}),
          defineField({name: 'image', title: 'Image (optional)', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Alt Text (SEO)', type: 'string'})]}),
        ],
        preview: {select: {title: 'heading', subtitle: 'body'}},
      }],
    }),
    defineField({
      name: 'faqs', title: 'FAQ (optional)', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'question', title: 'Question', type: 'string'}),
          defineField({name: 'answer', title: 'Answer', type: 'text', rows: 4}),
        ],
        preview: {select: {title: 'question'}},
      }],
    }),
    defineField({name: 'showReviews', title: 'Show reviews section', type: 'boolean', initialValue: true}),
    defineField({name: 'showLeadForm', title: 'Show lead form', type: 'boolean', initialValue: true}),
  ],
  preview: {select: {title: 'title', subtitle: 'slug.current'}},
})
