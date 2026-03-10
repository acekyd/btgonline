import { getDb, schema } from '../../db'
import { eq, desc, count, sql } from 'drizzle-orm'
import { parseCSV } from '../../utils/csv'
import { generateSlug } from '../../utils/slug'
import { randomUUID } from 'node:crypto'

interface TeamStatsRow {
  team_name: string
  played: number
  wins: number
  draws: number
  losses: number
  goals_for: number
  goals_against: number
  points: number
  finish_position: number
}

interface PlayerStatsRow {
  player_name: string
  team_name: string
  appearances: number
  goals: number
  assists: number
  clean_sheets: number | null
  motm: number | null
  average_rating: number | null
}

interface ErrorRow {
  rowIndex: number
  raw: Record<string, string>
  error: string
}

interface ParseResult {
  importId: string
  importType: 'team_stats' | 'player_stats'
  seasonId: number
  fileName: string
  validRows: (TeamStatsRow | PlayerStatsRow)[]
  errorRows: ErrorRow[]
  totalRows: number
}

// In-memory store for pending imports
const pendingImports = new Map<string, ParseResult>()

function parseIntField(val: string | undefined): { value: number; valid: boolean } {
  if (val === undefined || val === null || val.trim() === '') return { value: 0, valid: false }
  const n = parseInt(val.trim(), 10)
  return { value: n, valid: !isNaN(n) }
}

function parseFloatField(val: string | undefined): { value: number | null; valid: boolean } {
  if (val === undefined || val === null || val.trim() === '') return { value: null, valid: true }
  const n = parseFloat(val.trim())
  return { value: isNaN(n) ? null : n, valid: !isNaN(n) }
}

function parseOptionalIntField(val: string | undefined): { value: number | null; valid: boolean } {
  if (val === undefined || val === null || val.trim() === '') return { value: null, valid: true }
  const n = parseInt(val.trim(), 10)
  return { value: isNaN(n) ? null : n, valid: !isNaN(n) }
}

export function parseCsvUpload(
  content: string,
  importType: 'team_stats' | 'player_stats',
  seasonId: number,
  fileName: string
): ParseResult {
  const { data, errors: parseErrors } = parseCSV(content)

  const validRows: (TeamStatsRow | PlayerStatsRow)[] = []
  const errorRows: ErrorRow[] = []

  for (let i = 0; i < data.length; i++) {
    const row = data[i]

    if (importType === 'team_stats') {
      const teamName = row['team_name']?.trim()
      if (!teamName) {
        errorRows.push({ rowIndex: i, raw: row, error: 'team_name is required' })
        continue
      }

      const played = parseIntField(row['played'])
      const wins = parseIntField(row['wins'])
      const draws = parseIntField(row['draws'])
      const losses = parseIntField(row['losses'])
      const goalsFor = parseIntField(row['goals_for'])
      const goalsAgainst = parseIntField(row['goals_against'])
      const points = parseIntField(row['points'])
      const finishPosition = parseIntField(row['finish_position'])

      const missingFields: string[] = []
      if (!played.valid) missingFields.push('played')
      if (!wins.valid) missingFields.push('wins')
      if (!draws.valid) missingFields.push('draws')
      if (!losses.valid) missingFields.push('losses')
      if (!goalsFor.valid) missingFields.push('goals_for')
      if (!goalsAgainst.valid) missingFields.push('goals_against')
      if (!points.valid) missingFields.push('points')
      if (!finishPosition.valid) missingFields.push('finish_position')

      if (missingFields.length > 0) {
        errorRows.push({ rowIndex: i, raw: row, error: `Invalid or missing numeric fields: ${missingFields.join(', ')}` })
        continue
      }

      validRows.push({
        team_name: teamName,
        played: played.value,
        wins: wins.value,
        draws: draws.value,
        losses: losses.value,
        goals_for: goalsFor.value,
        goals_against: goalsAgainst.value,
        points: points.value,
        finish_position: finishPosition.value,
      } as TeamStatsRow)
    } else {
      // player_stats
      const playerName = row['player_name']?.trim()
      const teamName = row['team_name']?.trim()

      if (!playerName) {
        errorRows.push({ rowIndex: i, raw: row, error: 'player_name is required' })
        continue
      }
      if (!teamName) {
        errorRows.push({ rowIndex: i, raw: row, error: 'team_name is required' })
        continue
      }

      const appearances = parseIntField(row['appearances'])
      const goals = parseIntField(row['goals'])
      const assists = parseIntField(row['assists'])

      const missingFields: string[] = []
      if (!appearances.valid) missingFields.push('appearances')
      if (!goals.valid) missingFields.push('goals')
      if (!assists.valid) missingFields.push('assists')

      if (missingFields.length > 0) {
        errorRows.push({ rowIndex: i, raw: row, error: `Invalid or missing numeric fields: ${missingFields.join(', ')}` })
        continue
      }

      const cleanSheets = parseOptionalIntField(row['clean_sheets'])
      const motm = parseOptionalIntField(row['motm'])
      const averageRating = parseFloatField(row['average_rating'])

      validRows.push({
        player_name: playerName,
        team_name: teamName,
        appearances: appearances.value,
        goals: goals.value,
        assists: assists.value,
        clean_sheets: cleanSheets.value,
        motm: motm.value,
        average_rating: averageRating.value,
      } as PlayerStatsRow)
    }
  }

  const importId = randomUUID()
  const result: ParseResult = {
    importId,
    importType,
    seasonId,
    fileName,
    validRows,
    errorRows,
    totalRows: data.length,
  }

  pendingImports.set(importId, result)
  return result
}

function resolveOrCreateTeam(teamName: string, tx: ReturnType<typeof getDb>): number {
  const alias = tx.select()
    .from(schema.team_aliases)
    .where(sql`lower(${schema.team_aliases.display_name}) = lower(${teamName})`)
    .get()

  if (alias) return alias.team_id

  const now = Math.floor(Date.now() / 1000)
  const slug = generateSlug(teamName)
  const team = tx.insert(schema.teams).values({
    canonical_name: teamName,
    slug,
    created_at: now,
    updated_at: now,
  }).returning().get()

  tx.insert(schema.team_aliases).values({
    team_id: team!.id,
    display_name: teamName,
    created_at: now,
  }).run()

  return team!.id
}

function resolveOrCreatePlayer(playerName: string, tx: ReturnType<typeof getDb>): number {
  const alias = tx.select()
    .from(schema.player_aliases)
    .where(sql`lower(${schema.player_aliases.display_name}) = lower(${playerName})`)
    .get()

  if (alias) return alias.player_id

  const now = Math.floor(Date.now() / 1000)
  const slug = generateSlug(playerName)
  const player = tx.insert(schema.players).values({
    canonical_name: playerName,
    slug,
    created_at: now,
    updated_at: now,
  }).returning().get()

  tx.insert(schema.player_aliases).values({
    player_id: player!.id,
    display_name: playerName,
    created_at: now,
  }).run()

  return player!.id
}

export function confirmImport(importId: string): { saved: number; failed: number; status: 'complete' | 'partial' | 'failed' } {
  const pending = pendingImports.get(importId)
  if (!pending) {
    throw createError({ statusCode: 404, message: 'Import session not found or expired' })
  }
  pendingImports.delete(importId)

  const db = getDb()
  let saved = 0
  let failed = 0
  const now = Math.floor(Date.now() / 1000)

  db.transaction((tx) => {
    for (const row of pending.validRows) {
      try {
        if (pending.importType === 'team_stats') {
          const teamRow = row as TeamStatsRow
          const teamId = resolveOrCreateTeam(teamRow.team_name, tx)

          tx.insert(schema.season_team_stats).values({
            season_id: pending.seasonId,
            team_id: teamId,
            display_name_for_season: teamRow.team_name,
            played: teamRow.played,
            wins: teamRow.wins,
            draws: teamRow.draws,
            losses: teamRow.losses,
            goals_for: teamRow.goals_for,
            goals_against: teamRow.goals_against,
            points: teamRow.points,
            finish_position: teamRow.finish_position,
            created_at: now,
            updated_at: now,
          }).onConflictDoUpdate({
            target: [schema.season_team_stats.season_id, schema.season_team_stats.team_id],
            set: {
              display_name_for_season: teamRow.team_name,
              played: teamRow.played,
              wins: teamRow.wins,
              draws: teamRow.draws,
              losses: teamRow.losses,
              goals_for: teamRow.goals_for,
              goals_against: teamRow.goals_against,
              points: teamRow.points,
              finish_position: teamRow.finish_position,
              updated_at: now,
            },
          }).run()

          saved++
        } else {
          const playerRow = row as PlayerStatsRow
          const playerId = resolveOrCreatePlayer(playerRow.player_name, tx)
          const teamId = resolveOrCreateTeam(playerRow.team_name, tx)

          tx.insert(schema.season_player_stats).values({
            season_id: pending.seasonId,
            player_id: playerId,
            team_id: teamId,
            display_name_for_season: playerRow.player_name,
            appearances: playerRow.appearances,
            goals: playerRow.goals,
            assists: playerRow.assists,
            clean_sheets: playerRow.clean_sheets ?? null,
            motm: playerRow.motm ?? null,
            average_rating: playerRow.average_rating ?? null,
            created_at: now,
            updated_at: now,
          }).onConflictDoUpdate({
            target: [schema.season_player_stats.season_id, schema.season_player_stats.player_id],
            set: {
              team_id: teamId,
              display_name_for_season: playerRow.player_name,
              appearances: playerRow.appearances,
              goals: playerRow.goals,
              assists: playerRow.assists,
              clean_sheets: playerRow.clean_sheets ?? null,
              motm: playerRow.motm ?? null,
              average_rating: playerRow.average_rating ?? null,
              updated_at: now,
            },
          }).run()

          saved++
        }
      } catch (err) {
        console.error(`[confirmImport] Row failed:`, err)
        failed++
      }
    }

    // Add failed count from parse stage
    failed += pending.errorRows.length

    let importStatus: 'complete' | 'partial' | 'failed'
    if (saved === 0) {
      importStatus = 'failed'
    } else if (failed > 0) {
      importStatus = 'partial'
    } else {
      importStatus = 'complete'
    }

    tx.insert(schema.import_logs).values({
      season_id: pending.seasonId,
      import_type: pending.importType,
      file_name: pending.fileName,
      status: importStatus,
      rows_processed: saved,
      rows_failed: failed,
      created_at: now,
    }).run()
  })

  // failed already includes pending.errorRows.length (added inside the transaction)
  let finalStatus: 'complete' | 'partial' | 'failed'
  if (saved === 0) {
    finalStatus = 'failed'
  } else if (failed > 0) {
    finalStatus = 'partial'
  } else {
    finalStatus = 'complete'
  }

  return { saved, failed, status: finalStatus }
}

export function listImports(opts: { page: number; limit: number }) {
  const db = getDb()
  const offset = (opts.page - 1) * opts.limit

  const rows = db.select({
    id: schema.import_logs.id,
    season_id: schema.import_logs.season_id,
    import_type: schema.import_logs.import_type,
    file_name: schema.import_logs.file_name,
    status: schema.import_logs.status,
    rows_processed: schema.import_logs.rows_processed,
    rows_failed: schema.import_logs.rows_failed,
    created_at: schema.import_logs.created_at,
    season_name: schema.tournament_seasons.name,
  })
    .from(schema.import_logs)
    .leftJoin(schema.tournament_seasons, eq(schema.import_logs.season_id, schema.tournament_seasons.id))
    .orderBy(desc(schema.import_logs.created_at))
    .limit(opts.limit)
    .offset(offset)
    .all()

  const [{ total }] = db.select({ total: count() }).from(schema.import_logs).all()

  return { rows, total }
}
