<template>
  <NuxtLink :to="`/tournaments/${tournament.slug}`" class="card hover-lift block group">
    <!-- Logo area -->
    <div class="bg-[#001D3D] flex items-center justify-center h-40 overflow-hidden">
      <NuxtImg
        v-if="tournament.logo_url"
        :src="tournament.logo_url"
        :alt="tournament.name"
        class="w-full h-full object-contain p-4"
      />
      <div
        v-else
        class="flex flex-col items-center gap-2 text-white/40"
      >
        <Icon name="lucide:trophy" class="w-12 h-12" />
        <span class="text-xs uppercase tracking-wide">No Logo</span>
      </div>
    </div>

    <!-- Details -->
    <div class="p-4">
      <div class="flex items-start justify-between gap-2 mb-2">
        <h3 class="font-bold text-gray-900 dark:text-white text-base leading-tight group-hover:text-[#E30613] transition-colors">
          {{ tournament.name }}
        </h3>
        <AppBadge :variant="statusVariant" size="sm">
          {{ statusLabel }}
        </AppBadge>
      </div>

      <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ tournament.game_title }}</p>

      <p v-if="tournament.format_type" class="text-xs text-gray-400 dark:text-gray-500">
        {{ tournament.format_type }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Tournament {
  id: number
  name: string
  slug: string
  game_title: string
  format_type?: string | null
  status: 'active' | 'completed' | 'offseason'
  logo_url?: string | null
}

interface Props {
  tournament: Tournament
}

const props = defineProps<Props>()

const statusVariant = computed(() => {
  switch (props.tournament.status) {
    case 'active': return 'active'
    case 'completed': return 'completed'
    case 'offseason': return 'offseason'
    default: return 'default'
  }
})

const statusLabel = computed(() => {
  switch (props.tournament.status) {
    case 'active': return 'Active'
    case 'completed': return 'Completed'
    case 'offseason': return 'Offseason'
    default: return props.tournament.status
  }
})
</script>
