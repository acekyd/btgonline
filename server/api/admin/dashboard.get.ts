import { getDashboardStats } from '../../services/admin/dashboard.admin.service'

export default defineEventHandler(() => {
  const data = getDashboardStats()
  return { data }
})
