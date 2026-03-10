<script setup lang="ts">
definePageMeta({ layout: false })

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  if (!email.value || !password.value) {
    error.value = 'Email and password are required'
    return
  }
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })
    await navigateTo('/admin')
  } catch (err: any) {
    error.value = err?.data?.message || 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#001D3D] flex items-center justify-center p-4">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#E30613] opacity-5" />
      <div class="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#FFC107] opacity-5" />
    </div>

    <div class="relative w-full max-w-md">
      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-2xl p-8">
        <!-- Logo -->
        <div class="text-center mb-8">
          <img
            src="/logo-black.png"
            alt="BTG"
            class="h-12 mx-auto mb-4"
          >
          <h1 class="text-2xl font-black text-[#001D3D] uppercase tracking-tight">
            BTG Admin
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Sign in to manage your platform
          </p>
        </div>

        <!-- Form -->
        <form
          class="space-y-5"
          @submit.prevent="handleLogin"
        >
          <!-- Email Field -->
          <div>
            <label
              for="email"
              class="block text-sm font-semibold text-gray-700 mb-1.5"
            >
              Email Address
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="admin@btgonline.gg"
              :disabled="loading"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E30613] focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
            >
          </div>

          <!-- Password Field -->
          <div>
            <label
              for="password"
              class="block text-sm font-semibold text-gray-700 mb-1.5"
            >
              Password
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="••••••••"
                :disabled="loading"
                class="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E30613] focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
              >
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                @click="showPassword = !showPassword"
              >
                <Icon
                  :name="showPassword ? 'mdi:eye-off' : 'mdi:eye'"
                  class="w-5 h-5"
                />
              </button>
            </div>
          </div>

          <!-- Error Message -->
          <p
            v-if="error"
            class="text-red-500 text-sm flex items-center gap-1.5"
          >
            <Icon
              name="mdi:alert-circle"
              class="w-4 h-4 flex-shrink-0"
            />
            {{ error }}
          </p>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="btn btn-primary w-full py-3 text-base rounded-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            <span
              v-if="loading"
              class="inline-flex items-center gap-2"
            >
              <svg
                class="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Signing in...
            </span>
            <span v-else>Sign In</span>
          </button>
        </form>

        <!-- Footer -->
        <p class="text-center text-xs text-gray-400 mt-6">
          BTG Online &copy; {{ new Date().getFullYear() }} &mdash; Restricted Access
        </p>
      </div>
    </div>
  </div>
</template>
