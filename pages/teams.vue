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
                      :src="`https://player.twitch.tv/?channel=${streamer.twitchHandle}&parent=localhost&parent=btgaming.com&muted=false`"
                      class="w-full h-full border-0"
                      allowfullscreen>
                    </iframe>
                  </div>
                  
                  <!-- Offline State -->
                  <div v-else class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-center p-8">
                    <div class="w-32 h-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-6">
                      <span class="text-4xl font-black text-white">{{ streamer.initials }}</span>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-2">{{ streamer.displayName }}</h3>
                    <p class="text-gray-400 mb-4">Currently Offline</p>
                    <p class="text-sm text-gray-500 mb-6">Last streamed: {{ streamer.lastStreamTitle }}</p>
                    <UButton 
                      :to="`https://twitch.tv/${streamer.twitchHandle}`" 
                      target="_blank"
                      size="sm" 
                      color="purple" 
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
                    <div class="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center mr-4">
                      <span class="text-xl font-black text-white">{{ streamer.initials }}</span>
                    </div>
                    <div>
                      <h2 class="text-3xl font-black text-white mb-1">{{ streamer.displayName }}</h2>
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
                  {{ streamer.description }}
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
                    :to="`https://twitch.tv/${streamer.twitchHandle}`" 
                    target="_blank"
                    size="sm" 
                    color="purple" 
                    variant="solid">
                    <UIcon name="i-simple-icons-twitch" class="mr-2" />
                    Twitch
                  </UButton>
                  <UButton 
                    v-if="streamer.twitter"
                    :to="`https://twitter.com/${streamer.twitter}`" 
                    target="_blank"
                    size="sm" 
                    color="neutral" 
                    variant="outline">
                    <UIcon name="i-simple-icons-twitter" class="mr-2" />
                    Twitter
                  </UButton>
                  <UButton 
                    v-if="streamer.instagram"
                    :to="`https://instagram.com/${streamer.instagram}`" 
                    target="_blank"
                    size="sm" 
                    color="neutral" 
                    variant="outline">
                    <UIcon name="i-simple-icons-instagram" class="mr-2" />
                    Instagram
                  </UButton>
                  <UButton 
                    v-if="streamer.youtube"
                    :to="`https://youtube.com/${streamer.youtube}`" 
                    target="_blank"
                    size="sm" 
                    color="red" 
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
              <UButton size="xl" color="white" variant="solid"
                class="px-8 py-4 text-lg font-bold text-purple-800 hover:scale-105 transition-all duration-300 shadow-2xl"
                to="#" target="_blank">
                <UIcon name="i-simple-icons-discord" class="mr-2" />
                Join Discord
              </UButton>
              <UButton size="xl" color="neutral" variant="outline"
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
          <div class="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 class="text-xl font-bold text-purple-400 mb-4">Acekydtv</h3>
            <div class="space-y-2 text-gray-300">
              <div class="flex justify-between">
                <span>Monday - Friday</span>
                <span>8 PM - 12 AM</span>
              </div>
              <div class="flex justify-between">
                <span>Saturday</span>
                <span>6 PM - 2 AM</span>
              </div>
              <div class="text-sm text-gray-500">
                Mainly FIFA, Tech reviews, Community games
              </div>
            </div>
          </div>

          <div class="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 class="text-xl font-bold text-blue-400 mb-4">Hey_olla</h3>
            <div class="space-y-2 text-gray-300">
              <div class="flex justify-between">
                <span>Tuesday, Thursday</span>
                <span>7 PM - 11 PM</span>
              </div>
              <div class="flex justify-between">
                <span>Sunday</span>
                <span>3 PM - 8 PM</span>
              </div>
              <div class="text-sm text-gray-500">
                FPS games, Fashion content, Lifestyle
              </div>
            </div>
          </div>

          <div class="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 class="text-xl font-bold text-green-400 mb-4">Ab_wavy</h3>
            <div class="space-y-2 text-gray-300">
              <div class="flex justify-between">
                <span>Wednesday, Friday</span>
                <span>9 PM - 1 AM</span>
              </div>
              <div class="flex justify-between">
                <span>Sunday</span>
                <span>7 PM - 11 PM</span>
              </div>
              <div class="text-sm text-gray-500">
                Chill gaming, Music, Community vibes
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// BTG Streamer data
const streamers = ref([
  {
    id: 1,
    displayName: 'Acekydtv',
    initials: 'AK',
    twitchHandle: 'acekydtv',
    role: 'The Captain & Creative',
    description: 'Tech, vibes, and late-night FIFA sessions. The mastermind behind BTG\'s creative direction. Ace brings technical expertise and community leadership to every stream, creating the perfect blend of competitive gaming and chill vibes.',
    isLive: true, // Updated to show live
    currentGame: 'FIFA 24',
    lastStreamTitle: 'BTG Community Night | FIFA Pro Clubs',
    followers: '3.2K',
    hoursStreamed: '180',
    rating: '4.9',
    twitter: 'acekydtv',
    instagram: null,
    youtube: 'acekydtv'
  },
  {
    id: 2,
    displayName: 'Hey_olla',
    initials: 'HO',
    twitchHandle: 'hey_olla',
    role: 'The Stylish Sharpshooter',
    description: 'Fashion meets precision gaming. Expect fun, style, and absolutely clean snipes every stream. Hey_olla brings a unique blend of lifestyle content and high-skill FPS gameplay that keeps the community engaged and entertained.',
    isLive: true, // Updated to show live
    currentGame: 'Call of Duty',
    lastStreamTitle: 'Sunday Snipes & Style Talk',
    followers: '2.8K',
    hoursStreamed: '145',
    rating: '4.8',
    twitter: 'hey_olla',
    instagram: 'hey_olla',
    youtube: null
  },
  {
    id: 3,
    displayName: 'Ab_wavy',
    initials: 'AW',
    twitchHandle: 'ab_wavy',
    role: 'The Vibe Master',
    description: 'Smooth gameplay meets chill streams. Known for creating the perfect gaming atmosphere where skill and relaxation come together. Ab_wavy specializes in creating an inclusive space where everyone feels welcome to game and vibe.',
    isLive: false, // Updated to show offline for variety
    currentGame: 'Apex Legends',
    lastStreamTitle: 'Chill Wednesday Vibes | Community Games',
    followers: '2.1K',
    hoursStreamed: '120',
    rating: '4.7',
    twitter: 'ab_wavy',
    instagram: null,
    youtube: null
  }
])

// Meta tags
useHead({
  title: 'Stream Team - BTG Gaming',
  meta: [
    { name: 'description', content: 'Meet the BTG Stream Team. Watch live Twitch streams, follow your favorite streamers, and join our gaming community.' },
    { name: 'keywords', content: 'BTG streamers, Twitch, gaming community, esports, live streaming, Acekydtv, Hey_olla, Ab_wavy' }
  ]
})
</script>