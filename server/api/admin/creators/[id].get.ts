import { getCreatorById } from '../../../services/admin/creator.admin.service'

export default defineEventHandler((event) => {
  const id = parseInt(getRouterParam(event, 'id') ?? '', 10)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, message: 'Invalid id' })
  }

  const creator = getCreatorById(id)
  if (!creator) {
    throw createError({ statusCode: 404, message: 'Creator not found' })
  }

  return { data: creator }
})
