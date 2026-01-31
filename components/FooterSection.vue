<template>
  <footer class="bg-white border-t border-gray-200">
    <!-- Sponsors Section -->
    <div class="border-b border-gray-200">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
          <div v-for="partner in partners" :key="partner.name" class="flex flex-col items-center gap-2">
            <div class="w-20 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
              <UIcon :name="partner.icon" class="w-10 h-10 text-gray-400" />
            </div>
            <span class="text-[10px] text-gray-400 uppercase tracking-wider">{{ partner.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Footer -->
    <div class="container mx-auto px-4 py-12">
      <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
        <!-- Brand -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-lg bg-[#001D3D] flex items-center justify-center">
              <NuxtImg src="/logo-white.png" alt="BTG" class="w-9 h-9 object-contain" />
            </div>
            <div>
              <div class="text-xl font-extrabold text-[#00152E]">Bravo Trashe Gaming</div>
              <div class="text-xs text-gray-400 uppercase tracking-wider">Community Esports</div>
            </div>
          </div>
          <p class="text-gray-500 text-sm leading-relaxed max-w-sm mb-6">
            Where casual meets competitive. Building the most fun, welcoming, and banter-rich esports experience for everyday gamers.
          </p>
          
          <!-- Social Links -->
          <div class="flex items-center gap-3">
            <a 
              v-for="social in socials" 
              :key="social.name"
              :href="social.url" 
              target="_blank"
              class="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#00152E] flex items-center justify-center text-gray-500 hover:text-white transition-all"
              :aria-label="social.name"
            >
              <UIcon :name="social.icon" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-bold text-[#00152E] uppercase tracking-wider text-sm mb-4">Explore</h4>
          <nav class="space-y-2">
            <NuxtLink 
              v-for="link in exploreLinks" 
              :key="link.name"
              :to="link.path" 
              class="block text-gray-500 hover:text-[#E30613] text-sm transition-colors"
            >
              {{ link.name }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Community -->
        <div>
          <h4 class="font-bold text-[#00152E] uppercase tracking-wider text-sm mb-4">Community</h4>
          <nav class="space-y-2">
            <a 
              v-for="link in communityLinks" 
              :key="link.name"
              :href="link.url" 
              target="_blank"
              class="flex items-center gap-2 text-gray-500 hover:text-[#E30613] text-sm transition-colors"
            >
              <UIcon :name="link.icon" class="w-4 h-4" />
              {{ link.name }}
            </a>
          </nav>
        </div>

        <!-- App Download / CTA -->
        <div>
          <h4 class="font-bold text-[#00152E] uppercase tracking-wider text-sm mb-4">Stay Updated</h4>
          <p class="text-gray-500 text-sm mb-4">Get notified about tournaments and events.</p>
          <a 
            href="https://discord.gg/HF7WAkJ4" 
            target="_blank"
            class="inline-flex items-center gap-2 px-4 py-2.5 bg-[#5865F2] text-white text-sm font-bold rounded-lg hover:bg-[#4752C4] transition-colors"
          >
            <UIcon name="i-simple-icons-discord" class="w-4 h-4" />
            Join Discord
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-gray-200">
      <div class="container mx-auto px-4 py-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex flex-wrap items-center gap-4 text-xs text-gray-400">
            <NuxtLink to="/about" class="hover:text-[#00152E] transition-colors">About</NuxtLink>
            <NuxtLink to="/contact" class="hover:text-[#00152E] transition-colors">Contact</NuxtLink>
            <span class="hover:text-[#00152E] transition-colors cursor-pointer">Privacy Policy</span>
            <span class="hover:text-[#00152E] transition-colors cursor-pointer">Cookie Policy</span>
            <span class="hover:text-[#00152E] transition-colors cursor-pointer">Terms of Use</span>
          </div>
          <div class="text-xs text-gray-400">
            © {{ new Date().getFullYear() }} BTG - Bravo Trashe Gaming
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const partners = [
  { name: 'Discord', icon: 'i-simple-icons-discord', label: 'Community Platform' },
  { name: 'Twitch', icon: 'i-simple-icons-twitch', label: 'Streaming Partner' },
  { name: 'EA Sports', icon: 'i-heroicons-puzzle-piece', label: 'Official Games' },
  { name: 'PlayStation', icon: 'i-simple-icons-playstation', label: 'Console Partner' },
  { name: 'Xbox', icon: 'i-simple-icons-xbox', label: 'Console Partner' },
  { name: 'YouTube', icon: 'i-simple-icons-youtube', label: 'Video Platform' },
];

const socials = [
  { name: 'Discord', icon: 'i-simple-icons-discord', url: 'https://discord.gg/HF7WAkJ4' },
  { name: 'Twitter', icon: 'i-simple-icons-twitter', url: 'https://x.com/BTGOnline' },
  { name: 'Twitch', icon: 'i-simple-icons-twitch', url: 'https://twitch.tv/acekydtv' },
  { name: 'YouTube', icon: 'i-simple-icons-youtube', url: 'https://youtube.com/@btgofficial' },
  { name: 'Instagram', icon: 'i-simple-icons-instagram', url: 'https://instagram.com/bravotrashe' },
];

const exploreLinks = [
  { name: 'Home', path: '/' },
  { name: 'About BTG', path: '/about' },
  { name: 'Teams', path: '/teams' },
  { name: 'Stream Team', path: '/streams' },
  { name: 'Tournaments', path: '/tournament' },
  { name: 'News', path: '/news' },
  { name: 'Shop', path: '/shop' },
];

const communityLinks = [
  { name: 'Discord Server', icon: 'i-simple-icons-discord', url: 'https://discord.gg/HF7WAkJ4' },
  { name: 'Twitter/X', icon: 'i-simple-icons-twitter', url: 'https://x.com/BTGOnline' },
  { name: 'Twitch Channel', icon: 'i-simple-icons-twitch', url: 'https://twitch.tv/acekydtv' },
  { name: 'YouTube', icon: 'i-simple-icons-youtube', url: 'https://youtube.com/@btgofficial' },
];
</script>