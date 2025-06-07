<template>
  <header
    :class="[
      'sticky top-0 z-50 transition-all duration-300',
      isScrolled 
        ? 'bg-white/90 dark:bg-[#211C12]/90 backdrop-blur-lg shadow-lg border-b border-amber-200/30 dark:border-amber-800/30' 
        : 'bg-transparent'
    ]">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      <!-- Logo Section -->
      <div class="flex items-center gap-3">
        <div class="relative group">
          <div class="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          <div class="relative rounded-xl shadow-lg">
            <NuxtImg src="/btg.jpg" alt="BTG Logo" class="w-10 h-10" />
          </div>
        </div>
        <!-- <div class="flex flex-col">
          <span class="font-black text-2xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            BTG
          </span>
        </div> -->
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden lg:flex items-center gap-8">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.name"
          :to="item.path" 
          :class="[
            'relative px-4 py-2 font-semibold text-sm uppercase tracking-wide transition-all duration-300 group',
            'text-slate-700 dark:text-[#FAF8F6] hover:text-amber-600 dark:hover:text-amber-400'
          ]"
        >
          {{ item.name }}
          <div class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 group-hover:w-full transition-all duration-300"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </NuxtLink>
      </nav>

      <!-- Right Section -->
      <div class="flex items-center gap-4">
        <!-- Social Links -->
        <div class="hidden md:flex items-center gap-2">
          <a 
            href="https://twitter.com/" 
            target="_blank" 
            rel="noopener" 
            aria-label="Twitter"
            class="group relative p-2.5 rounded-full bg-white/60 dark:bg-[#211C12]/60 backdrop-blur-lg border border-white/30 dark:border-amber-800/30 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white hover:border-transparent transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5 shadow-lg"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 relative z-10">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M22 4.01c-.77.35-1.6.59-2.47.7a4.15 4.15 0 0 0 1.82-2.3 8.27 8.27 0 0 1-2.62 1A4.13 4.13 0 0 0 12 8.13c0 .32.04.64.1.94C8.28 8.9 5.1 7.13 2.98 4.7c-.35.6-.55 1.3-.55 2.05 0 1.42.72 2.67 1.82 3.4a4.1 4.1 0 0 1-1.87-.52v.05c0 1.98 1.41 3.63 3.28 4a4.2 4.2 0 0 1-1.86.07c.52 1.62 2.04 2.8 3.84 2.83A8.3 8.3 0 0 1 2 19.54a11.7 11.7 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22 4.01z" />
            </svg>
          </a>
          
          <a 
            href="https://instagram.com/" 
            target="_blank" 
            rel="noopener" 
            aria-label="Instagram"
            class="group relative p-2.5 rounded-full bg-white/60 dark:bg-[#211C12]/60 backdrop-blur-lg border border-white/30 dark:border-amber-800/30 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white hover:border-transparent transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5 shadow-lg"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 relative z-10">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>

        <!-- Color Mode Toggle -->
        <div class="relative">
          <ColorModeToggle />
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="lg:hidden group relative p-2.5 rounded-full bg-white/60 dark:bg-[#211C12]/60 backdrop-blur-lg border border-white/30 dark:border-amber-800/30 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white hover:border-transparent transition-all duration-300 transform hover:scale-110 shadow-lg"
          aria-label="Toggle mobile menu"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <svg class="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              v-if="!mobileMenuOpen"
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

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 transform -translate-y-4"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform -translate-y-4"
    >
      <div 
        v-if="mobileMenuOpen" 
        class="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-[#211C12]/95 backdrop-blur-xl border-b border-amber-200/30 dark:border-amber-800/30 shadow-2xl"
      >
        <nav class="max-w-7xl mx-auto px-6 py-6">
          <div class="flex flex-col gap-4">
            <NuxtLink 
              v-for="item in navItems" 
              :key="item.name"
              :to="item.path"
              @click="mobileMenuOpen = false"
              class="group relative px-4 py-3 font-semibold text-lg text-slate-700 dark:text-[#FAF8F6] hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 dark:hover:from-amber-900/20 dark:hover:to-orange-900/20"
            >
              <div class="flex items-center justify-between">
                {{ item.name }}
                <svg class="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>
            </NuxtLink>
          </div>
          
          <!-- Mobile Social Links -->
          <div class="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-amber-200/30 dark:border-amber-800/30">
            <a 
              href="https://twitter.com/" 
              target="_blank" 
              rel="noopener" 
              aria-label="Twitter"
              class="p-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M22 4.01c-.77.35-1.6.59-2.47.7a4.15 4.15 0 0 0 1.82-2.3 8.27 8.27 0 0 1-2.62 1A4.13 4.13 0 0 0 12 8.13c0 .32.04.64.1.94C8.28 8.9 5.1 7.13 2.98 4.7c-.35.6-.55 1.3-.55 2.05 0 1.42.72 2.67 1.82 3.4a4.1 4.1 0 0 1-1.87-.52v.05c0 1.98 1.41 3.63 3.28 4a4.2 4.2 0 0 1-1.86.07c.52 1.62 2.04 2.8 3.84 2.83A8.3 8.3 0 0 1 2 19.54a11.7 11.7 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22 4.01z" />
              </svg>
            </a>
            
            <a 
              href="https://instagram.com/" 
              target="_blank" 
              rel="noopener" 
              aria-label="Instagram"
              class="p-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import ColorModeToggle from "@/components/ColorModeToggle.vue";
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);
const mobileMenuOpen = ref(false);

const navItems = [
  { name: 'Home', path: '/' },
  // { name: 'About', path: '/about' },
  { name: 'Teams', path: '/teams' },
  { name: 'Schedule', path: '/schedule' },
  { name: 'News', path: '/news' },
  // { name: 'Contact', path: '/contact' }
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

// Close mobile menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const header = document.querySelector('header');
  if (header && !header.contains(event.target as Node)) {
    mobileMenuOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
  handleScroll(); // Check initial scroll position
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
});

// Close mobile menu on route change
watch(() => mobileMenuOpen.value, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>

<style scoped>
/* Ensure smooth transitions */
* {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* Add subtle animation to navigation items */
nav a {
  position: relative;
  overflow: hidden;
}

/* Mobile menu backdrop blur support */
@supports (backdrop-filter: blur(12px)) {
  .backdrop-blur-xl {
    backdrop-filter: blur(12px);
  }
  
  .backdrop-blur-lg {
    backdrop-filter: blur(8px);
  }
}
</style>