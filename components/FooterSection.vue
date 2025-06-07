<template>
  <footer class="mt-12 py-6 border-t border-neutral-200 dark:border-neutral-700 text-center">
    <nav class="flex justify-center gap-8 mb-2 text-sm text-neutral-500 dark:text-neutral-400">
      <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
      <NuxtLink to="/about" class="hover:underline">About</NuxtLink>
      <NuxtLink to="/teams" class="hover:underline">Teams</NuxtLink>
      <NuxtLink to="/schedule" class="hover:underline">Schedule</NuxtLink>
      <NuxtLink to="/contact" class="hover:underline">Contact</NuxtLink>
    </nav>
    <div class="flex justify-center mb-2">
      <a href="https://twitter.com/" target="_blank" rel="noopener" aria-label="Twitter" class="text-neutral-400 hover:text-amber-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 4.01c-.77.35-1.6.59-2.47.7a4.15 4.15 0 0 0 1.82-2.3 8.27 8.27 0 0 1-2.62 1A4.13 4.13 0 0 0 12 8.13c0 .32.04.64.1.94C8.28 8.9 5.1 7.13 2.98 4.7c-.35.6-.55 1.3-.55 2.05 0 1.42.72 2.67 1.82 3.4a4.1 4.1 0 0 1-1.87-.52v.05c0 1.98 1.41 3.63 3.28 4a4.2 4.2 0 0 1-1.86.07c.52 1.62 2.04 2.8 3.84 2.83A8.3 8.3 0 0 1 2 19.54a11.7 11.7 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22 4.01z" />
        </svg>
      </a>
    </div>
    <div class="text-xs text-neutral-400">@{{ new Date().getFullYear() }} Bravo Trashe Gaming. All rights reserved.</div>
  </footer>
</template>

<script setup lang="ts">

</script> 