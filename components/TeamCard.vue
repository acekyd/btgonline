<template>
  <NuxtLink :to="team.url" external target="_blank">
    <div
      @click="navigateTo(team.url)"
    class="rounded-xl cursor-pointer shadow-md p-6 flex flex-col items-center bg-gradient-to-br from-neutral-800 to-neutral-900 dark:from-white dark:to-neutral-100 transition-colors duration-300 h-full"
  >
    <img
      :src="team.logo"
      :alt="team.name + ' logo'"
      class="w-full h-48 object-cover rounded-lg mb-4 bg-neutral-700 dark:bg-neutral-200"
    />
    <h3 class="text-lg font-bold text-white dark:text-neutral-900 mb-2 text-center">{{ team.name }}</h3>
    <p class="text-sm text-neutral-300 dark:text-neutral-700 text-center">{{ team.description }}</p>
  </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ team: { name: string; description: string; logo: string; url: string } }>()
</script> 