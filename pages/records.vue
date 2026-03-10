<template>
  <div class="min-h-screen bg-[#FAF8F6]">

    <!-- Page Hero -->
    <section class="bg-[#001D3D] py-14 md:py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-black text-white uppercase tracking-wide mb-3">
          RECORDS
        </h1>
        <p class="text-gray-300 text-lg max-w-xl mx-auto">
          Single-season bests across all competitions.
        </p>
      </div>
    </section>

    <!-- Loading state -->
    <div v-if="pending" class="container mx-auto px-4 py-12">
      <div class="h-6 bg-gray-200 rounded w-40 mb-6 animate-pulse"></div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <div v-for="i in 5" :key="i" class="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
          <div class="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div class="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div class="h-8 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div class="h-3 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
      <div class="h-6 bg-gray-200 rounded w-40 mb-6 animate-pulse"></div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="i in 4" :key="i" class="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
          <div class="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div class="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div class="h-8 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div class="h-3 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="container mx-auto px-4 py-20 text-center">
      <Icon name="lucide:alert-circle" class="w-12 h-12 mx-auto mb-3 text-[#E30613] opacity-60" />
      <p class="font-semibold text-lg mb-1">Failed to load records</p>
      <p class="text-sm text-gray-500">Please try refreshing the page.</p>
    </div>

    <!-- Records content -->
    <section v-else class="section">
      <div class="container mx-auto px-4">

        <!-- Player Records -->
        <div class="mb-12">
          <h2 class="section-title">PLAYER RECORDS</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="record in playerRecords"
              :key="record.key"
              class="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
            >
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">{{ record.title }}</p>

              <!-- Has entries -->
              <template v-if="record.entries.length > 0">
                <div
                  v-for="(entry, i) in record.entries"
                  :key="i"
                  :class="['mb-3', i > 0 ? 'pt-3 border-t border-gray-100' : '']"
                >
                  <p class="font-black text-[#00152E] text-lg leading-tight mb-1">{{ entry.holder_name }}</p>
                  <p class="text-3xl font-black text-[#FFC107] leading-none mb-2">
                    {{ entry.value }}
                    <span class="text-base font-semibold text-gray-400 ml-1">{{ record.unit }}</span>
                  </p>
                  <p v-if="entry.season_name || entry.tournament_name" class="text-xs text-gray-400">
                    <span v-if="entry.season_name">{{ entry.season_name }}</span>
                    <span v-if="entry.season_name && entry.tournament_name"> · </span>
                    <span v-if="entry.tournament_name">{{ entry.tournament_name }}</span>
                  </p>
                </div>
              </template>

              <!-- No data -->
              <div v-else class="text-sm text-gray-400 italic mt-1">Not yet set.</div>
            </div>
          </div>
        </div>

        <!-- Team Records -->
        <div>
          <h2 class="section-title">TEAM RECORDS</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="record in teamRecords"
              :key="record.key"
              class="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
            >
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">{{ record.title }}</p>

              <!-- Has entries -->
              <template v-if="record.entries.length > 0">
                <div
                  v-for="(entry, i) in record.entries"
                  :key="i"
                  :class="['mb-3', i > 0 ? 'pt-3 border-t border-gray-100' : '']"
                >
                  <p class="font-black text-[#00152E] text-lg leading-tight mb-1">{{ entry.holder_name }}</p>
                  <p class="text-3xl font-black text-[#FFC107] leading-none mb-2">
                    {{ entry.value }}
                    <span class="text-base font-semibold text-gray-400 ml-1">{{ record.unit }}</span>
                  </p>
                  <p v-if="entry.season_name || entry.tournament_name" class="text-xs text-gray-400">
                    <span v-if="entry.season_name">{{ entry.season_name }}</span>
                    <span v-if="entry.season_name && entry.tournament_name"> · </span>
                    <span v-if="entry.tournament_name">{{ entry.tournament_name }}</span>
                  </p>
                </div>
              </template>

              <!-- No data -->
              <div v-else class="text-sm text-gray-400 italic mt-1">Not yet set.</div>
            </div>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
interface RecordEntry {
  holder_name: string
  value: number | string
  season_name?: string | null
  tournament_name?: string | null
}

interface RecordData {
  mostGoalsInSeason?: RecordEntry[] | null
  mostAssistsInSeason?: RecordEntry[] | null
  mostMotmInSeason?: RecordEntry[] | null
  bestRatingInSeason?: RecordEntry[] | null
  mostAppearancesInSeason?: RecordEntry[] | null
  mostGoalsByTeamInSeason?: RecordEntry[] | null
  fewestGoalsAgainstInSeason?: RecordEntry[] | null
  mostWinsInSeason?: RecordEntry[] | null
  highestPointsInSeason?: RecordEntry[] | null
}

interface ComputedRecord {
  key: string
  title: string
  entries: RecordEntry[]
  unit: string
}

useHead({
  title: 'Records — BTG Bravo Trashe Gaming',
  meta: [
    { name: 'description', content: 'Single-season records across all BTG competitions — goals, assists, wins, and more.' },
  ],
})

const { data, pending, error } = await useAsyncData<{ data: RecordData }>(
  'records',
  () => $fetch('/api/stats/records'),
  { default: () => ({ data: {} }) }
)

const records = computed(() => data.value?.data ?? {})

const playerRecords = computed<ComputedRecord[]>(() => [
  {
    key: 'mostGoalsInSeason',
    title: 'Most Goals in a Season',
    entries: records.value.mostGoalsInSeason ?? [],
    unit: 'Goals',
  },
  {
    key: 'mostAssistsInSeason',
    title: 'Most Assists in a Season',
    entries: records.value.mostAssistsInSeason ?? [],
    unit: 'Assists',
  },
  {
    key: 'mostMotmInSeason',
    title: 'Most MOTM in a Season',
    entries: records.value.mostMotmInSeason ?? [],
    unit: 'MOTM',
  },
  {
    key: 'bestRatingInSeason',
    title: 'Best Average Rating (min. 5 apps)',
    entries: records.value.bestRatingInSeason ?? [],
    unit: 'Rating',
  },
  {
    key: 'mostAppearancesInSeason',
    title: 'Most Appearances in a Season',
    entries: records.value.mostAppearancesInSeason ?? [],
    unit: 'Apps',
  },
])

const teamRecords = computed<ComputedRecord[]>(() => [
  {
    key: 'mostGoalsByTeamInSeason',
    title: 'Most Goals Scored in a Season',
    entries: records.value.mostGoalsByTeamInSeason ?? [],
    unit: 'Goals',
  },
  {
    key: 'fewestGoalsAgainstInSeason',
    title: 'Fewest Goals Conceded (min. 5 games)',
    entries: records.value.fewestGoalsAgainstInSeason ?? [],
    unit: 'Conceded',
  },
  {
    key: 'mostWinsInSeason',
    title: 'Most Wins in a Season',
    entries: records.value.mostWinsInSeason ?? [],
    unit: 'Wins',
  },
  {
    key: 'highestPointsInSeason',
    title: 'Highest Points in a Season',
    entries: records.value.highestPointsInSeason ?? [],
    unit: 'Pts',
  },
])
</script>
