import type { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import type {
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
} from '~/server/db/schema'

export type Admin = InferSelectModel<typeof admins>
export type NewAdmin = InferInsertModel<typeof admins>

export type Creator = InferSelectModel<typeof creators>
export type NewCreator = InferInsertModel<typeof creators>

export type Tournament = InferSelectModel<typeof tournaments>
export type NewTournament = InferInsertModel<typeof tournaments>

export type TournamentSeason = InferSelectModel<typeof tournament_seasons>
export type NewTournamentSeason = InferInsertModel<typeof tournament_seasons>

export type Team = InferSelectModel<typeof teams>
export type NewTeam = InferInsertModel<typeof teams>

export type TeamAlias = InferSelectModel<typeof team_aliases>
export type NewTeamAlias = InferInsertModel<typeof team_aliases>

export type Player = InferSelectModel<typeof players>
export type NewPlayer = InferInsertModel<typeof players>

export type PlayerAlias = InferSelectModel<typeof player_aliases>
export type NewPlayerAlias = InferInsertModel<typeof player_aliases>

export type SeasonTeamStats = InferSelectModel<typeof season_team_stats>
export type NewSeasonTeamStats = InferInsertModel<typeof season_team_stats>

export type SeasonPlayerStats = InferSelectModel<typeof season_player_stats>
export type NewSeasonPlayerStats = InferInsertModel<typeof season_player_stats>

export type ImportLog = InferSelectModel<typeof import_logs>
export type NewImportLog = InferInsertModel<typeof import_logs>

export type TournamentStatus = 'active' | 'completed' | 'offseason'
export type SeasonStatus = 'upcoming' | 'active' | 'completed' | 'archived'
export type StatsMode = 'none' | 'football_seasonal'
export type ImportType = 'team_stats' | 'player_stats'
export type ImportStatus = 'complete' | 'partial' | 'failed'
export type PlayerPosition = 'GK' | 'DEF' | 'MID' | 'FWD'
