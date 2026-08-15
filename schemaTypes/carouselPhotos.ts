import {defineField, defineType} from 'sanity'

// Photos of the three auto-rotating service carousels on the homepage.
// One document (id carousel-photos), three photo grids. Order in the grid =
// order in the carousel. Drag several files onto a grid to add them at once,
// hover a photo for the menu to remove it, click a photo to set its alt text.
const photoGrid = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    options: {layout: 'grid'},
    of: [
      {
        type: 'image',
        options: {hotspot: true},
        fields: [defineField({name: 'alt', title: 'Alt Text (SEO)', type: 'string'})],
      },
    ],
  })

export default defineType({
  name: 'carouselPhotos',
  title: 'Carousel Photos (Homepage)',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    photoGrid('cabinets', 'Kitchen Renovation & Cabinets'),
    photoGrid('countertops', 'Kitchen Countertops'),
    photoGrid('bathroom', 'Bathroom Remodel'),
  ],
  preview: {prepare: () => ({title: 'Carousel Photos (Homepage)'})},
})
