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

export function listTournaments(opts: ListOptions) {
  const db = getDb()
  const offset = (opts.page - 1) * opts.limit

  const conditions = opts.search
    ? like(schema.tournaments.name, `%${opts.search}%`)
    : undefined

  const sortCol = (schema.tournaments as any)[opts.sort || 'sort_order'] ?? schema.tournaments.sort_order
  const orderFn = opts.order === 'desc' ? desc : asc

  const rows = db.select()
    .from(schema.tournaments)
    .where(conditions)
    .orderBy(orderFn(sortCol))
    .limit(opts.limit)
    .offset(offset)
    .all()

  const [{ total }] = db.select({ total: count() })
    .from(schema.tournaments)
    .where(conditions)
    .all()

  return { rows, total }
}

export function getTournamentById(id: number) {
  const db = getDb()
  return db.select().from(schema.tournaments).where(eq(schema.tournaments.id, id)).get()
}

export function createTournament(data: {
  name: string
  game_title: string
  description?: string
  logo_url?: string
  banner_url?: string
  format_type?: string
  stats_mode?: string
  external_url?: string
  status?: string
  is_active?: number
  sort_order?: number
}) {
  const db = getDb()
  const slug = generateSlug(data.name)
  const now = Math.floor(Date.now() / 1000)
  return db.insert(schema.tournaments).values({
    ...data,
    slug,
    stats_mode: data.stats_mode ?? 'none',
    status: data.status ?? 'active',
    is_active: data.is_active ?? 1,
    sort_order: data.sort_order ?? 0,
    created_at: now,
    updated_at: now,
  }).returning().get()
}

export function updateTournament(id: number, data: Record<string, any>) {
  const db = getDb()
  const now = Math.floor(Date.now() / 1000)
  return db.update(schema.tournaments)
    .set({ ...data, updated_at: now })
    .where(eq(schema.tournaments.id, id))
    .returning()
    .get()
}

export function checkTournamentHasSeasons(id: number): boolean {
  const db = getDb()
  const row = db.select({ total: count() })
    .from(schema.tournament_seasons)
    .where(eq(schema.tournament_seasons.tournament_id, id))
    .get()
  return (row?.total ?? 0) > 0
}

export function deleteTournament(id: number) {
  const db = getDb()
  if (checkTournamentHasSeasons(id)) {
    throw createError({ statusCode: 400, message: 'Cannot delete tournament with existing seasons' })
  }
  return db.delete(schema.tournaments).where(eq(schema.tournaments.id, id)).run()
}
