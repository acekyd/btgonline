<template>
  <NuxtLink
    :to="`/seasons/${season.id}`"
    class="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group border-b border-gray-100 dark:border-gray-700 last:border-b-0"
  >
    <!-- Season label -->
    <div class="flex-shrink-0 min-w-[80px]">
      <span class="font-bold text-gray-900 dark:text-white text-sm">{{ season.name }}</span>
      <span v-if="season.short_label" class="ml-1.5 text-xs text-gray-400">({{ season.short_label }})</span>
    </div>

    <!-- Status badge -->
    <div class="flex-shrink-0">
      <AppBadge :variant="statusVariant" size="sm">{{ statusLabel }}</AppBadge>
    </div>

    <!-- Champion -->
    <div class="flex-1 flex items-center gap-2 min-w-0">
      <Icon name="lucide:trophy" class="w-3.5 h-3.5 text-[#FFC107] flex-shrink-0" />
      <div class="flex items-center gap-1.5 min-w-0">
        <NuxtImg
          v-if="season.winner_team?.logo_url"
          :src="season.winner_team.logo_url"
          :alt="season.winner_team.canonical_name"
          class="w-5 h-5 object-contain rounded flex-shrink-0"
        />
        <span class="text-sm text-gray-700 dark:text-gray-300 truncate">
          {{ season.winner_team?.canonical_name ?? '—' }}
        </span>
      </div>
    </div>

    <!-- Runner-up -->
    <div class="hidden sm:flex flex-1 items-center gap-2 min-w-0">
      <span class="text-xs text-gray-400 flex-shrink-0">2nd</span>
      <div class="flex items-center gap-1.5 min-w-0">
        <NuxtImg
          v-if="season.runner_up_team?.logo_url"
          :src="season.runner_up_team.logo_url"
          :alt="season.runner_up_team.canonical_name"
          class="w-5 h-5 object-contain rounded flex-shrink-0"
        />
        <span class="text-sm text-gray-500 dark:text-gray-400 truncate">
          {{ season.runner_up_team?.canonical_name ?? '—' }}
        </span>
      </div>
    </div>

    <!-- Arrow -->
    <div class="flex-shrink-0 text-gray-400 group-hover:text-[#E30613] transition-colors">
      <Icon name="lucide:chevron-right" class="w-4 h-4" />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Team {
  canonical_name: string
  logo_url?: string | null
}

interface Season {
  id: number
  name: string
  short_label?: string | null
  status: 'upcoming' | 'active' | 'completed' | 'archived'
  winner_team?: Team | null
  runner_up_team?: Team | null
}

interface Props {
  season: Season
}

const props = defineProps<Props>()

const statusVariant = computed(() => {
  switch (props.season.status) {
    case 'active': return 'active'
    case 'completed': return 'completed'
    case 'upcoming': return 'upcoming'
    case 'archived': return 'archived'
    default: return 'default'
  }
})

const statusLabel = computed(() => {
  switch (props.season.status) {
    case 'active': return 'Active'
    case 'completed': return 'Completed'
    case 'upcoming': return 'Upcoming'
    case 'archived': return 'Archived'
    default: return props.season.status
  }
})
</script>
