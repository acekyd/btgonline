<template>
  <div>
    <!-- Error state -->
    <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
      Failed to load dashboard data. Please try refreshing.
    </div>

    <!-- Stat Cards Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
      <!-- Creators -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
        <div class="flex items-start justify-between mb-3">
          <div class="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
            <Icon name="lucide:users" class="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div v-if="loading" class="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <span v-else class="text-3xl font-black text-[#001D3D] dark:text-white">{{ stats?.creators.total ?? 0 }}</span>
        </div>
        <p class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Creators</p>
        <p class="text-xs text-gray-400 dark:text-gray-500">
          Active: <span class="text-green-600 font-semibold">{{ stats?.creators.active ?? 0 }}</span>
          · Inactive: <span class="text-gray-500 font-semibold">{{ stats?.creators.inactive ?? 0 }}</span>
        </p>
      </div>

      <!-- Tournaments -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
        <div class="flex items-start justify-between mb-3">
          <div class="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
            <Icon name="lucide:trophy" class="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div v-if="loading" class="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <span v-else class="text-3xl font-black text-[#001D3D] dark:text-white">{{ stats?.tournaments.total ?? 0 }}</span>
        </div>
        <p class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Tournaments</p>
        <p class="text-xs text-gray-400 dark:text-gray-500">&nbsp;</p>
      </div>

      <!-- Seasons -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
        <div class="flex items-start justify-between mb-3">
          <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
            <Icon name="lucide:calendar" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div v-if="loading" class="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <span v-else class="text-3xl font-black text-[#001D3D] dark:text-white">
            {{ (stats?.seasons.upcoming ?? 0) + (stats?.seasons.active ?? 0) + (stats?.seasons.completed ?? 0) + (stats?.seasons.archived ?? 0) }}
          </span>
        </div>
        <p class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Seasons</p>
        <p class="text-xs text-gray-400 dark:text-gray-500">
          Active: <span class="text-green-600 font-semibold">{{ stats?.seasons.active ?? 0 }}</span>
          · Done: <span class="text-gray-500 font-semibold">{{ stats?.seasons.completed ?? 0 }}</span>
        </p>
      </div>

      <!-- Players -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
        <div class="flex items-start justify-between mb-3">
          <div class="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
            <Icon name="lucide:user" class="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div v-if="loading" class="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <span v-else class="text-3xl font-black text-[#001D3D] dark:text-white">{{ stats?.players.total ?? 0 }}</span>
        </div>
        <p class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Players</p>
        <p class="text-xs text-gray-400 dark:text-gray-500">&nbsp;</p>
      </div>

      <!-- Teams -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
        <div class="flex items-start justify-between mb-3">
          <div class="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
            <Icon name="lucide:shield" class="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div v-if="loading" class="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <span v-else class="text-3xl font-black text-[#001D3D] dark:text-white">{{ stats?.teams.total ?? 0 }}</span>
        </div>
        <p class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Teams</p>
        <p class="text-xs text-gray-400 dark:text-gray-500">&nbsp;</p>
      </div>
    </div>

    <!-- Recent Imports -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 class="text-base font-bold text-gray-800 dark:text-white">Recent Imports</h2>
        <NuxtLink
          to="/admin/imports"
          class="text-sm font-semibold text-[#E30613] hover:text-[#c20510] transition-colors"
        >
          View All →
        </NuxtLink>
      </div>

      <AppTable
        :columns="importColumns"
        :rows="recentImports"
        :loading="loading"
        empty-message="No imports yet"
      >
        <template #cell-created_at="{ value }">
          {{ formatDate(value) }}
        </template>
        <template #cell-status="{ value }">
          <AppBadge :variant="importStatusVariant(value)">{{ value }}</AppBadge>
        </template>
        <template #cell-rows_failed="{ value }">
          <span :class="value > 0 ? 'text-red-600 font-semibold' : 'text-gray-500'">{{ value }}</span>
        </template>
      </AppTable>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

interface DashboardStats {
  creators: { total: number; active: number; inactive: number }
  tournaments: { total: number }
  seasons: { upcoming: number; active: number; completed: number; archived: number }
  players: { total: number }
  teams: { total: number }
  recentImports: Record<string, any>[]
}

const loading = ref(true)
const error = ref(false)
const stats = ref<DashboardStats | null>(null)
const recentImports = ref<Record<string, any>[]>([])

const importColumns = [
  { key: 'created_at', label: 'Date' },
  { key: 'season_name', label: 'Season' },
  { key: 'import_type', label: 'Type' },
  { key: 'file_name', label: 'File' },
  { key: 'rows_saved', label: 'Rows Saved' },
  { key: 'rows_failed', label: 'Rows Failed' },
  { key: 'status', label: 'Status' },
]

const formatDate = (val: string) => {
  if (!val) return '—'
  return new Date(val).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

const importStatusVariant = (status: string): 'active' | 'completed' | 'partial' | 'failed' | 'default' => {
  const map: Record<string, any> = {
    complete: 'active',
    completed: 'active',
    partial: 'partial',
    failed: 'failed',
  }
  return map[status] ?? 'default'
}

onMounted(async () => {
  try {
    const res = await $fetch<{ data: DashboardStats }>('/api/admin/dashboard')
    stats.value = res.data
    recentImports.value = res.data.recentImports ?? []
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>
