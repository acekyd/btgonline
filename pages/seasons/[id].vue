<template>
  <div class="min-h-screen bg-[#FAF8F6]">

    <!-- Loading state -->
    <div v-if="pending" class="container mx-auto px-4 py-12 max-w-4xl animate-pulse">
      <div class="h-4 bg-gray-200 rounded w-48 mb-8"></div>
      <div class="h-8 bg-gray-200 rounded w-72 mb-3"></div>
      <div class="h-4 bg-gray-200 rounded w-40 mb-6"></div>
      <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div class="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
      <div class="grid grid-cols-2 gap-4">
        <div class="h-40 bg-gray-200 rounded-xl"></div>
        <div class="h-40 bg-gray-200 rounded-xl"></div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="fetchError" class="container mx-auto px-4 py-20 text-center">
      <Icon name="lucide:alert-circle" class="w-14 h-14 mx-auto mb-4 text-[#E30613] opacity-60" />
      <h2 class="text-2xl font-black text-[#00152E] mb-2">Season Not Found</h2>
      <p class="text-gray-500 mb-6">This season doesn't exist or may have been removed.</p>
      <NuxtLink to="/tournaments" class="btn btn-primary">← Back to Tournaments</NuxtLink>
    </div>

    <!-- Season detail -->
    <template v-else-if="season">
      <!-- Back nav / breadcrumb -->
      <div class="bg-white border-b border-gray-100">
        <div class="container mx-auto px-4 py-3">
          <nav class="flex items-center gap-2 text-sm text-gray-500">
            <NuxtLink to="/tournaments" class="hover:text-[#E30613] transition-colors font-medium">
              Tournaments
            </NuxtLink>
            <Icon name="lucide:chevron-right" class="w-3.5 h-3.5 flex-shrink-0" />
            <NuxtLink
              v-if="season.tournament"
              :to="`/tournaments/${season.tournament.slug}`"
              class="hover:text-[#E30613] transition-colors font-medium"
            >
              {{ season.tournament.name }}
            </NuxtLink>
            <Icon name="lucide:chevron-right" class="w-3.5 h-3.5 flex-shrink-0" />
            <span class="text-[#00152E] font-semibold truncate">{{ season.name }}</span>
          </nav>
        </div>
      </div>

      <div class="container mx-auto px-4 py-10 max-w-4xl">

        <!-- Season header -->
        <div class="mb-8">
          <div class="flex flex-wrap items-center gap-3 mb-2">
            <h1 class="text-3xl md:text-4xl font-black text-[#00152E]">{{ season.name }}</h1>
            <span v-if="season.short_label" class="tag tag-navy text-xs">{{ season.short_label }}</span>
            <AppBadge :variant="statusVariant">{{ statusLabel }}</AppBadge>
          </div>

          <!-- Date range -->
          <p v-if="season.start_date || season.end_date" class="text-gray-500 mb-3">
            <span v-if="season.start_date">{{ formatDate(season.start_date) }}</span>
            <span v-if="season.start_date && season.end_date"> – </span>
            <span v-if="season.end_date">{{ formatDate(season.end_date) }}</span>
          </p>

          <!-- Overview -->
          <p v-if="season.overview" class="text-gray-600 leading-relaxed whitespace-pre-wrap">
            {{ season.overview }}
          </p>
        </div>

        <!-- Results section -->
        <div class="mb-10">
          <h2 class="section-title">RESULTS</h2>

          <div v-if="season.winner_team || season.runner_up_team" class="grid sm:grid-cols-2 gap-4">
            <!-- Champion card -->
            <div class="bg-white rounded-xl border-2 border-[#FFC107] p-6 flex flex-col items-center text-center">
              <div class="flex items-center gap-2 mb-4">
                <Icon name="lucide:trophy" class="w-5 h-5 text-[#FFC107]" />
                <span class="tag tag-gold text-xs">CHAMPION</span>
              </div>
              <div v-if="season.winner_team" class="flex flex-col items-center">
                <div class="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center mb-3">
                  <NuxtImg
                    v-if="season.winner_team.logo_url"
                    :src="season.winner_team.logo_url"
                    :alt="season.winner_team.canonical_name"
                    class="w-full h-full object-contain"
                  />
                  <Icon v-else name="lucide:shield" class="w-10 h-10 text-gray-300" />
                </div>
                <p class="font-black text-[#00152E] text-xl">{{ season.winner_team.canonical_name }}</p>
              </div>
              <div v-else class="text-gray-400 italic">TBD</div>
            </div>

            <!-- Runner-up card -->
            <div class="bg-white rounded-xl border-2 border-gray-300 p-6 flex flex-col items-center text-center">
              <div class="flex items-center gap-2 mb-4">
                <Icon name="lucide:medal" class="w-5 h-5 text-gray-400" />
                <span class="tag tag-navy text-xs">RUNNER-UP</span>
              </div>
              <div v-if="season.runner_up_team" class="flex flex-col items-center">
                <div class="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center mb-3">
                  <NuxtImg
                    v-if="season.runner_up_team.logo_url"
                    :src="season.runner_up_team.logo_url"
                    :alt="season.runner_up_team.canonical_name"
                    class="w-full h-full object-contain"
                  />
                  <Icon v-else name="lucide:shield" class="w-10 h-10 text-gray-300" />
                </div>
                <p class="font-black text-[#00152E] text-xl">{{ season.runner_up_team.canonical_name }}</p>
              </div>
              <div v-else class="text-gray-400 italic">TBD</div>
            </div>
          </div>

          <div v-else class="text-center py-12 bg-white rounded-xl border border-gray-100 text-gray-400">
            <Icon name="lucide:trophy" class="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Results not yet recorded.</p>
          </div>
        </div>

        <!-- Statistics section (only for football_seasonal) -->
        <div v-if="showStats">
          <h2 class="section-title">STATISTICS</h2>

          <!-- Tab navigation -->
          <div class="flex items-center gap-2 mb-6 flex-wrap">
            <button
              v-for="tab in statTabs"
              :key="tab.key"
              @click="activeTab = tab.key"
              :class="[
                'filter-btn',
                activeTab === tab.key ? 'filter-btn-active' : 'filter-btn-inactive'
              ]"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Standings tab -->
          <div v-if="activeTab === 'standings'">
            <StandingsTable :standings="mappedTeamStats" />
          </div>

          <!-- Top Scorers tab -->
          <div v-if="activeTab === 'scorers'">
            <TopScorersList :players="scorerEntries" title="Top Scorers" />
          </div>

          <!-- Assist Leaders tab -->
          <div v-if="activeTab === 'assists'">
            <TopScorersList :players="assistEntries" title="Assist Leaders" />
          </div>
        </div>

      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
interface Team {
  canonical_name: string
  display_name_for_season?: string | null
  logo_url?: string | null
}

interface Player {
  canonical_name: string
  display_name_for_season?: string | null
}

interface TeamStat {
  finish_position: number
  team: Team
  played: number
  wins: number
  draws: number
  losses: number
  goals_for: number
  goals_against: number
  points: number
}

interface PlayerStat {
  player: Player
  team?: Team | null
  appearances: number
  goals: number
  assists: number
}

interface Tournament {
  id: number
  name: string
  slug: string
  stats_mode?: string | null
}

interface Season {
  id: number
  name: string
  short_label?: string | null
  status: 'upcoming' | 'active' | 'completed' | 'archived'
  start_date?: string | null
  end_date?: string | null
  overview?: string | null
  tournament: Tournament
  winner_team?: Team | null
  runner_up_team?: Team | null
  teamStats: TeamStat[]
  playerStats: PlayerStat[]
}

const route = useRoute()
const id = route.params.id as string

const { data, pending, error: fetchError } = await useAsyncData<{ data: Season }>(
  `season-${id}`,
  async () => {
    try {
      return await $fetch(`/api/seasons/${id}`)
    } catch (err: any) {
      if (err?.statusCode === 404 || err?.status === 404) {
        throw createError({ statusCode: 404, statusMessage: 'Season not found' })
      }
      throw err
    }
  }
)

const season = computed(() => data.value?.data ?? null)

const statusVariant = computed(() => {
  switch (season.value?.status) {
    case 'active': return 'active' as const
    case 'completed': return 'completed' as const
    case 'upcoming': return 'upcoming' as const
    case 'archived': return 'archived' as const
    default: return 'default' as const
  }
})

const statusLabel = computed(() => {
  switch (season.value?.status) {
    case 'active': return 'Active'
    case 'completed': return 'Completed'
    case 'upcoming': return 'Upcoming'
    case 'archived': return 'Archived'
    default: return season.value?.status ?? ''
  }
})

const showStats = computed(() => {
  if (!season.value) return false
  const isFootball = season.value.tournament?.stats_mode === 'football_seasonal'
  const hasStats = (season.value.teamStats?.length ?? 0) > 0 || (season.value.playerStats?.length ?? 0) > 0
  return isFootball && hasStats
})

const statTabs = [
  { key: 'standings', label: 'Standings' },
  { key: 'scorers', label: 'Top Scorers' },
  { key: 'assists', label: 'Assist Leaders' },
]

const activeTab = ref<'standings' | 'scorers' | 'assists'>('standings')

// Map teamStats to StandingsTable format
const mappedTeamStats = computed(() => {
  return (season.value?.teamStats ?? []).map((ts) => ({
    finish_position: ts.finish_position,
    team: ts.team,
    played: ts.played,
    wins: ts.wins,
    draws: ts.draws,
    losses: ts.losses,
    goals_for: ts.goals_for,
    goals_against: ts.goals_against,
    points: ts.points,
  }))
})

// Map playerStats to TopScorersList format sorted by goals
const scorerEntries = computed(() => {
  const sorted = [...(season.value?.playerStats ?? [])].sort((a, b) => b.goals - a.goals)
  return sorted.map((ps, i) => ({
    rank: i + 1,
    player: ps.player,
    team: ps.team,
    goals: ps.goals,
    assists: ps.assists,
    appearances: ps.appearances,
  }))
})

// Map playerStats sorted by assists
const assistEntries = computed(() => {
  const sorted = [...(season.value?.playerStats ?? [])].sort((a, b) => b.assists - a.assists)
  return sorted.map((ps, i) => ({
    rank: i + 1,
    player: ps.player,
    team: ps.team,
    goals: ps.goals,
    assists: ps.assists,
    appearances: ps.appearances,
  }))
})

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateStr))
}

useHead(() => ({
  title: season.value
    ? `${season.value.name} — ${season.value.tournament?.name ?? 'BTG'}`
    : 'Season — BTG',
  meta: [
    {
      name: 'description',
      content: season.value?.overview?.slice(0, 160)
        ?? `View season details for ${season.value?.name ?? 'this season'} on BTG.`,
    },
  ],
}))
</script>
