import { updateCreator } from '../../../services/admin/creator.admin.service'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') ?? '', 10)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, message: 'Invalid id' })
  }

  const body = await readBody(event)
  if (!body || Object.keys(body).length === 0) {
    throw createError({ statusCode: 400, message: 'Request body is empty' })
  }

  const updated = updateCreator(id, body)
  if (!updated) {
    throw createError({ statusCode: 404, message: 'Creator not found' })
  }

  return { data: updated }
})
