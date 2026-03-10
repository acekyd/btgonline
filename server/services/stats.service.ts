import { getDb, schema } from '../db'
import { eq, and, desc, asc, sql, isNotNull, lte } from 'drizzle-orm'

export function getTopScorers(limit: number = 10, tournamentId?: number) {
  const db = getDb()

  if (tournamentId !== undefined) {
    return db.select({
      player_id: schema.season_player_stats.player_id,
      canonical_name: schema.players.canonical_name,
      total_goals: sql<number>`SUM(${schema.season_player_stats.goals})`.as('total_goals'),
      total_appearances: sql<number>`SUM(${schema.season_player_stats.appearances})`.as('total_appearances'),
    })
      .from(schema.season_player_stats)
      .leftJoin(schema.players, eq(schema.season_player_stats.player_id, schema.players.id))
      .leftJoin(schema.tournament_seasons, eq(schema.season_player_stats.season_id, schema.tournament_seasons.id))
      .where(eq(schema.tournament_seasons.tournament_id, tournamentId))
      .groupBy(schema.season_player_stats.player_id)
      .orderBy(desc(sql`total_goals`), asc(sql`total_appearances`))
      .limit(limit)
      .all()
  }

  return db.select({
    player_id: schema.season_player_stats.player_id,
    canonical_name: schema.players.canonical_name,
    total_goals: sql<number>`SUM(${schema.season_player_stats.goals})`.as('total_goals'),
    total_appearances: sql<number>`SUM(${schema.season_player_stats.appearances})`.as('total_appearances'),
  })
    .from(schema.season_player_stats)
    .leftJoin(schema.players, eq(schema.season_player_stats.player_id, schema.players.id))
    .groupBy(schema.season_player_stats.player_id)
    .orderBy(desc(sql`total_goals`), asc(sql`total_appearances`))
    .limit(limit)
    .all()
}

export function getAssistLeaders(limit: number = 10, tournamentId?: number) {
  const db = getDb()

  if (tournamentId !== undefined) {
    return db.select({
      player_id: schema.season_player_stats.player_id,
      canonical_name: schema.players.canonical_name,
      total_assists: sql<number>`SUM(${schema.season_player_stats.assists})`.as('total_assists'),
      total_appearances: sql<number>`SUM(${schema.season_player_stats.appearances})`.as('total_appearances'),
    })
      .from(schema.season_player_stats)
      .leftJoin(schema.players, eq(schema.season_player_stats.player_id, schema.players.id))
      .leftJoin(schema.tournament_seasons, eq(schema.season_player_stats.season_id, schema.tournament_seasons.id))
      .where(eq(schema.tournament_seasons.tournament_id, tournamentId))
      .groupBy(schema.season_player_stats.player_id)
      .orderBy(desc(sql`total_assists`), asc(sql`total_appearances`))
      .limit(limit)
      .all()
  }

  return db.select({
    player_id: schema.season_player_stats.player_id,
    canonical_name: schema.players.canonical_name,
    total_assists: sql<number>`SUM(${schema.season_player_stats.assists})`.as('total_assists'),
    total_appearances: sql<number>`SUM(${schema.season_player_stats.appearances})`.as('total_appearances'),
  })
    .from(schema.season_player_stats)
    .leftJoin(schema.players, eq(schema.season_player_stats.player_id, schema.players.id))
    .groupBy(schema.season_player_stats.player_id)
    .orderBy(desc(sql`total_assists`), asc(sql`total_appearances`))
    .limit(limit)
    .all()
}

export function getStandingsForSeason(seasonId: number) {
  const db = getDb()

  return db.select({
    id: schema.season_team_stats.id,
    season_id: schema.season_team_stats.season_id,
    team_id: schema.season_team_stats.team_id,
    display_name_for_season: schema.season_team_stats.display_name_for_season,
    played: schema.season_team_stats.played,
    wins: schema.season_team_stats.wins,
    draws: schema.season_team_stats.draws,
    losses: schema.season_team_stats.losses,
    goals_for: schema.season_team_stats.goals_for,
    goals_against: schema.season_team_stats.goals_against,
    points: schema.season_team_stats.points,
    finish_position: schema.season_team_stats.finish_position,
    team_canonical_name: schema.teams.canonical_name,
    team_logo_url: schema.teams.logo_url,
  })
    .from(schema.season_team_stats)
    .leftJoin(schema.teams, eq(schema.season_team_stats.team_id, schema.teams.id))
    .where(eq(schema.season_team_stats.season_id, seasonId))
    .orderBy(asc(schema.season_team_stats.finish_position), desc(schema.season_team_stats.points))
    .all()
}

export function getHallOfFame() {
  const db = getDb()

  const topScorers = db.select({
    player_id: schema.season_player_stats.player_id,
    canonical_name: schema.players.canonical_name,
    total_goals: sql<number>`SUM(${schema.season_player_stats.goals})`.as('total_goals'),
    total_appearances: sql<number>`SUM(${schema.season_player_stats.appearances})`.as('total_appearances'),
  })
    .from(schema.season_player_stats)
    .leftJoin(schema.players, eq(schema.season_player_stats.player_id, schema.players.id))
    .groupBy(schema.season_player_stats.player_id)
    .orderBy(desc(sql`total_goals`))
    .limit(10)
    .all()

  const assistLeaders = db.select({
    player_id: schema.season_player_stats.player_id,
    canonical_name: schema.players.canonical_name,
    total_assists: sql<number>`SUM(${schema.season_player_stats.assists})`.as('total_assists'),
    total_appearances: sql<number>`SUM(${schema.season_player_stats.appearances})`.as('total_appearances'),
  })
    .from(schema.season_player_stats)
    .leftJoin(schema.players, eq(schema.season_player_stats.player_id, schema.players.id))
    .groupBy(schema.season_player_stats.player_id)
    .orderBy(desc(sql`total_assists`))
    .limit(10)
    .all()

  const mostMotm = db.select({
    player_id: schema.season_player_stats.player_id,
    canonical_name: schema.players.canonical_name,
    total_motm: sql<number>`SUM(${schema.season_player_stats.motm})`.as('total_motm'),
  })
    .from(schema.season_player_stats)
    .leftJoin(schema.players, eq(schema.season_player_stats.player_id, schema.players.id))
    .groupBy(schema.season_player_stats.player_id)
    .orderBy(desc(sql`total_motm`))
    .limit(10)
    .all()

  const mostAppearances = db.select({
    player_id: schema.season_player_stats.player_id,
    canonical_name: schema.players.canonical_name,
    total_appearances: sql<number>`SUM(${schema.season_player_stats.appearances})`.as('total_appearances'),
  })
    .from(schema.season_player_stats)
    .leftJoin(schema.players, eq(schema.season_player_stats.player_id, schema.players.id))
    .groupBy(schema.season_player_stats.player_id)
    .orderBy(desc(sql`total_appearances`))
    .limit(10)
    .all()

  const teamTitles = db.select({
    team_id: schema.tournament_seasons.winner_team_id,
    canonical_name: schema.teams.canonical_name,
    titles: sql<number>`COUNT(*)`.as('titles'),
  })
    .from(schema.tournament_seasons)
    .leftJoin(schema.teams, eq(schema.tournament_seasons.winner_team_id, schema.teams.id))
    .where(isNotNull(schema.tournament_seasons.winner_team_id))
    .groupBy(schema.tournament_seasons.winner_team_id)
    .orderBy(desc(sql`titles`))
    .limit(10)
    .all()

  const mostPodiums = db.select({
    team_id: schema.season_team_stats.team_id,
    canonical_name: schema.teams.canonical_name,
    podium_count: sql<number>`COUNT(*)`.as('podium_count'),
    first_place_count: sql<number>`SUM(CASE WHEN ${schema.season_team_stats.finish_position} = 1 THEN 1 ELSE 0 END)`.as('first_place_count'),
    second_place_count: sql<number>`SUM(CASE WHEN ${schema.season_team_stats.finish_position} = 2 THEN 1 ELSE 0 END)`.as('second_place_count'),
  })
    .from(schema.season_team_stats)
    .leftJoin(schema.teams, eq(schema.season_team_stats.team_id, schema.teams.id))
    .where(lte(schema.season_team_stats.finish_position, 2))
    .groupBy(schema.season_team_stats.team_id)
    .orderBy(desc(sql`podium_count`))
    .limit(10)
    .all()

  return { topScorers, assistLeaders, mostMotm, mostAppearances, teamTitles, mostPodiums }
}

export function getRecords() {
  const db = getDb()

  // Helper to get the max value for a player stat column, then return all rows tied at that value
  function getPlayerRecordRaw(column: 'goals' | 'assists' | 'motm' | 'appearances') {
    const colRef = schema.season_player_stats[column]
    const maxRow = db.select({ max_val: sql<number>`MAX(${colRef})` })
      .from(schema.season_player_stats)
      .get()
    if (!maxRow || maxRow.max_val === null) return []
    const maxVal = maxRow.max_val
    return db.select({
      player_canonical_name: schema.players.canonical_name,
      season_name: schema.tournament_seasons.name,
      tournament_name: schema.tournaments.name,
      value: colRef,
    })
      .from(schema.season_player_stats)
      .leftJoin(schema.players, eq(schema.season_player_stats.player_id, schema.players.id))
      .leftJoin(schema.tournament_seasons, eq(schema.season_player_stats.season_id, schema.tournament_seasons.id))
      .leftJoin(schema.tournaments, eq(schema.tournament_seasons.tournament_id, schema.tournaments.id))
      .where(eq(colRef, maxVal))
      .all()
  }

  const mostGoalsInSeason = getPlayerRecordRaw('goals').map(r => ({
    player_canonical_name: r.player_canonical_name,
    season_name: r.season_name,
    tournament_name: r.tournament_name,
    goals: r.value,
  }))

  const mostAssistsInSeason = getPlayerRecordRaw('assists').map(r => ({
    player_canonical_name: r.player_canonical_name,
    season_name: r.season_name,
    tournament_name: r.tournament_name,
    assists: r.value,
  }))

  const mostMotmInSeason = getPlayerRecordRaw('motm').map(r => ({
    player_canonical_name: r.player_canonical_name,
    season_name: r.season_name,
    tournament_name: r.tournament_name,
    motm: r.value,
  }))

  const mostAppearancesInSeason = getPlayerRecordRaw('appearances').map(r => ({
    player_canonical_name: r.player_canonical_name,
    season_name: r.season_name,
    tournament_name: r.tournament_name,
    appearances: r.value,
  }))

  // Best rating in a season — min 5 appearances
  const bestRatingRow = db.select({ max_rating: sql<number>`MAX(${schema.season_player_stats.average_rating})` })
    .from(schema.season_player_stats)
    .where(sql`${schema.season_player_stats.appearances} >= 5`)
    .get()

  const bestRatingInSeason = bestRatingRow && bestRatingRow.max_rating !== null
    ? db.select({
        player_canonical_name: schema.players.canonical_name,
        season_name: schema.tournament_seasons.name,
        tournament_name: schema.tournaments.name,
        average_rating: schema.season_player_stats.average_rating,
      })
        .from(schema.season_player_stats)
        .leftJoin(schema.players, eq(schema.season_player_stats.player_id, schema.players.id))
        .leftJoin(schema.tournament_seasons, eq(schema.season_player_stats.season_id, schema.tournament_seasons.id))
        .leftJoin(schema.tournaments, eq(schema.tournament_seasons.tournament_id, schema.tournaments.id))
        .where(
          and(
            eq(schema.season_player_stats.average_rating, bestRatingRow.max_rating),
            sql`${schema.season_player_stats.appearances} >= 5`,
          )
        )
        .all()
    : []

  // Team records
  function getTeamRecordRaw(column: 'goals_for' | 'goals_against' | 'wins' | 'points', minPlayed?: number) {
    const colRef = schema.season_team_stats[column]
    const baseQuery = minPlayed !== undefined
      ? db.select({ max_val: sql<number>`${column === 'goals_against' ? 'MIN' : 'MAX'}(${colRef})` })
          .from(schema.season_team_stats)
          .where(sql`${schema.season_team_stats.played} >= ${minPlayed}`)
          .get()
      : db.select({ max_val: sql<number>`${column === 'goals_against' ? 'MIN' : 'MAX'}(${colRef})` })
          .from(schema.season_team_stats)
          .get()
    if (!baseQuery || baseQuery.max_val === null) return []
    const targetVal = baseQuery.max_val
    const where = minPlayed !== undefined
      ? and(eq(colRef, targetVal), sql`${schema.season_team_stats.played} >= ${minPlayed}`)
      : eq(colRef, targetVal)
    return db.select({
      team_canonical_name: schema.teams.canonical_name,
      season_name: schema.tournament_seasons.name,
      tournament_name: schema.tournaments.name,
      value: colRef,
    })
      .from(schema.season_team_stats)
      .leftJoin(schema.teams, eq(schema.season_team_stats.team_id, schema.teams.id))
      .leftJoin(schema.tournament_seasons, eq(schema.season_team_stats.season_id, schema.tournament_seasons.id))
      .leftJoin(schema.tournaments, eq(schema.tournament_seasons.tournament_id, schema.tournaments.id))
      .where(where)
      .all()
  }

  const mostGoalsByTeamInSeason = getTeamRecordRaw('goals_for').map(r => ({
    team_canonical_name: r.team_canonical_name,
    season_name: r.season_name,
    tournament_name: r.tournament_name,
    goals_for: r.value,
  }))

  const fewestGoalsAgainstInSeason = getTeamRecordRaw('goals_against', 5).map(r => ({
    team_canonical_name: r.team_canonical_name,
    season_name: r.season_name,
    tournament_name: r.tournament_name,
    goals_against: r.value,
  }))

  const mostWinsInSeason = getTeamRecordRaw('wins').map(r => ({
    team_canonical_name: r.team_canonical_name,
    season_name: r.season_name,
    tournament_name: r.tournament_name,
    wins: r.value,
  }))

  const highestPointsInSeason = getTeamRecordRaw('points').map(r => ({
    team_canonical_name: r.team_canonical_name,
    season_name: r.season_name,
    tournament_name: r.tournament_name,
    points: r.value,
  }))

  return {
    mostGoalsInSeason,
    mostAssistsInSeason,
    mostMotmInSeason,
    bestRatingInSeason,
    mostAppearancesInSeason,
    mostGoalsByTeamInSeason,
    fewestGoalsAgainstInSeason,
    mostWinsInSeason,
    highestPointsInSeason,
  }
}
