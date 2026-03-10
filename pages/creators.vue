<template>
  <div class="min-h-screen bg-[#FAF8F6]">

    <!-- Page Hero -->
    <section class="bg-[#001D3D] py-14 md:py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-black text-white uppercase tracking-wide mb-3">
          BTG CREATORS
        </h1>
        <p class="text-gray-300 text-lg max-w-xl mx-auto">
          Meet the streamers and players behind the BTG community.
        </p>
      </div>
    </section>

    <!-- Creators Grid -->
    <section class="section">
      <div class="container mx-auto px-4">

        <!-- Loading skeletons -->
        <div v-if="pending" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 6" :key="i" class="card p-5 animate-pulse">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-14 h-14 rounded-full bg-gray-200"></div>
              <div class="h-5 bg-gray-200 rounded w-32"></div>
            </div>
            <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div class="flex gap-2 mb-4">
              <div class="w-8 h-8 rounded-full bg-gray-200"></div>
              <div class="w-8 h-8 rounded-full bg-gray-200"></div>
              <div class="w-8 h-8 rounded-full bg-gray-200"></div>
            </div>
            <div class="h-9 bg-gray-200 rounded w-full"></div>
          </div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="text-center py-20 text-gray-500">
          <Icon name="lucide:alert-circle" class="w-12 h-12 mx-auto mb-3 text-[#E30613] opacity-60" />
          <p class="font-semibold text-lg mb-1">Failed to load creators</p>
          <p class="text-sm">Please try refreshing the page.</p>
        </div>

        <!-- Creators grid -->
        <div v-else-if="creators && creators.length > 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CreatorCard
            v-for="creator in creators"
            :key="creator.id"
            :creator="creator"
          />
        </div>

        <!-- Empty state -->
        <div v-else class="text-center py-20 text-gray-400">
          <Icon name="lucide:users" class="w-14 h-14 mx-auto mb-4 opacity-30" />
          <p class="text-lg font-semibold">No creators found.</p>
          <p class="text-sm mt-1">Check back soon — the roster is growing.</p>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
interface Creator {
  id: number
  display_name: string
  slug: string
  bio?: string | null
  avatar_url?: string | null
  twitch_url?: string | null
  youtube_url?: string | null
  tiktok_url?: string | null
  instagram_url?: string | null
  twitter_url?: string | null
  primary_stream_url?: string | null
  is_featured: number | boolean
}

useHead({
  title: 'BTG Creators — Bravo Trashe Gaming',
  meta: [
    { name: 'description', content: 'Meet the streamers and players behind the BTG community.' },
  ],
})

const { data, pending, error } = await useAsyncData<{ data: Creator[] }>(
  'creators',
  () => $fetch('/api/creators'),
  { default: () => ({ data: [] }) }
)

const creators = computed(() => data.value?.data ?? [])
</script>
