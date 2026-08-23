// Phase 3 migration: the city directory.
//
// Creates one city document per city from the SEO plan (plus Bellevue) and
// points existing documents at them: projects and reviews get cityRef mapped
// from their old free-text city, the Kirkland demo draft gets its city.
// Old string fields are left in place (deprecated in the schema).
//
// Dry run by default. Usage:
//   SANITY_WRITE_TOKEN=... node scripts/migrate-phase3-cities.mjs          (preview)
//   SANITY_WRITE_TOKEN=... node scripts/migrate-phase3-cities.mjs --apply  (write)

import {createClient} from '@sanity/client'

const APPLY = process.argv.includes('--apply')
const token = process.env.SANITY_WRITE_TOKEN
if (!token) {
  console.error('SANITY_WRITE_TOKEN is not set')
  process.exit(1)
}
const client = createClient({projectId: 'u2nxf2rv', dataset: 'production', apiVersion: '2023-01-01', token, useCdn: false})

// The 23 cities from the SEO plan plus Bellevue (home city).
const CITIES = [
  'Bellevue', 'Seattle', 'Kirkland', 'Sammamish', 'Redmond', 'Renton', 'Kent', 'Shoreline',
  'Everett', 'Bothell', 'Edmonds', 'Mercer Island', 'Issaquah', 'Maple Valley', 'Burien',
  'Mukilteo', 'Lynnwood', 'Mill Creek', 'Newcastle', 'Woodinville', 'Monroe', 'Gig Harbor',
  'Enumclaw', 'Vashon',
]
const cityId = (name) => `city-${name.toLowerCase().replace(/\s+/g, '-')}`

// Match a free-text location ("South Seattle", "Bellevue, WA") to a city.
// Longest name wins so "Mill Creek" beats nothing shorter.
const matchCity = (text) => {
  if (!text) return null
  const t = text.toLowerCase()
  const hits = CITIES.filter((c) => t.includes(c.toLowerCase()))
  if (hits.length === 0) return null
  hits.sort((a, b) => b.length - a.length)
  return hits[0]
}

const main = async () => {
  const existing = await client.fetch('*[_type == "city"]{_id}')
  const existingIds = new Set(existing.map((c) => c._id))

  const projects = await client.fetch('*[_type == "project"]{_id, city, "hasRef": defined(cityRef)}')
  const reviews = await client.fetch('*[_type == "review"]{_id, city, "hasRef": defined(cityRef)}')
  const demo = await client.fetch('*[_id == "drafts.city-page-kirkland-wa"][0]{_id, city, "hasRef": defined(cityRef)}')

  const creates = CITIES.filter((c) => !existingIds.has(cityId(c))).map((c) => ({
    _id: cityId(c),
    _type: 'city',
    name: c,
    state: 'WA',
  }))

  const patches = []
  for (const doc of [...projects, ...reviews]) {
    if (doc.hasRef) continue
    const c = matchCity(doc.city)
    if (c) patches.push({id: doc._id, from: doc.city, city: c})
  }
  if (demo && !demo.hasRef) patches.push({id: demo._id, from: demo.city, city: matchCity(demo.city) || 'Kirkland'})

  console.log(`${APPLY ? 'APPLY' : 'DRY RUN'}: ${creates.length} cities to create, ${patches.length} cityRef patches`)
  for (const c of creates) console.log(`  create city  ${c._id}`)
  for (const p of patches) console.log(`  patch        ${p.id.padEnd(48)} "${p.from}" -> ${cityId(p.city)}`)

  if (!APPLY) return
  const tx = client.transaction()
  for (const c of creates) tx.createIfNotExists(c)
  for (const p of patches) tx.patch(p.id, {setIfMissing: {cityRef: {_type: 'reference', _ref: cityId(p.city)}}})
  const res = await tx.commit()
  console.log(`committed ${res.results.length} mutations, transaction ${res.transactionId}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
