import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// Fixed documents (one per type, or one per page key) that the site reads by
// a known id. They can be edited and published, but never unpublished,
// deleted or duplicated from the Studio: unpublishing one silently makes the
// site fall back to its built-in content, which looks like "the admin lost
// my photos".
const FIXED_TYPES = ['siteSettings', 'carouselPhotos', 'homeCopy', 'sharedCopy', 'aboutCopy', 'pageMeta', 'serviceCopy']

export default defineConfig({
  name: 'rain-city',
  title: 'Rain City Kitchen & Bath',
  projectId: 'u2nxf2rv',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) =>
      FIXED_TYPES.includes(context.schemaType)
        ? prev.filter(({action}) => action === 'publish' || action === 'discardChanges' || action === 'restore')
        : prev,
    newDocumentOptions: (prev, {creationContext}) =>
      creationContext.type === 'global' ? prev.filter((t) => !FIXED_TYPES.includes(t.templateId)) : prev,
  },
})
