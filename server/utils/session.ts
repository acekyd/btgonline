import type { H3Event } from 'h3'

export interface SessionData {
  adminId: number
  adminEmail: string
}

export async function getAdminSession(event: H3Event) {
  const config = useRuntimeConfig()
  const session = await useSession<SessionData>(event, {
    password: config.sessionSecret,
    maxAge: 60 * 60 * 24, // 24 hours
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    }
  })
  return session
}

export async function requireAdminSession(event: H3Event): Promise<SessionData> {
  const session = await getAdminSession(event)
  if (!session.data?.adminId) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
  return session.data
}

export async function clearAdminSession(event: H3Event) {
  const session = await getAdminSession(event)
  await session.clear()
}
