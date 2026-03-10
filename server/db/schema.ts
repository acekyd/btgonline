import { sqliteTable, integer, text, real, index, unique } from 'drizzle-orm/sqlite-core'

export const admins = sqliteTable('admins', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  password_hash: text('password_hash').notNull(),
  created_at: integer('created_at').notNull(),
  updated_at: integer('updated_at').notNull(),
})

export const creators = sqliteTable('creators', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  display_name: text('display_name').notNull(),
  slug: text('slug').notNull().unique(),
  bio: text('bio'),
  avatar_url: text('avatar_url'),
  primary_stream_url: text('primary_stream_url'),
  twitch_url: text('twitch_url'),
  youtube_url: text('youtube_url'),
  tiktok_url: text('tiktok_url'),
  instagram_url: text('instagram_url'),
  twitter_url: text('twitter_url'),
  is_featured: integer('is_featured').notNull().default(0),
  is_active: integer('is_active').notNull().default(1),
  sort_order: integer('sort_order').notNull().default(0),
  created_at: integer('created_at').notNull(),
  updated_at: integer('updated_at').notNull(),
}, (table) => [
  index('creator_is_active_idx').on(table.is_active),
  index('creator_is_featured_idx').on(table.is_featured),
  index('creator_sort_order_idx').on(table.sort_order),
])

export const tournaments = sqliteTable('tournaments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  game_title: text('game_title').notNull(),
  description: text('description'),
  logo_url: text('logo_url'),
  banner_url: text('banner_url'),
  format_type: text('format_type'),
  stats_mode: text('stats_mode').notNull().default('none'),
  external_url: text('external_url'),
  status: text('status').notNull().default('active'),
  is_active: integer('is_active').notNull().default(1),
  sort_order: integer('sort_order').notNull().default(0),
  created_at: integer('created_at').notNull(),
  updated_at: integer('updated_at').notNull(),
}, (table) => [
  index('tournament_status_idx').on(table.status),
  index('tournament_sort_order_idx').on(table.sort_order),
])

export const teams = sqliteTable('teams', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  canonical_name: text('canonical_name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  logo_url: text('logo_url'),
  created_at: integer('created_at').notNull(),
  updated_at: integer('updated_at').notNull(),
})

export const tournament_seasons = sqliteTable('tournament_seasons', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  tournament_id: integer('tournament_id').notNull().references(() => tournaments.id),
  name: text('name').notNull(),
  short_label: text('short_label'),
  season_order: integer('season_order').notNull().default(0),
  start_date: text('start_date'),
  end_date: text('end_date'),
  status: text('status').notNull().default('upcoming'),
  overview: text('overview'),
  winner_team_id: integer('winner_team_id').references(() => teams.id),
  runner_up_team_id: integer('runner_up_team_id').references(() => teams.id),
  created_at: integer('created_at').notNull(),
  updated_at: integer('updated_at').notNull(),
}, (table) => [
  index('tournament_season_tournament_id_idx').on(table.tournament_id),
  index('tournament_season_winner_team_id_idx').on(table.winner_team_id),
  index('tournament_season_end_date_idx').on(table.end_date),
])

export const team_aliases = sqliteTable('team_aliases', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  team_id: integer('team_id').notNull().references(() => teams.id),
  display_name: text('display_name').notNull().unique(),
  created_at: integer('created_at').notNull(),
})

export const players = sqliteTable('players', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  canonical_name: text('canonical_name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  primary_position: text('primary_position'),
  created_at: integer('created_at').notNull(),
  updated_at: integer('updated_at').notNull(),
})

export const player_aliases = sqliteTable('player_aliases', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  player_id: integer('player_id').notNull().references(() => players.id),
  display_name: text('display_name').notNull().unique(),
  created_at: integer('created_at').notNull(),
})

export const season_team_stats = sqliteTable('season_team_stats', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  season_id: integer('season_id').notNull().references(() => tournament_seasons.id),
  team_id: integer('team_id').notNull().references(() => teams.id),
  display_name_for_season: text('display_name_for_season').notNull(),
  played: integer('played').notNull().default(0),
  wins: integer('wins').notNull().default(0),
  draws: integer('draws').notNull().default(0),
  losses: integer('losses').notNull().default(0),
  goals_for: integer('goals_for').notNull().default(0),
  goals_against: integer('goals_against').notNull().default(0),
  points: integer('points').notNull().default(0),
  finish_position: integer('finish_position'),
  created_at: integer('created_at').notNull(),
  updated_at: integer('updated_at').notNull(),
}, (table) => [
  unique('season_team_stats_season_team_unique').on(table.season_id, table.team_id),
  index('season_team_stats_season_id_idx').on(table.season_id),
  index('season_team_stats_team_id_idx').on(table.team_id),
  index('season_team_stats_points_idx').on(table.points),
  index('season_team_stats_finish_position_idx').on(table.finish_position),
])

export const season_player_stats = sqliteTable('season_player_stats', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  season_id: integer('season_id').notNull().references(() => tournament_seasons.id),
  player_id: integer('player_id').notNull().references(() => players.id),
  team_id: integer('team_id').references(() => teams.id),
  display_name_for_season: text('display_name_for_season').notNull(),
  appearances: integer('appearances').notNull().default(0),
  goals: integer('goals').notNull().default(0),
  assists: integer('assists').notNull().default(0),
  clean_sheets: integer('clean_sheets'),
  motm: integer('motm'),
  average_rating: real('average_rating'),
  created_at: integer('created_at').notNull(),
  updated_at: integer('updated_at').notNull(),
}, (table) => [
  unique('season_player_stats_season_player_unique').on(table.season_id, table.player_id),
  index('season_player_stats_season_id_idx').on(table.season_id),
  index('season_player_stats_player_id_idx').on(table.player_id),
  index('season_player_stats_team_id_idx').on(table.team_id),
  index('season_player_stats_goals_idx').on(table.goals),
  index('season_player_stats_assists_idx').on(table.assists),
  index('season_player_stats_motm_idx').on(table.motm),
  index('season_player_stats_appearances_idx').on(table.appearances),
])

export const import_logs = sqliteTable('import_logs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  season_id: integer('season_id').notNull().references(() => tournament_seasons.id),
  import_type: text('import_type').notNull(),
  file_name: text('file_name').notNull(),
  status: text('status').notNull(),
  rows_processed: integer('rows_processed').notNull().default(0),
  rows_failed: integer('rows_failed').notNull().default(0),
  created_at: integer('created_at').notNull(),
})

export const schema = {
  admins,
  creators,
  tournaments,
  tournament_seasons,
  teams,
  team_aliases,
  players,
  player_aliases,
  season_team_stats,
  season_player_stats,
  import_logs,
}
