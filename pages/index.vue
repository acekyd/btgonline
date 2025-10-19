<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Animated Gaming Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-gray-900/90">
        <!-- Gaming Grid Pattern -->
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')]"></div>
        
        <!-- Floating Gaming Elements -->
        <div class="absolute top-20 left-20 w-16 h-16 text-purple-400 opacity-20 animate-float">
          <UIcon name="i-heroicons-device-phone-mobile" class="w-full h-full" />
        </div>
        <div class="absolute top-40 right-32 w-20 h-20 text-blue-400 opacity-20 animate-float-delayed">
          <UIcon name="i-heroicons-computer-desktop" class="w-full h-full" />
        </div>
        <div class="absolute bottom-40 left-1/4 w-12 h-12 text-green-400 opacity-20 animate-float-slow">
          <UIcon name="i-heroicons-puzzle-piece" class="w-full h-full" />
        </div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <!-- BTG Logo/Brand -->
        <div class="mb-8 animate-slide-in-up">
          <div class="inline-block mb-6">
            <div class="w-24 h-24 rounded-2xl overflow-hidden shadow-2xl bg-gray-800/50 p-4 backdrop-blur-md border border-white/10">
              <NuxtImg src="/logo-white.png" alt="BTG Logo" class="w-full h-full object-contain" />
            </div>
          </div>
          <h1 class="text-6xl md:text-8xl font-black text-white mb-4 tracking-tight">
            <span class="inline-block">BRAVO</span>
            <span class="inline-block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">TRASHE</span>
          </h1>
          <div class="text-3xl md:text-5xl font-bold text-gray-300 animate-slide-in-up animation-delay-200">
            GAMING
          </div>
        </div>

        <!-- Brand Tagline -->
        <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed animate-slide-in-up animation-delay-400">
          Where casual meets competitive. Join the most fun, welcoming, and banter-rich esports experience for everyday gamers.
        </p>

        <!-- Quick Navigation CTAs -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-in-up animation-delay-600">
          <UButton size="xl" color="primary" variant="solid"
            class="px-8 py-4 text-white text-lg font-bold transform hover:scale-105 transition-all duration-300 shadow-2xl bg-gradient-to-r from-purple-600 to-blue-600"
            to="/teams">
            <UIcon name="i-heroicons-users" class="mr-2" />
            Meet Our Team
          </UButton>
          <UButton size="xl" color="neutral" variant="outline"
            class="px-8 py-4 text-lg font-semibold border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white transition-all duration-300"
            to="/about">
            <UIcon name="i-heroicons-information-circle" class="mr-2" />
            Learn More
          </UButton>
          <UButton size="xl" color="warning" variant="solid"
            class="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:scale-105 transition-all duration-300"
            to="/shop">
            <UIcon name="i-heroicons-shopping-bag" class="mr-2" />
            Shop Merch
          </UButton>
        </div>

        <!-- Community Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-in-up animation-delay-800">
          <div class="text-center bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div class="text-3xl md:text-4xl font-black text-purple-400 mb-2">3</div>
            <div class="text-gray-300 font-medium">Featured Streamers</div>
          </div>
          <div class="text-center bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div class="text-3xl md:text-4xl font-black text-blue-400 mb-2">LIVE</div>
            <div class="text-gray-300 font-medium">Tournaments</div>
          </div>
          <div class="text-center bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div class="text-3xl md:text-4xl font-black text-green-400 mb-2">24/7</div>
            <div class="text-gray-300 font-medium">Community</div>
          </div>
        </div>

        <!-- Discord CTA -->
        <div class="mt-12 animate-slide-in-up animation-delay-1000">
          <p class="text-lg text-gray-400 mb-4">Ready to join the BTG family?</p>
          <UButton size="lg" variant="solid"
            class="px-8 py-3 text-white font-semibold bg-indigo-600 hover:bg-indigo-700 transition-colors"
            to="https://discord.gg/HF7WAkJ4" target="_blank">
            <UIcon name="i-simple-icons-discord" class="mr-2" />
            Join Our Discord
          </UButton>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <UIcon name="i-heroicons-chevron-down" class="w-8 h-8 text-white/60" />
      </div>
    </section>

    <!-- What We Do Section -->
    <section class="py-20 bg-gray-900">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-6xl font-black text-white mb-6">
            What We <span class="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Do</span>
          </h2>
          <p class="text-xl text-gray-400 max-w-3xl mx-auto">
            Building the most inclusive and exciting esports community for non-professional gamers
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="group bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <UIcon name="i-heroicons-trophy" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold text-white mb-4">Community Tournaments</h3>
            <p class="text-gray-400 leading-relaxed">
              Host tournaments like the BPCL that bring together gamers across all skill levels for epic competition.
            </p>
          </div>

          <div class="group bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <UIcon name="i-heroicons-video-camera" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold text-white mb-4">Stream Team</h3>
            <p class="text-gray-400 leading-relaxed">
              Showcase talented streamers who bring personality and authentic gaming content to our community.
            </p>
          </div>

          <div class="group bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-green-500 transition-all duration-300 hover:transform hover:scale-105">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <UIcon name="i-heroicons-users" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold text-white mb-4">Community Building</h3>
            <p class="text-gray-400 leading-relaxed">
              Create events and content that unite gamers across platforms, fostering connections and friendships.
            </p>
          </div>

          <div class="group bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-orange-500 transition-all duration-300 hover:transform hover:scale-105">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <UIcon name="i-heroicons-shopping-bag" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold text-white mb-4">Merch & Culture</h3>
            <p class="text-gray-400 leading-relaxed">
              Design and drop exclusive merchandise that represents our gaming culture and community pride.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Streamers Preview -->
    <section class="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-6xl font-black text-white mb-6">
            Meet Our <span class="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Streamers</span>
          </h2>
          <p class="text-xl text-gray-400 max-w-3xl mx-auto">
            The personalities that bring our community to life with epic gameplay and endless entertainment
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div
            v-for="s in streamers"
            :key="s.id"
            class="bg-gray-800 rounded-2xl p-8 border border-gray-700 text-center group hover:border-purple-500 transition-all duration-300"
          >
            <div
              class="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
              :style="{ background: `linear-gradient(to right, ${getHex(s.color.from)}, ${getHex(s.color.to)})` }"
            >
              <span class="text-2xl font-black text-white">{{ s.initials }}</span>
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">{{ s.name }}</h3>
            <p class="text-purple-400 font-medium mb-4">{{ s.role }}</p>
            <p class="text-gray-400 mb-6">{{ s.bio }}</p>
            <div class="flex justify-center space-x-3">
              <UButton
                v-if="s.links?.twitch"
                size="sm"
                color="primary"
                variant="soft"
                :to="s.links.twitch"
                target="_blank"
              >
                <UIcon name="i-simple-icons-twitch" class="mr-1" />
                Twitch
              </UButton>
              <UButton
                v-if="s.links?.twitter"
                size="sm"
                color="neutral"
                variant="ghost"
                :to="s.links.twitter"
                target="_blank"
              >
                <UIcon name="i-simple-icons-twitter" class="mr-1" />
                Twitter
              </UButton>
              <UButton
                v-if="s.links?.instagram"
                size="sm"
                color="neutral"
                variant="ghost"
                :to="s.links.instagram"
                target="_blank"
              >
                <UIcon name="i-simple-icons-instagram" class="mr-1" />
                Instagram
              </UButton>
              <UButton
                v-if="s.links?.youtube"
                size="sm"
                color="error"
                variant="soft"
                :to="s.links.youtube"
                target="_blank"
              >
                <UIcon name="i-simple-icons-youtube" class="mr-1" />
                YouTube
              </UButton>
            </div>
          </div>
        </div>

        <div class="text-center">
          <UButton size="lg" color="primary" variant="solid" to="/teams"
            class="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:scale-105 transition-all duration-300">
            <UIcon name="i-heroicons-users" class="mr-2" />
            View Full Stream Team
          </UButton>
        </div>
      </div>
    </section>

    <!-- Community CTA -->
    <section class="py-20 bg-gray-900">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <div class="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 rounded-3xl p-12 md:p-16 relative overflow-hidden">
          <!-- Background Pattern -->
          <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          
          <div class="relative z-10">
            <h2 class="text-4xl md:text-6xl font-black text-white mb-6">
              Join the BTG Family
            </h2>
            <p class="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Don't need to be pro to feel the thrill. Just bring your controller, your squad, and your vibe.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <UButton size="xl" variant="solid"
                class="px-8 py-4 text-lg font-bold bg-white text-purple-800 hover:scale-105 transition-all duration-300 shadow-2xl"
                to="#" target="_blank">
                <UIcon name="i-simple-icons-discord" class="mr-2" />
                Join Discord
              </UButton>
              <UButton size="xl" variant="outline"
                class="px-8 py-4 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-purple-800 transition-all duration-300"
                to="/about">
                <UIcon name="i-heroicons-information-circle" class="mr-2" />
                Learn More
              </UButton>
            </div>

            <!-- Social Links Preview -->
            <div class="mt-8 flex justify-center space-x-6">
              <a href="#" target="_blank" class="text-white/60 hover:text-white transition-colors">
                <UIcon name="i-simple-icons-twitter" class="w-6 h-6" />
              </a>
              <a href="#" target="_blank" class="text-white/60 hover:text-white transition-colors">
                <UIcon name="i-simple-icons-instagram" class="w-6 h-6" />
              </a>
              <a href="#" target="_blank" class="text-white/60 hover:text-white transition-colors">
                <UIcon name="i-simple-icons-youtube" class="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { StreamersDoc, Streamer } from '@/types/streamer'
// BTG meta tags
useHead({
  title: 'Bravo Trashe Gaming - Community Esports Organization',
  meta: [
    { name: 'description', content: 'Join BTG, the most fun and welcoming esports community. Where casual meets competitive gaming with tournaments, streamers, and epic community events.' },
    { name: 'keywords', content: 'esports, gaming community, BTG, tournaments, streamers, Discord, gaming culture, competitive gaming' }
  ]
})

// Add custom CSS for animations
useHead({
  style: [{
    innerHTML: `
      @keyframes slide-in-up {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      
      @keyframes float-delayed {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(-180deg); }
      }
      
      @keyframes float-slow {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(90deg); }
      }
      
      .animate-slide-in-up {
        animation: slide-in-up 0.8s ease-out forwards;
      }
      
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      
      .animate-float-delayed {
        animation: float-delayed 8s ease-in-out infinite;
      }
      
      .animate-float-slow {
        animation: float-slow 10s ease-in-out infinite;
      }
      
      .animation-delay-200 {
        animation-delay: 0.2s;
      }
      
      .animation-delay-400 {
        animation-delay: 0.4s;
      }
      
      .animation-delay-600 {
        animation-delay: 0.6s;
      }
      
      .animation-delay-800 {
        animation-delay: 0.8s;
      }
      
      .animation-delay-1000 {
        animation-delay: 1s;
      }
    `
  }]
})

// Streamers content
const { data: streamersDoc } = await useAsyncData<StreamersDoc>(
  'streamers',
  () => queryContent('/streamers').findOne() as Promise<StreamersDoc>
)
const streamers = computed<Streamer[]>(() => (streamersDoc.value?.streamers ?? [])
  .filter((s) => s.active)
  .sort((a, b) => a.order - b.order))

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
</script>