import { getActiveCreators } from '~/server/services/creator.service'

export default defineEventHandler(async () => {
  return { data: getActiveCreators() }
})
