<template>
  <div class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
    <table class="standings-table w-full">
      <thead>
        <tr>
          <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-10">Pos</th>
          <th class="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Team</th>
          <th class="px-3 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">P</th>
          <th class="px-3 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">W</th>
          <th class="px-3 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">D</th>
          <th class="px-3 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">L</th>
          <th class="px-3 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">GF</th>
          <th class="px-3 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">GA</th>
          <th class="px-3 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">GD</th>
          <th class="px-3 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide font-black">Pts</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in standings"
          :key="row.finish_position"
          :class="rowClass(row.finish_position)"
          class="border-b border-gray-100 dark:border-gray-700"
        >
          <!-- Position -->
          <td class="px-3 py-3 text-center">
            <span
              :class="[
                'inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold',
                row.finish_position === 1
                  ? 'bg-[#FFC107] text-[#001D3D]'
                  : row.finish_position <= 3
                  ? 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200'
                  : 'text-gray-600 dark:text-gray-400'
              ]"
            >
              {{ row.finish_position }}
            </span>
          </td>

          <!-- Team -->
          <td class="px-3 py-3">
            <div class="flex items-center gap-2 min-w-0">
              <NuxtImg
                v-if="row.team?.logo_url"
                :src="row.team.logo_url"
                :alt="teamName(row)"
                class="w-6 h-6 object-contain rounded flex-shrink-0"
              />
              <span class="font-medium text-gray-900 dark:text-white text-sm truncate">
                {{ teamName(row) }}
              </span>
            </div>
          </td>

          <!-- Stats -->
          <td class="px-3 py-3 text-center text-sm text-gray-700 dark:text-gray-300">{{ row.played }}</td>
          <td class="px-3 py-3 text-center text-sm text-gray-700 dark:text-gray-300">{{ row.wins }}</td>
          <td class="px-3 py-3 text-center text-sm text-gray-700 dark:text-gray-300">{{ row.draws }}</td>
          <td class="px-3 py-3 text-center text-sm text-gray-700 dark:text-gray-300">{{ row.losses }}</td>
          <td class="px-3 py-3 text-center text-sm text-gray-700 dark:text-gray-300">{{ row.goals_for }}</td>
          <td class="px-3 py-3 text-center text-sm text-gray-700 dark:text-gray-300">{{ row.goals_against }}</td>
          <td class="px-3 py-3 text-center text-sm text-gray-700 dark:text-gray-300">
            <span :class="gdClass(row.goals_for - row.goals_against)">
              {{ gdDisplay(row.goals_for - row.goals_against) }}
            </span>
          </td>
          <td class="px-3 py-3 text-center text-sm font-bold text-gray-900 dark:text-white">{{ row.points }}</td>
        </tr>

        <!-- Empty state -->
        <tr v-if="standings.length === 0">
          <td colspan="10" class="px-4 py-10 text-center text-sm text-gray-400 dark:text-gray-500">
            No standings data available.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface Team {
  canonical_name: string
  display_name_for_season?: string | null
  logo_url?: string | null
}

interface StandingRow {
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

interface Props {
  standings: StandingRow[]
}

defineProps<Props>()

const rowClass = (pos: number) => {
  if (pos === 1) return 'bg-amber-50 dark:bg-amber-900/10'
  if (pos <= 3) return 'bg-blue-50 dark:bg-blue-900/10'
  return 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
}

const teamName = (row: StandingRow) => {
  return row.team?.display_name_for_season || row.team?.canonical_name || '—'
}

const gdDisplay = (gd: number) => {
  if (gd > 0) return `+${gd}`
  return String(gd)
}

const gdClass = (gd: number) => {
  if (gd > 0) return 'text-green-600 dark:text-green-400'
  if (gd < 0) return 'text-red-600 dark:text-red-400'
  return 'text-gray-500 dark:text-gray-400'
}
</script>
