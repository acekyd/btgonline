<template>
  <div class="min-h-screen bg-[#FAF8F6]">

    <!-- Loading state -->
    <div v-if="pending" class="container mx-auto px-4 py-12">
      <div class="animate-pulse max-w-4xl mx-auto">
        <div class="h-4 bg-gray-200 rounded w-32 mb-8"></div>
        <div class="flex flex-col md:flex-row gap-8">
          <div class="md:w-64 flex-shrink-0">
            <div class="w-48 h-48 rounded-2xl bg-gray-200 mb-4"></div>
            <div class="flex gap-2 mb-4">
              <div class="w-8 h-8 rounded-full bg-gray-200"></div>
              <div class="w-8 h-8 rounded-full bg-gray-200"></div>
            </div>
            <div class="h-10 bg-gray-200 rounded w-full"></div>
          </div>
          <div class="flex-1">
            <div class="h-9 bg-gray-200 rounded w-64 mb-4"></div>
            <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="fetchError" class="container mx-auto px-4 py-20 text-center">
      <Icon name="lucide:alert-circle" class="w-14 h-14 mx-auto mb-4 text-[#E30613] opacity-60" />
      <h2 class="text-2xl font-black text-[#00152E] mb-2">Creator Not Found</h2>
      <p class="text-gray-500 mb-6">This creator profile doesn't exist or may have been removed.</p>
      <NuxtLink to="/creators" class="btn btn-primary">← Back to Creators</NuxtLink>
    </div>

    <!-- Creator profile -->
    <template v-else-if="creator">
      <!-- Top nav -->
      <div class="bg-white border-b border-gray-100">
        <div class="container mx-auto px-4 py-3">
          <NuxtLink to="/creators" class="text-sm font-semibold text-gray-500 hover:text-[#E30613] transition-colors inline-flex items-center gap-1.5">
            <Icon name="lucide:arrow-left" class="w-4 h-4" />
            Creators
          </NuxtLink>
        </div>
      </div>

      <div class="container mx-auto px-4 py-10 max-w-5xl">
        <div class="flex flex-col md:flex-row gap-8 lg:gap-12">

          <!-- Left column: avatar + social -->
          <div class="md:w-64 flex-shrink-0">
            <!-- Avatar -->
            <div class="mb-5">
              <div class="w-full md:w-48 aspect-square rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center max-w-xs mx-auto md:mx-0">
                <NuxtImg
                  v-if="creator.avatar_url"
                  :src="creator.avatar_url"
                  :alt="creator.display_name"
                  class="w-full h-full object-cover"
                />
                <span v-else class="text-4xl font-black text-gray-400 select-none">
                  {{ initials }}
                </span>
              </div>
            </div>

            <!-- Social links -->
            <div class="mb-5">
              <CreatorSocialLinks :creator="creator" size="lg" />
            </div>

            <!-- Primary stream / Watch Live button -->
            <div v-if="creator.primary_stream_url || creator.twitch_url" class="mb-3">
              <a
                :href="creator.primary_stream_url ?? creator.twitch_url ?? '#'"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary w-full justify-center"
              >
                <Icon name="lucide:play" class="w-4 h-4" />
                Watch Live
              </a>
            </div>
          </div>

          <!-- Right column: info + embed -->
          <div class="flex-1 min-w-0">
            <!-- Display name -->
            <h1 class="text-3xl md:text-4xl font-black text-[#00152E] mb-4">
              {{ creator.display_name }}
            </h1>

            <!-- Bio -->
            <div v-if="creator.bio" class="text-gray-600 leading-relaxed mb-6 whitespace-pre-wrap text-base">
              {{ creator.bio }}
            </div>

            <!-- Platform links -->
            <div class="flex flex-wrap gap-3 mb-8">
              <a
                v-if="creator.youtube_url"
                :href="creator.youtube_url"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-outline border-[#FF0000] text-[#FF0000] hover:bg-[#FF0000] hover:text-white text-sm"
              >
                <Icon name="mdi:youtube" class="w-4 h-4" />
                YouTube
              </a>
              <a
                v-if="creator.tiktok_url"
                :href="creator.tiktok_url"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-outline border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white text-sm"
              >
                <Icon name="simple-icons:tiktok" class="w-4 h-4" />
                TikTok
              </a>
              <a
                v-if="creator.instagram_url"
                :href="creator.instagram_url"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-outline border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white text-sm"
              >
                <Icon name="mdi:instagram" class="w-4 h-4" />
                Instagram
              </a>
              <a
                v-if="creator.twitter_url"
                :href="creator.twitter_url"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-outline border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white text-sm"
              >
                <Icon name="mdi:twitter" class="w-4 h-4" />
                Twitter
              </a>
            </div>

            <!-- Twitch embed -->
            <div v-if="twitchChannel" class="mb-8">
              <h2 class="text-lg font-bold text-[#00152E] mb-3 flex items-center gap-2">
                <Icon name="mdi:twitch" class="w-5 h-5 text-purple-500" />
                Live on Twitch
              </h2>
              <div class="aspect-video w-full rounded-xl overflow-hidden border border-gray-200 bg-black">
                <iframe
                  :src="`https://player.twitch.tv/?channel=${twitchChannel}&parent=${hostname}&autoplay=false`"
                  class="w-full h-full"
                  allowfullscreen
                  frameborder="0"
                  scrolling="no"
                  title="Twitch Stream"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </div>
    </template>

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

const route = useRoute()
const slug = route.params.slug as string

const { data, pending, error: fetchError } = await useAsyncData<{ data: Creator }>(
  `creator-${slug}`,
  async () => {
    try {
      return await $fetch(`/api/creators/${slug}`)
    } catch (err: any) {
      if (err?.statusCode === 404 || err?.status === 404) {
        throw createError({ statusCode: 404, statusMessage: 'Creator not found' })
      }
      throw err
    }
  }
)

const creator = computed(() => data.value?.data ?? null)

const initials = computed(() => {
  if (!creator.value) return ''
  return creator.value.display_name
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

// Extract Twitch channel name from URL
const twitchChannel = computed(() => {
  const url = creator.value?.twitch_url
  if (!url) return null
  const match = url.match(/twitch\.tv\/([^/?#]+)/)
  return match ? match[1] : null
})

// SSR-safe hostname for Twitch parent param
const requestUrl = useRequestURL()
const hostname = computed(() => requestUrl.hostname)

useHead(() => ({
  title: creator.value
    ? `${creator.value.display_name} — BTG Creators`
    : 'Creator — BTG',
  meta: [
    {
      name: 'description',
      content: creator.value?.bio
        ? creator.value.bio.slice(0, 160)
        : `Check out ${creator.value?.display_name ?? 'this creator'} on BTG.`,
    },
  ],
}))
</script>
