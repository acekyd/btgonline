<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
    <!-- Header Section -->
    <section class="relative py-20 bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-gray-900/90">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      <div class="relative z-10 max-w-7xl mx-auto px-4 text-center space-y-10">
        <div>
          <h1 class="text-5xl md:text-7xl font-black text-white mb-6">
            BTG <span class="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">STREAM TEAM</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Meet the personalities that keep BTG live. Gameplay, community nights, creative collabs—our streamers push culture forward on and off the sticks.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
          <div class="bg-white/10 backdrop-blur-md rounded-lg px-6 py-5 border border-white/20 text-center min-w-[160px]">
            <div class="text-3xl font-black text-purple-300">{{ streamers.length }}</div>
            <div class="text-gray-300 text-sm uppercase tracking-wider">Featured Streamers</div>
          </div>
          <div class="bg-white/10 backdrop-blur-md rounded-lg px-6 py-5 border border-white/20 text-center min-w-[160px]">
            <div class="text-3xl font-black text-blue-300">LIVE</div>
            <div class="text-gray-300 text-sm uppercase tracking-wider">Streams Weekly</div>
          </div>
          <div class="bg-white/10 backdrop-blur-md rounded-lg px-6 py-5 border border-white/20 text-center min-w-[160px]">
            <div class="text-3xl font-black text-emerald-300">24/7</div>
            <div class="text-gray-300 text-sm uppercase tracking-wider">Community Vibes</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-16 space-y-20">
      <!-- Featured Streamers -->
      <section>
        <div class="grid grid-cols-1 lg:grid-cols-1 gap-12">
          <div
            v-for="streamer in streamers"
            :key="streamer.id"
            class="group bg-gray-800 rounded-3xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-500 hover:translate-y-[-4px] hover:shadow-2xl"
          >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <!-- Twitch Embed Section -->
              <div class="relative bg-gray-900 flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
                <div class="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300" :style="{ background: `linear-gradient(to right, ${getHex(streamer.color.from)}, ${getHex(streamer.color.to)})` }"></div>
                <div class="relative z-10 w-full h-full">
                  <div v-if="streamer.isLive" class="w-full h-full">
                    <iframe
                      :src="`https://player.twitch.tv/?channel=${streamer.handle}&parent=localhost&parent=${parentHost}&muted=false`"
                      class="w-full h-full border-0"
                      allowfullscreen>
                    </iframe>
                  </div>
                  <div v-else class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-center p-8">
                    <div 
                      class="w-32 h-32 rounded-full flex items-center justify-center mb-6 shadow-xl ring-2 ring-white/10"
                      :style="{ background: `linear-gradient(to right, ${getHex(streamer.color.from)}, ${getHex(streamer.color.to)})` }"
                    >
                      <span class="text-4xl font-black text-white">{{ streamer.initials }}</span>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-2">{{ streamer.name }}</h3>
                    <p class="text-gray-400 mb-4">Currently Offline</p>
                    <p class="text-sm text-gray-500 mb-6">{{ streamer.lastStreamTitle || 'Check the schedule for the next community pull up.' }}</p>
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
                    <div class="text-xs text-gray-500 flex items-center gap-2">
                      <UIcon name="i-heroicons-clock" class="w-4 h-4" />
                      Catch them live soon—Discord gets the ping first.
                    </div>
                  </div>
                </div>
              </div>

              <!-- Streamer Info Section -->
              <div class="p-8 lg:p-12 flex flex-col justify-center gap-8">
                <div class="flex flex-col gap-4">
                  <div class="flex items-center gap-4">
                    <div 
                      class="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black text-white"
                      :style="{ background: `linear-gradient(to right, ${getHex(streamer.color.from)}, ${getHex(streamer.color.to)})` }"
                    >
                      {{ streamer.initials }}
                    </div>
                    <div>
                      <h2 class="text-3xl font-black text-white mb-1">{{ streamer.name }}</h2>
                      <p class="text-purple-300 font-semibold">{{ streamer.role }}</p>
                    </div>
                  </div>

                  <div class="flex items-center gap-3 text-sm">
                    <div :class="[
                      'w-3 h-3 rounded-full',
                      streamer.isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-500'
                    ]"></div>
                    <span :class="[
                      'font-medium uppercase tracking-widest',
                      streamer.isLive ? 'text-red-400' : 'text-gray-400'
                    ]">
                      {{ streamer.isLive ? 'Live Now' : 'Offline' }}
                    </span>
                    <span v-if="streamer.isLive" class="text-gray-400">
                      • Playing {{ streamer.currentGame }}
                    </span>
                  </div>
                </div>

                <p class="text-gray-300 text-lg leading-relaxed">
                  {{ streamer.description || streamer.bio }}
                </p>
                
                <div class="grid grid-cols-3 gap-4">
                  <div class="text-center p-4 bg-gray-700/40 rounded-xl border border-gray-600/40">
                    <UIcon name="i-heroicons-users" class="w-5 h-5 text-purple-300 mx-auto mb-1" />
                    <div class="text-lg font-bold text-white">{{ streamer.followers || '—' }}</div>
                    <div class="text-gray-400 text-xs uppercase tracking-widest">Followers</div>
                  </div>
                  <div class="text-center p-4 bg-gray-700/40 rounded-xl border border-gray-600/40">
                    <UIcon name="i-heroicons-clock" class="w-5 h-5 text-blue-300 mx-auto mb-1" />
                    <div class="text-lg font-bold text-white">{{ streamer.hoursStreamed || '—' }}</div>
                    <div class="text-gray-400 text-xs uppercase tracking-widest">Hours</div>
                  </div>
                  <div class="text-center p-4 bg-gray-700/40 rounded-xl border border-gray-600/40">
                    <UIcon name="i-heroicons-star" class="w-5 h-5 text-yellow-300 mx-auto mb-1" />
                    <div class="text-lg font-bold text-white">{{ streamer.rating || '—' }}</div>
                    <div class="text-gray-400 text-xs uppercase tracking-widest">Rating</div>
                  </div>
                </div>

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

      <!-- Community CTA -->
      <section>
        <div class="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          
          <div class="relative z-10">
            <h2 class="text-4xl md:text-6xl font-black text-white mb-6">
              Join the Stream Squad
            </h2>
            <p class="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Tap into BTG watch parties, sub events, and special drops. Discord gets the alerts first—don’t miss the next show.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <UButton size="xl" color="primary" variant="solid"
                class="px-8 py-4 text-lg font-bold text-purple-900 hover:scale-105 transition-all duration-300 shadow-2xl"
                to="https://discord.gg/HF7WAkJ4" target="_blank">
                <UIcon name="i-simple-icons-discord" class="mr-2" />
                Join Discord
              </UButton>
              <UButton size="xl" variant="outline"
                class="px-8 py-4 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-purple-800 transition-all duration-300"
                to="/teams">
                <UIcon name="i-heroicons-users" class="mr-2" />
                Meet Our Teams
              </UButton>
            </div>

            <div class="flex justify-center space-x-6">
              <a href="https://x.com/BTGOnline" target="_blank" class="text-white/70 hover:text-white transition-colors">
                <UIcon name="i-simple-icons-twitter" class="w-6 h-6" />
              </a>
              <a href="https://twitch.tv/acekydtv" target="_blank" class="text-white/70 hover:text-white transition-colors">
                <UIcon name="i-simple-icons-twitch" class="w-6 h-6" />
              </a>
              <a href="https://youtube.com/@acekydtv" target="_blank" class="text-white/70 hover:text-white transition-colors">
                <UIcon name="i-simple-icons-youtube" class="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Stream Schedule Preview -->
      <section>
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
            Weekly <span class="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Schedule</span>
          </h2>
          <p class="text-xl text-gray-400 max-w-3xl mx-auto">
            Pull up to the stream that matches your vibe—community nights, tech breakdowns, clutch moments, and more.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="streamer in streamers" 
            :key="`${streamer.id}-schedule`"
            class="bg-gray-800 rounded-2xl p-6 border border-gray-700/80"
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
                :key="`${streamer.id}-${entry[0]}`"
                class="flex justify-between"
              >
                <span class="capitalize">{{ entry[0] }}</span>
                <span>{{ entry[1] }}</span>
              </div>
              <div v-if="getScheduleEntries(streamer).length === 0" class="text-gray-500 text-sm">
                Schedule TBD — watch Discord for alerts.
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
import { computed } from 'vue'
import streamersData from '@/content/streamers.json'
import type { Streamer, StreamersDoc } from '@/types/streamer'

const { streamers: rawStreamers } = streamersData as StreamersDoc

const streamers = computed<Streamer[]>(() => (rawStreamers ?? [])
  .filter((streamer) => streamer.active)
  .sort((a, b) => a.order - b.order))

const tailwindHex: Record<string, string> = {
  'purple-400': '#c084fc',
  'blue-400': '#60a5fa',
  'blue-500': '#3b82f6',
  'cyan-400': '#22d3ee',
  'green-400': '#34d399',
  'emerald-400': '#34d399',
  'yellow-300': '#fde047',
}

const getHex = (token: string): string => tailwindHex[token] || '#c084fc'

const getScheduleEntries = (streamer: Streamer): [string, string][] => {
  const schedule = streamer.schedule
  if (!schedule) return []
  return Object.entries(schedule)
    .filter(([, time]) => Boolean(time) && time !== 'Offline') as [string, string][]
}

const parentHost = typeof window !== 'undefined' ? window.location.hostname : 'btgaming.com'

useHead({
  title: 'Stream Team - Bravo Trashe Gaming',
  meta: [
    { name: 'description', content: 'Watch the BTG Stream Team live. Explore streamer profiles, schedules, and connect with the community for the next stream drop.' },
    { name: 'keywords', content: 'BTG streamers, Twitch, live streams, Bravo Trashe Gaming, esports content, Acekydtv, Hey_olla, Ab_wavy' }
  ]
})
</script>

