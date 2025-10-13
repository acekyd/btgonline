<template>
  <header
    :class="[
      'sticky top-0 z-50 transition-all duration-300',
      isScrolled 
        ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-purple-500/30' 
        : 'bg-gray-900/80 backdrop-blur-md'
    ]">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      <!-- Logo Section -->
      <div class="flex items-center gap-3">
        <NuxtLink to="/" class="flex items-center gap-3">
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div class="relative rounded-xl shadow-lg overflow-hidden">
              <NuxtImg src="/logo-white.png" alt="BTG Logo" class="w-10 h-10" />
            </div>
          </div>
          <div class="hidden sm:block">
            <div class="text-xl font-black text-white">BTG</div>
            <div class="text-xs text-purple-400 font-medium -mt-1">Gaming</div>
          </div>
        </NuxtLink>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden lg:flex items-center gap-8">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.name"
          :to="item.path" 
          :class="[
            'relative px-4 py-2 font-semibold text-sm uppercase tracking-wide transition-all duration-300 group',
            'text-white hover:text-purple-300'
          ]"
        >
          {{ item.name }}
          <div class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </NuxtLink>
      </nav>

      <!-- Right Section -->
      <div class="flex items-center gap-4">
        <!-- Social Links -->
        <div class="hidden md:flex items-center gap-2">
          <a 
            href="#" 
            target="_blank" 
            rel="noopener" 
            aria-label="Discord"
            class="group relative p-2.5 rounded-full bg-gray-800/60 backdrop-blur-lg border border-purple-500/30 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white hover:border-transparent transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5 shadow-lg"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <UIcon name="i-simple-icons-discord" class="w-4 h-4 relative z-10 text-purple-400 group-hover:text-white" />
          </a>
          
          <a 
            href="#" 
            target="_blank" 
            rel="noopener" 
            aria-label="Twitter"
            class="group relative p-2.5 rounded-full bg-gray-800/60 backdrop-blur-lg border border-purple-500/30 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white hover:border-transparent transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5 shadow-lg"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <UIcon name="i-simple-icons-twitter" class="w-4 h-4 relative z-10 text-purple-400 group-hover:text-white" />
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="lg:hidden group relative p-2.5 rounded-full bg-gray-800/60 backdrop-blur-lg border border-purple-500/30 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white hover:border-transparent transition-all duration-300 transform hover:scale-110 shadow-lg"
          aria-label="Toggle mobile menu"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <svg class="w-5 h-5 relative z-10 text-purple-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        class="lg:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-b border-purple-500/30 shadow-2xl"
      >
        <nav class="max-w-7xl mx-auto px-6 py-6">
          <div class="flex flex-col gap-4">
            <NuxtLink 
              v-for="item in navItems" 
              :key="item.name"
              :to="item.path"
              @click="mobileMenuOpen = false"
              class="group relative px-4 py-3 font-semibold text-lg text-gray-300 hover:text-purple-400 transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10"
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
          <div class="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-purple-500/30">
            <a 
              href="#" 
              target="_blank" 
              rel="noopener" 
              aria-label="Discord"
              class="p-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            >
              <UIcon name="i-simple-icons-discord" class="w-5 h-5" />
            </a>
            
            <a 
              href="#" 
              target="_blank" 
              rel="noopener" 
              aria-label="Twitter"
              class="p-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            >
              <UIcon name="i-simple-icons-twitter" class="w-5 h-5" />
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
  { name: 'About', path: '/about' },
  { name: 'Stream Team', path: '/teams' },
  { name: 'Shop', path: '/shop' },
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