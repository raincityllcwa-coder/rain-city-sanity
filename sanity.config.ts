import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure, defaultDocumentNode, poolTemplates} from './structure'

// Fixed documents (one per type, or one per page key) that the site reads by
// a known id. They can be edited and published, but never unpublished,
// deleted or duplicated from the Studio: unpublishing one silently makes the
// site fall back to its built-in content.
const FIXED_TYPES = ['siteSettings', 'navigation', 'carouselPhotos', 'homeCopy', 'sharedCopy', 'aboutCopy', 'pageMeta', 'serviceCopy']

// What the global "Create new" button offers. Page-specific templates
// (review for Kitchen Cabinets, ...) are reachable from the page lists only.
const GLOBAL_CREATE = ['project', 'review', 'faq', 'redirect', 'page-service', 'page-city', 'page-hub']

export default defineConfig({
  name: 'rain-city',
  title: 'Rain City Kitchen & Bath',
  projectId: 'u2nxf2rv',
  dataset: 'production',
  plugins: [structureTool({structure, defaultDocumentNode}), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev.filter((t) => t.schemaType !== 'page'),
      {id: 'page-service', title: 'Service page', schemaType: 'page', value: {pageType: 'service'}},
      {id: 'page-city', title: 'City page', schemaType: 'page', value: {pageType: 'city', showRelatedServices: true}},
      {id: 'page-hub', title: 'Hub page', schemaType: 'page', value: {pageType: 'hub'}},
      ...poolTemplates,
    ],
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
