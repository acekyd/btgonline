<template>
  <div class="max-w-4xl">
    <div class="flex items-center gap-3 mb-6">
      <NuxtLink to="/admin/seasons" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <h1 class="text-xl font-black text-[#001D3D] dark:text-white">New Season</h1>
    </div>

    <div v-if="successMessage" class="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">{{ successMessage }}</div>
    <div v-if="errorMessage" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{{ errorMessage }}</div>

    <form @submit.prevent="handleSubmit">
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 mb-6">
        <h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Season Details</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Tournament -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Tournament <span class="text-[#E30613]">*</span>
            </label>
            <select v-model="form.tournament_id" class="input-field" :class="{ 'border-red-400': errors.tournament_id }">
              <option value="">Select tournament...</option>
              <option v-for="t in tournaments" :key="t.id" :value="t.id">{{ t.name }}</option>
            </select>
            <p v-if="errors.tournament_id" class="mt-1 text-xs text-red-500">{{ errors.tournament_id }}</p>
          </div>

          <!-- Status -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
            <select v-model="form.status" class="input-field">
              <option value="upcoming">Upcoming</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <!-- Name -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Name <span class="text-[#E30613]">*</span>
            </label>
            <input v-model="form.name" type="text" class="input-field" :class="{ 'border-red-400': errors.name }" placeholder="e.g. Season 4" />
            <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
          </div>

          <!-- Short Label -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Short Label</label>
            <input v-model="form.short_label" type="text" class="input-field" placeholder="e.g. S4" />
          </div>

          <!-- Season Order -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Season Order</label>
            <input v-model.number="form.season_order" type="number" class="input-field" placeholder="4" />
          </div>

          <!-- Start Date -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Start Date</label>
            <input v-model="form.start_date" type="date" class="input-field" />
          </div>

          <!-- End Date -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">End Date</label>
            <input v-model="form.end_date" type="date" class="input-field" />
          </div>

          <!-- Overview -->
          <div class="md:col-span-2">
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Overview</label>
            <textarea v-model="form.overview" rows="3" class="input-field resize-none" placeholder="Season overview or description..." />
          </div>

          <!-- Champion Team -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Champion Team</label>
            <select v-model="form.champion_team_id" class="input-field">
              <option :value="null">— None —</option>
              <option v-for="t in teams" :key="t.id" :value="t.id">{{ t.canonical_name }}</option>
            </select>
          </div>

          <!-- Runner-Up Team -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Runner-Up Team</label>
            <select v-model="form.runner_up_team_id" class="input-field">
              <option :value="null">— None —</option>
              <option v-for="t in teams" :key="t.id" :value="t.id">{{ t.canonical_name }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <AppButton type="submit" variant="primary" :loading="submitting">Create Season</AppButton>
        <NuxtLink to="/admin/seasons">
          <AppButton variant="outline" type="button">Cancel</AppButton>
        </NuxtLink>
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

<style scoped>
@reference "tailwindcss";
.input-field {
  @apply w-full px-3.5 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] transition-colors;
}
</style>
