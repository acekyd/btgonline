
# Bravo Trashe Gaming (BTG) Platform
## Product Requirements Document + Architecture Specification

---

# 1. Product Overview

The **BTG Platform** is the central website for the Bravo Trashe Gaming community.

The platform will:

- Showcase BTG creators
- Present tournaments across multiple games
- Archive tournament seasons
- Track historical football statistics across seasons
- Provide admin tools for managing the ecosystem

The system must remain:

- simple
- secure
- maintainable
- data‑driven

---

# 2. Goals

## Primary Goals

Provide a professional hub that allows visitors to:

- Discover BTG creators
- Browse tournaments
- Explore historical seasons
- View competition results
- See football statistics across seasons

Provide admins the ability to:

- Manage creators
- Manage tournaments
- Manage seasons
- Import stats
- Merge players and teams across seasons

---

# 3. Non‑Goals (V1)

Not included in version 1:

- Live match tracking
- Real‑time event ingestion
- Player self‑managed accounts
- Community user accounts
- Payment systems
- Automated identity detection

---

# 4. Core Product Principles

## Simplicity First
The platform must remain easy to maintain.

## Data Driven
Records such as top scorers and historical rankings must be computed from stored data.

## Admin Controlled
All content is curated by trusted admins.

## Security First
All admin operations must be authenticated and validated.

## Expandable
Architecture must allow adding additional games and tournaments later.

---

# 5. Technology Stack

Frontend
- Nuxt 3
- Vue 3
- TailwindCSS

Backend
- Nuxt Server Routes (Nitro)
- Node runtime

Database
- SQLite

ORM
- Drizzle ORM

Hosting
- Render Web Service

File Storage
- Local filesystem (V1)
- Future: object storage

Authentication
- Admin login with session cookies

---

# 6. Deployment Architecture

## Local Development

Database:

/data/dev.db

Uploads:

/public/uploads

Server routes:

/server/api

---

## Production (Render)

Render Web Service running:

node .output/server/index.mjs

Persistent disk mounted at:

/data

Production database:

/data/prod.db

Uploads:

/uploads

Render configuration:

Build command

npm run build

Start command

node .output/server/index.mjs

Environment variables

DATABASE_URL  
SESSION_SECRET  
ADMIN_EMAIL  
ADMIN_PASSWORD_HASH  

---

# 7. User Types

## Visitors

Visitors can:

- Browse creators
- Browse tournaments
- Browse seasons
- View statistics

Visitors cannot edit data.

---

## Admins

Admins manage platform content.

Admins can:

- Manage creators
- Manage tournaments
- Manage seasons
- Import statistics
- Merge players
- Merge teams
- Upload assets

---

# 8. Public Website Pages

## Home Page

Sections:

Hero section  
Featured creators  
Active tournaments  
Recent champions  
Community call‑to‑action

---

## Creators Page

Creator card contains:

- Avatar
- Display name
- Bio
- Social links
- Primary streaming platform

Optional Twitch preview.

---

## Creator Profile Page

Displays:

Avatar  
Name  
Bio  
Twitch embed (optional)  
YouTube  
TikTok  
Instagram  
Twitter  

---

## Tournaments Page

Each card shows:

- Logo
- Name
- Game title
- Format
- Status badge

Status badge examples:

Active  
Completed  
Offseason  

---

## Tournament Page

Displays:

Overview  
Banner  
Game  
Format  

Season history list with:

Champion  
Runner‑up  

Optional external link:

myproclubs.com

---

## Season Page

Displays:

Season overview  
Champion  
Runner‑up  

Optional statistics:

- standings
- top scorers
- assist leaders

---

# 9. Admin Dashboard

/admin

Sections:

Dashboard  
Creators  
Tournaments  
Seasons  
Players  
Teams  
Imports  

Admin tables must support:

- search
- pagination
- sorting

---

# 10. Admin Authentication

Authentication system:

- Email/password login
- bcrypt password hashing
- Session cookies

Session configuration:

httpOnly  
secure  
sameSite=strict  
expiration: 24 hours  

Security protections:

- Rate limit login attempts
- CSRF protection for all admin POST/PUT/DELETE endpoints

Minimum password length:

10 characters

---

# 11. Core Data Models

All tables include:

created_at  
updated_at  

---

## Creator

id  
display_name  
slug  
bio  
avatar_url  
primary_stream_url  
twitch_url  
youtube_url  
tiktok_url  
instagram_url  
twitter_url  
is_featured  
is_active  

---

## Tournament

id  
name  
slug  
game_title  
description  
logo_url  
banner_url  
format_type  
stats_mode  
external_url  
is_active  

stats_mode values:

none  
football_seasonal  

---

## TournamentSeason

id  
tournament_id  
name  
short_label  
season_order  
start_date  
end_date  
status  
overview  
winner_team_id  
runner_up_team_id  

Status values:

upcoming  
active  
completed  
archived  

---

## Team

id  
canonical_name  
slug  
logo_url  

---

## TeamAlias

id  
team_id  
display_name  

Unique constraint:

display_name

---

## Player

id  
canonical_name  
slug  
primary_position  

---

## PlayerAlias

id  
player_id  
display_name  

Unique constraint:

display_name

---

## SeasonTeamStats

id  
season_id  
team_id  
display_name_for_season  
played  
wins  
draws  
losses  
goals_for  
goals_against  
points  
finish_position  

---

## SeasonPlayerStats

id  
season_id  
player_id  
team_id  
display_name_for_season  
appearances  
goals  
assists  
clean_sheets  
motm  
average_rating  

---

# 12. Import System

CSV import workflow:

1. Upload CSV
2. Parse file
3. Preview results
4. Validate data
5. Confirm import
6. Save to database

Supported types:

team_stats  
player_stats

---

## Import Log

id  
season_id  
import_type  
file_name  
rows_processed  
rows_failed  
created_at  

---

# 13. Player Merge Tool

Workflow:

1. Select source player
2. Select target player
3. Move all stats to target player
4. Move aliases to target player
5. Delete source player

---

# 14. Team Merge Tool

Workflow:

1. Select source team
2. Select canonical team
3. Move all stats to canonical team
4. Move aliases to canonical team
5. Delete source team

---

# 15. File Upload Rules

Allowed types:

jpg  
png  
webp  

Security:

- validate MIME type
- validate extension
- rename uploaded files
- limit file size

---

# 16. API Design

/server/api

Public endpoints

GET /api/creators  
GET /api/tournaments  
GET /api/seasons  
GET /api/stats/top-scorers  

Admin endpoints

POST /api/admin/creators  
POST /api/admin/tournaments  
POST /api/admin/seasons  
POST /api/admin/imports  
POST /api/admin/players/merge  
POST /api/admin/teams/merge  

---

# 17. Performance

Indexes required for:

season stats  
players  
teams  

Leaderboard queries must use indexed fields.

---

# 18. Development Phases

Phase 1
- homepage
- creators
- tournaments
- seasons
- admin auth

Phase 2
- creators CRUD
- tournaments CRUD
- seasons CRUD

Phase 3
- players
- teams
- stats import
- player merge
- team merge

Phase 4
- leaderboards
- hall of fame
- records

---

# Repo Architecture Specification

Claude must generate the repository using this exact structure:

btg-platform/
│
├─ app.vue
├─ nuxt.config.ts
├─ drizzle.config.ts
├─ tailwind.config.ts
│
├─ components/
│   ├─ ui/
│   ├─ creators/
│   ├─ tournaments/
│   └─ stats/
│
├─ pages/
│   ├─ index.vue
│   ├─ creators.vue
│   ├─ creators/[slug].vue
│   ├─ tournaments.vue
│   ├─ tournaments/[slug].vue
│   ├─ seasons/[id].vue
│   └─ admin/
│
├─ server/
│   ├─ api/
│   ├─ db/
│   ├─ services/
│   └─ utils/
│
├─ data/
│   └─ dev.db
│
├─ uploads/
│
└─ types/

Rules:

- API routes must remain thin
- Database logic must exist only in services
- Drizzle schema must exist in server/db/schema.ts
- CSV parsing isolated in utils
- Slug generation centralized
- File uploads handled by upload service

---

# Database Schema Blueprint (Optimized for Football Stats)

This schema allows efficient queries for:

- All‑time top scorers
- Most assists
- Team championships
- Player rankings

Indexes required:

SeasonPlayerStats
- season_id
- player_id
- team_id
- goals
- assists

SeasonTeamStats
- season_id
- team_id
- points
- finish_position

Leaderboard query examples:

Top scorers all‑time:

SELECT player_id, SUM(goals)
FROM SeasonPlayerStats
GROUP BY player_id
ORDER BY SUM(goals) DESC

Top assists:

SELECT player_id, SUM(assists)
FROM SeasonPlayerStats
GROUP BY player_id
ORDER BY SUM(assists) DESC

Team titles:

SELECT team_id, COUNT(*)
FROM TournamentSeason
WHERE finish_position = 1
GROUP BY team_id

---

# Final Notes

The BTG platform must remain:

Simple  
Maintainable  
Secure  
Expandable  

All historical insights must derive from stored statistics rather than manual entry.
