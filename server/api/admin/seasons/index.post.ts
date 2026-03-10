import { createSeason } from '../../../services/admin/season.admin.service'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.tournament_id) {
    throw createError({ statusCode: 400, message: 'tournament_id is required' })
  }
  if (!body?.name?.trim()) {
    throw createError({ statusCode: 400, message: 'name is required' })
  }

  const tournamentId = parseInt(String(body.tournament_id), 10)
  if (isNaN(tournamentId)) {
    throw createError({ statusCode: 400, message: 'tournament_id must be a valid integer' })
  }

  const season = createSeason({
    tournament_id: tournamentId,
    name: body.name.trim(),
    short_label: body.short_label ?? undefined,
    season_order: body.season_order !== undefined ? Number(body.season_order) : undefined,
    start_date: body.start_date ?? undefined,
    end_date: body.end_date ?? undefined,
    status: body.status ?? undefined,
    overview: body.overview ?? undefined,
    winner_team_id: body.winner_team_id !== undefined && body.winner_team_id !== null
      ? parseInt(String(body.winner_team_id), 10)
      : null,
    runner_up_team_id: body.runner_up_team_id !== undefined && body.runner_up_team_id !== null
      ? parseInt(String(body.runner_up_team_id), 10)
      : null,
  })

  return { data: season }
})
