<template>
  <div class="max-w-4xl">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <NuxtLink to="/admin/creators" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <h1 class="text-xl font-black text-[#001D3D] dark:text-white">New Creator</h1>
    </div>

    <!-- Success / Error banners -->
    <div v-if="successMessage" class="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
      {{ errorMessage }}
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 mb-6">
        <h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Basic Info</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Display Name -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Display Name <span class="text-[#E30613]">*</span>
            </label>
            <input
              v-model="form.display_name"
              type="text"
              class="input-field"
              :class="{ 'border-red-400': errors.display_name }"
              placeholder="e.g. BravoKing"
            />
            <p v-if="errors.display_name" class="mt-1 text-xs text-red-500">{{ errors.display_name }}</p>
          </div>

          <!-- Sort Order -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Sort Order</label>
            <input
              v-model.number="form.sort_order"
              type="number"
              class="input-field"
              placeholder="0"
            />
          </div>

          <!-- Bio -->
          <div class="md:col-span-2">
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Bio</label>
            <textarea
              v-model="form.bio"
              rows="3"
              class="input-field resize-none"
              placeholder="Short bio or description..."
            />
          </div>

          <!-- Toggles -->
          <div class="flex items-center gap-6">
            <label class="flex items-center gap-2.5 cursor-pointer">
              <input v-model="form.is_featured" type="checkbox" class="w-4 h-4 accent-[#E30613]" />
              <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Is Featured</span>
            </label>
            <label class="flex items-center gap-2.5 cursor-pointer">
              <input v-model="form.is_active" type="checkbox" class="w-4 h-4 accent-[#E30613]" />
              <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Is Active</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Social / Stream URLs -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 mb-6">
        <h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Links & URLs</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Primary Stream URL</label>
            <input v-model="form.stream_url" type="text" class="input-field" placeholder="https://..." />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Twitch URL</label>
            <input v-model="form.twitch_url" type="text" class="input-field" placeholder="https://twitch.tv/..." />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">YouTube URL</label>
            <input v-model="form.youtube_url" type="text" class="input-field" placeholder="https://youtube.com/..." />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">TikTok URL</label>
            <input v-model="form.tiktok_url" type="text" class="input-field" placeholder="https://tiktok.com/..." />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Instagram URL</label>
            <input v-model="form.instagram_url" type="text" class="input-field" placeholder="https://instagram.com/..." />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Twitter URL</label>
            <input v-model="form.twitter_url" type="text" class="input-field" placeholder="https://twitter.com/..." />
          </div>
        </div>
      </div>

      <!-- Avatar Upload -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 mb-6">
        <h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Avatar</h2>
        <div class="flex items-start gap-5">
          <div
            v-if="form.avatar_url"
            class="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600 flex-shrink-0"
          >
            <img :src="form.avatar_url" alt="Avatar preview" class="w-full h-full object-cover" />
          </div>
          <div v-else class="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
            <Icon name="lucide:user" class="w-8 h-8 text-gray-400" />
          </div>
          <div>
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
            <p v-if="avatarError" class="mt-1 text-xs text-red-500">{{ avatarError }}</p>
            <p class="mt-1 text-xs text-gray-400">JPG, PNG or WebP. Max 5MB.</p>
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex items-center gap-3">
        <AppButton type="submit" variant="primary" :loading="submitting">Create Creator</AppButton>
        <NuxtLink to="/admin/creators">
          <AppButton variant="outline" type="button">Cancel</AppButton>
        </NuxtLink>
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
    await navigateTo('/admin/creators')
  } catch (err: any) {
    errorMessage.value = err?.data?.message ?? 'Failed to create creator. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
@reference "tailwindcss";
.input-field {
  @apply w-full px-3.5 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] transition-colors;
}
</style>
