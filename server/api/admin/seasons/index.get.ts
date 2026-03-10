import { listSeasons } from '../../../services/admin/season.admin.service'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const page = parseInt(String(query.page ?? '1'), 10) || 1
  const limit = parseInt(String(query.limit ?? '20'), 10) || 20
  const search = query.search ? String(query.search) : undefined
  const sort = query.sort ? String(query.sort) : 'season_order'
  const order = query.order === 'desc' ? 'desc' : 'asc'
  const tournamentId = query.tournament_id ? parseInt(String(query.tournament_id), 10) : undefined

  const result = listSeasons({ page, limit, search, sort, order, tournamentId })
  return { data: { ...result, page, limit } }
})
