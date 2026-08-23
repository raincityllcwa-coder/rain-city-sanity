import type {DefaultDocumentNodeResolver, StructureBuilder, StructureResolver} from 'sanity/structure'
import {
  BlockContentIcon,
  CogIcon,
  DocumentsIcon,
  EnvelopeIcon,
  EyeClosedIcon,
  HelpCircleIcon,
  HomeIcon,
  ImagesIcon,
  MenuIcon,
  PinIcon,
  StarIcon,
  TransferIcon,
  UsersIcon,
  WrenchIcon,
} from '@sanity/icons'
import SitePreview from './components/SitePreview'
import OnThisPage from './components/OnThisPage'

// One page = one document. Fixed pages first, then the lists of service and
// city pages, then the shared content and the site-wide settings.

type S = StructureBuilder

const fixed = (S: S, type: string, id: string, title: string, icon?: any) =>
  S.listItem()
    .title(title)
    .id(id)
    .icon(icon)
    .child(S.document().schemaType(type).documentId(id).title(title))

const pageList = (S: S, type: string, title: string, icon: any) =>
  S.listItem()
    .title(title)
    .id(`list-${type}`)
    .icon(icon)
    .child(
      S.documentTypeList(type)
        .title(title)
        .apiVersion('2023-01-01')
        .defaultOrdering([{field: 'title', direction: 'asc'}]),
    )

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Rain City Kitchen & Bath')
    .items([
      S.listItem()
        .title('Pages')
        .id('pages')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              fixed(S, 'homePage', 'homePage', 'Home', HomeIcon),
              fixed(S, 'aboutPage', 'aboutPage', 'About', UsersIcon),
              fixed(S, 'contactPage', 'contactPage', 'Contact', EnvelopeIcon),
              fixed(S, 'hubPage', 'hub-services', 'Our Services', DocumentsIcon),
              fixed(S, 'hubPage', 'hub-projects', 'Our Projects', DocumentsIcon),
              S.divider(),
              pageList(S, 'servicePage', 'Service pages', WrenchIcon),
              pageList(S, 'cityPage', 'City pages', PinIcon),
              S.listItem()
                .title('Hidden from search')
                .id('hidden-pages')
                .icon(EyeClosedIcon)
                .child(
                  S.documentList()
                    .title('Hidden from search')
                    .apiVersion('2023-01-01')
                    .filter('_type in ["servicePage", "cityPage"] && noindex == true')
                    .defaultOrdering([{field: 'title', direction: 'asc'}]),
                ),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem('project').title('Projects').icon(ImagesIcon),
      S.documentTypeListItem('review').title('Reviews').icon(StarIcon),
      S.documentTypeListItem('faq').title('FAQ').icon(HelpCircleIcon),
      S.divider(),
      fixed(S, 'siteSettings', 'siteSettings', 'Site Settings', CogIcon),
      fixed(S, 'navigation', 'navigation', 'Header and Footer', MenuIcon),
      fixed(S, 'sharedCopy', 'copy-shared', 'Shared Sections', BlockContentIcon),
      S.documentTypeListItem('redirect').title('Redirects').icon(TransferIcon),
    ])

// Page documents get two extra tabs: what is shown on the page, and the live URL.
const WITH_PAGE_TABS = ['servicePage', 'homePage']
const WITH_SITE_TAB = ['servicePage', 'cityPage', 'homePage', 'aboutPage', 'contactPage', 'hubPage']

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  const views: any[] = [S.view.form()]
  if (WITH_PAGE_TABS.includes(schemaType)) views.push(S.view.component(OnThisPage).title('On this page'))
  if (WITH_SITE_TAB.includes(schemaType)) views.push(S.view.component(SitePreview).title('Open on site'))
  return views.length > 1 ? S.document().views(views) : S.document()
}

// Templates used by the "Add a review/project for this page" links.
export const pageTemplates = [
  {
    id: 'review-for-service',
    title: 'Review for a service page',
    schemaType: 'review',
    parameters: [{name: 'serviceId', type: 'string'}],
    value: (params: {serviceId: string}) => ({services: [{_type: 'reference', _ref: params.serviceId}]}),
  },
  {
    id: 'project-for-service',
    title: 'Project for a service page',
    schemaType: 'project',
    parameters: [{name: 'serviceId', type: 'string'}],
    value: (params: {serviceId: string}) => ({services: [{_type: 'reference', _ref: params.serviceId}]}),
  },
  {id: 'review-homepage', title: 'Review on the homepage', schemaType: 'review', value: {showOnHomepage: true}},
  {id: 'project-homepage', title: 'Project on the homepage', schemaType: 'project', value: {showOnHomepage: true}},
]
