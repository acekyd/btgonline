import { getDb, schema } from '../db'
import { eq, and, asc } from 'drizzle-orm'

export function getActiveCreators() {
  const db = getDb()
  return db.select()
    .from(schema.creators)
    .where(and(eq(schema.creators.is_active, 1)))
    .orderBy(asc(schema.creators.sort_order), asc(schema.creators.display_name))
    .all()
}

export function getCreatorBySlug(slug: string) {
  const db = getDb()
  return db.select()
    .from(schema.creators)
    .where(and(eq(schema.creators.slug, slug), eq(schema.creators.is_active, 1)))
    .get()
}

export function getFeaturedCreators() {
  const db = getDb()
  return db.select()
    .from(schema.creators)
    .where(and(eq(schema.creators.is_featured, 1), eq(schema.creators.is_active, 1)))
    .orderBy(asc(schema.creators.sort_order), asc(schema.creators.display_name))
    .all()
}
