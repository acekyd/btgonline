import { listTournaments } from '../../../services/admin/tournament.admin.service'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const page = parseInt(String(query.page ?? '1'), 10) || 1
  const limit = parseInt(String(query.limit ?? '20'), 10) || 20
  const search = query.search ? String(query.search) : undefined
  const sort = query.sort ? String(query.sort) : 'sort_order'
  const order = query.order === 'desc' ? 'desc' : 'asc'

  const result = listTournaments({ page, limit, search, sort, order })
  return { data: { ...result, page, limit } }
})
