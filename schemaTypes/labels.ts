// Human names for the internal keys used across the schema.
// showOn pools (projects, reviews, FAQ) and keys of the built-in pages.

export const POOL_LABELS: Record<string, string> = {
  'homepage': 'Homepage',
  'kitchen-cabinets': 'Kitchen Cabinets',
  'kitchen-countertops': 'Kitchen Countertops',
  'bathroom-remodel': 'Bathroom Remodel',
}

export const PAGE_LABELS: Record<string, string> = {
  'home': 'Home',
  'about': 'About',
  'contact': 'Contact',
  'our-services': 'Our Services',
  'our-projects': 'Our Projects',
  'kitchen-cabinets': 'Kitchen Cabinets',
  'kitchen-countertops': 'Kitchen Countertops',
  'bathroom-remodel': 'Bathroom Remodel',
}

export const poolNames = (values?: string[]) =>
  (values || []).map((v) => POOL_LABELS[v] || v).join(', ')

export const pageLabel = (key?: string) => (key && PAGE_LABELS[key]) || key || ''
