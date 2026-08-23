import {defineField, defineType} from 'sanity'
import {EarthGlobeIcon} from '@sanity/icons'

// City directory. City pages, projects and reviews point at these documents,
// so a city is picked from a list instead of typed (no typos, no mismatches).
export default defineType({
  name: 'city',
  title: 'City',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required(), description: 'Example: Kirkland'}),
    defineField({name: 'state', title: 'State', type: 'string', initialValue: 'WA'}),
  ],
  preview: {select: {title: 'name', subtitle: 'state'}},
  orderings: [{title: 'Name', name: 'nameAsc', by: [{field: 'name', direction: 'asc'}]}],
})
