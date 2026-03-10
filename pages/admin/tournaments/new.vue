<template>
  <div class="max-w-4xl">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-2">
      <NuxtLink to="/admin/tournaments" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <h1 class="text-xl font-black text-[#001D3D] dark:text-white">New Tournament</h1>
    </div>

    <p class="text-xs text-gray-400 dark:text-gray-500 mb-6">
      Fields marked <span class="text-[#E30613] font-bold">*</span> are required.
    </p>

    <!-- Success / Error banners -->
    <div v-if="successMessage" class="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 mb-6">
      <Icon name="lucide:check-circle-2" class="w-5 h-5 flex-shrink-0" />
      <span class="text-sm font-medium">{{ successMessage }}</span>
    </div>
    <div v-if="errorMessage" class="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 mb-6">
      <Icon name="lucide:alert-circle" class="w-5 h-5 flex-shrink-0" />
      <span class="text-sm font-medium">{{ errorMessage }}</span>
    </div>

    <form @submit.prevent="handleSubmit">
      <!-- Game Details -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Game Details</h2>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Name -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Name <span class="text-[#E30613]">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="e.g. BTG Premier League"
              :class="[
                'w-full px-4 py-2.5 text-sm rounded-lg border transition-colors bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-400',
                errors.name
                  ? 'border-red-400 bg-red-50 dark:bg-red-900/10 focus:ring-red-400 focus:border-red-400 focus:outline-none'
                  : 'border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none'
              ]"
            />
            <p v-if="errors.name" class="text-xs text-red-500 flex items-center gap-1">
              <Icon name="lucide:alert-circle" class="w-3.5 h-3.5 flex-shrink-0" />
              {{ errors.name }}
            </p>
          </div>

          <!-- Game Title -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Game Title <span class="text-[#E30613]">*</span>
            </label>
            <input
              v-model="form.game_title"
              type="text"
              placeholder="e.g. EA FC 25"
              :class="[
                'w-full px-4 py-2.5 text-sm rounded-lg border transition-colors bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-400',
                errors.game_title
                  ? 'border-red-400 bg-red-50 dark:bg-red-900/10 focus:ring-red-400 focus:border-red-400 focus:outline-none'
                  : 'border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none'
              ]"
            />
            <p v-if="errors.game_title" class="text-xs text-red-500 flex items-center gap-1">
              <Icon name="lucide:alert-circle" class="w-3.5 h-3.5 flex-shrink-0" />
              {{ errors.game_title }}
            </p>
          </div>

          <!-- Format Type -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Format Type</label>
            <input
              v-model="form.format_type"
              type="text"
              placeholder="e.g. Round Robin + Knockout"
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none transition-colors"
            />
            <p class="text-xs text-gray-400">e.g. Round Robin, Single Elimination, League</p>
          </div>
        </div>
      </div>

      <!-- Settings -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Settings</h2>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Stats Mode -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Stats Mode</label>
            <select
              v-model="form.stats_mode"
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none transition-colors"
            >
              <option value="none">None</option>
              <option value="football_seasonal">Football Seasonal</option>
            </select>
            <p class="text-xs text-gray-400">Choose "Football Seasonal" to enable standings, top scorers, and assist leaders for seasons.</p>
          </div>

          <!-- Status -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Status</label>
            <select
              v-model="form.status"
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none transition-colors"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="offseason">Offseason</option>
            </select>
            <p class="text-xs text-gray-400">Active tournaments appear on the public homepage.</p>
          </div>

          <!-- Is Active Toggle -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Active</label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <div class="relative">
                <input type="checkbox" v-model="form.is_active" class="sr-only peer" />
                <div class="w-10 h-6 bg-gray-200 dark:bg-gray-700 peer-checked:bg-[#E30613] rounded-full transition-colors peer-focus:ring-2 peer-focus:ring-[#E30613]/30"></div>
                <div class="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4"></div>
              </div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Tournament is active</span>
            </label>
          </div>

          <!-- Sort Order -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Sort Order</label>
            <input
              v-model.number="form.sort_order"
              type="number"
              placeholder="0"
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none transition-colors"
            />
            <p class="text-xs text-gray-400">Lower numbers appear first. Default is 0.</p>
          </div>
        </div>
      </div>

      <!-- External Link -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">External Link</h2>
        </div>
        <div class="p-6">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">External URL</label>
            <input
              v-model="form.external_url"
              type="text"
              placeholder="https://..."
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none transition-colors"
            />
            <p class="text-xs text-gray-400">Optional link to myproclubs.com or similar.</p>
          </div>
        </div>
      </div>

      <!-- Media -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Media</h2>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Logo -->
          <div class="flex flex-col gap-3">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Logo</label>
            <div class="flex items-start gap-4">
              <div v-if="form.logo_url" class="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 flex-shrink-0 bg-gray-50 dark:bg-gray-700">
                <img :src="form.logo_url" alt="Logo" class="w-full h-full object-contain" />
              </div>
              <div v-else class="w-20 h-20 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                <Icon name="lucide:image" class="w-7 h-7 text-gray-400" />
              </div>
              <div class="flex flex-col gap-2">
                <input ref="logoInput" type="file" accept="image/*" class="hidden" @change="(e) => handleUpload(e, 'logo_url')" />
                <AppButton variant="outline" size="sm" type="button" :loading="uploading.logo" @click="logoInput?.click()">
                  <Icon name="lucide:upload" class="w-4 h-4" />
                  Upload Logo
                </AppButton>
                <p v-if="uploadErrors.logo" class="text-xs text-red-500 flex items-center gap-1">
                  <Icon name="lucide:alert-circle" class="w-3.5 h-3.5 flex-shrink-0" />
                  {{ uploadErrors.logo }}
                </p>
              </div>
            </div>
          </div>

          <!-- Banner -->
          <div class="flex flex-col gap-3">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Banner</label>
            <div class="flex items-start gap-4">
              <div v-if="form.banner_url" class="w-28 h-20 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 flex-shrink-0">
                <img :src="form.banner_url" alt="Banner" class="w-full h-full object-cover" />
              </div>
              <div v-else class="w-28 h-20 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                <Icon name="lucide:image" class="w-7 h-7 text-gray-400" />
              </div>
              <div class="flex flex-col gap-2">
                <input ref="bannerInput" type="file" accept="image/*" class="hidden" @change="(e) => handleUpload(e, 'banner_url')" />
                <AppButton variant="outline" size="sm" type="button" :loading="uploading.banner" @click="bannerInput?.click()">
                  <Icon name="lucide:upload" class="w-4 h-4" />
                  Upload Banner
                </AppButton>
                <p v-if="uploadErrors.banner" class="text-xs text-red-500 flex items-center gap-1">
                  <Icon name="lucide:alert-circle" class="w-3.5 h-3.5 flex-shrink-0" />
                  {{ uploadErrors.banner }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</h2>
        </div>
        <div class="p-6">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              v-model="form.description"
              rows="4"
              placeholder="Tournament description..."
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      <!-- Bottom Action Bar -->
      <div class="flex items-center justify-between pt-4 mt-2 border-t border-gray-100 dark:border-gray-700">
        <NuxtLink to="/admin/tournaments">
          <AppButton variant="ghost" size="md" type="button">Cancel</AppButton>
        </NuxtLink>
        <AppButton type="submit" variant="primary" size="md" :loading="submitting">
          <Icon name="lucide:plus" class="w-4 h-4" />
          Create Tournament
        </AppButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const form = reactive({
  name: '',
  game_title: '',
  description: '',
  format_type: '',
  stats_mode: 'none',
  status: 'active',
  is_active: true,
  sort_order: 0,
  external_url: '',
  logo_url: '',
  banner_url: '',
})

const errors = reactive<Record<string, string>>({})
const submitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const logoInput = ref<HTMLInputElement | null>(null)
const bannerInput = ref<HTMLInputElement | null>(null)
const uploading = reactive({ logo: false, banner: false })
const uploadErrors = reactive({ logo: '', banner: '' })

const validate = () => {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (!form.name.trim()) errors.name = 'Name is required.'
  if (!form.game_title.trim()) errors.game_title = 'Game title is required.'
  return Object.keys(errors).length === 0
}

const handleUpload = async (e: Event, field: 'logo_url' | 'banner_url') => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const key = field === 'logo_url' ? 'logo' : 'banner'
  uploading[key] = true
  uploadErrors[key] = ''
  try {
    const fd = new FormData()
    fd.append('file', file)
    const res = await $fetch<{ url: string }>('/api/admin/upload', { method: 'POST', body: fd })
    form[field] = res.url
  } catch {
    uploadErrors[key] = 'Upload failed. Please try again.'
  } finally {
    uploading[key] = false
  }
}

const handleSubmit = async () => {
  if (!validate()) return
  submitting.value = true
  successMessage.value = ''
  errorMessage.value = ''
  try {
    await $fetch('/api/admin/tournaments', { method: 'POST', body: form })
    await navigateTo('/admin/tournaments')
  } catch (err: any) {
    errorMessage.value = err?.data?.message ?? 'Failed to create tournament.'
  } finally {
    submitting.value = false
  }
}
</script>
