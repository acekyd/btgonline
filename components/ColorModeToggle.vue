<template>
  <UButton
    :icon="theme === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'"
    color="neutral"
    variant="ghost"
    aria-label="Toggle color mode"
    @click="theme = theme === 'dark' ? 'light' : 'dark'"
    class="ml-2"
  />
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

const { store: theme, system } = useColorMode({
    initialValue: 'light'
})


const myColorMode = computed(() => theme.value === 'auto' ? system.value : theme.value)

</script> 