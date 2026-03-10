import { deleteCreator } from '../../../services/admin/creator.admin.service'

export default defineEventHandler((event) => {
  const id = parseInt(getRouterParam(event, 'id') ?? '', 10)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, message: 'Invalid id' })
  }

  deleteCreator(id)
  return { success: true }
})
