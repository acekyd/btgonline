import { getPlayerWithDetails } from '../../../services/admin/player.admin.service'

export default defineEventHandler((event) => {
  const id = parseInt(getRouterParam(event, 'id') ?? '', 10)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, message: 'Invalid id' })
  }

  const player = getPlayerWithDetails(id)
  if (!player) {
    throw createError({ statusCode: 404, message: 'Player not found' })
  }

  return { data: player }
})
