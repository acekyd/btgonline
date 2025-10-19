<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
    <!-- Header Section -->
    <section class="relative py-20 bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-gray-900/90">
      <!-- Gaming Grid Pattern -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      <div class="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <h1 class="text-5xl md:text-7xl font-black text-white mb-6">
          BTG <span class="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">STREAM TEAM</span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
          Meet the personalities that bring our community to life with epic gameplay, authentic content, and endless entertainment
        </p>
        
        <!-- Stream Stats -->
        <div class="flex justify-center gap-6 mb-10">
          <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
            <div class="text-2xl font-bold text-purple-400">{{ streamers.length }}</div>
            <div class="text-gray-300 text-sm">Featured Streamers</div>
          </div>
          <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
            <div class="text-2xl font-bold text-blue-400">LIVE</div>
            <div class="text-gray-300 text-sm">Streams Daily</div>
          </div>
          <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
            <div class="text-2xl font-bold text-green-400">5K+</div>
            <div class="text-gray-300 text-sm">Community</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-16">
      <!-- Featured Streamers -->
      <section class="mb-20">
        <div class="grid grid-cols-1 lg:grid-cols-1 gap-12">
          <!-- Streamer Cards -->
          <div
            v-for="(streamer, index) in streamers"
            :key="streamer.id"
            class="group bg-gray-800 rounded-3xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-500 hover:transform hover:scale-[1.02]"
          >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <!-- Twitch Embed Section -->
              <div class="relative bg-gray-900 flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
                <!-- Twitch Embed will go here -->
                <div class="w-full h-full">
                  <!-- Live Stream Embed -->
                  <div v-if="streamer.isLive" class="w-full h-full">
                    <iframe
                      :src="`https://player.twitch.tv/?channel=${streamer.handle}&parent=localhost&parent=btgaming.com&muted=false`"
                      class="w-full h-full border-0"
                      allowfullscreen>
                    </iframe>
                  </div>
                  
                  <!-- Offline State -->
                  <div v-else class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-center p-8">
                    <div 
                      class="w-32 h-32 rounded-full flex items-center justify-center mb-6"
                      :style="{ background: `linear-gradient(to right, ${getHex(streamer.color.from)}, ${getHex(streamer.color.to)})` }"
                    >
                      <span class="text-4xl font-black text-white">{{ streamer.initials }}</span>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-2">{{ streamer.name }}</h3>
                    <p class="text-gray-400 mb-4">Currently Offline</p>
                    <p class="text-sm text-gray-500 mb-6">Last streamed: {{ streamer.lastStreamTitle }}</p>
                    <UButton 
                      :to="streamer.links?.twitch || '#'" 
                      target="_blank"
                      size="sm" 
                      color="primary" 
                      variant="solid"
                      class="mb-4">
                      <UIcon name="i-simple-icons-twitch" class="mr-2" />
                      Visit Channel
                    </UButton>
                    <div class="text-xs text-gray-500">
                      <UIcon name="i-heroicons-clock" class="inline mr-1" />
                      Check back soon for live streams!
                    </div>
                  </div>
                </div>
              </div>

              <!-- Streamer Info Section -->
              <div class="p-8 lg:p-12 flex flex-col justify-center">
                <div class="mb-6">
                  <div class="flex items-center mb-4">
                    <div 
                      class="w-16 h-16 rounded-full flex items-center justify-center mr-4"
                      :style="{ background: `linear-gradient(to right, ${getHex(streamer.color.from)}, ${getHex(streamer.color.to)})` }"
                    >
                      <span class="text-xl font-black text-white">{{ streamer.initials }}</span>
                    </div>
                    <div>
                      <h2 class="text-3xl font-black text-white mb-1">{{ streamer.name }}</h2>
                      <p class="text-purple-400 font-semibold">{{ streamer.role }}</p>
                    </div>
                  </div>
                  
                  <!-- Live Status -->
                  <div class="flex items-center mb-6">
                    <div :class="[
                      'w-3 h-3 rounded-full mr-2',
                      streamer.isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-500'
                    ]"></div>
                    <span :class="[
                      'text-sm font-medium',
                      streamer.isLive ? 'text-red-400' : 'text-gray-400'
                    ]">
                      {{ streamer.isLive ? 'LIVE NOW' : 'OFFLINE' }}
                    </span>
                    <span v-if="streamer.isLive" class="text-gray-400 ml-2 text-sm">
                      • {{ streamer.currentGame }}
                    </span>
                  </div>
                </div>

                <p class="text-gray-300 text-lg leading-relaxed mb-8">
                  {{ streamer.description || streamer.bio }}
                </p>
                
                <!-- Stats -->
                <div class="grid grid-cols-3 gap-4 mb-8">
                  <div class="text-center p-3 bg-gray-700/50 rounded-lg">
                    <UIcon name="i-heroicons-users" class="w-5 h-5 text-purple-400 mx-auto mb-1" />
                    <div class="text-lg font-bold text-white">{{ streamer.followers || '2.5K' }}</div>
                    <div class="text-gray-400 text-xs">Followers</div>
                  </div>
                  <div class="text-center p-3 bg-gray-700/50 rounded-lg">
                    <UIcon name="i-heroicons-clock" class="w-5 h-5 text-blue-400 mx-auto mb-1" />
                    <div class="text-lg font-bold text-white">{{ streamer.hoursStreamed || '150' }}</div>
                    <div class="text-gray-400 text-xs">Hours</div>
                  </div>
                  <div class="text-center p-3 bg-gray-700/50 rounded-lg">
                    <UIcon name="i-heroicons-star" class="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                    <div class="text-lg font-bold text-white">{{ streamer.rating || '4.9' }}</div>
                    <div class="text-gray-400 text-xs">Rating</div>
                  </div>
                </div>

                <!-- Social Links -->
                <div class="flex flex-wrap gap-3">
                  <UButton 
                    v-if="streamer.links?.twitch"
                    :to="streamer.links.twitch" 
                    target="_blank"
                    size="sm" 
                    color="primary" 
                    variant="solid">
                    <UIcon name="i-simple-icons-twitch" class="mr-2" />
                    Twitch
                  </UButton>
                  <UButton 
                    v-if="streamer.links?.twitter"
                    :to="streamer.links.twitter" 
                    target="_blank"
                    size="sm" 
                    color="neutral" 
                    variant="outline">
                    <UIcon name="i-simple-icons-twitter" class="mr-2" />
                    Twitter
                  </UButton>
                  <UButton 
                    v-if="streamer.links?.instagram"
                    :to="streamer.links.instagram" 
                    target="_blank"
                    size="sm" 
                    color="neutral" 
                    variant="outline">
                    <UIcon name="i-simple-icons-instagram" class="mr-2" />
                    Instagram
                  </UButton>
                  <UButton 
                    v-if="streamer.links?.youtube"
                    :to="streamer.links.youtube" 
                    target="_blank"
                    size="sm" 
                    color="error" 
                    variant="outline">
                    <UIcon name="i-simple-icons-youtube" class="mr-2" />
                    YouTube
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Community Section -->
      <section class="mb-20">
        <div class="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <!-- Background Pattern -->
          <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          
          <div class="relative z-10">
            <h2 class="text-4xl md:text-6xl font-black text-white mb-6">
              Join the Stream Squad
            </h2>
            <p class="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Follow our streamers, join the chat, and become part of the BTG gaming community.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <UButton size="xl" color="primary" variant="solid"
                class="px-8 py-4 text-lg font-bold text-purple-800 hover:scale-105 transition-all duration-300 shadow-2xl"
                to="#" target="_blank">
                <UIcon name="i-simple-icons-discord" class="mr-2" />
                Join Discord
              </UButton>
              <UButton size="xl" variant="outline"
                class="px-8 py-4 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-purple-800 transition-all duration-300"
                to="/">
                <UIcon name="i-heroicons-arrow-left" class="mr-2" />
                Back to Home
              </UButton>
            </div>

            <!-- Quick Social Links -->
            <div class="flex justify-center space-x-6">
              <a href="#" target="_blank" class="text-white/60 hover:text-white transition-colors">
                <UIcon name="i-simple-icons-twitter" class="w-6 h-6" />
              </a>
              <a href="#" target="_blank" class="text-white/60 hover:text-white transition-colors">
                <UIcon name="i-simple-icons-instagram" class="w-6 h-6" />
              </a>
              <a href="#" target="_blank" class="text-white/60 hover:text-white transition-colors">
                <UIcon name="i-simple-icons-youtube" class="w-6 h-6" />
              </a>
              <a href="#" target="_blank" class="text-white/60 hover:text-white transition-colors">
                <UIcon name="i-simple-icons-twitch" class="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Stream Schedule Preview -->
      <section>
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
            Stream <span class="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Schedule</span>
          </h2>
          <p class="text-xl text-gray-400 max-w-3xl mx-auto">
            Catch your favorite streamers at their regular streaming times
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="streamer in streamers" 
            :key="streamer.id"
            class="bg-gray-800 rounded-2xl p-6 border border-gray-700"
          >
            <h3 
              class="text-xl font-bold mb-4"
              :style="{ color: getHex(streamer.color.from) }"
            >
              {{ streamer.name }}
            </h3>
            <div class="space-y-2 text-gray-300">
              <div 
                v-for="entry in getScheduleEntries(streamer)"
                :key="entry[0]"
                class="flex justify-between"
              >
                <span class="capitalize">{{ entry[0] }}</span>
                <span>{{ entry[1] }}</span>
              </div>
              <div v-if="getScheduleEntries(streamer).length === 0" class="text-gray-500 text-sm">
                Schedule TBD
              </div>
              <div class="text-sm text-gray-500 mt-3">
                {{ streamer.contentTypes?.join(', ') }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import type {  Streamer } from '@/types/streamer'
import streamersData from '@/content/streamers.json'

// Streamers data
const streamers = computed<Streamer[]>(() => (streamersData.streamers ?? [])
  .filter((s) => s.active)
  .sort((a, b) => a.order - b.order))

// Schedule helper to avoid template errors
const getScheduleEntries = (streamer: Streamer): [string, string][] => {
  const schedule = streamer.schedule
  if (!schedule) return []
  return Object.entries(schedule).filter(([, time]) => Boolean(time) && time !== 'Offline') as [string, string][]
}

// Map tailwind color tokens to hex for inline gradient style (avoids safelist issues)
const tailwindHex: Record<string, string> = {
  'purple-400': '#c084fc',
  'blue-400': '#60a5fa',
  'blue-500': '#3b82f6',
  'cyan-400': '#22d3ee',
  'green-400': '#34d399',
  'emerald-400': '#34d399',
}

const getHex = (token: string): string => tailwindHex[token] || '#6b7280'

// Meta tags
useHead({
  title: 'Stream Team - BTG Gaming',
  meta: [
    { name: 'description', content: 'Meet the BTG Stream Team. Watch live Twitch streams, follow your favorite streamers, and join our gaming community.' },
    { name: 'keywords', content: 'BTG streamers, Twitch, gaming community, esports, live streaming, Acekydtv, Hey_olla, Ab_wavy' }
  ]
})
</script>