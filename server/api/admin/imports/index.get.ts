import { listImports } from '../../../services/admin/import.admin.service'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const page = parseInt(String(query.page ?? '1'), 10) || 1
  const limit = parseInt(String(query.limit ?? '20'), 10) || 20

  const result = listImports({ page, limit })
  return { data: { ...result, page, limit } }
})
