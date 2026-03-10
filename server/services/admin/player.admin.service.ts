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

export function listPlayers(opts: ListOptions) {
  const db = getDb()
  const offset = (opts.page - 1) * opts.limit

  const conditions = opts.search
    ? like(schema.players.canonical_name, `%${opts.search}%`)
    : undefined

  const sortCol = (schema.players as any)[opts.sort || 'canonical_name'] ?? schema.players.canonical_name
  const orderFn = opts.order === 'desc' ? desc : asc

  const players = db.select()
    .from(schema.players)
    .where(conditions)
    .orderBy(orderFn(sortCol))
    .limit(opts.limit)
    .offset(offset)
    .all()

  const [{ total }] = db.select({ total: count() })
    .from(schema.players)
    .where(conditions)
    .all()

  // Attach aliases per player
  const rows = players.map((player) => {
    const aliases = db.select()
      .from(schema.player_aliases)
      .where(eq(schema.player_aliases.player_id, player.id))
      .all()
    return { ...player, aliases }
  })

  return { rows, total }
}

export function getPlayerWithDetails(id: number) {
  const db = getDb()
  const player = db.select().from(schema.players).where(eq(schema.players.id, id)).get()
  if (!player) return null

  const aliases = db.select()
    .from(schema.player_aliases)
    .where(eq(schema.player_aliases.player_id, id))
    .all()

  const stats = db.select({
    id: schema.season_player_stats.id,
    season_id: schema.season_player_stats.season_id,
    team_id: schema.season_player_stats.team_id,
    display_name_for_season: schema.season_player_stats.display_name_for_season,
    appearances: schema.season_player_stats.appearances,
    goals: schema.season_player_stats.goals,
    assists: schema.season_player_stats.assists,
    clean_sheets: schema.season_player_stats.clean_sheets,
    motm: schema.season_player_stats.motm,
    average_rating: schema.season_player_stats.average_rating,
    season_name: schema.tournament_seasons.name,
    tournament_name: schema.tournaments.name,
  })
    .from(schema.season_player_stats)
    .leftJoin(schema.tournament_seasons, eq(schema.season_player_stats.season_id, schema.tournament_seasons.id))
    .leftJoin(schema.tournaments, eq(schema.tournament_seasons.tournament_id, schema.tournaments.id))
    .where(eq(schema.season_player_stats.player_id, id))
    .all()

  return { ...player, aliases, stats }
}

export function updatePlayer(id: number, data: { canonical_name?: string; primary_position?: string }) {
  const db = getDb()
  const now = Math.floor(Date.now() / 1000)
  const updateData: Record<string, any> = { ...data, updated_at: now }
  if (data.canonical_name) {
    updateData.slug = generateSlug(data.canonical_name)
  }
  return db.update(schema.players)
    .set(updateData)
    .where(eq(schema.players.id, id))
    .returning()
    .get()
}

export function deletePlayer(id: number) {
  const db = getDb()
  const statsRow = db.select({ total: count() })
    .from(schema.season_player_stats)
    .where(eq(schema.season_player_stats.player_id, id))
    .get()
  if ((statsRow?.total ?? 0) > 0) {
    throw createError({ statusCode: 400, message: 'Cannot delete player with existing stats' })
  }
  // Delete aliases first
  db.delete(schema.player_aliases).where(eq(schema.player_aliases.player_id, id)).run()
  return db.delete(schema.players).where(eq(schema.players.id, id)).run()
}

export function mergePlayer(sourceId: number, targetId: number) {
  const db = getDb()

  let movedStats = 0
  let movedAliases = 0
  let skippedAliases = 0

  db.transaction((tx) => {
    // 1. Move SeasonPlayerStats rows
    const statsResult = tx.update(schema.season_player_stats)
      .set({ player_id: targetId })
      .where(eq(schema.season_player_stats.player_id, sourceId))
      .run()
    movedStats = statsResult.changes

    // 2. Get source and target aliases
    const sourceAliases = tx.select()
      .from(schema.player_aliases)
      .where(eq(schema.player_aliases.player_id, sourceId))
      .all()

    const targetAliases = tx.select()
      .from(schema.player_aliases)
      .where(eq(schema.player_aliases.player_id, targetId))
      .all()
    const targetAliasNames = new Set(targetAliases.map((a) => a.display_name.toLowerCase()))

    // 3. Move aliases, skip duplicates
    const now = Math.floor(Date.now() / 1000)
    for (const alias of sourceAliases) {
      if (targetAliasNames.has(alias.display_name.toLowerCase())) {
        skippedAliases++
        console.log(`[mergePlayer] Skipping duplicate alias: ${alias.display_name}`)
      } else {
        tx.insert(schema.player_aliases).values({
          player_id: targetId,
          display_name: alias.display_name,
          created_at: now,
        }).run()
        movedAliases++
      }
    }

    // 4. Delete source aliases
    tx.delete(schema.player_aliases).where(eq(schema.player_aliases.player_id, sourceId)).run()

    // 5. Delete source player
    tx.delete(schema.players).where(eq(schema.players.id, sourceId)).run()
  })

  return { movedStats, movedAliases, skippedAliases }
}
