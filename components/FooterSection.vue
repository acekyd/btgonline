<template>
  <footer class="bg-gray-800 border-t border-gray-700 mt-auto">
    <div class="max-w-7xl mx-auto px-4 py-12">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Brand Section -->
        <div class="md:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-xl overflow-hidden shadow-lg">
              <NuxtImg src="/logo-white.png" alt="BTG Logo" class="w-full h-full object-contain" />
            </div>
            <div>
              <div class="text-2xl font-black text-white">Bravo Trashe Gaming</div>
              <div class="text-purple-400 text-sm">Community Esports Organization</div>
            </div>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed max-w-md">
            Where casual meets competitive. Building the most fun, welcoming, and banter-rich esports experience for everyday gamers across all platforms.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-bold mb-4">Quick Links</h3>
          <nav class="space-y-2">
            <NuxtLink to="/" class="block text-gray-400 hover:text-purple-400 transition-colors text-sm">Home</NuxtLink>
            <NuxtLink to="/about" class="block text-gray-400 hover:text-purple-400 transition-colors text-sm">About</NuxtLink>
            <NuxtLink to="/teams" class="block text-gray-400 hover:text-purple-400 transition-colors text-sm">Stream Team</NuxtLink>
            <NuxtLink to="/shop" class="block text-gray-400 hover:text-purple-400 transition-colors text-sm">Shop</NuxtLink>
          </nav>
        </div>

        <!-- Community -->
        <div>
          <h3 class="text-white font-bold mb-4">Community</h3>
          <div class="space-y-3">
            <a href="https://discord.gg/HF7WAkJ4" target="_blank" class="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors text-sm">
              <UIcon name="i-simple-icons-discord" class="w-4 h-4" />
              Discord
            </a>
            <!-- <a href="#" target="_blank" class="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors text-sm">
              <UIcon name="i-simple-icons-twitch" class="w-4 h-4" />
              Twitch
            </a> -->
            <a href="https://x.com/BTGOnline" target="_blank" class="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors text-sm">
              <UIcon name="i-simple-icons-twitter" class="w-4 h-4" />
              Twitter
            </a>
            <!-- <a href="#" target="_blank" class="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors text-sm">
              <UIcon name="i-simple-icons-instagram" class="w-4 h-4" />
              Instagram
            </a> -->
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-700 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-gray-400 text-sm">
            © {{ new Date().getFullYear() }} Bravo Trashe Gaming (BTG). All rights reserved.
          </div>
          <div class="flex items-center gap-6 mt-4 md:mt-0">
            <div class="text-gray-400 text-sm">
              Built for the community, by the community
            </div>
            <div class="flex items-center gap-4">
              <a href="https://discord.gg/HF7WAkJ4" target="_blank" class="text-gray-400 hover:text-purple-400 transition-colors">
                <UIcon name="i-simple-icons-discord" class="w-5 h-5" />
              </a>
              <a href="https://x.com/BTGOnline" target="_blank" class="text-gray-400 hover:text-blue-400 transition-colors">
                <UIcon name="i-simple-icons-twitter" class="w-5 h-5" />
              </a>
              <a href="#" target="_blank" class="text-gray-400 hover:text-pink-400 transition-colors">
                <UIcon name="i-simple-icons-instagram" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">

</script> 