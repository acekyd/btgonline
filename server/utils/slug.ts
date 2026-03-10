export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-')
}

export function ensureUniqueSlug(base: string, existing: string[]): string {
  let slug = base
  let i = 2
  while (existing.includes(slug)) {
    slug = `${base}-${i++}`
  }
  return slug
}
