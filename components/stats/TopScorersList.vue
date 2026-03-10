<template>
  <div>
    <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">{{ title }}</h3>

    <div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <tr>
            <th class="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-10">#</th>
            <th class="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Player</th>
            <th class="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Team</th>
            <th class="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Apps</th>
            <th class="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Goals</th>
            <th class="px-4 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Assists</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="entry in players"
            :key="entry.rank"
            class="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors last:border-b-0"
          >
            <!-- Rank -->
            <td class="px-4 py-3">
              <div class="flex items-center justify-center">
                <span
                  v-if="entry.rank === 1"
                  class="inline-flex items-center justify-center w-7 h-7"
                  title="1st Place"
                >
                  <Icon name="lucide:trophy" class="w-5 h-5 text-[#FFC107]" />
                </span>
                <span
                  v-else
                  class="text-sm font-semibold text-gray-500 dark:text-gray-400"
                >
                  {{ entry.rank }}
                </span>
              </div>
            </td>

            <!-- Player -->
            <td class="px-4 py-3">
              <span class="font-medium text-gray-900 dark:text-white">
                {{ entry.player?.display_name_for_season || entry.player?.canonical_name || '—' }}
              </span>
            </td>

            <!-- Team -->
            <td class="px-4 py-3 text-gray-500 dark:text-gray-400">
              {{ entry.team?.canonical_name ?? '—' }}
            </td>

            <!-- Appearances -->
            <td class="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{{ entry.appearances }}</td>

            <!-- Goals -->
            <td class="px-4 py-3 text-center">
              <span class="font-bold text-[#E30613]">{{ entry.goals }}</span>
            </td>

            <!-- Assists -->
            <td class="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{{ entry.assists }}</td>
          </tr>

          <!-- Empty state -->
          <tr v-if="players.length === 0">
            <td colspan="6" class="px-4 py-10 text-center text-sm text-gray-400 dark:text-gray-500">
              No data available.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Player {
  canonical_name: string
  display_name_for_season?: string | null
}

interface Team {
  canonical_name: string
}

interface ScorerEntry {
  rank: number
  player: Player
  team?: Team | null
  goals: number
  assists: number
  appearances: number
}

interface Props {
  players: ScorerEntry[]
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Top Scorers',
})
</script>
