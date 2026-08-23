import project from './project'
import review from './review'
import faq from './faq'
import siteSettings from './siteSettings'
import redirect from './redirect'
import navigation from './navigation'
import sharedCopy from './sharedCopy'
import homePage from './homePage'
import aboutPage from './aboutPage'
import contactPage from './contactPage'
import hubPage from './hubPage'
import servicePage from './servicePage'
import cityPage from './cityPage'
import city from './city'
// Old copy layer, superseded by the page documents above. Kept registered
// until the old documents are removed (phase 4), never shown in the Studio.
import page from './page'
import pageMeta from './pageMeta'
import homeCopy from './homeCopy'
import aboutCopy from './aboutCopy'
import serviceCopy from './serviceCopy'
import carouselPhotos from './carouselPhotos'

export const schemaTypes = [
  homePage, aboutPage, contactPage, hubPage, servicePage, cityPage,
  project, review, faq, city,
  siteSettings, navigation, sharedCopy, redirect,
  page, pageMeta, homeCopy, aboutCopy, serviceCopy, carouselPhotos,
]
