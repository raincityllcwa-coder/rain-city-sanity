import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

const alt = defineField({name: 'alt', title: 'Alt Text (SEO)', type: 'string'})

// Facts about the company used all over the site: phone, address, hours,
// Google rating, owner. Edit here once, every page updates.
export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'company', title: 'Company', default: true},
    {name: 'reviews', title: 'Google reviews'},
    {name: 'owner', title: 'Owner'},
    {name: 'old', title: 'Old fields'},
  ],
  fields: [
    defineField({name: 'companyName', title: 'Company name', type: 'string', group: 'company'}),
    defineField({name: 'phone', title: 'Phone (as shown)', type: 'string', group: 'company', description: 'Example: (253) 466-8709. Used in the header, footer, forms and schema.org.'}),
    defineField({name: 'email', title: 'Email', type: 'string', group: 'company'}),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      group: 'company',
      fields: [
        defineField({name: 'street', title: 'Street', type: 'string'}),
        defineField({name: 'city', title: 'City', type: 'string'}),
        defineField({name: 'state', title: 'State', type: 'string'}),
        defineField({name: 'zip', title: 'Zip', type: 'string'}),
      ],
    }),
    defineField({
      name: 'hours',
      title: 'Business hours',
      type: 'object',
      group: 'company',
      description: 'Shown on the Contact page and in schema.org. Use 24-hour times for the open/close fields (08:00, 18:00).',
      fields: [
        defineField({name: 'weekdaysLabel', title: 'Weekdays, as shown', type: 'string', description: 'Example: Monday - Friday: 8:00 AM - 6:00 PM'}),
        defineField({name: 'weekdaysOpen', title: 'Weekdays open', type: 'string'}),
        defineField({name: 'weekdaysClose', title: 'Weekdays close', type: 'string'}),
        defineField({name: 'saturdayLabel', title: 'Saturday, as shown', type: 'string', description: 'Example: Saturday: 9:00 AM - 4:00 PM'}),
        defineField({name: 'saturdayOpen', title: 'Saturday open', type: 'string'}),
        defineField({name: 'saturdayClose', title: 'Saturday close', type: 'string'}),
        defineField({name: 'sundayLabel', title: 'Sunday, as shown', type: 'string', description: 'Example: Sunday: Closed'}),
      ],
    }),
    defineField({name: 'licenseNumber', title: 'WA contractor license number', type: 'string', group: 'company'}),
    defineField({name: 'instagramUrl', title: 'Instagram URL', type: 'url', group: 'company'}),

    defineField({name: 'googleReviewsUrl', title: 'Google reviews link', type: 'url', group: 'reviews'}),
    defineField({name: 'reviewCount', title: 'Number of Google reviews', type: 'number', group: 'reviews', description: 'Shown as "5.0 (131 Google Reviews)" and in schema.org. Update when the count grows.'}),
    defineField({name: 'rating', title: 'Rating', type: 'string', group: 'reviews', description: 'Example: 5.0'}),

    defineField({name: 'ownerName', title: 'Name', type: 'string', group: 'owner'}),
    defineField({name: 'ownerRole', title: 'Role', type: 'string', group: 'owner'}),
    defineField({name: 'ownerPhoto', title: 'Photo', type: 'image', group: 'owner', description: 'Shown in the Why Choose Us section.', options: {hotspot: true}, fields: [alt]}),
    defineField({name: 'ownerQuote', title: 'Quote', type: 'text', rows: 3, group: 'owner', description: 'For the owner block on city pages.'}),

    defineField({name: 'aboutPhoto1', title: 'Homepage About block: photo 1 (old)', type: 'image', group: 'old', deprecated: {reason: 'Moved to Home > About block.'}, readOnly: true, hidden: ({value}) => value === undefined, fields: [alt]}),
    defineField({name: 'aboutPhoto2', title: 'Homepage About block: photo 2 (old)', type: 'image', group: 'old', deprecated: {reason: 'Moved to Home > About block.'}, readOnly: true, hidden: ({value}) => value === undefined, fields: [alt]}),
    defineField({name: 'aboutPhoto3', title: 'Homepage About block: photo 3 (old)', type: 'image', group: 'old', deprecated: {reason: 'Moved to Home > About block.'}, readOnly: true, hidden: ({value}) => value === undefined, fields: [alt]}),
  ],
  preview: {prepare: () => ({title: 'Site Settings'})},
})
