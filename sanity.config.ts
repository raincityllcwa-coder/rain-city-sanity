import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// Fixed documents (one per type, or one per page key) that the site reads by
// a known id. They can be edited and published, but never unpublished,
// deleted or duplicated from the Studio: unpublishing one silently makes the
// site fall back to its built-in content.
const FIXED_TYPES = ['siteSettings', 'navigation', 'carouselPhotos', 'homeCopy', 'sharedCopy', 'aboutCopy', 'pageMeta', 'serviceCopy']

const singleton = (S: any, type: string, id: string, title: string) =>
  S.listItem().title(title).id(id).child(S.document().schemaType(type).documentId(id).title(title))

export default defineConfig({
  name: 'rain-city',
  title: 'Rain City Kitchen & Bath',
  projectId: 'u2nxf2rv',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('SEO Pages').child(
              S.list().title('SEO Pages').items([
                S.listItem().title('All pages').child(S.documentTypeList('page').title('All pages')),
                S.listItem().title('Service pages').child(S.documentList().title('Service pages').schemaType('page').filter('_type == "page" && pageType == "service"')),
                S.listItem().title('City pages').child(S.documentList().title('City pages').schemaType('page').filter('_type == "page" && pageType == "city"')),
                S.listItem().title('Hub pages').child(S.documentList().title('Hub pages').schemaType('page').filter('_type == "page" && pageType == "hub"')),
                S.listItem().title('Hidden (noindex) pages').child(S.documentList().title('Hidden pages').schemaType('page').filter('_type == "page" && noindex == true')),
              ]),
            ),
            S.divider(),
            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('review').title('Reviews'),
            S.documentTypeListItem('faq').title('FAQ'),
            S.divider(),
            S.listItem().title('Site texts and photos').child(
              S.list().title('Site texts and photos').items([
                singleton(S, 'homeCopy', 'copy-home', 'Homepage Texts'),
                singleton(S, 'sharedCopy', 'copy-shared', 'Shared Section Texts'),
                singleton(S, 'aboutCopy', 'copy-about', 'About Us Texts'),
                singleton(S, 'carouselPhotos', 'carousel-photos', 'Carousel Photos (Homepage)'),
                S.documentTypeListItem('serviceCopy').title('Service Page Texts (3 built-in pages)'),
                S.documentTypeListItem('pageMeta').title('Page Meta (built-in pages)'),
                singleton(S, 'siteSettings', 'siteSettings', 'Site Settings'),
              ]),
            ),
            singleton(S, 'navigation', 'navigation', 'Navigation (menu and footer)'),
            S.documentTypeListItem('redirect').title('Redirects'),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev.filter((t) => t.schemaType !== 'page'),
      {id: 'page-service', title: 'Service page', schemaType: 'page', value: {pageType: 'service'}},
      {id: 'page-city', title: 'City page', schemaType: 'page', value: {pageType: 'city', showRelatedServices: true}},
      {id: 'page-hub', title: 'Hub page', schemaType: 'page', value: {pageType: 'hub'}},
    ],
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
