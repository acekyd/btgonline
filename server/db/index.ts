import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import * as schema from './schema'

function getDbPath(): string {
  const url = process.env.DATABASE_URL || 'file:./data/dev.db'
  // Strip 'file:' prefix if present
  return url.startsWith('file:') ? url.slice(5) : url
}

let _db: ReturnType<typeof drizzle> | null = null

export function getDb() {
  if (_db) return _db
  const dbPath = getDbPath()
  // Ensure directory exists
  mkdirSync(dirname(dbPath), { recursive: true })
  const sqlite = new Database(dbPath)
  sqlite.pragma('journal_mode = WAL')
  sqlite.pragma('foreign_keys = ON')
  _db = drizzle(sqlite, { schema })
  return _db
}

export { schema }
