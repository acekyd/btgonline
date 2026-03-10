import { getTournamentBySlug } from '~/server/services/tournament.service'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!
  const tournament = getTournamentBySlug(slug)
  if (!tournament) throw createError({ statusCode: 404, message: 'Tournament not found' })
  return { data: tournament }
})
