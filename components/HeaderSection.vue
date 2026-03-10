<template>
  <header
    :class="[
      'w-full sticky top-0 z-50 transition-shadow duration-200',
      isScrolled ? 'shadow-lg' : ''
    ]"
  >
    <!-- Main Navigation -->
    <nav class="bg-[#001D3D] backdrop-blur-md">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2.5 group flex-shrink-0">
            <div class="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
              <NuxtImg
                src="/logo-white.png"
                alt="BTG"
                class="w-7 h-7 object-contain"
              />
            </div>
            <div class="hidden sm:block">
              <div class="text-lg font-extrabold text-white leading-none">BTG</div>
              <div class="text-[9px] text-gray-400 uppercase tracking-[0.2em] leading-none mt-0.5">
                Bravo Trashe Gaming
              </div>
            </div>
          </NuxtLink>

          <!-- Desktop Nav -->
          <div class="hidden lg:flex items-center gap-0.5">
            <NuxtLink
              v-for="item in navItems"
              :key="item.path"
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
              />
            </NuxtLink>
          </div>

          <!-- Right Actions -->
          <div class="flex items-center gap-2">
            <ColorModeToggle />

            <!-- Mobile Menu Toggle -->
            <button
              @click="menuOpen = !menuOpen"
              class="lg:hidden p-2 text-white hover:bg-white/10 rounded transition-colors"
              aria-label="Toggle menu"
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
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              :class="[
                'flex items-center px-3 py-2.5 rounded-lg font-medium transition-colors text-sm',
                isActive(item.path)
                  ? 'text-white bg-white/10 border-l-2 border-[#E30613]'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              ]"
              @click="menuOpen = false"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const isScrolled = ref(false)
const menuOpen = ref(false)

interface NavItem {
  name: string
  path: string
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Creators', path: '/creators' },
  { name: 'Tournaments', path: '/tournaments' },
  { name: 'Hall of Fame', path: '/hall-of-fame' },
  { name: 'Records', path: '/records' },
]

const isActive = (path: string): boolean => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
header {
  position: sticky;
}
</style>
