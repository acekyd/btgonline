import { getStandingsForSeason } from '~/server/services/stats.service'

export default defineEventHandler(async (event) => {
  const idParam = getRouterParam(event, 'season_id')!
  const seasonId = parseInt(idParam, 10)
  if (isNaN(seasonId)) throw createError({ statusCode: 400, message: 'Invalid season_id' })
  return { data: getStandingsForSeason(seasonId) }
})
