import {useEffect, useState} from 'react'
import {IntentLink} from 'sanity/router'
import {useClient} from 'sanity'

// "On this page" tab for service pages (and the homepage): the reviews,
// projects and shared FAQ entries shown there, with links to edit them or
// to add a new one already pointed at this page.

type Row = {_id: string; _type: string; title: string; draft: boolean}

const QUERY = `{
  "reviews": *[_type == "review" && ($home && showOnHomepage == true || $id in services[]._ref)] | order(order asc){_id, _type, "title": author},
  "projects": *[_type == "project" && ($home && showOnHomepage == true || $id in services[]._ref)] | order(order asc){_id, _type, "title": title},
  "faqs": *[_type == "faq" && _id in $faqRefs]{_id, _type, "title": question}
}`

const pub = (id: string) => id.replace(/^drafts\./, '')

function dedupe(rows: any[]): Row[] {
  const map = new Map<string, Row>()
  for (const r of rows) {
    const id = pub(r._id)
    const draft = r._id.startsWith('drafts.')
    const prev = map.get(id)
    if (!prev || draft) map.set(id, {_id: id, _type: r._type, title: r.title || 'Untitled', draft: draft || !!prev?.draft})
  }
  return [...map.values()]
}

export default function OnThisPage(props: {document: {displayed: any}}) {
  const doc = props.document.displayed || {}
  const id = pub(doc._id || '')
  const home = doc._type === 'homePage'
  const client = useClient({apiVersion: '2023-01-01'})
  const [data, setData] = useState<{reviews: Row[]; projects: Row[]; faqs: Row[]} | null>(null)

  const faqRefs = (doc.faqs || []).filter((f: any) => f?._ref).map((f: any) => f._ref)

  useEffect(() => {
    let alive = true
    client
      .withConfig({perspective: 'raw'})
      .fetch(QUERY, {id, home, faqRefs})
      .then((r) => alive && setData({reviews: dedupe(r.reviews), projects: dedupe(r.projects), faqs: dedupe(r.faqs)}))
      .catch(() => alive && setData({reviews: [], projects: [], faqs: []}))
    return () => {
      alive = false
    }
  }, [client, id, home, faqRefs.join(',')])

  const style = {fontFamily: 'sans-serif', fontSize: 14, lineHeight: 1.6}
  const link = {color: '#2276fc', textDecoration: 'none'}
  const createParams = (type: string) =>
    home
      ? [{type, template: `${type}-homepage`}, {}]
      : [{type, template: `${type}-for-service`}, {serviceId: id}]

  const Section = ({title, rows, type}: {title: string; rows: Row[]; type?: string}) => (
    <div style={{marginBottom: 20}}>
      <div style={{fontWeight: 600, marginBottom: 4}}>
        {title} ({rows.length})
      </div>
      {rows.length === 0 && <div style={{opacity: 0.6}}>None yet.</div>}
      <ul style={{margin: 0, paddingLeft: 18}}>
        {rows.map((r) => (
          <li key={r._id}>
            <IntentLink intent="edit" params={{id: r._id, type: r._type}} style={link}>
              {r.title}
            </IntentLink>
            {r.draft && <span style={{marginLeft: 6, opacity: 0.6}}>(unpublished changes)</span>}
          </li>
        ))}
      </ul>
      {type && (
        <div style={{marginTop: 6}}>
          <IntentLink intent="create" params={createParams(type) as any} style={link}>
            + Add a {type} for this page
          </IntentLink>
        </div>
      )}
    </div>
  )

  if (!id) return <div style={{...style, padding: 16}}>Save the page first.</div>
  if (!data) return <div style={{...style, padding: 16}}>Loading...</div>

  return (
    <div style={{...style, padding: 16}}>
      <Section title="Reviews on this page" rows={data.reviews} type="review" />
      <Section title="Projects on this page" rows={data.projects} type="project" />
      {!home && <Section title="Shared FAQ entries used on this page" rows={data.faqs} />}
      <div style={{opacity: 0.6, fontSize: 13}}>
        Reviews and projects list the pages they appear on in their own Where it shows tab. FAQ entries are picked on this page, Blocks tab.
      </div>
    </div>
  )
}
