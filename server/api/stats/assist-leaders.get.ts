import { getAssistLeaders } from '~/server/services/stats.service'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const rawLimit = Number(query.limit ?? 10)
  const limit = isNaN(rawLimit) || rawLimit < 1 ? 10 : Math.min(rawLimit, 50)

  const tournamentId = query.tournament_id !== undefined && query.tournament_id !== ''
    ? parseInt(String(query.tournament_id), 10)
    : undefined

  if (tournamentId !== undefined && isNaN(tournamentId)) {
    throw createError({ statusCode: 400, message: 'Invalid tournament_id' })
  }

  return { data: getAssistLeaders(limit, tournamentId) }
})
