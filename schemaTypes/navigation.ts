import {defineField, defineType} from 'sanity'
import {MenuIcon} from '@sanity/icons'

// Site navigation, one document (id navigation). Each item is either a link
// to a page document (URL computed automatically) or a plain URL for the
// built-in pages (/kitchen-cabinets, /our-projects, ...).
const navItem = {
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'page', title: 'Page added in Sanity', type: 'reference', to: [{type: 'page'}], description: 'Pick a page document, or leave empty and use the URL below.'}),
    defineField({name: 'href', title: 'URL (for built-in pages)', type: 'string', description: 'Example: /kitchen-cabinets. Ignored if a page is picked above.'}),
  ],
  preview: {select: {title: 'label', page: 'page.slug.current', href: 'href'}, prepare: ({title, page, href}: any) => ({title, subtitle: page ? `page: ${page}` : href || ''})},
}

export default defineType({
  name: 'navigation',
  title: 'Header and Footer',
  type: 'document',
  icon: MenuIcon,
  groups: [
    {name: 'header', title: 'Header', default: true},
    {name: 'footer', title: 'Footer'},
    {name: 'blocks', title: 'Link blocks on pages'},
  ],
  fields: [
    defineField({
      name: 'servicesMenu', title: 'Services dropdown', type: 'array', group: 'header',
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
    defineField({name: 'footerServices', title: 'Services column', type: 'array', group: 'footer', of: [navItem], description: 'Leave empty to keep the built-in three links.'}),
    defineField({name: 'footerCities', title: 'Service Area column (main cities)', type: 'array', group: 'footer', of: [navItem], description: 'The 8 to 12 main cities. Linked from every page, so they carry the most internal-link weight. Leave empty to keep the built-in text list.'}),
    defineField({name: 'areasBlockTitle', title: '"Areas we serve" block: heading', type: 'string', group: 'blocks', initialValue: 'Areas We Serve', description: 'The block with links to city pages, shown on pages added in Sanity.'}),
    defineField({name: 'servicesBlockTitle', title: '"Our services" block: heading', type: 'string', group: 'blocks', initialValue: 'Our Remodeling Services', description: 'The block with links to service pages, shown on pages added in Sanity.'}),
  ],
  preview: {prepare: () => ({title: 'Header and Footer'})},
})
