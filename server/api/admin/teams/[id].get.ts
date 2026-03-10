import { getTeamWithDetails } from '../../../services/admin/team.admin.service'

export default defineEventHandler((event) => {
  const id = parseInt(getRouterParam(event, 'id') ?? '', 10)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, message: 'Invalid id' })
  }

  const team = getTeamWithDetails(id)
  if (!team) {
    throw createError({ statusCode: 404, message: 'Team not found' })
  }

  return { data: team }
})
