export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin') || to.path === '/admin/login') return

  try {
    const headers = useRequestHeaders(['cookie'])
    const { data } = await $fetch<{ data: { adminId: number } | null }>('/api/auth/me', { headers })
    if (!data) {
      return navigateTo('/admin/login')
    }
  } catch {
    return navigateTo('/admin/login')
  }
})
