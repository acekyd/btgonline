import { getDb, schema } from '../../db'
import { eq, like, desc, asc, count, isNotNull } from 'drizzle-orm'
import { generateSlug } from '../../utils/slug'

interface ListOptions {
  page: number
  limit: number
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
}

export function listTeams(opts: ListOptions) {
  const db = getDb()
  const offset = (opts.page - 1) * opts.limit

  const conditions = opts.search
    ? like(schema.teams.canonical_name, `%${opts.search}%`)
    : undefined

  const sortCol = (schema.teams as any)[opts.sort || 'canonical_name'] ?? schema.teams.canonical_name
  const orderFn = opts.order === 'desc' ? desc : asc

  const teams = db.select()
    .from(schema.teams)
    .where(conditions)
    .orderBy(orderFn(sortCol))
    .limit(opts.limit)
    .offset(offset)
    .all()

  const [{ total }] = db.select({ total: count() })
    .from(schema.teams)
    .where(conditions)
    .all()

  const rows = teams.map((team) => {
    const aliases = db.select()
      .from(schema.team_aliases)
      .where(eq(schema.team_aliases.team_id, team.id))
      .all()
    return { ...team, aliases }
  })

  return { rows, total }
}

export function getTeamWithDetails(id: number) {
  const db = getDb()
  const team = db.select().from(schema.teams).where(eq(schema.teams.id, id)).get()
  if (!team) return null

  const aliases = db.select()
    .from(schema.team_aliases)
    .where(eq(schema.team_aliases.team_id, id))
    .all()

  const stats = db.select({
    id: schema.season_team_stats.id,
    season_id: schema.season_team_stats.season_id,
    display_name_for_season: schema.season_team_stats.display_name_for_season,
    played: schema.season_team_stats.played,
    wins: schema.season_team_stats.wins,
    draws: schema.season_team_stats.draws,
    losses: schema.season_team_stats.losses,
    goals_for: schema.season_team_stats.goals_for,
    goals_against: schema.season_team_stats.goals_against,
    points: schema.season_team_stats.points,
    finish_position: schema.season_team_stats.finish_position,
    season_name: schema.tournament_seasons.name,
    tournament_name: schema.tournaments.name,
  })
    .from(schema.season_team_stats)
    .leftJoin(schema.tournament_seasons, eq(schema.season_team_stats.season_id, schema.tournament_seasons.id))
    .leftJoin(schema.tournaments, eq(schema.tournament_seasons.tournament_id, schema.tournaments.id))
    .where(eq(schema.season_team_stats.team_id, id))
    .all()

  return { ...team, aliases, stats }
}

export function updateTeam(id: number, data: { canonical_name?: string; logo_url?: string }) {
  const db = getDb()
  const now = Math.floor(Date.now() / 1000)
  const updateData: Record<string, any> = { ...data, updated_at: now }
  if (data.canonical_name) {
    updateData.slug = generateSlug(data.canonical_name)
  }
  return db.update(schema.teams)
    .set(updateData)
    .where(eq(schema.teams.id, id))
    .returning()
    .get()
}

export function deleteTeam(id: number) {
  const db = getDb()
  const statsRow = db.select({ total: count() })
    .from(schema.season_team_stats)
    .where(eq(schema.season_team_stats.team_id, id))
    .get()
  if ((statsRow?.total ?? 0) > 0) {
    throw createError({ statusCode: 400, message: 'Cannot delete team with existing stats' })
  }
  // Delete aliases first
  db.delete(schema.team_aliases).where(eq(schema.team_aliases.team_id, id)).run()
  return db.delete(schema.teams).where(eq(schema.teams.id, id)).run()
}

export function mergeTeam(sourceId: number, targetId: number) {
  const db = getDb()

  let movedTeamStats = 0
  let movedPlayerStats = 0
  let movedSeasonRefs = 0
  let movedAliases = 0
  let skippedAliases = 0

  db.transaction((tx) => {
    // 1. Update SeasonTeamStats.team_id
    const teamStatsResult = tx.update(schema.season_team_stats)
      .set({ team_id: targetId })
      .where(eq(schema.season_team_stats.team_id, sourceId))
      .run()
    movedTeamStats = teamStatsResult.changes

    // 2. Update SeasonPlayerStats.team_id
    const playerStatsResult = tx.update(schema.season_player_stats)
      .set({ team_id: targetId })
      .where(eq(schema.season_player_stats.team_id, sourceId))
      .run()
    movedPlayerStats = playerStatsResult.changes

    // 3. Update TournamentSeason.winner_team_id
    const winnerResult = tx.update(schema.tournament_seasons)
      .set({ winner_team_id: targetId })
      .where(eq(schema.tournament_seasons.winner_team_id, sourceId))
      .run()

    // 4. Update TournamentSeason.runner_up_team_id
    const runnerUpResult = tx.update(schema.tournament_seasons)
      .set({ runner_up_team_id: targetId })
      .where(eq(schema.tournament_seasons.runner_up_team_id, sourceId))
      .run()

    movedSeasonRefs = winnerResult.changes + runnerUpResult.changes

    // 5. Move aliases, skip duplicates
    const sourceAliases = tx.select()
      .from(schema.team_aliases)
      .where(eq(schema.team_aliases.team_id, sourceId))
      .all()

    const targetAliases = tx.select()
      .from(schema.team_aliases)
      .where(eq(schema.team_aliases.team_id, targetId))
      .all()
    const targetAliasNames = new Set(targetAliases.map((a) => a.display_name.toLowerCase()))

    const now = Math.floor(Date.now() / 1000)
    for (const alias of sourceAliases) {
      if (targetAliasNames.has(alias.display_name.toLowerCase())) {
        skippedAliases++
        console.log(`[mergeTeam] Skipping duplicate alias: ${alias.display_name}`)
      } else {
        tx.insert(schema.team_aliases).values({
          team_id: targetId,
          display_name: alias.display_name,
          created_at: now,
        }).run()
        movedAliases++
      }
    }

    // 6. Delete source aliases
    tx.delete(schema.team_aliases).where(eq(schema.team_aliases.team_id, sourceId)).run()

    // 7. Delete source team
    tx.delete(schema.teams).where(eq(schema.teams.id, sourceId)).run()
  })

  return { movedTeamStats, movedPlayerStats, movedSeasonRefs, movedAliases, skippedAliases }
}
