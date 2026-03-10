import { getDb, schema } from '../db'
import { eq, and, desc, isNotNull, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'

export function getSeasonById(id: number) {
  const db = getDb()

  const winnerTeams = alias(schema.teams, 'winner_team')
  const runnerUpTeams = alias(schema.teams, 'runner_up_team')

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
    winner_team_name: winnerTeams.canonical_name,
    winner_team_logo: winnerTeams.logo_url,
    runner_up_team_name: runnerUpTeams.canonical_name,
    runner_up_team_logo: runnerUpTeams.logo_url,
  })
    .from(schema.tournament_seasons)
    .leftJoin(schema.tournaments, eq(schema.tournament_seasons.tournament_id, schema.tournaments.id))
    .leftJoin(winnerTeams, eq(schema.tournament_seasons.winner_team_id, winnerTeams.id))
    .leftJoin(runnerUpTeams, eq(schema.tournament_seasons.runner_up_team_id, runnerUpTeams.id))
    .where(eq(schema.tournament_seasons.id, id))
    .get()

  if (!season) return null

  const playerTeams = alias(schema.teams, 'player_team')

  const teamStats = db.select({
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
    .where(eq(schema.season_team_stats.season_id, id))
    .all()

  const playerStats = db.select({
    id: schema.season_player_stats.id,
    season_id: schema.season_player_stats.season_id,
    player_id: schema.season_player_stats.player_id,
    team_id: schema.season_player_stats.team_id,
    display_name_for_season: schema.season_player_stats.display_name_for_season,
    appearances: schema.season_player_stats.appearances,
    goals: schema.season_player_stats.goals,
    assists: schema.season_player_stats.assists,
    clean_sheets: schema.season_player_stats.clean_sheets,
    motm: schema.season_player_stats.motm,
    average_rating: schema.season_player_stats.average_rating,
    player_canonical_name: schema.players.canonical_name,
    player_display_name_for_season: schema.season_player_stats.display_name_for_season,
    team_canonical_name: playerTeams.canonical_name,
  })
    .from(schema.season_player_stats)
    .leftJoin(schema.players, eq(schema.season_player_stats.player_id, schema.players.id))
    .leftJoin(playerTeams, eq(schema.season_player_stats.team_id, playerTeams.id))
    .where(eq(schema.season_player_stats.season_id, id))
    .all()

  return { ...season, teamStats, playerStats }
}

export function getRecentChampions(limit: number = 6) {
  const db = getDb()

  const winnerTeams = alias(schema.teams, 'winner_team')
  const runnerUpTeams = alias(schema.teams, 'runner_up_team')

  return db.select({
    id: schema.tournament_seasons.id,
    name: schema.tournament_seasons.name,
    end_date: schema.tournament_seasons.end_date,
    tournament_name: schema.tournaments.name,
    winner_team_name: winnerTeams.canonical_name,
    runner_up_team_name: runnerUpTeams.canonical_name,
  })
    .from(schema.tournament_seasons)
    .leftJoin(schema.tournaments, eq(schema.tournament_seasons.tournament_id, schema.tournaments.id))
    .leftJoin(winnerTeams, eq(schema.tournament_seasons.winner_team_id, winnerTeams.id))
    .leftJoin(runnerUpTeams, eq(schema.tournament_seasons.runner_up_team_id, runnerUpTeams.id))
    .where(
      and(
        isNotNull(schema.tournament_seasons.winner_team_id),
        eq(schema.tournament_seasons.status, 'completed'),
      )
    )
    .orderBy(desc(schema.tournament_seasons.end_date))
    .limit(limit)
    .all()
}
