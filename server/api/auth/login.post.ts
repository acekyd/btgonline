import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { getDb, schema } from '~/server/db/index'
import { getAdminSession } from '~/server/utils/session'
import { isRateLimited, recordFailedAttempt, resetAttempts } from '~/server/utils/rateLimit'

export default defineEventHandler(async (event) => {
  const ip =
    getRequestHeader(event, 'x-forwarded-for') ||
    event.node.req.socket.remoteAddress ||
    'unknown'

  if (isRateLimited(ip)) {
    setResponseHeader(event, 'Retry-After', '900')
    throw createError({
      statusCode: 429,
      message: 'Too many login attempts. Try again later.',
    })
  }

  const body = await readBody(event)
  const { email, password } = body || {}

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: 'Email and password are required.',
    })
  }

  const db = getDb()
  const admin = db
    .select()
    .from(schema.admins)
    .where(eq(schema.admins.email, email))
    .get()

  if (!admin || !bcrypt.compareSync(password, admin.password_hash)) {
    recordFailedAttempt(ip)
    throw createError({
      statusCode: 401,
      message: 'Invalid credentials',
    })
  }

  resetAttempts(ip)

  const session = await getAdminSession(event)
  await session.update({ adminId: admin.id, adminEmail: admin.email })

  return { success: true, message: 'Logged in' }
})
