import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const dbUrl = process.env.DATABASE_URL || 'file:./data/dev.db'
const dbPath = resolve(dbUrl.startsWith('file:') ? dbUrl.slice(5) : dbUrl)
mkdirSync(dirname(dbPath), { recursive: true })

const sqlite = new Database(dbPath)
sqlite.pragma('journal_mode = WAL')
sqlite.pragma('foreign_keys = ON')

const db = drizzle(sqlite)

migrate(db, { migrationsFolder: './server/db/migrations' })
console.log('Migrations complete')
process.exit(0)
