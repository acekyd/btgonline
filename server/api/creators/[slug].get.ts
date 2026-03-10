import { getCreatorBySlug } from '~/server/services/creator.service'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!
  const creator = getCreatorBySlug(slug)
  if (!creator) throw createError({ statusCode: 404, message: 'Creator not found' })
  return { data: creator }
})
