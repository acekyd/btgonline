<template>
  <div class="max-w-4xl">
    <div class="flex items-center gap-3 mb-6">
      <NuxtLink to="/admin/tournaments" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div>
        <h1 class="text-xl font-black text-[#001D3D] dark:text-white">Edit Tournament</h1>
        <p v-if="form.updated_at" class="text-xs text-gray-400 mt-0.5">Last updated: {{ formatDate(form.updated_at) }}</p>
      </div>
    </div>

    <div v-if="notFound" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-12 text-center">
      <Icon name="lucide:trophy" class="w-12 h-12 text-gray-300 mx-auto mb-3" />
      <p class="text-gray-500 dark:text-gray-400 font-semibold">Tournament not found</p>
      <NuxtLink to="/admin/tournaments" class="mt-3 inline-block text-sm text-[#E30613] hover:underline">← Back to Tournaments</NuxtLink>
    </div>

    <div v-else-if="fetchLoading" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-4 border-[#E30613] border-t-transparent rounded-full animate-spin" />
    </div>

    <template v-else>
      <div v-if="successMessage" class="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">{{ successMessage }}</div>
      <div v-if="errorMessage" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{{ errorMessage }}</div>

      <form @submit.prevent="handleSubmit">
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 mb-6">
          <h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Basic Info</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Name <span class="text-[#E30613]">*</span></label>
              <input v-model="form.name" type="text" class="input-field" :class="{ 'border-red-400': errors.name }" />
              <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Game Title <span class="text-[#E30613]">*</span></label>
              <input v-model="form.game_title" type="text" class="input-field" :class="{ 'border-red-400': errors.game_title }" />
              <p v-if="errors.game_title" class="mt-1 text-xs text-red-500">{{ errors.game_title }}</p>
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
              <textarea v-model="form.description" rows="3" class="input-field resize-none" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Format Type</label>
              <input v-model="form.format_type" type="text" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Stats Mode</label>
              <select v-model="form.stats_mode" class="input-field">
                <option value="none">None</option>
                <option value="football_seasonal">Football Seasonal</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
              <select v-model="form.status" class="input-field">
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="offseason">Offseason</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Sort Order</label>
              <input v-model.number="form.sort_order" type="number" class="input-field" />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">External URL</label>
              <input v-model="form.external_url" type="text" class="input-field" />
            </div>
            <div class="flex items-center">
              <label class="flex items-center gap-2.5 cursor-pointer">
                <input v-model="form.is_active" type="checkbox" class="w-4 h-4 accent-[#E30613]" />
                <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Is Active</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Media -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 mb-6">
          <h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Media</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Logo</label>
              <div class="flex items-start gap-4">
                <div v-if="form.logo_url" class="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 flex-shrink-0">
                  <img :src="form.logo_url" alt="Logo" class="w-full h-full object-contain" />
                </div>
                <div v-else class="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <Icon name="lucide:image" class="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <input ref="logoInput" type="file" accept="image/*" class="hidden" @change="(e) => handleUpload(e, 'logo_url')" />
                  <AppButton variant="outline" size="sm" type="button" :loading="uploading.logo" @click="logoInput?.click()">
                    <Icon name="lucide:upload" class="w-4 h-4" /> Upload Logo
                  </AppButton>
                  <p v-if="uploadErrors.logo" class="mt-1 text-xs text-red-500">{{ uploadErrors.logo }}</p>
                </div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Banner</label>
              <div class="flex items-start gap-4">
                <div v-if="form.banner_url" class="w-24 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 flex-shrink-0">
                  <img :src="form.banner_url" alt="Banner" class="w-full h-full object-cover" />
                </div>
                <div v-else class="w-24 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <Icon name="lucide:image" class="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <input ref="bannerInput" type="file" accept="image/*" class="hidden" @change="(e) => handleUpload(e, 'banner_url')" />
                  <AppButton variant="outline" size="sm" type="button" :loading="uploading.banner" @click="bannerInput?.click()">
                    <Icon name="lucide:upload" class="w-4 h-4" /> Upload Banner
                  </AppButton>
                  <p v-if="uploadErrors.banner" class="mt-1 text-xs text-red-500">{{ uploadErrors.banner }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <AppButton type="submit" variant="primary" :loading="submitting">Save Changes</AppButton>
          <NuxtLink to="/admin/tournaments">
            <AppButton variant="outline" type="button">Cancel</AppButton>
          </NuxtLink>
        </div>
      </form>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const route = useRoute()
const id = route.params.id as string

const fetchLoading = ref(true)
const notFound = ref(false)
const submitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const errors = reactive<Record<string, string>>({})

const logoInput = ref<HTMLInputElement | null>(null)
const bannerInput = ref<HTMLInputElement | null>(null)
const uploading = reactive({ logo: false, banner: false })
const uploadErrors = reactive({ logo: '', banner: '' })

const form = reactive({
  name: '', game_title: '', description: '', format_type: '',
  stats_mode: 'none', status: 'active', is_active: true, sort_order: 0,
  external_url: '', logo_url: '', banner_url: '', updated_at: '',
})

const formatDate = (val: string) => {
  if (!val) return ''
  return new Date(val).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

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
    uploadErrors[key] = 'Upload failed.'
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
    await $fetch(`/api/admin/tournaments/${id}`, { method: 'PUT', body: form })
    successMessage.value = 'Tournament updated successfully!'
  } catch (err: any) {
    errorMessage.value = err?.data?.message ?? 'Failed to update tournament.'
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  try {
    const res = await $fetch<{ data: Record<string, any> }>(`/api/admin/tournaments/${id}`)
    const d = res.data
    Object.assign(form, {
      name: d.name ?? '', game_title: d.game_title ?? '', description: d.description ?? '',
      format_type: d.format_type ?? '', stats_mode: d.stats_mode ?? 'none', status: d.status ?? 'active',
      is_active: d.is_active ?? true, sort_order: d.sort_order ?? 0, external_url: d.external_url ?? '',
      logo_url: d.logo_url ?? '', banner_url: d.banner_url ?? '', updated_at: d.updated_at ?? '',
    })
  } catch (err: any) {
    if (err?.status === 404) notFound.value = true
    else errorMessage.value = 'Failed to load tournament.'
  } finally {
    fetchLoading.value = false
  }
})
</script>

<style scoped>
@reference "tailwindcss";
.input-field {
  @apply w-full px-3.5 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] transition-colors;
}
</style>
