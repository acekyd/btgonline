<template>
  <div class="card hover-lift relative flex flex-col">
    <!-- Featured badge -->
    <div
      v-if="creator.is_featured"
      class="absolute top-3 right-3 z-10 w-6 h-6 bg-[#FFC107] rounded-full flex items-center justify-center shadow"
      title="Featured Creator"
    >
      <Icon name="lucide:star" class="w-3.5 h-3.5 text-[#001D3D]" />
    </div>

    <!-- Card content -->
    <div class="p-5 flex flex-col flex-1">
      <!-- Avatar + name -->
      <div class="flex items-center gap-3 mb-3">
        <!-- Avatar -->
        <div class="flex-shrink-0 w-14 h-14 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <NuxtImg
            v-if="creator.avatar_url"
            :src="creator.avatar_url"
            :alt="creator.display_name"
            class="w-full h-full object-cover"
          />
          <span
            v-else
            class="text-xl font-bold text-gray-500 dark:text-gray-300 select-none"
          >
            {{ initials }}
          </span>
        </div>

        <!-- Name -->
        <div class="min-w-0">
          <h3 class="font-bold text-gray-900 dark:text-white text-base truncate">
            {{ creator.display_name }}
          </h3>
        </div>
      </div>

      <!-- Bio -->
      <p
        v-if="creator.bio"
        class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-1"
      >
        {{ creator.bio }}
      </p>
      <div v-else class="flex-1" />

      <!-- Social icons -->
      <CreatorSocialLinks :creator="creator" class="mb-4" />

      <!-- View Profile -->
      <NuxtLink
        :to="`/creators/${creator.slug}`"
        class="btn btn-primary w-full text-center mt-auto"
      >
        View Profile
      </NuxtLink>
    </div>
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

interface Props {
  creator: Creator
}

const props = defineProps<Props>()

const initials = computed(() => {
  return props.creator.display_name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})
</script>
