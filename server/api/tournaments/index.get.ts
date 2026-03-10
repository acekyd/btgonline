import { getAllTournaments } from '~/server/services/tournament.service'

export default defineEventHandler(async () => {
  return { data: getAllTournaments() }
})
