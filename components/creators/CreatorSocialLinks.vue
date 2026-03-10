<template>
  <div class="flex items-center flex-wrap gap-2">
    <a
      v-for="link in activeLinks"
      :key="link.key"
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="link.label"
      :class="[
        'flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 transition-colors hover:opacity-80',
        iconContainerSize
      ]"
      :title="link.label"
    >
      <Icon :name="link.icon" :class="[iconSize, link.color]" />
    </a>
  </div>
</template>

<script setup lang="ts">
interface Creator {
  twitch_url?: string | null
  youtube_url?: string | null
  tiktok_url?: string | null
  instagram_url?: string | null
  twitter_url?: string | null
  primary_stream_url?: string | null
}

interface SocialDef {
  key: keyof Creator
  icon: string
  color: string
  label: string
}

interface Props {
  creator: Creator
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const socialDefs: SocialDef[] = [
  { key: 'twitch_url', icon: 'mdi:twitch', color: 'text-purple-500', label: 'Twitch' },
  { key: 'youtube_url', icon: 'mdi:youtube', color: 'text-red-500', label: 'YouTube' },
  { key: 'tiktok_url', icon: 'simple-icons:tiktok', color: 'text-gray-900 dark:text-white', label: 'TikTok' },
  { key: 'instagram_url', icon: 'mdi:instagram', color: 'text-pink-500', label: 'Instagram' },
  { key: 'twitter_url', icon: 'mdi:twitter', color: 'text-sky-500', label: 'Twitter' },
]

const activeLinks = computed(() => {
  return socialDefs
    .filter((def) => {
      const val = props.creator[def.key]
      return typeof val === 'string' && val.trim().length > 0
    })
    .map((def) => ({
      ...def,
      url: props.creator[def.key] as string,
    }))
})

const iconContainerSize = computed(() => {
  switch (props.size) {
    case 'sm': return 'w-6 h-6'
    case 'lg': return 'w-10 h-10'
    default: return 'w-8 h-8'
  }
})

const iconSize = computed(() => {
  switch (props.size) {
    case 'sm': return 'w-3 h-3'
    case 'lg': return 'w-5 h-5'
    default: return 'w-4 h-4'
  }
})
</script>
