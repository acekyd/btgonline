<template>
  <div class="min-h-screen bg-[#FAF8F6]">

    <!-- Page Hero -->
    <section class="bg-[#001D3D] py-14 md:py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-black text-white uppercase tracking-wide mb-3">
          TOURNAMENTS
        </h1>
        <p class="text-gray-300 text-lg max-w-xl mx-auto">
          All BTG competitions — past, present, and upcoming.
        </p>
      </div>
    </section>

    <!-- Tournaments Grid -->
    <section class="section">
      <div class="container mx-auto px-4">

        <!-- Loading skeletons -->
        <div v-if="pending" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 6" :key="i" class="card animate-pulse">
            <div class="h-40 bg-gray-200"></div>
            <div class="p-4">
              <div class="flex items-start justify-between gap-2 mb-2">
                <div class="h-5 bg-gray-200 rounded w-3/4"></div>
                <div class="h-5 bg-gray-200 rounded w-16"></div>
              </div>
              <div class="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
              <div class="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="text-center py-20 text-gray-500">
          <Icon name="lucide:alert-circle" class="w-12 h-12 mx-auto mb-3 text-[#E30613] opacity-60" />
          <p class="font-semibold text-lg mb-1">Failed to load tournaments</p>
          <p class="text-sm">Please try refreshing the page.</p>
        </div>

        <!-- Tournaments grid -->
        <div v-else-if="tournaments && tournaments.length > 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <TournamentCard
            v-for="tournament in tournaments"
            :key="tournament.id"
            :tournament="tournament"
          />
        </div>

        <!-- Empty state -->
        <div v-else class="text-center py-20 text-gray-400">
          <Icon name="lucide:trophy" class="w-14 h-14 mx-auto mb-4 opacity-30" />
          <p class="text-lg font-semibold">No tournaments found.</p>
          <p class="text-sm mt-1">Check back soon for upcoming competitions.</p>
        </div>

      </div>
    </section>

  </div>
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

useHead({
  title: 'Tournaments — BTG Bravo Trashe Gaming',
  meta: [
    { name: 'description', content: 'All BTG tournaments — past, present, and upcoming competitions across the platform.' },
  ],
})

const { data, pending, error } = await useAsyncData<{ data: Tournament[] }>(
  'tournaments',
  () => $fetch('/api/tournaments'),
  { default: () => ({ data: [] }) }
)

const tournaments = computed(() => data.value?.data ?? [])
</script>
