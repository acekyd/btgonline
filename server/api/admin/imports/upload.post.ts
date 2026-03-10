import { parseCsvUpload } from '../../../services/admin/import.admin.service'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const VALID_IMPORT_TYPES = ['team_stats', 'player_stats'] as const

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event)
  if (!parts || parts.length === 0) {
    throw createError({ statusCode: 400, message: 'No form data received' })
  }

  const filePart = parts.find((p) => p.name === 'file')
  const seasonIdPart = parts.find((p) => p.name === 'season_id')
  const importTypePart = parts.find((p) => p.name === 'import_type')

  if (!filePart || !filePart.data) {
    throw createError({ statusCode: 400, message: 'file field is required' })
  }
  if (!seasonIdPart?.data) {
    throw createError({ statusCode: 400, message: 'season_id field is required' })
  }
  if (!importTypePart?.data) {
    throw createError({ statusCode: 400, message: 'import_type field is required' })
  }

  // Validate file size
  if (filePart.data.length > MAX_FILE_SIZE) {
    throw createError({ statusCode: 400, message: 'File exceeds 5MB limit' })
  }

  const seasonId = parseInt(seasonIdPart.data.toString('utf-8').trim(), 10)
  if (isNaN(seasonId)) {
    throw createError({ statusCode: 400, message: 'season_id must be a valid integer' })
  }

  const importType = importTypePart.data.toString('utf-8').trim()
  if (!VALID_IMPORT_TYPES.includes(importType as any)) {
    throw createError({ statusCode: 400, message: `import_type must be one of: ${VALID_IMPORT_TYPES.join(', ')}` })
  }

  const fileName = filePart.filename ?? 'upload.csv'
  const content = filePart.data.toString('utf-8')

  const result = parseCsvUpload(content, importType as 'team_stats' | 'player_stats', seasonId, fileName)

  // Return preview: first 100 valid rows for display, full counts
  return {
    data: {
      importId: result.importId,
      validRows: result.validRows.slice(0, 100),
      errorRows: result.errorRows,
      totalRows: result.totalRows,
      validCount: result.validRows.length,
      errorCount: result.errorRows.length,
    },
  }
})
