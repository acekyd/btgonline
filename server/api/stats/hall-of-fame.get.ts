import { getHallOfFame } from '~/server/services/stats.service'

export default defineEventHandler(async () => {
  const { topScorers, assistLeaders, mostMotm, mostAppearances, teamTitles, mostPodiums } = getHallOfFame()
  return { data: { topScorers, assistLeaders, mostMotm, mostAppearances, teamTitles, mostPodiums } }
})
