import {useEffect, useState} from 'react'
import {useClient} from 'sanity'

// "Open on site" tab: the live URL of the page this document belongs to.
// The site is static and rebuilds on publish, so the frame shows the last
// published version, never an unpublished draft.

const SITE = 'https://raincityllc.com'

const keyToPath = (key?: string) => (!key || key === 'home' ? '/' : `/${key}`)

export default function SitePreview(props: {document: {displayed: any}}) {
  const doc = props.document.displayed || {}
  const client = useClient({apiVersion: '2023-01-01'})
  const [path, setPath] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    const resolve = async () => {
      switch (doc._type) {
        case 'homeCopy':
        case 'aboutCopy':
        case 'carouselPhotos':
          return '/'
        case 'serviceCopy':
          return keyToPath(doc.serviceKey)
        case 'pageMeta':
          return keyToPath(doc.pageKey)
        case 'page': {
          const own = doc.slug?.current
          if (!own) return null
          const segments = [own]
          let ref = doc.parent?._ref
          for (let depth = 0; ref && depth < 5; depth++) {
            const parent = await client.fetch(
              `*[_id == $id][0]{"slug": slug.current, "parent": parent._ref}`,
              {id: ref},
            )
            if (!parent?.slug) break
            segments.unshift(parent.slug)
            ref = parent.parent
          }
          return `/${segments.join('/')}`
        }
        default:
          return null
      }
    }
    resolve().then((p) => alive && setPath(p))
    return () => {
      alive = false
    }
  }, [doc._type, doc.serviceKey, doc.pageKey, doc.slug?.current, doc.parent?._ref, client])

  if (!path) {
    return (
      <div style={{padding: 16, fontFamily: 'sans-serif', fontSize: 14}}>
        This document has no page of its own yet (for a new page, fill in the URL slug first).
      </div>
    )
  }

  const url = SITE + path
  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
      <div style={{padding: '8px 12px', fontFamily: 'sans-serif', fontSize: 13, borderBottom: '1px solid #ddd'}}>
        <a href={url} target="_blank" rel="noreferrer">
          {url}
        </a>
        <span style={{marginLeft: 12, opacity: 0.7}}>
          Published version. Changes appear 1 to 2 minutes after Publish.
        </span>
      </div>
      <iframe title="Site preview" src={url} style={{flex: 1, border: 0, width: '100%'}} />
    </div>
  )
}
