<template>
  <section class="my-8">
    <h2 class="text-xl font-bold mb-2">Contact Us</h2>
    <p class="mb-4 text-gray-700 dark:text-gray-200">
      For inquiries, sponsorship opportunities, or any other information, please reach out to us. Follow us on Twitter for the latest updates and news.
    </p>
    <div class="flex flex-col md:flex-row gap-2">
      <NuxtLink to="/contact" class="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded shadow text-center transition-colors">Contact</NuxtLink>
      <a href="https://twitter.com/" target="_blank" rel="noopener" class="flex-1 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-black dark:text-white font-semibold py-2 rounded shadow text-center transition-colors">Follow us on Twitter</a>
    </div>
  </section>
</template>

<script setup lang="ts">
// No script logic needed for this static contact section
</script> 