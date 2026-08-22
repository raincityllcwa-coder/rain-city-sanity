import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

const NOT_LIVE = 'Not used on the site yet: this value is still written in the site code. It becomes live in phase 2 of the Studio restructure.'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'company', title: 'Company', default: true},
    {name: 'photos', title: 'Photos'},
  ],
  fields: [
    defineField({name: 'companyName', title: 'Company name', type: 'string', group: 'company', description: NOT_LIVE}),
    defineField({name: 'phone', title: 'Phone', type: 'string', group: 'company', description: NOT_LIVE}),
    defineField({name: 'email', title: 'Email', type: 'string', group: 'company', description: NOT_LIVE}),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      group: 'company',
      description: NOT_LIVE,
      fields: [
        defineField({name: 'street', title: 'Street', type: 'string'}),
        defineField({name: 'city', title: 'City', type: 'string'}),
        defineField({name: 'state', title: 'State', type: 'string'}),
        defineField({name: 'zip', title: 'Zip', type: 'string'}),
      ],
    }),
    defineField({
      name: 'ownerPhoto',
      title: 'Owner photo',
      type: 'image',
      group: 'photos',
      description: 'Shown in the Why Choose Us section on service pages.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          initialValue: 'Alex - Owner of Rain City Kitchen & Bath, kitchen remodeling company in Bellevue',
        }),
      ],
    }),
    defineField({
      name: 'aboutPhoto1',
      title: 'Homepage About block: photo 1 (kitchen project)',
      type: 'image',
      group: 'photos',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt Text (SEO)', type: 'string'})],
    }),
    defineField({
      name: 'aboutPhoto2',
      title: 'Homepage About block: photo 2 (team)',
      type: 'image',
      group: 'photos',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt Text (SEO)', type: 'string'})],
    }),
    defineField({
      name: 'aboutPhoto3',
      title: 'Homepage About block: photo 3 (happy customers)',
      type: 'image',
      group: 'photos',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt Text (SEO)', type: 'string'})],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
