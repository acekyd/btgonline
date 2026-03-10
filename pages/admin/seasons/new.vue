<template>
  <div class="max-w-4xl">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-2">
      <NuxtLink to="/admin/seasons" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <h1 class="text-xl font-black text-[#001D3D] dark:text-white">New Season</h1>
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
      <!-- Tournament & Identity -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tournament & Identity</h2>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Tournament -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Tournament <span class="text-[#E30613]">*</span>
            </label>
            <select
              v-model="form.tournament_id"
              :class="[
                'w-full px-4 py-2.5 text-sm rounded-lg border transition-colors bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none',
                errors.tournament_id ? 'border-red-400' : 'border-gray-200 dark:border-gray-600'
              ]"
            >
              <option value="">— Select Tournament —</option>
              <option v-for="t in tournaments" :key="t.id" :value="t.id">{{ t.name }}</option>
            </select>
            <p v-if="errors.tournament_id" class="text-xs text-red-500 flex items-center gap-1">
              <Icon name="lucide:alert-circle" class="w-3.5 h-3.5 flex-shrink-0" />
              {{ errors.tournament_id }}
            </p>
          </div>

          <!-- Name -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Name <span class="text-[#E30613]">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="e.g. Season 4"
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

          <!-- Short Label -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Short Label</label>
            <input
              v-model="form.short_label"
              type="text"
              placeholder="e.g. S4"
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none transition-colors"
            />
            <p class="text-xs text-gray-400">Short label shown in tables e.g. S4</p>
          </div>

          <!-- Season Order -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Season Order</label>
            <input
              v-model.number="form.season_order"
              type="number"
              placeholder="4"
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none transition-colors"
            />
            <p class="text-xs text-gray-400">Controls display order within a tournament.</p>
          </div>
        </div>
      </div>

      <!-- Dates & Status -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Dates & Status</h2>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Start Date -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Start Date</label>
            <input
              v-model="form.start_date"
              type="date"
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none transition-colors"
            />
          </div>

          <!-- End Date -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">End Date</label>
            <input
              v-model="form.end_date"
              type="date"
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none transition-colors"
            />
            <p class="text-xs text-gray-400">End date must be after start date.</p>
          </div>

          <!-- Status -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Status</label>
            <select
              v-model="form.status"
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none transition-colors"
            >
              <option value="upcoming">Upcoming — Season has not started yet</option>
              <option value="active">Active — Season is currently in progress</option>
              <option value="completed">Completed — Season has ended with results</option>
              <option value="archived">Archived — Hidden from public view</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Champions -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Champions</h2>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="md:col-span-2">
            <p class="text-xs text-gray-400 mb-4 flex items-center gap-1.5">
              <Icon name="lucide:info" class="w-3.5 h-3.5 flex-shrink-0" />
              You can set these after importing season statistics.
            </p>
          </div>
          <!-- Champion Team -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Champion Team</label>
            <select
              v-model="form.champion_team_id"
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none transition-colors"
            >
              <option :value="null">— Not yet set —</option>
              <option v-for="t in teams" :key="t.id" :value="t.id">{{ t.canonical_name }}</option>
            </select>
          </div>

          <!-- Runner-Up Team -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Runner-up Team</label>
            <select
              v-model="form.runner_up_team_id"
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none transition-colors"
            >
              <option :value="null">— Not yet set —</option>
              <option v-for="t in teams" :key="t.id" :value="t.id">{{ t.canonical_name }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Overview -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Overview</h2>
        </div>
        <div class="p-6">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">Overview</label>
            <textarea
              v-model="form.overview"
              rows="5"
              placeholder="Season overview or description..."
              class="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      <!-- Bottom Action Bar -->
      <div class="flex items-center justify-between pt-4 mt-2 border-t border-gray-100 dark:border-gray-700">
        <NuxtLink to="/admin/seasons">
          <AppButton variant="ghost" size="md" type="button">Cancel</AppButton>
        </NuxtLink>
        <AppButton type="submit" variant="primary" size="md" :loading="submitting">
          <Icon name="lucide:plus" class="w-4 h-4" />
          Create Season
        </AppButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const form = reactive({
  tournament_id: '' as string | number,
  name: '',
  short_label: '',
  season_order: null as number | null,
  start_date: '',
  end_date: '',
  status: 'upcoming',
  overview: '',
  champion_team_id: null as number | null,
  runner_up_team_id: null as number | null,
})

const errors = reactive<Record<string, string>>({})
const submitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const tournaments = ref<{ id: number; name: string }[]>([])
const teams = ref<{ id: number; canonical_name: string }[]>([])

const validate = () => {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (!form.tournament_id) errors.tournament_id = 'Tournament is required.'
  if (!form.name.trim()) errors.name = 'Name is required.'
  return Object.keys(errors).length === 0
}

const handleSubmit = async () => {
  if (!validate()) return
  submitting.value = true
  successMessage.value = ''
  errorMessage.value = ''
  try {
    await $fetch('/api/admin/seasons', { method: 'POST', body: form })
    await navigateTo('/admin/seasons')
  } catch (err: any) {
    errorMessage.value = err?.data?.message ?? 'Failed to create season.'
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  try {
    const res = await $fetch<any>('/api/tournaments')
    tournaments.value = Array.isArray(res) ? res : (res?.data ?? [])
  } catch {}
  try {
    const res = await $fetch<{ data: { rows: any[] } }>('/api/admin/teams', { query: { limit: 200 } })
    teams.value = res?.data?.rows ?? []
  } catch {}
})
</script>
