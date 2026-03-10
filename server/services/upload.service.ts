import { writeFileSync, mkdirSync } from 'node:fs'
import { join, extname } from 'node:path'
import { randomUUID } from 'node:crypto'

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp']
const ALLOWED_EXT = ['.jpg', '.jpeg', '.png', '.webp']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

function getUploadDir(): string {
  if (process.env.NODE_ENV === 'production') {
    return '/data/uploads'
  }
  return join(process.cwd(), 'public', 'uploads')
}

function getUploadUrlPrefix(): string {
  return '/uploads'
}

export function saveUploadedFile(file: {
  filename: string
  type: string
  data: Buffer
}): string {
  // Validate MIME type
  if (!ALLOWED_MIME.includes(file.type)) {
    throw createError({ statusCode: 400, message: `File type ${file.type} not allowed` })
  }

  // Validate extension
  const ext = extname(file.filename || '').toLowerCase()
  if (!ALLOWED_EXT.includes(ext)) {
    throw createError({ statusCode: 400, message: `File extension ${ext} not allowed` })
  }

  // Validate size
  if (file.data.length > MAX_SIZE) {
    throw createError({ statusCode: 400, message: 'File exceeds 5MB limit' })
  }

  // Save with UUID-based filename to prevent path traversal
  const newFilename = `${randomUUID()}${ext}`
  const uploadDir = getUploadDir()
  mkdirSync(uploadDir, { recursive: true })
  writeFileSync(join(uploadDir, newFilename), file.data)

  return `${getUploadUrlPrefix()}/${newFilename}`
}
