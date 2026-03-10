import { saveUploadedFile } from '../../services/upload.service'

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event)
  if (!parts || parts.length === 0) {
    throw createError({ statusCode: 400, message: 'No form data received' })
  }

  const filePart = parts.find((p) => p.name === 'file')
  if (!filePart || !filePart.data) {
    throw createError({ statusCode: 400, message: 'file field is required' })
  }

  const url = saveUploadedFile({
    filename: filePart.filename ?? '',
    type: filePart.type ?? '',
    data: filePart.data,
  })

  return { data: { url } }
})
