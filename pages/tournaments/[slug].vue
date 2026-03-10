<template>
  <div class="min-h-screen bg-[#FAF8F6]">

    <!-- Loading state -->
    <div v-if="pending" class="container mx-auto px-4 py-12 max-w-4xl animate-pulse">
      <div class="h-48 bg-gray-200 rounded-xl mb-8"></div>
      <div class="flex gap-4 items-center mb-6">
        <div class="w-20 h-20 bg-gray-200 rounded-xl"></div>
        <div>
          <div class="h-7 bg-gray-200 rounded w-64 mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-40 mb-2"></div>
          <div class="h-5 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
      <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div class="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="fetchError" class="container mx-auto px-4 py-20 text-center">
      <Icon name="lucide:alert-circle" class="w-14 h-14 mx-auto mb-4 text-[#E30613] opacity-60" />
      <h2 class="text-2xl font-black text-[#00152E] mb-2">Tournament Not Found</h2>
      <p class="text-gray-500 mb-6">This tournament doesn't exist or may have been removed.</p>
      <NuxtLink to="/tournaments" class="btn btn-primary">← Back to Tournaments</NuxtLink>
    </div>

    <!-- Tournament detail -->
    <template v-else-if="tournament">
      <!-- Banner image -->
      <div v-if="tournament.banner_url" class="w-full h-48 md:h-64 overflow-hidden bg-[#001D3D]">
        <NuxtImg
          :src="tournament.banner_url"
          :alt="tournament.name"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Back nav -->
      <div class="bg-white border-b border-gray-100">
        <div class="container mx-auto px-4 py-3">
          <NuxtLink to="/tournaments" class="text-sm font-semibold text-gray-500 hover:text-[#E30613] transition-colors inline-flex items-center gap-1.5">
            <Icon name="lucide:arrow-left" class="w-4 h-4" />
            Tournaments
          </NuxtLink>
        </div>
      </div>

      <div class="container mx-auto px-4 py-10 max-w-4xl">

        <!-- Tournament header -->
        <div class="flex flex-col sm:flex-row gap-5 items-start mb-8">
          <!-- Logo -->
          <div class="flex-shrink-0 w-20 h-20 bg-[#001D3D] rounded-xl flex items-center justify-center overflow-hidden">
            <NuxtImg
              v-if="tournament.logo_url"
              :src="tournament.logo_url"
              :alt="tournament.name"
              class="w-full h-full object-contain p-2"
            />
            <Icon v-else name="lucide:trophy" class="w-10 h-10 text-white/40" />
          </div>

          <!-- Info -->
          <div class="flex-1">
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <h1 class="text-2xl md:text-3xl font-black text-[#00152E]">{{ tournament.name }}</h1>
              <AppBadge :variant="statusVariant">{{ statusLabel }}</AppBadge>
            </div>
            <p class="text-gray-500 font-medium mb-1">{{ tournament.game_title }}</p>
            <p v-if="tournament.format_type" class="text-sm text-gray-400">{{ tournament.format_type }}</p>
          </div>
        </div>

        <!-- Description -->
        <div v-if="tournament.description" class="text-gray-600 leading-relaxed mb-6 whitespace-pre-wrap">
          {{ tournament.description }}
        </div>

        <!-- External link -->
        <div v-if="tournament.external_url" class="mb-8">
          <a
            :href="tournament.external_url"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-outline border-[#001D3D] text-[#001D3D] hover:bg-[#001D3D] hover:text-white"
          >
            <Icon name="lucide:external-link" class="w-4 h-4" />
            View on External Site
          </a>
        </div>

        <!-- Season History -->
        <div>
          <h2 class="section-title">SEASON HISTORY</h2>

          <div v-if="sortedSeasons.length > 0" class="card overflow-hidden divide-y divide-gray-100">
            <SeasonRow
              v-for="season in sortedSeasons"
              :key="season.id"
              :season="season"
            />
          </div>

          <div v-else class="text-center py-16 text-gray-400 bg-white rounded-xl border border-gray-100">
            <Icon name="lucide:calendar" class="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No seasons recorded yet.</p>
          </div>
        </div>

      </div>
    </template>

  </div>
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
  season_order: number
  winner_team?: Team | null
  runner_up_team?: Team | null
}

interface Tournament {
  id: number
  name: string
  slug: string
  game_title: string
  format_type?: string | null
  status: 'active' | 'completed' | 'offseason'
  logo_url?: string | null
  banner_url?: string | null
  description?: string | null
  external_url?: string | null
  seasons: Season[]
}

const route = useRoute()
const slug = route.params.slug as string

const { data, pending, error: fetchError } = await useAsyncData<{ data: Tournament }>(
  `tournament-${slug}`,
  async () => {
    try {
      return await $fetch(`/api/tournaments/${slug}`)
    } catch (err: any) {
      if (err?.statusCode === 404 || err?.status === 404) {
        throw createError({ statusCode: 404, statusMessage: 'Tournament not found' })
      }
      throw err
    }
  }
)

const tournament = computed(() => data.value?.data ?? null)

const sortedSeasons = computed(() => {
  if (!tournament.value?.seasons) return []
  return [...tournament.value.seasons].sort((a, b) => b.season_order - a.season_order)
})

const statusVariant = computed(() => {
  switch (tournament.value?.status) {
    case 'active': return 'active' as const
    case 'completed': return 'completed' as const
    case 'offseason': return 'offseason' as const
    default: return 'default' as const
  }
})

const statusLabel = computed(() => {
  switch (tournament.value?.status) {
    case 'active': return 'Active'
    case 'completed': return 'Completed'
    case 'offseason': return 'Offseason'
    default: return tournament.value?.status ?? ''
  }
})

useHead(() => ({
  title: tournament.value
    ? `${tournament.value.name} — BTG Tournaments`
    : 'Tournament — BTG',
  meta: [
    {
      name: 'description',
      content: tournament.value?.description?.slice(0, 160)
        ?? `View ${tournament.value?.name ?? 'this tournament'} on BTG.`,
    },
  ],
}))
</script>
