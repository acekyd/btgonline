<template>
  <section class="relative rounded-xl overflow-hidden h-72 md:h-96 flex items-center justify-center">
    <img src="/stadium.jpg" alt="Stadium" class="absolute inset-0 w-full h-full object-cover opacity-80 dark:opacity-60" />
    <div class="relative z-10 flex flex-col items-center justify-center h-full w-full text-center px-4">
      <h1 class="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-2">
        Bravo Trashe Gaming Tournament
      </h1>
      <p class="text-lg md:text-xl text-white mb-6 drop-shadow">
        Experience the thrill of competitive football in our premier tournament. Register your team for glory!
      </p>
      <NuxtLink to="/register" class="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded shadow transition-colors">
        Register Now
      </NuxtLink>
    </div>
    <div class="absolute inset-0 bg-black/40 dark:bg-black/60" />
  </section>
</template>

<script setup lang="ts">
// No script logic needed for this static hero section
</script> 