import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import bcrypt from 'bcryptjs'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { createInterface } from 'node:readline'
import * as schema from '../server/db/schema'
import { eq } from 'drizzle-orm'

function prompt(question: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

function promptSecret(question: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    process.stdout.write(question)
    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.setEncoding('utf8')

    let password = ''
    process.stdin.on('data', function handler(ch: string) {
      if (ch === '\n' || ch === '\r' || ch === '\u0004') {
        process.stdin.setRawMode(false)
        process.stdin.pause()
        process.stdin.removeListener('data', handler)
        rl.close()
        process.stdout.write('\n')
        resolve(password)
      } else if (ch === '\u0003') {
        process.stdout.write('\n')
        process.exit(1)
      } else if (ch === '\u007f') {
        password = password.slice(0, -1)
      } else {
        password += ch
      }
    })
  })
}

async function seed() {
  console.log('\n BTG Admin Seed\n')

  const email = await prompt('Admin email: ')
  if (!email || !email.includes('@')) {
    console.error('Invalid email.')
    process.exit(1)
  }

  const password = await promptSecret('Admin password (hidden): ')
  if (!password || password.length < 10) {
    console.error('Password must be at least 10 characters.')
    process.exit(1)
  }

  const confirm = await promptSecret('Confirm password (hidden): ')
  if (password !== confirm) {
    console.error('Passwords do not match.')
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
    console.log(`\nAdmin with email ${email} already exists. Skipping.`)
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

  console.log(`\n✓ Admin account created for ${email}`)
  process.exit(0)
}

seed().catch(console.error)
