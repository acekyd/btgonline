export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin') || to.path === '/admin/login') return

  try {
    const { data } = await $fetch<{ data: { adminId: number } | null }>('/api/auth/me')
    if (!data) {
      return navigateTo('/admin/login')
    }
  } catch {
    return navigateTo('/admin/login')
  }
})
