import { createTournament } from '../../../services/admin/tournament.admin.service'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.name?.trim()) {
    throw createError({ statusCode: 400, message: 'name is required' })
  }
  if (!body?.game_title?.trim()) {
    throw createError({ statusCode: 400, message: 'game_title is required' })
  }

  const tournament = createTournament({
    name: body.name.trim(),
    game_title: body.game_title.trim(),
    description: body.description ?? undefined,
    logo_url: body.logo_url ?? undefined,
    banner_url: body.banner_url ?? undefined,
    format_type: body.format_type ?? undefined,
    stats_mode: body.stats_mode ?? undefined,
    external_url: body.external_url ?? undefined,
    status: body.status ?? undefined,
    is_active: body.is_active !== undefined ? Number(body.is_active) : undefined,
    sort_order: body.sort_order !== undefined ? Number(body.sort_order) : undefined,
  })

  return { data: tournament }
})
