<template>
  <div class="min-h-screen flex bg-gray-100 dark:bg-gray-900">
    <!-- Sidebar overlay for mobile -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 z-20 bg-black/50 lg:hidden"
        @click="sidebarOpen = false"
      />
    </Transition>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed top-0 left-0 h-full z-30 flex flex-col w-60 transition-transform duration-200 border-r border-white/10',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
      style="background-color: #001D3D;"
    >
      <!-- Logo -->
      <div class="flex items-center gap-3 px-5 py-5 border-b border-white/10 flex-shrink-0">
        <div class="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
          <NuxtImg src="/logo-white.png" alt="BTG" class="w-7 h-7 object-contain" />
        </div>
        <div>
          <div class="text-base font-extrabold text-white leading-none">BTG</div>
          <div class="text-[9px] text-gray-400 uppercase tracking-[0.2em] leading-none mt-0.5">Admin</div>
        </div>
      </div>

      <!-- Nav Items -->
      <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :class="[
            'flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors relative',
            isActive(item.path)
              ? 'text-white bg-white/10 border-l-4 border-[#E30613] rounded-r-lg'
              : 'text-gray-300 hover:text-white hover:bg-white/5 border-l-4 border-transparent rounded-r-lg'
          ]"
          @click="sidebarOpen = false"
        >
          <Icon :name="item.icon" class="w-5 h-5 flex-shrink-0" />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <!-- Logout at bottom -->
      <div class="flex-shrink-0 px-3 py-4 border-t border-white/10">
        <button
          class="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-colors"
          @click="handleLogout"
        >
          <Icon name="lucide:log-out" class="w-5 h-5 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main content area -->
    <div class="flex-1 flex flex-col min-w-0 lg:ml-60">
      <!-- Top bar -->
      <header class="sticky top-0 z-10 flex items-center gap-4 px-4 md:px-6 h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <!-- Hamburger (mobile) -->
        <button
          class="lg:hidden p-1.5 rounded text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle sidebar"
          @click="sidebarOpen = !sidebarOpen"
        >
          <Icon name="lucide:menu" class="w-5 h-5" />
        </button>

        <!-- Page title -->
        <h1 class="text-base font-semibold text-gray-800 dark:text-gray-100 flex-1">
          {{ currentPageTitle }}
        </h1>

        <!-- Logout button (top bar) -->
        <button
          class="hidden md:inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          @click="handleLogout"
        >
          <Icon name="lucide:log-out" class="w-4 h-4" />
          <span>Logout</span>
        </button>
      </header>

      <!-- Scrollable content -->
      <main class="flex-1 overflow-y-auto p-4 md:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const sidebarOpen = ref(false)

interface NavItem {
  label: string
  path: string
  icon: string
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/admin', icon: 'lucide:layout-dashboard' },
  { label: 'Creators', path: '/admin/creators', icon: 'lucide:users' },
  { label: 'Tournaments', path: '/admin/tournaments', icon: 'lucide:trophy' },
  { label: 'Seasons', path: '/admin/seasons', icon: 'lucide:calendar' },
  { label: 'Players', path: '/admin/players', icon: 'lucide:user' },
  { label: 'Teams', path: '/admin/teams', icon: 'lucide:shield' },
  { label: 'Imports', path: '/admin/imports', icon: 'lucide:upload' },
]

const isActive = (path: string): boolean => {
  if (path === '/admin') return route.path === '/admin'
  return route.path.startsWith(path)
}

const currentPageTitle = computed(() => {
  const match = navItems.find((item) => isActive(item.path))
  return match ? match.label : 'Admin'
})

const handleLogout = async () => {
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
  } catch {
    // ignore errors — navigate regardless
  }
  await router.push('/admin/login')
}
</script>
