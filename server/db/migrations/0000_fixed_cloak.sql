CREATE TABLE `admins` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admins_email_unique` ON `admins` (`email`);--> statement-breakpoint
CREATE TABLE `creators` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`display_name` text NOT NULL,
	`slug` text NOT NULL,
	`bio` text,
	`avatar_url` text,
	`primary_stream_url` text,
	`twitch_url` text,
	`youtube_url` text,
	`tiktok_url` text,
	`instagram_url` text,
	`twitter_url` text,
	`is_featured` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT 1 NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `creators_slug_unique` ON `creators` (`slug`);--> statement-breakpoint
CREATE INDEX `creator_is_active_idx` ON `creators` (`is_active`);--> statement-breakpoint
CREATE INDEX `creator_is_featured_idx` ON `creators` (`is_featured`);--> statement-breakpoint
CREATE INDEX `creator_sort_order_idx` ON `creators` (`sort_order`);--> statement-breakpoint
CREATE TABLE `import_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`season_id` integer NOT NULL,
	`import_type` text NOT NULL,
	`file_name` text NOT NULL,
	`status` text NOT NULL,
	`rows_processed` integer DEFAULT 0 NOT NULL,
	`rows_failed` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`season_id`) REFERENCES `tournament_seasons`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `player_aliases` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`player_id` integer NOT NULL,
	`display_name` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `player_aliases_display_name_unique` ON `player_aliases` (`display_name`);--> statement-breakpoint
CREATE TABLE `players` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`canonical_name` text NOT NULL,
	`slug` text NOT NULL,
	`primary_position` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `players_canonical_name_unique` ON `players` (`canonical_name`);--> statement-breakpoint
CREATE UNIQUE INDEX `players_slug_unique` ON `players` (`slug`);--> statement-breakpoint
CREATE TABLE `season_player_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`season_id` integer NOT NULL,
	`player_id` integer NOT NULL,
	`team_id` integer,
	`display_name_for_season` text NOT NULL,
	`appearances` integer DEFAULT 0 NOT NULL,
	`goals` integer DEFAULT 0 NOT NULL,
	`assists` integer DEFAULT 0 NOT NULL,
	`clean_sheets` integer,
	`motm` integer,
	`average_rating` real,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`season_id`) REFERENCES `tournament_seasons`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `season_player_stats_season_id_idx` ON `season_player_stats` (`season_id`);--> statement-breakpoint
CREATE INDEX `season_player_stats_player_id_idx` ON `season_player_stats` (`player_id`);--> statement-breakpoint
CREATE INDEX `season_player_stats_team_id_idx` ON `season_player_stats` (`team_id`);--> statement-breakpoint
CREATE INDEX `season_player_stats_goals_idx` ON `season_player_stats` (`goals`);--> statement-breakpoint
CREATE INDEX `season_player_stats_assists_idx` ON `season_player_stats` (`assists`);--> statement-breakpoint
CREATE INDEX `season_player_stats_motm_idx` ON `season_player_stats` (`motm`);--> statement-breakpoint
CREATE INDEX `season_player_stats_appearances_idx` ON `season_player_stats` (`appearances`);--> statement-breakpoint
CREATE UNIQUE INDEX `season_player_stats_season_player_unique` ON `season_player_stats` (`season_id`,`player_id`);--> statement-breakpoint
CREATE TABLE `season_team_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`season_id` integer NOT NULL,
	`team_id` integer NOT NULL,
	`display_name_for_season` text NOT NULL,
	`played` integer DEFAULT 0 NOT NULL,
	`wins` integer DEFAULT 0 NOT NULL,
	`draws` integer DEFAULT 0 NOT NULL,
	`losses` integer DEFAULT 0 NOT NULL,
	`goals_for` integer DEFAULT 0 NOT NULL,
	`goals_against` integer DEFAULT 0 NOT NULL,
	`points` integer DEFAULT 0 NOT NULL,
	`finish_position` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`season_id`) REFERENCES `tournament_seasons`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `season_team_stats_season_id_idx` ON `season_team_stats` (`season_id`);--> statement-breakpoint
CREATE INDEX `season_team_stats_team_id_idx` ON `season_team_stats` (`team_id`);--> statement-breakpoint
CREATE INDEX `season_team_stats_points_idx` ON `season_team_stats` (`points`);--> statement-breakpoint
CREATE INDEX `season_team_stats_finish_position_idx` ON `season_team_stats` (`finish_position`);--> statement-breakpoint
CREATE UNIQUE INDEX `season_team_stats_season_team_unique` ON `season_team_stats` (`season_id`,`team_id`);--> statement-breakpoint
CREATE TABLE `team_aliases` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`team_id` integer NOT NULL,
	`display_name` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `team_aliases_display_name_unique` ON `team_aliases` (`display_name`);--> statement-breakpoint
CREATE TABLE `teams` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`canonical_name` text NOT NULL,
	`slug` text NOT NULL,
	`logo_url` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `teams_canonical_name_unique` ON `teams` (`canonical_name`);--> statement-breakpoint
CREATE UNIQUE INDEX `teams_slug_unique` ON `teams` (`slug`);--> statement-breakpoint
CREATE TABLE `tournament_seasons` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tournament_id` integer NOT NULL,
	`name` text NOT NULL,
	`short_label` text,
	`season_order` integer DEFAULT 0 NOT NULL,
	`start_date` text,
	`end_date` text,
	`status` text DEFAULT 'upcoming' NOT NULL,
	`overview` text,
	`winner_team_id` integer,
	`runner_up_team_id` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`tournament_id`) REFERENCES `tournaments`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`winner_team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`runner_up_team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `tournament_season_tournament_id_idx` ON `tournament_seasons` (`tournament_id`);--> statement-breakpoint
CREATE INDEX `tournament_season_winner_team_id_idx` ON `tournament_seasons` (`winner_team_id`);--> statement-breakpoint
CREATE INDEX `tournament_season_end_date_idx` ON `tournament_seasons` (`end_date`);--> statement-breakpoint
CREATE TABLE `tournaments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`game_title` text NOT NULL,
	`description` text,
	`logo_url` text,
	`banner_url` text,
	`format_type` text,
	`stats_mode` text DEFAULT 'none' NOT NULL,
	`external_url` text,
	`status` text DEFAULT 'active' NOT NULL,
	`is_active` integer DEFAULT 1 NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tournaments_slug_unique` ON `tournaments` (`slug`);--> statement-breakpoint
CREATE INDEX `tournament_status_idx` ON `tournaments` (`status`);--> statement-breakpoint
CREATE INDEX `tournament_sort_order_idx` ON `tournaments` (`sort_order`);