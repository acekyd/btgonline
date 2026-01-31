<template>
  <header class="w-full sticky top-0 z-50">
    <!-- Top Bar - Teams & Social -->
    <div class="bg-[#00152E] border-b border-white/10">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-10">
          <!-- Left: Team badges -->
          <div class="hidden md:flex items-center gap-3">
            <span class="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Teams</span>
            <div class="flex items-center gap-1.5">
              <NuxtLink 
                v-for="team in teams" 
                :key="team.id"
                to="/teams" 
                class="w-6 h-6 rounded flex items-center justify-center text-[9px] font-bold text-white transition-transform hover:scale-110"
                :style="{ background: team.color }"
                :title="team.name"
              >
                {{ team.abbr }}
              </NuxtLink>
            </div>
          </div>
          
          <!-- Right: Social links + Store -->
          <div class="flex items-center gap-4 ml-auto">
            <div class="flex items-center gap-3">
              <a 
                v-for="social in socials"
                :key="social.name"
                :href="social.url" 
                target="_blank" 
                rel="noopener"
                class="text-gray-400 hover:text-white transition-colors"
                :aria-label="social.name"
              >
                <UIcon :name="social.icon" class="w-3.5 h-3.5" />
              </a>
            </div>
            <div class="w-px h-4 bg-white/20"></div>
            <NuxtLink 
              to="/shop" 
              class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#E30613] text-white text-[10px] font-bold uppercase tracking-wider rounded hover:bg-[#FF1F2D] transition-colors"
            >
              BTG Store
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Navigation -->
    <nav 
      :class="[
        'transition-shadow duration-200',
        isScrolled ? 'shadow-lg' : ''
      ]"
      class="bg-[#001D3D]"
    >
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-14">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2.5 group">
            <div class="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
              <NuxtImg src="/logo-white.png" alt="BTG" class="w-7 h-7 object-contain" />
            </div>
            <div class="hidden sm:block">
              <div class="text-lg font-extrabold text-white leading-none">BTG</div>
              <div class="text-[9px] text-gray-400 uppercase tracking-[0.2em] leading-none mt-0.5">Gaming</div>
            </div>
          </NuxtLink>

          <!-- Desktop Nav -->
          <div class="hidden lg:flex items-center gap-0.5">
            <NuxtLink 
              v-for="item in navItems" 
              :key="item.name"
              :to="item.path"
              :class="[
                'relative px-4 py-2 text-[13px] font-semibold uppercase tracking-wide transition-colors',
                isActive(item.path) 
                  ? 'text-white' 
                  : 'text-gray-300 hover:text-white'
              ]"
            >
              {{ item.name }}
              <span 
                v-if="isActive(item.path)"
                class="absolute bottom-0 left-4 right-4 h-0.5 bg-[#E30613] rounded-full"
              ></span>
            </NuxtLink>
          </div>

          <!-- Right Actions -->
          <div class="flex items-center gap-3">
            <!-- Live Badge -->
            <div v-if="isLive" class="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-red-600/20 border border-red-500/40 rounded">
              <span class="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
              <span class="text-[10px] font-bold text-red-400 uppercase">Live</span>
            </div>

            <!-- Discord Button -->
            <a 
              href="https://discord.gg/HF7WAkJ4" 
              target="_blank"
              class="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#5865F2] text-white text-xs font-bold rounded hover:bg-[#4752C4] transition-colors"
            >
              <UIcon name="i-simple-icons-discord" class="w-3.5 h-3.5" />
              <span>Join</span>
            </a>

            <!-- Mobile Menu Toggle -->
            <button
              @click="menuOpen = !menuOpen"
              class="lg:hidden p-2 text-white hover:bg-white/10 rounded transition-colors"
              aria-label="Menu"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  v-if="!menuOpen"
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path 
                  v-else
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Quick Access Bar -->
    <div class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4">
        <div class="flex items-center gap-0 overflow-x-auto">
          <NuxtLink 
            v-for="item in quickLinks" 
            :key="item.name"
            :to="item.path"
            class="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 hover:text-[#00152E] hover:bg-gray-50 border-b-2 border-transparent hover:border-[#E30613] whitespace-nowrap transition-all"
          >
            <UIcon :name="item.icon" class="w-4 h-4" />
            <span>{{ item.name }}</span>
          </NuxtLink>
          
          <div class="ml-auto hidden md:flex items-center py-3">
            <NuxtLink to="/streams" class="text-sm font-semibold text-[#E30613] hover:underline">
              Watch LIVE →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div 
        v-if="menuOpen" 
        class="lg:hidden absolute left-0 right-0 top-full bg-[#001D3D] border-b border-white/10 shadow-xl"
      >
        <div class="container mx-auto px-4 py-4">
          <div class="space-y-1">
            <NuxtLink 
              v-for="item in [...navItems, ...quickLinks]" 
              :key="item.name"
              :to="item.path"
              @click="menuOpen = false"
              class="flex items-center gap-3 px-3 py-2.5 text-gray-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <UIcon v-if="item.icon" :name="item.icon" class="w-4 h-4 text-gray-400" />
              <span class="font-medium">{{ item.name }}</span>
            </NuxtLink>
          </div>
          
          <div class="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-2">
            <a 
              href="https://discord.gg/HF7WAkJ4" 
              target="_blank"
              class="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#5865F2] text-white text-sm font-bold rounded-lg"
            >
              <UIcon name="i-simple-icons-discord" class="w-4 h-4" />
              Discord
            </a>
            <NuxtLink 
              to="/shop"
              @click="menuOpen = false"
              class="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#E30613] text-white text-sm font-bold rounded-lg"
            >
              <UIcon name="i-heroicons-shopping-bag" class="w-4 h-4" />
              Store
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isScrolled = ref(false);
const menuOpen = ref(false);
const isLive = ref(true);

const teams = [
  { id: 'elite', name: 'BTG Elite', abbr: 'ELT', color: '#6D28D9' },
  { id: 'rise', name: 'BTG Rise', abbr: 'RSE', color: '#0EA5E9' },
  { id: 'icons', name: 'BTG Icons', abbr: 'ICN', color: '#22C55E' },
];

const socials = [
  { name: 'Discord', icon: 'i-simple-icons-discord', url: 'https://discord.gg/HF7WAkJ4' },
  { name: 'Twitter', icon: 'i-simple-icons-twitter', url: 'https://x.com/BTGOnline' },
  { name: 'Twitch', icon: 'i-simple-icons-twitch', url: 'https://twitch.tv/acekydtv' },
  { name: 'YouTube', icon: 'i-simple-icons-youtube', url: 'https://youtube.com/@btgofficial' },
];

interface NavItem {
  name: string;
  path: string;
  icon?: string;
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Teams', path: '/teams' },
  { name: 'Streams', path: '/streams' },
  { name: 'Tournaments', path: '/tournament' },
  { name: 'News', path: '/news' },
];

const quickLinks: NavItem[] = [
  { name: 'Schedule', path: '/streams', icon: 'i-heroicons-calendar' },
  { name: 'Standings', path: '/tournament', icon: 'i-heroicons-chart-bar' },
  { name: 'Shop', path: '/shop', icon: 'i-heroicons-shopping-bag' },
  { name: 'Contact', path: '/contact', icon: 'i-heroicons-envelope' },
];

const isActive = (path: string) => {
  if (path === '/') return route.path === '/';
  return route.path.startsWith(path);
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
.overflow-x-auto {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>