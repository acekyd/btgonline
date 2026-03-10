import { getFeaturedCreators } from '~/server/services/creator.service'
import { getActiveTournaments } from '~/server/services/tournament.service'
import { getRecentChampions } from '~/server/services/season.service'

export default defineEventHandler(async () => {
  const featuredCreators = getFeaturedCreators()
  const activeTournaments = getActiveTournaments()
  const recentChampions = getRecentChampions(6)
  return { data: { featuredCreators, activeTournaments, recentChampions } }
})
