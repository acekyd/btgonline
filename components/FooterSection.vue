<template>
  <footer class="bg-[#001D3D] dark:bg-[#00152E] border-t border-white/10 text-white">
    <!-- Main Footer -->
    <div class="container mx-auto px-4 py-12">
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
              <NuxtImg src="/logo-white.png" alt="BTG" class="w-8 h-8 object-contain" />
            </div>
            <div>
              <div class="text-lg font-extrabold text-white leading-tight">Bravo Trashe Gaming</div>
              <div class="text-[10px] text-gray-400 uppercase tracking-wider">Community Esports</div>
            </div>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed max-w-sm">
            Where casual meets competitive. Building the most fun, welcoming, and banter-rich esports experience for everyday gamers.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-bold text-white uppercase tracking-wider text-xs mb-4">Quick Links</h4>
          <nav class="space-y-2">
            <NuxtLink
              v-for="link in quickLinks"
              :key="link.path"
              :to="link.path"
              class="block text-gray-400 hover:text-[#FFC107] text-sm transition-colors"
            >
              {{ link.name }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Community -->
        <div>
          <h4 class="font-bold text-white uppercase tracking-wider text-xs mb-4">Community</h4>
          <nav class="space-y-2">
            <a
              :href="twitterUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-gray-400 hover:text-[#FFC107] text-sm transition-colors"
            >
              <Icon name="mdi:twitter" class="w-4 h-4" />
              Twitter / X
            </a>
          </nav>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-white/10">
      <div class="container mx-auto px-4 py-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© 2024 Bravo Trashe Gaming. All rights reserved.</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const twitterUrl = '#'

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Creators', path: '/creators' },
  { name: 'Tournaments', path: '/tournaments' },
  { name: 'Hall of Fame', path: '/hall-of-fame' },
  { name: 'Records', path: '/records' },
]
</script>
