import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import bcrypt from 'bcryptjs'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import * as schema from '../server/db/schema'
import { eq } from 'drizzle-orm'

async function seed() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    console.error('Error: ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment')
    process.exit(1)
  }

  const dbUrl = process.env.DATABASE_URL || 'file:./data/dev.db'
  const dbPath = resolve(dbUrl.startsWith('file:') ? dbUrl.slice(5) : dbUrl)
  mkdirSync(dirname(dbPath), { recursive: true })

  const sqlite = new Database(dbPath)
  sqlite.pragma('journal_mode = WAL')
  sqlite.pragma('foreign_keys = ON')
  const db = drizzle(sqlite, { schema })

  const existing = db.select().from(schema.admins).where(eq(schema.admins.email, email)).get()

  if (existing) {
    console.log(`Admin with email ${email} already exists. Skipping.`)
    process.exit(0)
  }

  const hash = await bcrypt.hash(password, 12)
  const now = Math.floor(Date.now() / 1000)

  db.insert(schema.admins).values({
    email,
    password_hash: hash,
    created_at: now,
    updated_at: now
  }).run()

  console.log(`Admin account created for ${email}`)
  console.log(`Password hash: ${hash}`)
  process.exit(0)
}

seed().catch(console.error)
