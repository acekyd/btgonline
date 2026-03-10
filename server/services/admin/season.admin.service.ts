import { getDb, schema } from '../../db'
import { eq, like, and, desc, asc, count } from 'drizzle-orm'

interface ListOptions {
  page: number
  limit: number
  search?: string
  tournamentId?: number
  sort?: string
  order?: 'asc' | 'desc'
}

export function listSeasons(opts: ListOptions) {
  const db = getDb()
  const offset = (opts.page - 1) * opts.limit

  const whereClauses = []
  if (opts.search) {
    whereClauses.push(like(schema.tournament_seasons.name, `%${opts.search}%`))
  }
  if (opts.tournamentId) {
    whereClauses.push(eq(schema.tournament_seasons.tournament_id, opts.tournamentId))
  }

  const conditions = whereClauses.length > 1
    ? and(...whereClauses as [any, any, ...any[]])
    : whereClauses.length === 1
      ? whereClauses[0]
      : undefined

  const sortCol = (schema.tournament_seasons as any)[opts.sort || 'season_order'] ?? schema.tournament_seasons.season_order
  const orderFn = opts.order === 'desc' ? desc : asc

  const rows = db.select()
    .from(schema.tournament_seasons)
    .where(conditions)
    .orderBy(orderFn(sortCol))
    .limit(opts.limit)
    .offset(offset)
    .all()

  const [{ total }] = db.select({ total: count() })
    .from(schema.tournament_seasons)
    .where(conditions)
    .all()

  return { rows, total }
}

export function getSeasonById(id: number) {
  const db = getDb()
  const season = db.select({
    id: schema.tournament_seasons.id,
    tournament_id: schema.tournament_seasons.tournament_id,
    name: schema.tournament_seasons.name,
    short_label: schema.tournament_seasons.short_label,
    season_order: schema.tournament_seasons.season_order,
    start_date: schema.tournament_seasons.start_date,
    end_date: schema.tournament_seasons.end_date,
    status: schema.tournament_seasons.status,
    overview: schema.tournament_seasons.overview,
    winner_team_id: schema.tournament_seasons.winner_team_id,
    runner_up_team_id: schema.tournament_seasons.runner_up_team_id,
    created_at: schema.tournament_seasons.created_at,
    updated_at: schema.tournament_seasons.updated_at,
    tournament_name: schema.tournaments.name,
    tournament_slug: schema.tournaments.slug,
    tournament_stats_mode: schema.tournaments.stats_mode,
  })
    .from(schema.tournament_seasons)
    .leftJoin(schema.tournaments, eq(schema.tournament_seasons.tournament_id, schema.tournaments.id))
    .where(eq(schema.tournament_seasons.id, id))
    .get()
  return season
}

export function createSeason(data: {
  tournament_id: number
  name: string
  short_label?: string
  season_order?: number
  start_date?: string
  end_date?: string
  status?: string
  overview?: string
  winner_team_id?: number | null
  runner_up_team_id?: number | null
}) {
  const db = getDb()
  const now = Math.floor(Date.now() / 1000)
  return db.insert(schema.tournament_seasons).values({
    ...data,
    season_order: data.season_order ?? 0,
    status: data.status ?? 'upcoming',
    created_at: now,
    updated_at: now,
  }).returning().get()
}

export function updateSeason(id: number, data: Record<string, any>) {
  const db = getDb()
  const now = Math.floor(Date.now() / 1000)
  return db.update(schema.tournament_seasons)
    .set({ ...data, updated_at: now })
    .where(eq(schema.tournament_seasons.id, id))
    .returning()
    .get()
}

export function checkSeasonHasImports(id: number): boolean {
  const db = getDb()
  const row = db.select({ total: count() })
    .from(schema.import_logs)
    .where(eq(schema.import_logs.season_id, id))
    .get()
  return (row?.total ?? 0) > 0
}

export function deleteSeason(id: number) {
  const db = getDb()
  if (checkSeasonHasImports(id)) {
    throw createError({ statusCode: 400, message: 'Cannot delete season with existing imports' })
  }
  return db.delete(schema.tournament_seasons).where(eq(schema.tournament_seasons.id, id)).run()
}
