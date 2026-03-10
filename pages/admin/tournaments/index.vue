<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-black text-[#001D3D] dark:text-white">Tournaments</h1>
      <NuxtLink to="/admin/tournaments/new">
        <AppButton variant="primary" size="sm">
          <Icon name="lucide:plus" class="w-4 h-4" />
          New Tournament
        </AppButton>
      </NuxtLink>
    </div>

    <!-- Search -->
    <div class="mb-4">
      <input
        v-model="searchInput"
        type="text"
        placeholder="Search tournaments..."
        class="w-full sm:w-72 px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613]"
      />
    </div>

    <!-- Table -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <AppTable
        :columns="columns"
        :rows="rows"
        :loading="loading"
        empty-message="No tournaments found"
      >
        <template #cell-status="{ value }">
          <AppBadge :variant="statusVariant(value)">{{ value }}</AppBadge>
        </template>
        <template #cell-actions="{ row }">
          <div class="flex items-center gap-2">
            <NuxtLink :to="`/admin/tournaments/${row.id}`">
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

    <!-- Delete Confirm Modal -->
    <AppModal v-model="showDeleteModal" title="Delete Tournament">
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
  { key: 'game_title', label: 'Game' },
  { key: 'status', label: 'Status' },
  { key: 'sort_order', label: 'Sort Order', sortable: true },
  { key: 'actions', label: 'Actions' },
]

const rows = ref<Record<string, any>[]>([])
const total = ref(0)
const page = ref(1)
const limit = 20
const loading = ref(false)
const searchInput = ref('')
const search = ref('')

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
  }, 300)
})

watch([search, page], () => fetchTournaments())

const fetchTournaments = async () => {
  loading.value = true
  try {
    const res = await $fetch<{ data: { rows: any[]; total: number } }>('/api/admin/tournaments', {
      query: { page: page.value, limit, search: search.value },
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

const changePage = (p: number) => { page.value = p }

const statusVariant = (status: string) => {
  const map: Record<string, any> = { active: 'active', completed: 'completed', offseason: 'offseason' }
  return map[status] ?? 'default'
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
    await $fetch(`/api/admin/tournaments/${deletingItem.value.id}`, { method: 'DELETE' })
    showDeleteModal.value = false
    deletingItem.value = null
    await fetchTournaments()
  } catch (err: any) {
    deleteError.value = err?.data?.message ?? 'Failed to delete tournament.'
  } finally {
    deleteLoading.value = false
  }
}

onMounted(() => fetchTournaments())
</script>
