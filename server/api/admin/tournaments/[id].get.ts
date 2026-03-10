import { getTournamentById } from '../../../services/admin/tournament.admin.service'

export default defineEventHandler((event) => {
  const id = parseInt(getRouterParam(event, 'id') ?? '', 10)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, message: 'Invalid id' })
  }

  const tournament = getTournamentById(id)
  if (!tournament) {
    throw createError({ statusCode: 404, message: 'Tournament not found' })
  }

  return { data: tournament }
})
