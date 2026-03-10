import { deleteTournament } from '../../../services/admin/tournament.admin.service'

export default defineEventHandler((event) => {
  const id = parseInt(getRouterParam(event, 'id') ?? '', 10)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, message: 'Invalid id' })
  }

  deleteTournament(id)
  return { success: true }
})
