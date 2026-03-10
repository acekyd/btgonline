import { mergeTeam } from '../../../services/admin/team.admin.service'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const sourceId = parseInt(String(body?.sourceId ?? ''), 10)
  const targetId = parseInt(String(body?.targetId ?? ''), 10)

  if (!body?.sourceId || isNaN(sourceId)) {
    throw createError({ statusCode: 400, message: 'sourceId is required and must be a valid integer' })
  }
  if (!body?.targetId || isNaN(targetId)) {
    throw createError({ statusCode: 400, message: 'targetId is required and must be a valid integer' })
  }
  if (sourceId === targetId) {
    throw createError({ statusCode: 400, message: 'sourceId and targetId must be different' })
  }

  const result = mergeTeam(sourceId, targetId)
  return { data: result }
})
