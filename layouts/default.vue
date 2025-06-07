<template>
  <div class="min-h-screen">
    <HeaderSection />
    <main>
      <slot />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import FooterSection from '~/components/FooterSection.vue';
import HeaderSection from '~/components/HeaderSection.vue';

// The layout will automatically use the HeaderSection component
// since it's in the components directory
</script> 