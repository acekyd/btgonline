import { getSeasonById } from '~/server/services/season.service'

export default defineEventHandler(async (event) => {
  const idParam = getRouterParam(event, 'id')!
  const id = parseInt(idParam, 10)
  if (isNaN(id)) throw createError({ statusCode: 400, message: 'Invalid season id' })
  const season = getSeasonById(id)
  if (!season) throw createError({ statusCode: 404, message: 'Season not found' })
  return { data: season }
})
