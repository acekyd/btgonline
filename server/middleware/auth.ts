import { requireAdminSession } from '~/server/utils/session'

export default defineEventHandler(async (event) => {
  const url = event.node.req.url || ''
  if (url.startsWith('/api/admin/')) {
    await requireAdminSession(event)
  }
})
