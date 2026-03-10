import { getSeasonById } from '../../../services/admin/season.admin.service'

export default defineEventHandler((event) => {
  const id = parseInt(getRouterParam(event, 'id') ?? '', 10)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, message: 'Invalid id' })
  }

  const season = getSeasonById(id)
  if (!season) {
    throw createError({ statusCode: 404, message: 'Season not found' })
  }

  return { data: season }
})
