<template>
  <div class="min-h-screen bg-[#FAF8F6]">

    <!-- Page Hero -->
    <section class="bg-[#001D3D] py-14 md:py-20">
      <div class="container mx-auto px-4 text-center">
        <div class="flex justify-center mb-3">
          <Icon name="mdi:trophy" class="w-12 h-12 text-[#FFC107]" />
        </div>
        <h1 class="text-4xl md:text-5xl font-black text-white uppercase tracking-wide mb-3">
          HALL OF FAME
        </h1>
        <p class="text-gray-300 text-lg max-w-xl mx-auto">
          All-time records from every season.
        </p>
      </div>
    </section>

    <!-- Loading state -->
    <div v-if="pending" class="container mx-auto px-4 py-12">
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="i in 6" :key="i" class="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
          <div class="h-5 bg-gray-200 rounded w-48 mb-4"></div>
          <div class="space-y-3">
            <div v-for="j in 5" :key="j" class="flex gap-3">
              <div class="w-7 h-7 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded flex-1"></div>
              <div class="h-4 bg-gray-200 rounded w-12"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="container mx-auto px-4 py-20 text-center">
      <Icon name="lucide:alert-circle" class="w-12 h-12 mx-auto mb-3 text-[#E30613] opacity-60" />
      <p class="font-semibold text-lg mb-1">Failed to load Hall of Fame data</p>
      <p class="text-sm text-gray-500">Please try refreshing the page.</p>
    </div>

    <!-- Hall of Fame data -->
    <section v-else class="section">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-6">

          <!-- Top Scorers All-Time -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <Icon name="mdi:trophy" class="w-5 h-5 text-[#FFC107]" />
              <h2 class="font-black text-[#00152E] uppercase tracking-tight text-lg">Top Scorers All-Time</h2>
            </div>
            <div v-if="hofData?.topScorers?.length" class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead class="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th class="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-10">Rank</th>
                    <th class="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Player</th>
                    <th class="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Goals</th>
                    <th class="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Apps</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(entry, i) in hofData.topScorers"
                    :key="i"
                    class="border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-b-0"
                  >
                    <td class="px-4 py-3 text-center">
                      <Icon v-if="i === 0" name="mdi:trophy" class="w-5 h-5 text-[#FFC107] mx-auto" />
                      <span v-else class="text-sm font-semibold text-gray-400">{{ i + 1 }}</span>
                    </td>
                    <td class="px-4 py-3 font-medium text-[#00152E]">{{ entry.player_name }}</td>
                    <td class="px-4 py-3 text-center font-bold text-[#E30613]">{{ entry.goals }}</td>
                    <td class="px-4 py-3 text-center text-gray-500">{{ entry.appearances }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="px-5 py-8 text-center text-gray-400 text-sm">No data yet.</div>
          </div>

          <!-- Assist Leaders All-Time -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <Icon name="lucide:zap" class="w-5 h-5 text-[#FFC107]" />
              <h2 class="font-black text-[#00152E] uppercase tracking-tight text-lg">Assist Leaders All-Time</h2>
            </div>
            <div v-if="hofData?.assistLeaders?.length" class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead class="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th class="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-10">Rank</th>
                    <th class="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Player</th>
                    <th class="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Assists</th>
                    <th class="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Goals</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(entry, i) in hofData.assistLeaders"
                    :key="i"
                    class="border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-b-0"
                  >
                    <td class="px-4 py-3 text-center">
                      <Icon v-if="i === 0" name="mdi:trophy" class="w-5 h-5 text-[#FFC107] mx-auto" />
                      <span v-else class="text-sm font-semibold text-gray-400">{{ i + 1 }}</span>
                    </td>
                    <td class="px-4 py-3 font-medium text-[#00152E]">{{ entry.player_name }}</td>
                    <td class="px-4 py-3 text-center font-bold text-[#E30613]">{{ entry.assists }}</td>
                    <td class="px-4 py-3 text-center text-gray-500">{{ entry.goals }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="px-5 py-8 text-center text-gray-400 text-sm">No data yet.</div>
          </div>

          <!-- Most MOTM Awards -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <Icon name="lucide:star" class="w-5 h-5 text-[#FFC107]" />
              <h2 class="font-black text-[#00152E] uppercase tracking-tight text-lg">Most MOTM Awards</h2>
            </div>
            <div v-if="hofData?.mostMotm?.length" class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead class="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th class="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-10">Rank</th>
                    <th class="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Player</th>
                    <th class="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">MOTM Awards</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(entry, i) in hofData.mostMotm"
                    :key="i"
                    class="border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-b-0"
                  >
                    <td class="px-4 py-3 text-center">
                      <Icon v-if="i === 0" name="mdi:trophy" class="w-5 h-5 text-[#FFC107] mx-auto" />
                      <span v-else class="text-sm font-semibold text-gray-400">{{ i + 1 }}</span>
                    </td>
                    <td class="px-4 py-3 font-medium text-[#00152E]">{{ entry.player_name }}</td>
                    <td class="px-4 py-3 text-center font-bold text-[#FFC107]">{{ entry.motm_count }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="px-5 py-8 text-center text-gray-400 text-sm">No data yet.</div>
          </div>

          <!-- Most Appearances -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <Icon name="lucide:calendar-check" class="w-5 h-5 text-[#FFC107]" />
              <h2 class="font-black text-[#00152E] uppercase tracking-tight text-lg">Most Appearances</h2>
            </div>
            <div v-if="hofData?.mostAppearances?.length" class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead class="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th class="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-10">Rank</th>
                    <th class="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Player</th>
                    <th class="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Appearances</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(entry, i) in hofData.mostAppearances"
                    :key="i"
                    class="border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-b-0"
                  >
                    <td class="px-4 py-3 text-center">
                      <Icon v-if="i === 0" name="mdi:trophy" class="w-5 h-5 text-[#FFC107] mx-auto" />
                      <span v-else class="text-sm font-semibold text-gray-400">{{ i + 1 }}</span>
                    </td>
                    <td class="px-4 py-3 font-medium text-[#00152E]">{{ entry.player_name }}</td>
                    <td class="px-4 py-3 text-center font-bold text-[#00152E]">{{ entry.appearances }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="px-5 py-8 text-center text-gray-400 text-sm">No data yet.</div>
          </div>

          <!-- Team Titles -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <Icon name="mdi:trophy" class="w-5 h-5 text-[#FFC107]" />
              <h2 class="font-black text-[#00152E] uppercase tracking-tight text-lg">Team Titles</h2>
            </div>
            <div v-if="hofData?.teamTitles?.length" class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead class="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th class="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-10">Rank</th>
                    <th class="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Team</th>
                    <th class="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Titles</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(entry, i) in hofData.teamTitles"
                    :key="i"
                    class="border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-b-0"
                  >
                    <td class="px-4 py-3 text-center">
                      <Icon v-if="i === 0" name="mdi:trophy" class="w-5 h-5 text-[#FFC107] mx-auto" />
                      <span v-else class="text-sm font-semibold text-gray-400">{{ i + 1 }}</span>
                    </td>
                    <td class="px-4 py-3 font-medium text-[#00152E]">{{ entry.team_name }}</td>
                    <td class="px-4 py-3 text-center">
                      <div class="flex items-center justify-center gap-1 flex-wrap">
                        <Icon
                          v-for="t in entry.titles"
                          :key="t"
                          name="mdi:trophy"
                          class="w-4 h-4 text-[#FFC107]"
                        />
                        <span class="font-bold text-[#00152E] ml-1">{{ entry.titles }}</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="px-5 py-8 text-center text-gray-400 text-sm">No data yet.</div>
          </div>

          <!-- Most Decorated Teams (Podiums) -->
          <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <Icon name="lucide:medal" class="w-5 h-5 text-[#FFC107]" />
              <h2 class="font-black text-[#00152E] uppercase tracking-tight text-lg">Most Decorated Teams</h2>
            </div>
            <div v-if="hofData?.mostPodiums?.length" class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead class="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th class="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-10">Rank</th>
                    <th class="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Team</th>
                    <th class="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Podiums</th>
                    <th class="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">1st</th>
                    <th class="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">2nd</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(entry, i) in hofData.mostPodiums"
                    :key="i"
                    class="border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-b-0"
                  >
                    <td class="px-4 py-3 text-center">
                      <Icon v-if="i === 0" name="mdi:trophy" class="w-5 h-5 text-[#FFC107] mx-auto" />
                      <span v-else class="text-sm font-semibold text-gray-400">{{ i + 1 }}</span>
                    </td>
                    <td class="px-4 py-3 font-medium text-[#00152E]">{{ entry.team_name }}</td>
                    <td class="px-4 py-3 text-center font-bold text-[#00152E]">{{ entry.podiums }}</td>
                    <td class="px-4 py-3 text-center text-[#FFC107] font-semibold">{{ entry.first_place }}</td>
                    <td class="px-4 py-3 text-center text-gray-400 font-semibold">{{ entry.second_place }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="px-5 py-8 text-center text-gray-400 text-sm">No data yet.</div>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
interface TopScorerEntry {
  player_name: string
  goals: number
  appearances: number
}

interface AssistLeaderEntry {
  player_name: string
  assists: number
  goals: number
}

interface MotmEntry {
  player_name: string
  motm_count: number
}

interface AppearanceEntry {
  player_name: string
  appearances: number
}

interface TeamTitleEntry {
  team_name: string
  titles: number
}

interface PodiumEntry {
  team_name: string
  podiums: number
  first_place: number
  second_place: number
}

interface HallOfFameData {
  topScorers: TopScorerEntry[]
  assistLeaders: AssistLeaderEntry[]
  mostMotm: MotmEntry[]
  mostAppearances: AppearanceEntry[]
  teamTitles: TeamTitleEntry[]
  mostPodiums: PodiumEntry[]
}

useHead({
  title: 'Hall of Fame — BTG Bravo Trashe Gaming',
  meta: [
    { name: 'description', content: 'All-time records from every BTG season. Top scorers, assist leaders, team titles, and more.' },
  ],
})

const { data, pending, error } = await useAsyncData<{ data: HallOfFameData }>(
  'hall-of-fame',
  () => $fetch('/api/stats/hall-of-fame'),
  {
    default: () => ({
      data: {
        topScorers: [],
        assistLeaders: [],
        mostMotm: [],
        mostAppearances: [],
        teamTitles: [],
        mostPodiums: [],
      }
    })
  }
)

const hofData = computed(() => data.value?.data ?? null)
</script>
