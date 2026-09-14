import {defineArrayMember, defineField, defineType} from 'sanity'
import {WrenchIcon} from '@sanity/icons'
import {bodyField, faqsField, galleryField, imageField, imageWithAlt, pagePreview, photoGridField, seoFields, seoUrlFields, slugField, toggle} from './shared'

// A service and its page are the same thing: Kitchen Cabinets, Bathroom
// Remodel, Tub to Shower Conversion. Reviews and projects point at service
// pages; cards on the homepage, Our Services and city pages are built from
// the Card tab. URL = parent URL + "/" + slug.
export default defineType({
  name: 'servicePage',
  title: 'Service page',
  type: 'document',
  icon: WrenchIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'template', title: 'Page blocks'},
    {name: 'card', title: 'Card'},
    {name: 'blocks', title: 'Order and toggles'},
    {name: 'seo', title: 'SEO'},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    defineField({name: 'title', title: 'Headline (H1)', type: 'string', group: 'content', validation: (r) => r.required()}),
    defineField({name: 'subtitle', title: 'One line under the headline', type: 'text', rows: 2, group: 'content'}),
    imageField('heroImage', 'Hero photo (full width behind the headline)', 'content', 'Landscape, 1600px wide or more.'),
    defineField({name: 'introTitle', title: 'Intro heading (H2)', type: 'string', group: 'content', description: 'Example: Ready to remodel your kitchen?'}),
    defineField({name: 'introParagraphs', title: 'Intro paragraphs', type: 'array', group: 'content', of: [defineArrayMember({type: 'text', rows: 4})]}),
    photoGridField('sliderPhotos', 'Intro carousel photos', 'content', 'Auto-rotating photos next to the intro text, like the carousels on the homepage. Order here = order on the page. Drop several files to add at once, click a photo to set its alt text.'),
    bodyField('content', 'Extra text block (optional)'),

    // ---- What is included ----
    defineField({name: 'includedHeading', title: '"What is included" heading', type: 'string', group: 'template'}),
    defineField({name: 'includedIntro', title: '"What is included" intro line', type: 'text', rows: 2, group: 'template'}),
    defineField({
      name: 'includedItems', title: '"What is included" items', type: 'array', group: 'template',
      description: 'Numbered 01, 02, ... in this order. Each item: title, text and a photo.',
      of: [defineArrayMember({
        type: 'object', name: 'includedItem',
        fields: [
          defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
          defineField({name: 'text', title: 'Text', type: 'text', rows: 3}),
          defineField({name: 'photo', title: 'Photo', ...imageWithAlt}),
        ],
        preview: {select: {title: 'title', media: 'photo'}},
      })],
    }),
    // ---- Benefits ----
    defineField({name: 'benefitsHeading', title: 'Benefits heading', type: 'string', group: 'template', description: 'Example: Four things you do not have to organize yourself'}),
    defineField({
      name: 'benefits', title: 'Benefit cards', type: 'array', group: 'template', description: 'Four cards work best.',
      of: [defineArrayMember({
        type: 'object', name: 'benefit',
        fields: [
          defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
          defineField({name: 'text', title: 'Text', type: 'text', rows: 3}),
        ],
        preview: {select: {title: 'title'}},
      })],
    }),
    // ---- Unique block ----
    defineField({
      name: 'uniqueBlock', title: 'Unique block (this page only)', type: 'object', group: 'template',
      description: 'A block with content specific to this service: a comparison, a checklist, a glossary or the stages of the work.',
      fields: [
        defineField({name: 'style', title: 'Layout', type: 'string', initialValue: 'cols', options: {list: [
          {title: 'Two columns of titled items', value: 'cols'},
          {title: 'Checklist (text only)', value: 'checklist'},
          {title: 'Three cards side by side', value: 'compare'},
          {title: 'Numbered stages', value: 'steps'},
        ], layout: 'radio'}}),
        defineField({name: 'heading', title: 'Heading', type: 'string'}),
        defineField({name: 'intro', title: 'Intro line', type: 'text', rows: 2}),
        defineField({
          name: 'items', title: 'Items', type: 'array',
          of: [defineArrayMember({
            type: 'object', name: 'uniqueItem',
            fields: [
              defineField({name: 'title', title: 'Title (not used in the checklist layout)', type: 'string'}),
              defineField({name: 'text', title: 'Text', type: 'text', rows: 3}),
            ],
            preview: {select: {title: 'title', subtitle: 'text'}},
          })],
        }),
      ],
    }),
    // ---- Proof: before and after, or a photo gallery ----
    defineField({name: 'proofMode', title: 'Work block', type: 'string', group: 'template', initialValue: 'gallery', options: {list: [
      {title: 'Before and after (one project)', value: 'project'},
      {title: 'Photo gallery', value: 'gallery'},
      {title: 'Off', value: 'none'},
    ], layout: 'radio'}}),
    defineField({name: 'proofHeading', title: 'Work block heading', type: 'string', group: 'template', description: 'Example: A 1921 South Seattle kitchen, before and after / Bathrooms we have remodeled'}),
    defineField({
      name: 'beforeAfter', title: 'Before and after', type: 'object', group: 'template', hidden: ({document}) => document?.proofMode !== 'project',
      fields: [
        defineField({name: 'beforePhoto', title: 'Before photo', ...imageWithAlt}),
        defineField({name: 'afterPhoto', title: 'After photo', ...imageWithAlt}),
        defineField({name: 'beforeText', title: 'Text under the before photo', type: 'text', rows: 4}),
        defineField({name: 'afterText', title: 'Text under the after photo', type: 'text', rows: 4}),
        defineField({name: 'project', title: 'Link to the project page', type: 'reference', to: [{type: 'project'}]}),
        defineField({name: 'linkLabel', title: 'Link text', type: 'string', initialValue: 'Read the full case study'}),
      ],
    }),
    defineField({name: 'galleryStyle', title: 'Gallery layout', type: 'string', group: 'template', initialValue: 'grid6', hidden: ({document}) => document?.proofMode !== 'gallery', options: {list: [
      {title: 'Grid of six', value: 'grid6'},
      {title: 'Three large photos', value: 'big3'},
    ], layout: 'radio'}}),
    galleryField('template'),
    // ---- FAQ heading, SEO text ----
    defineField({name: 'faqHeading', title: 'FAQ heading', type: 'string', group: 'template', description: 'Example: Questions homeowners ask before a kitchen project'}),
    defineField({name: 'seoTextTitle', title: 'SEO text heading (H2)', type: 'string', group: 'template', description: 'The text block above the footer.'}),
    bodyField('template', 'SEO text', 'seoText'),

    defineField({name: 'cardTitle', title: 'Card title', type: 'string', group: 'card', description: 'Short name on cards and in lists. Falls back to the headline.'}),
    defineField({name: 'cardText', title: 'Card text on the homepage', type: 'text', rows: 4, group: 'card'}),
    defineField({name: 'cardShortText', title: 'Card text on the Our Services page', type: 'text', rows: 3, group: 'card'}),
    imageField('cardImage', 'Card photo (Our Services page)', 'card', 'Falls back to the background photo.'),
    photoGridField('cardPhotos', 'Card carousel photos (homepage)', 'card', 'Order here = order in the carousel. Drop several files onto the grid to add them at once, click a photo to set its alt text.'),

    faqsField('template'),
    defineField({
      name: 'sectionOrder', title: 'Section order', type: 'array', group: 'blocks',
      description: 'The blocks between the hero (with the form strip) and the SEO text, top to bottom. Drag a row by the handle on its left to move it, pick the block in the dropdown, Add item adds a row, the row menu (...) removes one. Empty list = the default order. A block that is not in the list is not shown.',
      of: [defineArrayMember({type: 'string', options: {list: [
        {title: 'Intro with the carousel', value: 'intro'},
        {title: 'What is included', value: 'included'},
        {title: 'Benefit cards', value: 'benefits'},
        {title: 'Unique block', value: 'unique'},
        {title: 'Extra text block', value: 'text'},
        {title: 'Why choose us (shared)', value: 'why'},
        {title: 'Process (shared)', value: 'process'},
        {title: 'Reviews', value: 'reviews'},
        {title: 'Projects (cards)', value: 'projects'},
        {title: 'Work block (before/after or gallery)', value: 'proof'},
        {title: 'FAQ', value: 'faq'},
        {title: 'Service area (shared, map)', value: 'area'},
        {title: 'Bottom form', value: 'final'},
      ]}})],
      validation: (r) => r.unique().custom((v) => ((v || []) as unknown[]).some((x) => !x) ? 'Pick a block in every row' : true),
    }),
    toggle('showReviews', 'Reviews', 'blocks', 'Reviews that point at this service, then the homepage set.'),
    toggle('showProjects', 'Projects', 'blocks', 'Projects that point at this service (only when "Projects" is in the order).'),
    toggle('showWhyChooseUs', 'Why Choose Us', 'blocks', 'Texts are in Shared Sections.'),
    toggle('showProcess', 'Process', 'blocks', 'Texts are in Shared Sections.'),
    toggle('showServiceArea', 'Service area', 'blocks', 'Texts are in Shared Sections; cities with a page become links.'),
    toggle('showAreas', 'Links to other service pages before the footer', 'blocks'),
    toggle('showLeadForm', 'Bottom form', 'blocks'),

    ...seoFields('seo'),
    ...seoUrlFields('seo'),

    slugField('settings'),
    defineField({name: 'parent', title: 'Parent service page', type: 'reference', group: 'settings', to: [{type: 'servicePage'}], description: 'Optional. Nests this page under another one: URL becomes parent/slug and breadcrumbs follow.'}),
    defineField({name: 'menuParent', title: 'Show under (menu and breadcrumbs only)', type: 'reference', group: 'settings', to: [{type: 'servicePage'}], description: 'For a page that keeps its own top-level URL but belongs under another service in the menu and the breadcrumbs. Ignored when a Parent is set.'}),
    defineField({name: 'branch', title: 'Branch', type: 'string', group: 'settings', initialValue: 'kitchen', options: {list: [{title: 'Kitchen', value: 'kitchen'}, {title: 'Bathroom', value: 'bathroom'}], layout: 'radio'}, description: 'Decides which reviews come first and the wording of the form placeholder.'}),
  ],
  preview: pagePreview,
  orderings: [{title: 'Title', name: 'titleAsc', by: [{field: 'title', direction: 'asc'}]}],
})
