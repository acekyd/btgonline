<template>
  <div class="max-w-4xl">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-2">
      <NuxtLink to="/admin/creators" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <h1 class="text-xl font-black text-[#001D3D] dark:text-white">New Creator</h1>
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
      <!-- Basic Info -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Basic Info</h2>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Display Name -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Display Name <span class="text-[#E30613]">*</span>
            </label>
            <input
              v-model="form.display_name"
              type="text"
              placeholder="e.g. BravoKing"
              :class="[
                'w-full px-4 py-2.5 text-sm rounded-lg border transition-colors bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-400',
                errors.display_name
                  ? 'border-red-400 bg-red-50 dark:bg-red-900/10 focus:ring-red-400 focus:border-red-400 focus:outline-none'
                  : 'border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none'
              ]"
            />
            <p v-if="errors.display_name" class="text-xs text-red-500 flex items-center gap-1">
              <Icon name="lucide:alert-circle" class="w-3.5 h-3.5 flex-shrink-0" />
              {{ errors.display_name }}
            </p>
          </div>

          <!-- Bio -->
          <div class="flex flex-col gap-1.5 md:col-span-2">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Bio</label>
            <textarea
              v-model="form.bio"
              rows="4"
              placeholder="Short bio or description..."
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none transition-colors resize-none"
            />
            <p class="text-xs text-gray-400">Brief description shown on the creators page.</p>
          </div>
        </div>
      </div>

      <!-- Settings -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Settings</h2>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Is Active Toggle -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Active</label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <div class="relative">
                <input type="checkbox" v-model="form.is_active" class="sr-only peer" />
                <div class="w-10 h-6 bg-gray-200 dark:bg-gray-700 peer-checked:bg-[#E30613] rounded-full transition-colors peer-focus:ring-2 peer-focus:ring-[#E30613]/30"></div>
                <div class="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4"></div>
              </div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Creator is active</span>
            </label>
          </div>

          <!-- Is Featured Toggle -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Featured</label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <div class="relative">
                <input type="checkbox" v-model="form.is_featured" class="sr-only peer" />
                <div class="w-10 h-6 bg-gray-200 dark:bg-gray-700 peer-checked:bg-[#E30613] rounded-full transition-colors peer-focus:ring-2 peer-focus:ring-[#E30613]/30"></div>
                <div class="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4"></div>
              </div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Show as featured creator</span>
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

      <!-- Avatar -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Avatar</h2>
        </div>
        <div class="p-6">
          <div class="flex items-start gap-5">
            <div class="flex-shrink-0">
              <div
                v-if="form.avatar_url"
                class="w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-600"
              >
                <img :src="form.avatar_url" alt="Avatar preview" class="w-full h-full object-cover" />
              </div>
              <div v-else class="w-24 h-24 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <Icon name="lucide:user" class="w-10 h-10 text-gray-400" />
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <input
                ref="avatarInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleAvatarUpload"
              />
              <AppButton
                variant="outline"
                size="sm"
                type="button"
                :loading="avatarUploading"
                @click="avatarInput?.click()"
              >
                <Icon name="lucide:upload" class="w-4 h-4" />
                {{ form.avatar_url ? 'Change Avatar' : 'Upload Avatar' }}
              </AppButton>
              <p v-if="avatarError" class="text-xs text-red-500 flex items-center gap-1">
                <Icon name="lucide:alert-circle" class="w-3.5 h-3.5 flex-shrink-0" />
                {{ avatarError }}
              </p>
              <p class="text-xs text-gray-400">JPG, PNG or WebP. Max 5MB.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Links & Social -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Links & Social</h2>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Primary Stream URL</label>
            <input
              v-model="form.stream_url"
              type="text"
              placeholder="https://..."
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none transition-colors"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Twitch URL</label>
            <input
              v-model="form.twitch_url"
              type="text"
              placeholder="https://twitch.tv/..."
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none transition-colors"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">YouTube URL</label>
            <input
              v-model="form.youtube_url"
              type="text"
              placeholder="https://youtube.com/..."
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none transition-colors"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">TikTok URL</label>
            <input
              v-model="form.tiktok_url"
              type="text"
              placeholder="https://tiktok.com/..."
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none transition-colors"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Instagram URL</label>
            <input
              v-model="form.instagram_url"
              type="text"
              placeholder="https://instagram.com/..."
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none transition-colors"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Twitter URL</label>
            <input
              v-model="form.twitter_url"
              type="text"
              placeholder="https://twitter.com/..."
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      <!-- Bottom Action Bar -->
      <div class="flex items-center justify-between pt-4 mt-2 border-t border-gray-100 dark:border-gray-700">
        <NuxtLink to="/admin/creators">
          <AppButton variant="ghost" size="md" type="button">Cancel</AppButton>
        </NuxtLink>
        <AppButton type="submit" variant="primary" size="md" :loading="submitting">
          <Icon name="lucide:plus" class="w-4 h-4" />
          Create Creator
        </AppButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const form = reactive({
  display_name: '',
  bio: '',
  is_featured: false,
  is_active: true,
  sort_order: 0,
  stream_url: '',
  twitch_url: '',
  youtube_url: '',
  tiktok_url: '',
  instagram_url: '',
  twitter_url: '',
  avatar_url: '',
})

const errors = reactive<Record<string, string>>({})
const submitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const avatarInput = ref<HTMLInputElement | null>(null)
const avatarUploading = ref(false)
const avatarError = ref('')

const validate = (): boolean => {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (!form.display_name.trim()) errors.display_name = 'Display name is required.'
  return Object.keys(errors).length === 0
}

const handleAvatarUpload = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  avatarUploading.value = true
  avatarError.value = ''
  try {
    const fd = new FormData()
    fd.append('file', file)
    const res = await $fetch<{ url: string }>('/api/admin/upload', { method: 'POST', body: fd })
    form.avatar_url = res.url
  } catch {
    avatarError.value = 'Upload failed. Please try again.'
  } finally {
    avatarUploading.value = false
  }
}

const handleSubmit = async () => {
  if (!validate()) return
  submitting.value = true
  successMessage.value = ''
  errorMessage.value = ''
  try {
    await $fetch('/api/admin/creators', { method: 'POST', body: form })
    successMessage.value = 'Creator created successfully!'
    setTimeout(() => navigateTo('/admin/creators'), 1000)
  } catch (err: any) {
    errorMessage.value = err?.data?.message ?? 'Failed to create creator. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>
