import { getDb, schema } from '../../db'
import { eq, like, desc, asc, count } from 'drizzle-orm'
import { generateSlug } from '../../utils/slug'

interface ListOptions {
  page: number
  limit: number
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
}

export function listCreators(opts: ListOptions) {
  const db = getDb()
  const offset = (opts.page - 1) * opts.limit

  const conditions = opts.search
    ? like(schema.creators.display_name, `%${opts.search}%`)
    : undefined

  const sortCol = (schema.creators as any)[opts.sort || 'sort_order'] ?? schema.creators.sort_order
  const orderFn = opts.order === 'desc' ? desc : asc

  const rows = db.select()
    .from(schema.creators)
    .where(conditions)
    .orderBy(orderFn(sortCol))
    .limit(opts.limit)
    .offset(offset)
    .all()

  const [{ total }] = db.select({ total: count() })
    .from(schema.creators)
    .where(conditions)
    .all()

  return { rows, total }
}

export function getCreatorById(id: number) {
  const db = getDb()
  return db.select().from(schema.creators).where(eq(schema.creators.id, id)).get()
}

export function createCreator(data: {
  display_name: string
  bio?: string
  avatar_url?: string
  primary_stream_url?: string
  twitch_url?: string
  youtube_url?: string
  tiktok_url?: string
  instagram_url?: string
  twitter_url?: string
  is_featured?: number
  is_active?: number
  sort_order?: number
}) {
  const db = getDb()
  const slug = generateSlug(data.display_name)
  const now = Math.floor(Date.now() / 1000)
  return db.insert(schema.creators).values({
    ...data,
    slug,
    is_featured: data.is_featured ?? 0,
    is_active: data.is_active ?? 1,
    sort_order: data.sort_order ?? 0,
    created_at: now,
    updated_at: now,
  }).returning().get()
}

export function updateCreator(id: number, data: Record<string, any>) {
  const db = getDb()
  const now = Math.floor(Date.now() / 1000)
  return db.update(schema.creators)
    .set({ ...data, updated_at: now })
    .where(eq(schema.creators.id, id))
    .returning()
    .get()
}

export function deleteCreator(id: number) {
  const db = getDb()
  return db.delete(schema.creators).where(eq(schema.creators.id, id)).run()
}
