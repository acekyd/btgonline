import { getDb, schema } from '../../db'
import { eq, desc, count } from 'drizzle-orm'

export function getDashboardStats() {
  const db = getDb()

  // Creators
  const [{ total: totalCreators }] = db.select({ total: count() }).from(schema.creators).all()
  const [{ activeCreators }] = db.select({ activeCreators: count() })
    .from(schema.creators)
    .where(eq(schema.creators.is_active, 1))
    .all()
  const inactiveCreators = totalCreators - activeCreators

  // Tournaments
  const [{ totalTournaments }] = db.select({ totalTournaments: count() }).from(schema.tournaments).all()

  // Seasons by status
  const [{ upcomingSeasons }] = db.select({ upcomingSeasons: count() })
    .from(schema.tournament_seasons)
    .where(eq(schema.tournament_seasons.status, 'upcoming'))
    .all()
  const [{ activeSeasons }] = db.select({ activeSeasons: count() })
    .from(schema.tournament_seasons)
    .where(eq(schema.tournament_seasons.status, 'active'))
    .all()
  const [{ completedSeasons }] = db.select({ completedSeasons: count() })
    .from(schema.tournament_seasons)
    .where(eq(schema.tournament_seasons.status, 'completed'))
    .all()
  const [{ archivedSeasons }] = db.select({ archivedSeasons: count() })
    .from(schema.tournament_seasons)
    .where(eq(schema.tournament_seasons.status, 'archived'))
    .all()

  // Players
  const [{ totalPlayers }] = db.select({ totalPlayers: count() }).from(schema.players).all()

  // Teams
  const [{ totalTeams }] = db.select({ totalTeams: count() }).from(schema.teams).all()

  // Recent imports (last 5)
  const recentImports = db.select({
    id: schema.import_logs.id,
    season_id: schema.import_logs.season_id,
    import_type: schema.import_logs.import_type,
    file_name: schema.import_logs.file_name,
    status: schema.import_logs.status,
    rows_processed: schema.import_logs.rows_processed,
    rows_failed: schema.import_logs.rows_failed,
    created_at: schema.import_logs.created_at,
    season_name: schema.tournament_seasons.name,
  })
    .from(schema.import_logs)
    .leftJoin(schema.tournament_seasons, eq(schema.import_logs.season_id, schema.tournament_seasons.id))
    .orderBy(desc(schema.import_logs.created_at))
    .limit(5)
    .all()

  return {
    creators: {
      total: totalCreators,
      active: activeCreators,
      inactive: inactiveCreators,
    },
    tournaments: {
      total: totalTournaments,
    },
    seasons: {
      upcoming: upcomingSeasons,
      active: activeSeasons,
      completed: completedSeasons,
      archived: archivedSeasons,
    },
    players: {
      total: totalPlayers,
    },
    teams: {
      total: totalTeams,
    },
    recentImports,
  }
}
