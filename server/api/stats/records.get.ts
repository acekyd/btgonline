import { getRecords } from '~/server/services/stats.service'

export default defineEventHandler(async () => {
  return { data: getRecords() }
})
