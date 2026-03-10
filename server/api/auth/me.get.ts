import { getAdminSession } from '~/server/utils/session'

export default defineEventHandler(async (event) => {
  const session = await getAdminSession(event)
  if (!session.data?.adminId) {
    return { data: null }
  }
  return { data: { adminId: session.data.adminId, adminEmail: session.data.adminEmail } }
})
