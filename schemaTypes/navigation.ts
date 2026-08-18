import {defineField, defineType} from 'sanity'

// Site navigation, one document (id navigation). Each item is either a link
// to an SEO page document (URL computed automatically) or a plain URL for the
// built-in pages (/kitchen-cabinets, /our-projects, ...).
const navItem = {
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'page', title: 'SEO page', type: 'reference', to: [{type: 'page'}], description: 'Pick a page document, or leave empty and use the URL below.'}),
    defineField({name: 'href', title: 'URL (for built-in pages)', type: 'string', description: 'Example: /kitchen-cabinets. Ignored if an SEO page is picked.'}),
  ],
  preview: {select: {title: 'label', page: 'page.slug.current', href: 'href'}, prepare: ({title, page, href}: any) => ({title, subtitle: page ? `page: ${page}` : href || ''})},
}

export default defineType({
  name: 'navigation',
  title: 'Navigation (menu and footer)',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'servicesMenu', title: 'Header: Services dropdown', type: 'array',
      description: 'Groups shown in the Services dropdown. Leave empty to keep the plain "Our Services" link.',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'group', title: 'Group title', type: 'string', description: 'Example: Kitchen, Bathroom, Countertops'}),
          defineField({name: 'items', title: 'Links', type: 'array', of: [navItem]}),
        ],
        preview: {select: {title: 'group'}},
      }],
    }),
    defineField({name: 'footerServices', title: 'Footer: Services column', type: 'array', of: [navItem], description: 'Leave empty to keep the built-in three links.'}),
    defineField({name: 'footerCities', title: 'Footer: Service Area column (main cities)', type: 'array', of: [navItem], description: 'The 8 to 12 main cities. Linked from every page, so they carry the most internal-link weight. Leave empty to keep the built-in text list.'}),
    defineField({name: 'areasBlockTitle', title: '"Areas we serve" block: heading', type: 'string', initialValue: 'Areas We Serve'}),
    defineField({name: 'servicesBlockTitle', title: '"Our services" block: heading', type: 'string', initialValue: 'Our Remodeling Services'}),
  ],
  preview: {prepare: () => ({title: 'Navigation (menu and footer)'})},
})
