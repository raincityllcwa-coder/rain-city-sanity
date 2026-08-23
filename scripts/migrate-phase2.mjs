// Phase 2 migration: one page = one document.
//
// Builds homePage, aboutPage, contactPage, two hubPage and three servicePage
// documents from the old copy/meta documents (homeCopy, aboutCopy,
// carouselPhotos, serviceCopy, pageMeta, sharedCopy, siteSettings) plus the
// site's own hardcoded fallback texts, so every field holds the value the
// site shows today. Converts the showOn pools of reviews and projects to
// references. Copies the two demo page drafts to the new types. Nothing old
// is deleted (that is phase 4).
//
// Dry run by default. Usage:
//   SANITY_WRITE_TOKEN=... node scripts/migrate-phase2.mjs          (preview)
//   SANITY_WRITE_TOKEN=... node scripts/migrate-phase2.mjs --apply  (write)
// Existing new documents are never overwritten unless --force is given.

import {createClient} from '@sanity/client'
import {randomUUID} from 'node:crypto'

const APPLY = process.argv.includes('--apply')
const FORCE = process.argv.includes('--force')
const token = process.env.SANITY_WRITE_TOKEN
if (!token) {
  console.error('SANITY_WRITE_TOKEN is not set')
  process.exit(1)
}
const client = createClient({projectId: 'u2nxf2rv', dataset: 'production', apiVersion: '2023-01-01', token, useCdn: false})

const key = () => randomUUID().replace(/-/g, '').slice(0, 12)
const ref = (id) => ({_type: 'reference', _ref: id, _key: key()})
const withKeys = (arr) => (arr || []).map((x) => (x && typeof x === 'object' && !x._key ? {...x, _key: key()} : x))
const pick = (...values) => values.find((v) => v !== undefined && v !== null && v !== '')
const SERVICES = ['kitchen-cabinets', 'kitchen-countertops', 'bathroom-remodel']
const GRID = {'kitchen-cabinets': 'cabinets', 'kitchen-countertops': 'countertops', 'bathroom-remodel': 'bathroom'}
const PAGE_ID = (k) => `service-page-${k}`

// Texts the site falls back to when a Sanity field is empty. Copied from the
// page and component sources so the new documents hold the effective values.
const F = {
  'kitchen-cabinets': {
    metaTitle: 'Kitchen Renovation & Cabinets in Bellevue, WA | Rain City Kitchen & Bath',
    metaDescription: 'Custom and standard kitchen cabinet installation in Bellevue & Seattle. Shaker, Flat door styles. Free estimate. 5-star rated by 131+ homeowners.',
    heroTitle: 'Kitchen Renovation & Cabinets',
    heroSubtitle: 'Transform your kitchen with custom and standard cabinet solutions designed to match your unique style and needs.',
    contentTitle: 'Premium Cabinet Solutions',
    contentParagraphs: [
      'At Rain City Kitchen & Bath, we specialize in both standard and custom cabinets to meet your unique needs. Our clients can choose from a variety of styles and color schemes, with Shaker and Flat door styles being the most popular.',
      "Whether you're looking for a complete kitchen transformation or updating your existing cabinets, our team works closely with you to design and install cabinets that maximize functionality while enhancing the beauty of your space.",
    ],
    cardTitle: 'Kitchen Renovation & Cabinets',
    cardText: 'As a leading kitchen remodeling company in Bellevue and Seattle, we specialize in custom kitchen cabinets to meet your unique needs. Our clients can choose from a variety of styles and colors, with Shaker and Flat door styles remaining the most popular for kitchen renovation in 2026.',
    cardShortText: 'Transform your kitchen with custom cabinets. Choose from Shaker, Flat, or custom door styles in a variety of colors and finishes.',
  },
  'kitchen-countertops': {
    metaTitle: 'Natural Stone Kitchen Countertops in Bellevue, WA | Rain City',
    metaDescription: 'Natural stone kitchen countertop installation in Bellevue & Seattle. Dolomite, granite, marble, quartzite, schist, and soapstone. Fabrication and installation.',
    heroTitle: 'Natural Stone Kitchen Countertops',
    heroSubtitle: 'Premium kitchen countertops in dolomite, granite, marble, quartzite, schist, and soapstone.',
    contentTitle: 'Natural Stone Countertop Materials',
    contentParagraphs: [
      'We offer a wide variety of natural stone countertops, including dolomite, granite, marble, quartzite, schist, and soapstone, available in different styles, colors, and thicknesses to suit your needs.',
      'Each stone has its own character and strengths. Our team will help you choose the right material for your kitchen based on your lifestyle, design preferences, and budget.',
    ],
    cardTitle: 'Kitchen Countertops',
    cardText: 'We offer a wide variety of natural stone countertops, including dolomite, granite, marble, quartzite, schist, and soapstone, available in different styles, colors, and thicknesses. Our kitchen remodeling services include delivery, precise fabrication, and professional installation across Bellevue, Kirkland, Redmond, and the Eastside.',
    cardShortText: 'Premium natural stone countertops in dolomite, granite, marble, quartzite, schist, and soapstone. Complete service from templating to installation.',
  },
  'bathroom-remodel': {
    metaTitle: 'Bathroom Remodel - Expert Renovation | Rain City Kitchen & Bath',
    metaDescription: 'Complete bathroom remodeling in Bellevue & Seattle. Porcelain, natural stone, glass tile. Spa-like design. Free estimate. 5-star rated.',
    heroTitle: 'Complete Bathroom Remodeling',
    heroSubtitle: 'Transform your bathroom into a luxurious retreat with our comprehensive remodeling services.',
    contentTitle: 'Complete Bathroom Transformation',
    contentParagraphs: [
      'Transform your bathroom with our high-quality materials, including porcelain tile, natural stone, or glass tile. We offer a wide range of styles and finishes to create the perfect look for your space.',
      "Whether you're looking for a spa-like master bathroom or a functional family bath, our team creates spaces that combine beauty, durability, and practicality.",
    ],
    cardTitle: 'Bathroom Remodel',
    cardText: 'Looking for bathroom remodeling services near you? Transform your bathroom with our high-quality materials, including porcelain tile, natural stone, or glass tile. We offer a wide range of styles and finishes to create the perfect look for your space.',
    cardShortText: 'Complete bathroom transformations with premium tile, modern fixtures, and expert craftsmanship.',
  },
  home: {
    metaTitle: 'Remodeling a Kitchen in Bellevue? Get a Free In-Home Estimate',
    metaDescription: 'Cabinets, countertops, full renovations across Bellevue and the Eastside. Licensed and insured, 131 five-star reviews. Call (253) 466-8709.',
    heroTitle: 'Premium Kitchen & Bath Remodeling Company in Bellevue, WA',
    heroSubtitle: 'Trusted kitchen remodeling company serving Seattle, Kirkland, Redmond & the Eastside.',
    heroSubtitleExtra: 'We provide expert craftsmanship and personalized service for your dream kitchen or bathroom renovation.',
    heroAlt: 'Bright modern kitchen remodel in Bellevue WA by Rain City Kitchen & Bath',
    servicesHeading: 'Kitchen Remodeling & Bathroom Renovation Services',
    about: {
      heading: 'About Us',
      introParagraph1: "Welcome to Rain City Kitchen & Bath, a trusted kitchen remodeling company based in Bellevue, WA. I'm Alex, the owner and general manager, and I'm here to personally oversee your project from start to finish.",
      introParagraph2: "From the very first day, I aim to build a friendly and positive relationship with each customer. Whether you're searching for kitchen remodeling near me or planning a complete bathroom renovation, our goal is to make the experience smooth, transparent, and enjoyable.",
      gcHeading: 'We are General Contractors',
      gcParagraph1: 'My team and I are experienced general contractors equipped with all the necessary licenses and documentation to undertake projects of any scale and complexity. Our expertise spans the entire range of home improvement and renovation services. From the design phase to the assembly and installation of kitchen cabinets, we handle every aspect with precision and care.',
      gcParagraph2: 'Our capabilities extend to complex renovation projects, including painting, flooring, tiling, and various related tasks. Whether you need a simple upgrade or a comprehensive transformation, we are committed to delivering high-quality workmanship and exceptional results tailored to your needs.',
      emotionsHeading: 'We Give Unforgettable Emotions',
      emotionsParagraph: "I am passionate about delivering not only exceptional results but also a memorable experience. As a positive and open person, I love bringing joy and a good mood to my clients. That's why, at the end of each project, I celebrate with you by playing a special trombone tune, making your day truly unforgettable!",
      officeHeading: 'Visit Our Office in the Heart of Bellevue',
      officeParagraph: "Our office is conveniently located in the heart of Downtown Bellevue. We'd love to invite you over for a coffee, walk through our showroom, and discuss your kitchen or bathroom remodel in person.",
    },
    aboutAlts: ['Kitchen renovation project in Bellevue WA', 'Licensed general contractors for kitchen renovation Bellevue', 'Happy customers after bathroom remodeling in Bellevue'],
  },
  about: {
    metaTitle: 'About Us - Rain City Kitchen & Bath | Licensed Contractors in Bellevue, WA',
    metaDescription: 'Meet Alex, owner of Rain City Kitchen & Bath. Licensed general contractors with expertise in kitchen and bathroom remodeling across Bellevue, Seattle, Kirkland & Redmond. 5-star rated.',
    title: 'About Us',
    introParagraph1: "Welcome to Rain City Kitchen & Bath. I'm Alex, owner, general manager, and the person you'll work with from your first call to the final walkthrough. We're a licensed kitchen and bathroom remodeling company based in Bellevue, WA, serving Seattle, Kirkland, Redmond, and the rest of the Eastside. After 100+ completed remodels and over a hundred five-star reviews, one thing is clear: kitchens and bathrooms are where families actually live, and getting them right matters. My job is to make sure you get a remodel you'll love, finished on time, on budget, and built the way I'd build it for my own home.",
    introParagraph2: "When you're searching for kitchen remodel companies near you, what you really want is someone who shows up when they said they would, fixes problems before you have to point them out, and treats your house with respect. That's how we work. Every project has one lead you can text directly the whole way through. No subcontractor chains, no chasing answers, no surprises on the invoice.",
    gcHeading: 'We are General Contractors',
    gcParagraph1: 'My team and I are experienced general contractors equipped with all the necessary licenses and documentation to undertake projects of any scale and complexity. Our expertise spans the entire range of home improvement and renovation services. From the design phase to the assembly and installation of kitchen cabinets, we handle every aspect with precision and care.',
    gcParagraph2: 'Our capabilities extend to complex renovation projects, including painting, flooring, tiling, and various related tasks. Whether you need a simple upgrade or a comprehensive transformation, we are committed to delivering high-quality workmanship and exceptional results tailored to your needs.',
    licenseLabel: 'Washington State Contractor License:',
    emotionsHeading: 'We Give Unforgettable Emotions',
    emotionsParagraph: "I am passionate about delivering not only exceptional results but also a memorable experience. As a positive and open person, I love bringing joy and a good mood to my clients. That's why, at the end of each project, I celebrate with you by playing a special trombone tune, making your day truly unforgettable!",
    videoButtonLabel: 'Watch Video',
  },
  contact: {
    metaTitle: 'Contact Us - Free Estimate | Rain City Kitchen & Bath | Bellevue, WA',
    metaDescription: 'Get a free consultation and estimate for your kitchen or bathroom remodel. Call (253) 466-8709. Located at 10900 NE 4th St, Bellevue, WA. Mon-Fri 8-6, Sat 9-4.',
    title: 'Contact Us',
    intro: 'Get in touch with us for a free consultation and estimate on your kitchen or bathroom project.',
  },
  'our-services': {
    metaTitle: 'Our Services - Kitchen Renovation & Cabinets, Countertops, Bathroom | Rain City',
    metaDescription: 'Kitchen cabinets, countertop installation, and bathroom remodeling services in Bellevue, Seattle & surrounding areas. Licensed contractors. Free estimates.',
    title: 'Kitchen & Bathroom Remodeling in Bellevue, WA',
    subtitle: 'Licensed contractor serving Seattle, Kirkland, Redmond, and the Eastside since 2020. Custom cabinets, countertops, full bathroom renovations, and complete kitchen remodels.',
  },
  'our-projects': {
    metaTitle: 'Kitchen and Bathroom Remodeling Projects in Seattle Area | Rain City Kitchen & Bath',
    metaDescription: 'Browse our completed kitchen and bathroom remodels across Bellevue, Seattle, Kirkland, Redmond, and the Eastside. Custom-designed and built by Rain City Kitchen & Bath.',
    title: 'Our Recent Kitchen and Bathroom Remodeling Projects',
    subtitle: 'Browse our completed kitchen and bathroom remodels across Bellevue, Seattle, Kirkland, Redmond, and the Eastside.',
  },
}

const SITE = {
  companyName: 'Rain City Kitchen & Bath',
  phone: '(253) 466-8709',
  address: {street: '10900 NE 4th St Unit 2300', city: 'Bellevue', state: 'WA', zip: '98004'},
  hours: {
    weekdaysLabel: 'Monday - Friday: 8:00 AM - 6:00 PM', weekdaysOpen: '08:00', weekdaysClose: '18:00',
    saturdayLabel: 'Saturday: 9:00 AM - 4:00 PM', saturdayOpen: '09:00', saturdayClose: '16:00',
    sundayLabel: 'Sunday: Closed',
  },
  licenseNumber: 'BIRIUCL808C6',
  instagramUrl: 'https://www.instagram.com/alex_biriuk/',
  reviewCount: 131,
  rating: '5.0',
  ownerName: 'Aleksandr Biriuk',
  ownerRole: 'Owner / General Chief Operating Officer',
}

const load = async () => {
  const q = (id) => client.fetch('*[_id == $id][0]', {id})
  const [shared, home, about, carousel, settings] = await Promise.all([
    q('copy-shared'), q('copy-home'), q('copy-about'), q('carousel-photos'), q('siteSettings'),
  ])
  const meta = {}
  for (const k of ['home', 'about', 'contact', 'our-services', 'our-projects', ...SERVICES]) meta[k] = await q(`meta-${k}`)
  const svc = {}
  for (const k of SERVICES) svc[k] = await q(`service-${k}`)
  const faqs = await client.fetch('*[_type == "faq" && !(_id in path("drafts.**"))] | order(order asc){_id, showOn}')
  const reviews = await client.fetch('*[_type == "review"]{_id, showOn, services, showOnHomepage}')
  const projects = await client.fetch('*[_type == "project"]{_id, showOn, services, showOnHomepage}')
  const demoCity = await client.fetch('*[_id == "drafts.page-kirkland-wa"][0]')
  const demoSub = await client.fetch('*[_id == "drafts.page-tub-to-shower-conversion"][0]')
  return {shared, home, about, carousel, settings, meta, svc, faqs, reviews, projects, demoCity, demoSub}
}

const image = (img, altFallback) => {
  if (!img?.asset) return undefined
  const out = {...img}
  if (!out._type) out._type = 'image'
  if (altFallback && !out.alt) out.alt = altFallback
  return out
}

const build = (d) => {
  const docs = []
  const cardIndex = {'kitchen-cabinets': 0, 'kitchen-countertops': 1, 'bathroom-remodel': 2}

  for (const k of SERVICES) {
    const s = d.svc[k] || {}
    const m = d.meta[k] || {}
    const f = F[k]
    const card = d.shared?.serviceCards?.[cardIndex[k]] || {}
    const faqRefs = d.faqs.filter((q) => (q.showOn || []).includes(k)).map((q) => ({...ref(q._id)}))
    docs.push({
      _id: PAGE_ID(k),
      _type: 'servicePage',
      title: pick(s.heroTitle, f.heroTitle),
      subtitle: pick(s.heroSubtitle, f.heroSubtitle),
      heroImage: image(s.heroImage),
      introTitle: pick(s.contentTitle, f.contentTitle),
      introParagraphs: s.contentParagraphs?.length ? withKeys(s.contentParagraphs) : f.contentParagraphs,
      sliderPhotos: withKeys(s.sliderPhotos),
      cardTitle: pick(card.title, f.cardTitle),
      cardText: pick(card.text, f.cardText),
      cardShortText: f.cardShortText,
      cardImage: image(s.cardImage),
      cardPhotos: withKeys(d.carousel?.[GRID[k]]),
      faqs: faqRefs,
      showReviews: true, showProjects: true, showWhyChooseUs: true, showProcess: true, showServiceArea: true, showAreas: true, showLeadForm: true,
      metaTitle: pick(m.metaTitle, f.metaTitle),
      metaDescription: pick(m.metaDescription, f.metaDescription),
      noindex: false,
      slug: {_type: 'slug', current: k},
    })
  }

  const h = d.home || {}
  const a = d.about || {}
  const st = d.settings || {}
  const fh = F.home
  docs.push({
    _id: 'homePage',
    _type: 'homePage',
    heroTitle: pick(h.heroTitle, fh.heroTitle),
    heroSubtitle: pick(h.heroSubtitle, fh.heroSubtitle),
    heroSubtitleExtra: pick(h.heroSubtitleExtra, fh.heroSubtitleExtra),
    heroImage: image(h.heroImage, fh.heroAlt),
    servicesHeading: pick(d.shared?.servicesHeading, fh.servicesHeading),
    featuredServices: SERVICES.map((k) => ref(PAGE_ID(k))),
    about: {
      _type: 'object',
      heading: pick(a.heading, fh.about.heading),
      introParagraph1: pick(a.introParagraph1, fh.about.introParagraph1),
      introParagraph2: pick(a.introParagraph2, fh.about.introParagraph2),
      gcHeading: pick(a.gcHeading, fh.about.gcHeading),
      gcParagraph1: pick(a.gcParagraph1, fh.about.gcParagraph1),
      gcParagraph2: pick(a.gcParagraph2, fh.about.gcParagraph2),
      emotionsHeading: pick(a.emotionsHeading, fh.about.emotionsHeading),
      emotionsParagraph: pick(a.emotionsParagraph, fh.about.emotionsParagraph),
      officeHeading: pick(a.officeHeading, fh.about.officeHeading),
      officeParagraph: pick(a.officeParagraph, fh.about.officeParagraph),
      photo1: image(st.aboutPhoto1, fh.aboutAlts[0]),
      photo2: image(st.aboutPhoto2, fh.aboutAlts[1]),
      photo3: image(st.aboutPhoto3, fh.aboutAlts[2]),
    },
    metaTitle: pick(d.meta.home?.metaTitle, fh.metaTitle),
    metaDescription: pick(d.meta.home?.metaDescription, fh.metaDescription),
  })

  const fa = F.about
  docs.push({
    _id: 'aboutPage',
    _type: 'aboutPage',
    title: fa.title,
    introParagraph1: fa.introParagraph1,
    introParagraph2: fa.introParagraph2,
    gcHeading: fa.gcHeading,
    gcParagraph1: fa.gcParagraph1,
    gcParagraph2: fa.gcParagraph2,
    licenseLabel: fa.licenseLabel,
    emotionsHeading: fa.emotionsHeading,
    emotionsParagraph: fa.emotionsParagraph,
    videoButtonLabel: fa.videoButtonLabel,
    metaTitle: pick(d.meta.about?.metaTitle, fa.metaTitle),
    metaDescription: pick(d.meta.about?.metaDescription, fa.metaDescription),
  })

  docs.push({
    _id: 'contactPage',
    _type: 'contactPage',
    title: F.contact.title,
    intro: F.contact.intro,
    metaTitle: pick(d.meta.contact?.metaTitle, F.contact.metaTitle),
    metaDescription: pick(d.meta.contact?.metaDescription, F.contact.metaDescription),
  })

  for (const k of ['our-services', 'our-projects']) {
    docs.push({
      _id: `hub-${k.replace('our-', '')}`,
      _type: 'hubPage',
      hubKey: k,
      title: F[k].title,
      subtitle: F[k].subtitle,
      metaTitle: pick(d.meta[k]?.metaTitle, F[k].metaTitle),
      metaDescription: pick(d.meta[k]?.metaDescription, F[k].metaDescription),
    })
  }

  // Demo drafts copied to the new types (the old drafts stay until phase 4).
  const convertPage = (p, type, id, extra) => {
    if (!p) return null
    return {
      _id: id,
      _type: type,
      title: p.heroTitle || p.title,
      subtitle: p.heroSubtitle,
      heroImage: image(p.heroImage),
      body: p.body,
      gallery: p.gallery,
      faqs: withKeys((p.faqs || []).map((q) => ({_type: 'faqItem', question: q.question, answer: q.answer}))),
      showReviews: p.showReviews !== false,
      showProjects: p.showProjects !== false,
      showLeadForm: p.showLeadForm !== false,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      ogImage: p.ogImage,
      canonicalUrl: p.canonicalUrl,
      noindex: true,
      slug: p.slug,
      ...extra,
    }
  }
  const city = convertPage(d.demoCity, 'cityPage', 'drafts.city-page-kirkland-wa', {city: d.demoCity?.city || 'Kirkland', showRelatedServices: d.demoCity?.showRelatedServices !== false})
  const sub = convertPage(d.demoSub, 'servicePage', 'drafts.service-page-tub-to-shower-conversion', {
    parent: {_type: 'reference', _ref: PAGE_ID('bathroom-remodel')},
    showWhyChooseUs: true, showProcess: true, showServiceArea: true, showAreas: d.demoSub?.showAreas !== false,
  })
  if (city) docs.push(city)
  if (sub) docs.push(sub)

  // Reviews and projects: pools -> references + homepage flag.
  const patches = []
  for (const doc of [...d.reviews, ...d.projects]) {
    const pools = doc.showOn || []
    const services = SERVICES.filter((k) => pools.includes(k)).map((k) => ref(PAGE_ID(k)))
    patches.push({
      id: doc._id,
      set: {
        ...(doc.services?.length ? {} : {services}),
        ...(doc.showOnHomepage == null ? {showOnHomepage: pools.includes('homepage')} : {}),
      },
    })
  }

  // Site settings: facts the site had in its code.
  const settingsPatch = {
    id: 'siteSettings',
    setIfMissing: {
      companyName: SITE.companyName, phone: SITE.phone, address: SITE.address,
      hours: SITE.hours, licenseNumber: SITE.licenseNumber, instagramUrl: SITE.instagramUrl,
      reviewCount: SITE.reviewCount, rating: SITE.rating, ownerName: SITE.ownerName, ownerRole: SITE.ownerRole,
    },
  }

  return {docs, patches, settingsPatch}
}

const main = async () => {
  const d = await load()
  const {docs, patches, settingsPatch} = build(d)

  const existing = await client.fetch('*[_id in $ids]._id', {ids: docs.map((x) => x._id)})
  console.log(`${APPLY ? 'APPLY' : 'DRY RUN'}: ${docs.length} documents to create, ${patches.length} review/project patches`)
  for (const doc of docs) {
    const state = existing.includes(doc._id) ? (FORCE ? 'overwrite' : 'exists, skipped') : 'create'
    console.log(`  ${doc._type.padEnd(12)} ${doc._id.padEnd(48)} ${state}`)
  }
  for (const p of patches) console.log(`  patch        ${p.id.padEnd(48)} ${JSON.stringify(p.set)}`)
  console.log(`  patch        siteSettings  setIfMissing ${Object.keys(settingsPatch.setIfMissing).join(', ')}`)

  if (!APPLY) return
  const tx = client.transaction()
  for (const doc of docs) {
    if (existing.includes(doc._id) && !FORCE) continue
    const clean = JSON.parse(JSON.stringify(doc)) // drops undefined
    tx.createOrReplace(clean)
  }
  for (const p of patches) if (Object.keys(p.set).length) tx.patch(p.id, {set: p.set})
  tx.patch(settingsPatch.id, {setIfMissing: settingsPatch.setIfMissing})
  const res = await tx.commit()
  console.log(`committed ${res.results.length} mutations, transaction ${res.transactionId}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
