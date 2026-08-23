import {defineArrayMember, defineField, defineType} from 'sanity'
import {WrenchIcon} from '@sanity/icons'
import {bodyField, faqsField, galleryField, imageField, pagePreview, photoGridField, seoFields, seoUrlFields, slugField, toggle} from './shared'

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
    {name: 'card', title: 'Card'},
    {name: 'blocks', title: 'Blocks'},
    {name: 'seo', title: 'SEO'},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    defineField({name: 'title', title: 'Headline (H1)', type: 'string', group: 'content', validation: (r) => r.required()}),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'content'}),
    imageField('heroImage', 'Background photo behind the headline', 'content', 'Landscape, 1600px wide or more.'),
    defineField({name: 'introTitle', title: 'Intro heading', type: 'string', group: 'content', description: 'Heading of the text block next to the photo slider.'}),
    defineField({name: 'introParagraphs', title: 'Intro paragraphs', type: 'array', group: 'content', of: [defineArrayMember({type: 'text', rows: 4})]}),
    photoGridField('sliderPhotos', 'Intro slider photos', 'content', 'Auto-rotating photos next to the intro text. Order here = order on the page. Drop several files to add at once, click a photo to set its alt text.'),
    bodyField('content', 'Page text (below the intro)'),
    galleryField('content'),

    defineField({name: 'cardTitle', title: 'Card title', type: 'string', group: 'card', description: 'Short name on cards and in lists. Falls back to the headline.'}),
    defineField({name: 'cardText', title: 'Card text on the homepage', type: 'text', rows: 4, group: 'card'}),
    defineField({name: 'cardShortText', title: 'Card text on the Our Services page', type: 'text', rows: 3, group: 'card'}),
    imageField('cardImage', 'Card photo (Our Services page)', 'card', 'Falls back to the background photo.'),
    photoGridField('cardPhotos', 'Card carousel photos (homepage)', 'card', 'Order here = order in the carousel. Drop several files onto the grid to add them at once, click a photo to set its alt text.'),

    faqsField('blocks'),
    toggle('showReviews', 'Reviews', 'blocks', 'Reviews that point at this service.'),
    toggle('showProjects', 'Projects', 'blocks', 'Projects that point at this service.'),
    toggle('showWhyChooseUs', 'Why Choose Us', 'blocks', 'Texts are in Shared Sections.'),
    toggle('showProcess', 'Process', 'blocks', 'Texts are in Shared Sections.'),
    toggle('showServiceArea', 'Service area', 'blocks', 'Texts are in Shared Sections.'),
    toggle('showAreas', 'Areas we serve (links to city pages)', 'blocks'),
    toggle('showLeadForm', 'Lead form', 'blocks'),

    ...seoFields('seo'),
    ...seoUrlFields('seo'),

    slugField('settings'),
    defineField({name: 'parent', title: 'Parent service page', type: 'reference', group: 'settings', to: [{type: 'servicePage'}], description: 'Optional. Nests this page under another one: URL becomes parent/slug and breadcrumbs follow.'}),
  ],
  preview: pagePreview,
  orderings: [{title: 'Title', name: 'titleAsc', by: [{field: 'title', direction: 'asc'}]}],
})
