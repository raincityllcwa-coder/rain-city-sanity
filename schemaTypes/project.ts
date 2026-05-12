import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    {name: 'basic', title: 'Basic Info', default: true},
    {name: 'caseStudy', title: 'Case Study (optional)'},
    {name: 'seo', title: 'SEO (optional)'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      group: 'basic',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {hotspot: true},
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery (additional photos)',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      group: 'basic',
    }),
    defineField({
      name: 'showOn',
      title: 'Show on pages',
      type: 'array',
      of: [{type: 'string'}],
      group: 'basic',
      options: {
        list: [
          {title: '🏠 Homepage', value: 'homepage'},
          {title: '🍳 Kitchen Cabinets', value: 'kitchen-cabinets'},
          {title: '🪨 Kitchen Countertops', value: 'kitchen-countertops'},
          {title: '🛁 Bathroom Remodel', value: 'bathroom-remodel'},
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower = appears first',
      group: 'basic',
      initialValue: 0,
    }),

    // ─── Project page (URL) ──────────────────────────────
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description:
        'URL of the project page, e.g. "south-seattle-kitchen-remodel". Will be available at /our-projects/[slug]. Click Generate to auto-fill from title, then shorten if needed.',
      group: 'basic',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'city',
      title: 'City / Location',
      type: 'string',
      description: 'E.g. "South Seattle, WA"',
      group: 'basic',
    }),
    defineField({
      name: 'completedYear',
      title: 'Completed Year',
      type: 'number',
      description: 'E.g. 2026',
      group: 'basic',
    }),

    // ─── Case Study fields (optional) ────────────────────
    defineField({
      name: 'intro',
      title: 'Intro / Starting Point',
      type: 'text',
      rows: 8,
      description:
        'Optional. If filled along with Goals, the project page will render as a full case study. Leave empty for a simple gallery page. Separate paragraphs with a blank line.',
      group: 'caseStudy',
    }),

    // ── Goals subgroup ──
    defineField({
      name: 'goalsHeading',
      title: 'Goals: Heading',
      type: 'string',
      description: 'Optional. Overrides the default "The Project Goals" heading.',
      group: 'caseStudy',
    }),
    defineField({
      name: 'goalsIntro',
      title: 'Goals: Intro Paragraphs',
      type: 'text',
      rows: 4,
      description:
        'Optional. Paragraphs displayed under the Goals heading, before the numbered list. Separate paragraphs with a blank line.',
      group: 'caseStudy',
    }),
    defineField({
      name: 'goals',
      title: 'Project Goals (numbered list)',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Optional. Each item is one goal of the project.',
      group: 'caseStudy',
    }),
    defineField({
      name: 'goalsOutro',
      title: 'Goals: Outro Paragraphs',
      type: 'text',
      rows: 4,
      description:
        'Optional. Paragraphs displayed after the numbered list, before the next section. Separate paragraphs with a blank line.',
      group: 'caseStudy',
    }),

    // ── Design Decisions subgroup ──
    defineField({
      name: 'designDecisionsHeading',
      title: 'Design Decisions: Heading',
      type: 'string',
      description:
        'Optional. Overrides the default "The Design Choices That Made the Space Work" heading.',
      group: 'caseStudy',
    }),
    defineField({
      name: 'designDecisionsIntro',
      title: 'Design Decisions: Intro Paragraphs',
      type: 'text',
      rows: 4,
      description:
        'Optional. Paragraphs displayed under the section heading, before the individual design decision blocks.',
      group: 'caseStudy',
    }),
    defineField({
      name: 'designDecisions',
      title: 'Design Decisions',
      type: 'array',
      description: 'Optional. Each block has a heading and body text.',
      group: 'caseStudy',
      of: [
        {
          type: 'object',
          name: 'designDecision',
          fields: [
            {name: 'heading', title: 'Heading', type: 'string'},
            {
              name: 'body',
              title: 'Body (paragraphs separated by blank line)',
              type: 'text',
              rows: 6,
            },
          ],
          preview: {
            select: {title: 'heading', subtitle: 'body'},
          },
        },
      ],
    }),

    // ── Before / After subgroup ──
    defineField({
      name: 'beforeAfterHeading',
      title: 'Before / After: Heading',
      type: 'string',
      description: 'Optional. Overrides the default "What We Replaced and Upgraded" heading.',
      group: 'caseStudy',
    }),
    defineField({
      name: 'beforeAfterIntro',
      title: 'Before / After: Intro Paragraphs',
      type: 'text',
      rows: 4,
      description: 'Optional. Paragraphs displayed under the section heading, before the table.',
      group: 'caseStudy',
    }),
    defineField({
      name: 'beforeAfter',
      title: 'Before / After Table',
      type: 'array',
      description: 'Optional. Each row compares one item before vs after.',
      group: 'caseStudy',
      of: [
        {
          type: 'object',
          name: 'beforeAfterRow',
          fields: [
            {name: 'item', title: 'Item', type: 'string'},
            {name: 'before', title: 'Before', type: 'string'},
            {name: 'after', title: 'After', type: 'string'},
          ],
          preview: {
            select: {title: 'item', subtitle: 'after'},
          },
        },
      ],
    }),

    // ── Result subgroup ──
    defineField({
      name: 'resultHeading',
      title: 'Result: Heading',
      type: 'string',
      description: 'Optional. Overrides the default "The Result" heading.',
      group: 'caseStudy',
    }),
    defineField({
      name: 'resultText',
      title: 'The Result',
      type: 'text',
      rows: 5,
      description: 'Optional. Final paragraphs about the result.',
      group: 'caseStudy',
    }),

    // ─── SEO fields (optional) ───────────────────────────
    defineField({
      name: 'metaTitle',
      title: 'SEO: Meta Title',
      type: 'string',
      description: 'Optional. If empty, project title is used.',
      group: 'seo',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO: Meta Description',
      type: 'text',
      rows: 3,
      description: 'Optional. If empty, intro is used. Max 160 characters.',
      group: 'seo',
      validation: (Rule) => Rule.max(160),
    }),
  ],
  orderings: [
    {title: 'Sort Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
    {
      title: 'Newest First',
      name: 'completedDesc',
      by: [{field: 'completedYear', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      pages: 'showOn',
      city: 'city',
    },
    prepare({title, media, pages, city}) {
      const subtitleParts = []
      if (city) subtitleParts.push(city)
      if (pages && pages.length) subtitleParts.push(pages.join(', '))
      return {
        title,
        subtitle: subtitleParts.join(' · '),
        media,
      }
    },
  },
})
