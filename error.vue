<template>
  <div class="min-h-screen bg-[#001D3D] flex items-center justify-center px-4">
    <div class="text-center max-w-lg">
      <!-- Status code -->
      <div class="text-8xl md:text-9xl font-black text-[#FFC107] leading-none mb-4 tabular-nums">
        {{ error?.statusCode ?? 500 }}
      </div>

      <!-- Error heading -->
      <h1 class="text-2xl md:text-3xl font-black text-white uppercase tracking-wide mb-3">
        {{ errorHeading }}
      </h1>

      <!-- Message -->
      <p class="text-gray-400 text-base leading-relaxed mb-8">
        {{ errorMessage }}
      </p>

      <!-- Home button -->
      <button
        @click="handleGoHome"
        class="btn btn-white text-base px-8 py-3"
      >
        <Icon name="lucide:home" class="w-5 h-5" />
        Go Home
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

interface Props {
  error: NuxtError
}

const props = defineProps<Props>()

const errorHeading = computed(() => {
  if (props.error?.statusCode === 404) return 'Page Not Found'
  return 'Something Went Wrong'
})

const errorMessage = computed(() => {
  if (props.error?.statusCode === 404) {
    return "The page you're looking for doesn't exist or may have been moved."
  }
  if (props.error?.statusMessage) {
    return props.error.statusMessage
  }
  return 'An unexpected error occurred. Please try again or head back home.'
})

function handleGoHome() {
  clearError({ redirect: '/' })
}

useHead({
  title: `${props.error?.statusCode ?? 'Error'} — BTG Bravo Trashe Gaming`,
})
</script>
