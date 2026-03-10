import { createCreator } from '../../../services/admin/creator.admin.service'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.display_name?.trim()) {
    throw createError({ statusCode: 400, message: 'display_name is required' })
  }

  const creator = createCreator({
    display_name: body.display_name.trim(),
    bio: body.bio ?? undefined,
    avatar_url: body.avatar_url ?? undefined,
    primary_stream_url: body.primary_stream_url ?? undefined,
    twitch_url: body.twitch_url ?? undefined,
    youtube_url: body.youtube_url ?? undefined,
    tiktok_url: body.tiktok_url ?? undefined,
    instagram_url: body.instagram_url ?? undefined,
    twitter_url: body.twitter_url ?? undefined,
    is_featured: body.is_featured !== undefined ? Number(body.is_featured) : undefined,
    is_active: body.is_active !== undefined ? Number(body.is_active) : undefined,
    sort_order: body.sort_order !== undefined ? Number(body.sort_order) : undefined,
  })

  return { data: creator }
})
