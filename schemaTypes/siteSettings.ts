import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'ownerPhoto',
      title: 'Owner Photo (Why Choose Us section)',
      type: 'image',
      options: { hotspot: true },
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
      title: 'About Us — Photo 1 (kitchen project)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'aboutPhoto2',
      title: 'About Us — Photo 2 (team / contractors)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'aboutPhoto3',
      title: 'About Us — Photo 3 (happy customers)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'companyName', title: 'Company Name', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        defineField({ name: 'street', title: 'Street', type: 'string' }),
        defineField({ name: 'city', title: 'City', type: 'string' }),
        defineField({ name: 'state', title: 'State', type: 'string' }),
        defineField({ name: 'zip', title: 'Zip', type: 'string' }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
