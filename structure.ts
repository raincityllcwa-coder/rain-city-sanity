import type {DefaultDocumentNodeResolver, StructureBuilder, StructureResolver} from 'sanity/structure'
import {
  CogIcon,
  DocumentIcon,
  DocumentsIcon,
  EyeClosedIcon,
  HelpCircleIcon,
  HomeIcon,
  ImagesIcon,
  MenuIcon,
  PinIcon,
  SearchIcon,
  StarIcon,
  TextIcon,
  TransferIcon,
  BlockContentIcon,
} from '@sanity/icons'
import SitePreview from './components/SitePreview'
import {POOL_LABELS} from './schemaTypes/labels'

// Phase 1 of the Studio restructure: same documents and field names as before,
// navigated by page. Every built-in page opens a short list of the documents
// that make it up (texts, photos, SEO, and the reviews, projects and FAQ
// shown on it). Phase 2 merges those documents into one per page.

type S = StructureBuilder

// A fixed document (one per type or per page key), opened by its known id.
const fixed = (S: S, type: string, id: string, title: string, itemId: string, icon?: any) =>
  S.listItem()
    .title(title)
    .id(itemId)
    .icon(icon)
    .child(S.document().schemaType(type).documentId(id).title(title))

// Reviews, projects or FAQ entries that appear on one page (pool value).
const onPage = (S: S, type: string, pool: string, title: string, icon: any) =>
  S.listItem()
    .title(title)
    .id(`${type}-${pool}`)
    .icon(icon)
    .child(
      S.documentList()
        .apiVersion('2023-01-01')
        .title(title)
        .schemaType(type)
        .filter(`_type == $type && $pool in showOn`)
        .params({type, pool})
        .defaultOrdering([{field: 'order', direction: 'asc'}])
        .initialValueTemplates([S.initialValueTemplateItem(`${type}-${pool}`)]),
    )

const seoMeta = (S: S, key: string) =>
  fixed(S, 'pageMeta', `meta-${key}`, 'SEO: title and description', `meta-${key}`, SearchIcon)

const sharedSections = (S: S, itemId: string, title: string) =>
  fixed(S, 'sharedCopy', 'copy-shared', title, itemId, BlockContentIcon)

// One of the three built-in service pages.
const builtInService = (S: S, key: string, title: string) =>
  S.listItem()
    .title(title)
    .id(`page-${key}`)
    .icon(DocumentIcon)
    .child(
      S.list()
        .title(title)
        .items([
          fixed(S, 'serviceCopy', `service-${key}`, 'Texts and photos', `service-${key}`, TextIcon),
          seoMeta(S, key),
          sharedSections(S, `shared-${key}`, 'Shared sections: Why Choose Us, Process, Service area'),
          S.divider(),
          onPage(S, 'review', key, 'Reviews on this page', StarIcon),
          onPage(S, 'project', key, 'Projects on this page', ImagesIcon),
          onPage(S, 'faq', key, 'FAQ on this page', HelpCircleIcon),
        ]),
    )

// A built-in page that only has SEO fields in Sanity so far.
const builtInSimple = (S: S, key: string, title: string) =>
  S.listItem()
    .title(title)
    .id(`page-${key}`)
    .icon(DocumentIcon)
    .child(S.list().title(title).items([seoMeta(S, key)]))

const pageDocs = (S: S, itemId: string, title: string, filter: string, templateId: string | null, icon: any) =>
  S.listItem()
    .title(title)
    .id(itemId)
    .icon(icon)
    .child(
      S.documentList()
        .apiVersion('2023-01-01')
        .title(title)
        .schemaType('page')
        .filter(`_type == "page" && ${filter}`)
        .defaultOrdering([{field: 'title', direction: 'asc'}])
        .initialValueTemplates(templateId ? [S.initialValueTemplateItem(templateId)] : []),
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
              S.listItem()
                .title('Home')
                .id('page-home')
                .icon(HomeIcon)
                .child(
                  S.list()
                    .title('Home')
                    .items([
                      fixed(S, 'homeCopy', 'copy-home', 'Hero: headline, subtitle, photo', 'copy-home', TextIcon),
                      fixed(S, 'carouselPhotos', 'carousel-photos', 'Services cards: carousel photos', 'carousel-photos', ImagesIcon),
                      fixed(S, 'aboutCopy', 'copy-about', 'About block: texts', 'copy-about', TextIcon),
                      fixed(S, 'siteSettings', 'siteSettings', 'About block: photos (Site Settings)', 'settings-from-home', CogIcon),
                      sharedSections(S, 'shared-home', 'Shared sections: services cards texts, Why Choose Us, Process'),
                      seoMeta(S, 'home'),
                      S.divider(),
                      onPage(S, 'review', 'homepage', 'Reviews on this page', StarIcon),
                      onPage(S, 'project', 'homepage', 'Projects on this page', ImagesIcon),
                    ]),
                ),
              builtInSimple(S, 'about', 'About'),
              builtInSimple(S, 'contact', 'Contact'),
              builtInSimple(S, 'our-services', 'Our Services'),
              builtInSimple(S, 'our-projects', 'Our Projects'),
              builtInService(S, 'kitchen-cabinets', 'Kitchen Cabinets'),
              builtInService(S, 'kitchen-countertops', 'Kitchen Countertops'),
              builtInService(S, 'bathroom-remodel', 'Bathroom Remodel'),
              S.divider(),
              pageDocs(S, 'pages-service', 'New service pages', 'pageType == "service"', 'page-service', DocumentIcon),
              pageDocs(S, 'pages-city', 'City pages', 'pageType == "city"', 'page-city', PinIcon),
              pageDocs(S, 'pages-hub', 'Hub pages', 'pageType == "hub"', 'page-hub', DocumentsIcon),
              pageDocs(S, 'pages-hidden', 'Hidden from search', 'noindex == true', null, EyeClosedIcon),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem('project').title('Projects').icon(ImagesIcon),
      S.documentTypeListItem('review').title('Reviews').icon(StarIcon),
      S.documentTypeListItem('faq').title('FAQ').icon(HelpCircleIcon),
      S.divider(),
      fixed(S, 'siteSettings', 'siteSettings', 'Site Settings', 'site-settings', CogIcon),
      fixed(S, 'navigation', 'navigation', 'Header and Footer', 'navigation', MenuIcon),
      fixed(S, 'sharedCopy', 'copy-shared', 'Shared Sections', 'shared-sections', BlockContentIcon),
      S.documentTypeListItem('redirect').title('Redirects').icon(TransferIcon),
    ])

// Documents that belong to a page get an "Open on site" tab.
const WITH_SITE_TAB = ['page', 'serviceCopy', 'pageMeta', 'homeCopy', 'aboutCopy', 'carouselPhotos']

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) =>
  WITH_SITE_TAB.includes(schemaType)
    ? S.document().views([S.view.form(), S.view.component(SitePreview).title('Open on site')])
    : S.document()

// Templates that pre-select the page when a review, project or FAQ entry is
// created from inside a page list.
export const poolTemplates = [
  ...Object.keys(POOL_LABELS).flatMap((pool) => [
    {id: `review-${pool}`, title: `Review (${POOL_LABELS[pool]})`, schemaType: 'review', value: {showOn: [pool]}},
    {id: `project-${pool}`, title: `Project (${POOL_LABELS[pool]})`, schemaType: 'project', value: {showOn: [pool]}},
  ]),
  ...Object.keys(POOL_LABELS)
    .filter((pool) => pool !== 'homepage')
    .map((pool) => ({id: `faq-${pool}`, title: `FAQ (${POOL_LABELS[pool]})`, schemaType: 'faq', value: {showOn: [pool]}})),
]
