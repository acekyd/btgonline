import { getDb, schema } from '../db'
import { eq, and, asc, desc } from 'drizzle-orm'
import { alias } from 'drizzle-orm/sqlite-core'

export function getAllTournaments() {
  const db = getDb()
  return db.select()
    .from(schema.tournaments)
    .where(eq(schema.tournaments.is_active, 1))
    .orderBy(asc(schema.tournaments.sort_order), asc(schema.tournaments.name))
    .all()
}

export function getActiveTournaments() {
  const db = getDb()
  return db.select()
    .from(schema.tournaments)
    .where(and(eq(schema.tournaments.status, 'active'), eq(schema.tournaments.is_active, 1)))
    .orderBy(asc(schema.tournaments.sort_order), asc(schema.tournaments.name))
    .all()
}

export function getTournamentBySlug(slug: string) {
  const db = getDb()

  const tournament = db.select()
    .from(schema.tournaments)
    .where(and(eq(schema.tournaments.slug, slug), eq(schema.tournaments.is_active, 1)))
    .get()

  if (!tournament) return null

  const winnerTeams = alias(schema.teams, 'winner_team')
  const runnerUpTeams = alias(schema.teams, 'runner_up_team')

  const seasons = db.select({
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
    winner_team_name: winnerTeams.canonical_name,
    winner_team_logo: winnerTeams.logo_url,
    runner_up_team_name: runnerUpTeams.canonical_name,
    runner_up_team_logo: runnerUpTeams.logo_url,
  })
    .from(schema.tournament_seasons)
    .leftJoin(winnerTeams, eq(schema.tournament_seasons.winner_team_id, winnerTeams.id))
    .leftJoin(runnerUpTeams, eq(schema.tournament_seasons.runner_up_team_id, runnerUpTeams.id))
    .where(eq(schema.tournament_seasons.tournament_id, tournament.id))
    .orderBy(desc(schema.tournament_seasons.season_order))
    .all()

  return { ...tournament, seasons }
}

export function getTournamentWithSeasons(id: number) {
  const db = getDb()

  const tournament = db.select()
    .from(schema.tournaments)
    .where(eq(schema.tournaments.id, id))
    .get()

  if (!tournament) return null

  const winnerTeams = alias(schema.teams, 'winner_team')
  const runnerUpTeams = alias(schema.teams, 'runner_up_team')

  const seasons = db.select({
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
    winner_team_name: winnerTeams.canonical_name,
    winner_team_logo: winnerTeams.logo_url,
    runner_up_team_name: runnerUpTeams.canonical_name,
    runner_up_team_logo: runnerUpTeams.logo_url,
  })
    .from(schema.tournament_seasons)
    .leftJoin(winnerTeams, eq(schema.tournament_seasons.winner_team_id, winnerTeams.id))
    .leftJoin(runnerUpTeams, eq(schema.tournament_seasons.runner_up_team_id, runnerUpTeams.id))
    .where(eq(schema.tournament_seasons.tournament_id, id))
    .orderBy(desc(schema.tournament_seasons.season_order))
    .all()

  return { ...tournament, seasons }
}
