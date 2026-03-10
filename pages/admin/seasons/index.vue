<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-black text-[#001D3D] dark:text-white">Seasons</h1>
      <NuxtLink to="/admin/seasons/new">
        <AppButton variant="primary" size="sm">
          <Icon name="lucide:plus" class="w-4 h-4" />
          New Season
        </AppButton>
      </NuxtLink>
    </div>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row gap-3 mb-4">
      <input
        v-model="searchInput"
        type="text"
        placeholder="Search seasons..."
        class="w-full sm:w-64 px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613]"
      />
      <select
        v-model="selectedTournamentId"
        class="w-full sm:w-56 px-3.5 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613]"
        @change="page = 1; fetchSeasons()"
      >
        <option value="">All Tournaments</option>
        <option v-for="t in tournaments" :key="t.id" :value="t.id">{{ t.name }}</option>
      </select>
    </div>

    <!-- Table -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <AppTable
        :columns="columns"
        :rows="rows"
        :loading="loading"
        empty-message="No seasons found"
      >
        <template #cell-status="{ value }">
          <AppBadge :variant="statusVariant(value)">{{ value }}</AppBadge>
        </template>
        <template #cell-start_date="{ value }">{{ formatDate(value) }}</template>
        <template #cell-end_date="{ value }">{{ formatDate(value) }}</template>
        <template #cell-actions="{ row }">
          <div class="flex items-center gap-2">
            <NuxtLink :to="`/admin/seasons/${row.id}`">
              <AppButton variant="outline" size="sm">Edit</AppButton>
            </NuxtLink>
            <AppButton variant="primary" size="sm" @click="confirmDelete(row)">Delete</AppButton>
          </div>
        </template>
      </AppTable>

      <div class="px-4 border-t border-gray-100 dark:border-gray-700">
        <AppPagination :total="total" :page="page" :limit="limit" @update:page="changePage" />
      </div>
    </div>

    <!-- Delete Modal -->
    <AppModal v-model="showDeleteModal" title="Delete Season">
      <p class="text-gray-600 dark:text-gray-300 text-sm">
        Are you sure you want to delete
        <span class="font-bold text-gray-900 dark:text-white">{{ deletingItem?.name }}</span>?
        This cannot be undone.
      </p>
      <p v-if="deleteError" class="mt-3 text-sm text-red-600">{{ deleteError }}</p>
      <template #footer>
        <AppButton variant="outline" size="sm" @click="showDeleteModal = false">Cancel</AppButton>
        <AppButton variant="primary" size="sm" :loading="deleteLoading" @click="executeDelete">Delete</AppButton>
      </template>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'tournament_name', label: 'Tournament' },
  { key: 'status', label: 'Status' },
  { key: 'start_date', label: 'Start Date' },
  { key: 'end_date', label: 'End Date' },
  { key: 'actions', label: 'Actions' },
]

const rows = ref<Record<string, any>[]>([])
const total = ref(0)
const page = ref(1)
const limit = 20
const loading = ref(false)
const searchInput = ref('')
const search = ref('')
const selectedTournamentId = ref('')

const tournaments = ref<{ id: number; name: string }[]>([])

const showDeleteModal = ref(false)
const deletingItem = ref<Record<string, any> | null>(null)
const deleteLoading = ref(false)
const deleteError = ref('')

let searchDebounce: ReturnType<typeof setTimeout> | null = null

watch(searchInput, (val) => {
  if (searchDebounce) clearTimeout(searchDebounce)
  searchDebounce = setTimeout(() => {
    search.value = val
    page.value = 1
    fetchSeasons()
  }, 300)
})

const fetchSeasons = async () => {
  loading.value = true
  try {
    const res = await $fetch<{ data: { rows: any[]; total: number } }>('/api/admin/seasons', {
      query: {
        page: page.value,
        limit,
        search: search.value,
        tournament_id: selectedTournamentId.value || undefined,
      },
    })
    rows.value = res.data.rows
    total.value = res.data.total
  } catch {
    rows.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

const changePage = (p: number) => {
  page.value = p
  fetchSeasons()
}

const statusVariant = (status: string) => {
  const map: Record<string, any> = {
    active: 'active', completed: 'completed', upcoming: 'upcoming', archived: 'archived'
  }
  return map[status] ?? 'default'
}

const formatDate = (val: string) => {
  if (!val) return '—'
  return new Date(val).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

const confirmDelete = (row: Record<string, any>) => {
  deletingItem.value = row
  deleteError.value = ''
  showDeleteModal.value = true
}

const executeDelete = async () => {
  if (!deletingItem.value) return
  deleteLoading.value = true
  deleteError.value = ''
  try {
    await $fetch(`/api/admin/seasons/${deletingItem.value.id}`, { method: 'DELETE' })
    showDeleteModal.value = false
    deletingItem.value = null
    await fetchSeasons()
  } catch (err: any) {
    deleteError.value = err?.data?.message ?? 'Failed to delete season.'
  } finally {
    deleteLoading.value = false
  }
}

onMounted(async () => {
  try {
    const res = await $fetch<{ data: any[] }>('/api/tournaments')
    tournaments.value = Array.isArray(res.data) ? res.data : (res as any)
  } catch {}
  await fetchSeasons()
})
</script>
