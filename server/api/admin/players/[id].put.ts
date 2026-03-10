import { updatePlayer } from '../../../services/admin/player.admin.service'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') ?? '', 10)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, message: 'Invalid id' })
  }

  const body = await readBody(event)
  if (!body || Object.keys(body).length === 0) {
    throw createError({ statusCode: 400, message: 'Request body is empty' })
  }

  const data: { canonical_name?: string; primary_position?: string } = {}
  if (body.canonical_name !== undefined) data.canonical_name = String(body.canonical_name).trim()
  if (body.primary_position !== undefined) data.primary_position = String(body.primary_position).trim()

  const updated = updatePlayer(id, data)
  if (!updated) {
    throw createError({ statusCode: 404, message: 'Player not found' })
  }

  return { data: updated }
})
