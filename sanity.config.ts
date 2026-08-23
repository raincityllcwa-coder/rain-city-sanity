import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure, defaultDocumentNode, pageTemplates} from './structure'

// Fixed documents the site reads by a known id. They can be edited and
// published, but never unpublished, deleted or duplicated from the Studio.
const FIXED_TYPES = ['homePage', 'aboutPage', 'contactPage', 'hubPage', 'siteSettings', 'navigation', 'sharedCopy',
  // old copy layer, kept until phase 4
  'carouselPhotos', 'homeCopy', 'aboutCopy', 'pageMeta', 'serviceCopy']

// What the global "Create new" button offers.
const GLOBAL_CREATE = ['servicePage', 'cityPage', 'project', 'review', 'faq', 'city', 'redirect']

export default defineConfig({
  name: 'rain-city',
  title: 'Rain City Kitchen & Bath',
  projectId: 'u2nxf2rv',
  dataset: 'production',
  plugins: [structureTool({structure, defaultDocumentNode}), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (prev) => [...prev, ...pageTemplates],
  },
  document: {
    actions: (prev, context) =>
      FIXED_TYPES.includes(context.schemaType)
        ? prev.filter(({action}) => action === 'publish' || action === 'discardChanges' || action === 'restore')
        : prev,
    newDocumentOptions: (prev, {creationContext}) =>
      creationContext.type === 'global' ? prev.filter((t) => GLOBAL_CREATE.includes(t.templateId)) : prev,
  },
})
