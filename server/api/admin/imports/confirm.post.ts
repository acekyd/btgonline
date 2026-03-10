import { confirmImport } from '../../../services/admin/import.admin.service'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.importId?.trim()) {
    throw createError({ statusCode: 400, message: 'importId is required' })
  }

  const result = confirmImport(String(body.importId).trim())
  return { data: result }
})
