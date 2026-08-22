import {defineField, defineType} from 'sanity'
import {TransferIcon} from '@sanity/icons'

// URL redirects, written into the site's _redirects file on every build.
// Use when a page is renamed, merged or removed.
export default defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  icon: TransferIcon,
  fields: [
    defineField({name: 'from', title: 'From (old path)', type: 'string', description: 'Starts with a slash. Example: /kitchen-remodeling', validation: (r) => r.required().regex(/^\/[^\s]*$/, {name: 'path'})}),
    defineField({name: 'to', title: 'To (new path or full URL)', type: 'string', description: 'Example: /kitchen-remodel or https://raincityllc.com/kitchen-remodel', validation: (r) => r.required()}),
    defineField({name: 'permanent', title: 'Permanent (301)', type: 'boolean', initialValue: true, description: 'Off = temporary 302'}),
    defineField({name: 'note', title: 'Why (internal note)', type: 'string'}),
  ],
  preview: {select: {title: 'from', subtitle: 'to'}},
})
