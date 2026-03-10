<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-black text-[#001D3D] dark:text-white">Players</h1>
      <NuxtLink to="/admin/players/merge">
        <AppButton variant="secondary" size="sm">
          <Icon name="lucide:git-merge" class="w-4 h-4" />
          Merge Players
        </AppButton>
      </NuxtLink>
    </div>

    <!-- Search + Table Card -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <!-- Search -->
      <div class="p-4 border-b border-gray-100 dark:border-gray-700">
        <input
          v-model="searchInput"
          type="text"
          placeholder="Search players..."
          class="w-full sm:w-72 px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613]"
        />
      </div>

      <!-- Table -->
      <AppTable
        :columns="columns"
        :rows="rows"
        :loading="loading"
        empty-message="No players found"
      >
        <template #cell-position="{ value }">
          <AppBadge v-if="value && value !== 'unset'" variant="default">{{ value }}</AppBadge>
          <span v-else class="text-gray-400 text-xs">—</span>
        </template>
        <template #cell-aliases="{ row }">
          <div class="flex flex-wrap gap-1">
            <template v-if="(row.aliases ?? []).length > 0">
              <AppBadge
                v-for="alias in (row.aliases ?? []).slice(0, 3)"
                :key="alias.id ?? alias"
                variant="default"
                size="sm"
              >
                {{ alias.display_name ?? alias }}
              </AppBadge>
              <span
                v-if="(row.aliases ?? []).length > 3"
                class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
              >
                +{{ (row.aliases ?? []).length - 3 }}
              </span>
            </template>
            <span v-else class="text-gray-400 text-xs">—</span>
          </div>
        </template>
        <template #cell-actions="{ row }">
          <div class="flex items-center gap-2">
            <AppButton variant="outline" size="sm" @click="openEditModal(row)">
              <Icon name="lucide:pencil" class="w-3.5 h-3.5" />
              Edit
            </AppButton>
            <AppButton variant="danger" size="sm" @click="confirmDelete(row)">
              <Icon name="lucide:trash-2" class="w-3.5 h-3.5" />
              Delete
            </AppButton>
          </div>
        </template>
      </AppTable>

      <div class="px-4 border-t border-gray-100 dark:border-gray-700">
        <AppPagination :total="total" :page="page" :limit="limit" @update:page="changePage" />
      </div>
    </div>

    <!-- Edit Modal -->
    <AppModal v-model="showEditModal" title="Edit Player">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Canonical Name</label>
          <input v-model="editForm.canonical_name" type="text" class="input-field" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Position</label>
          <select v-model="editForm.position" class="input-field">
            <option value="unset">— Unset —</option>
            <option value="GK">GK</option>
            <option value="DEF">DEF</option>
            <option value="MID">MID</option>
            <option value="FWD">FWD</option>
          </select>
        </div>
        <p v-if="editError" class="text-sm text-red-600">{{ editError }}</p>
      </div>
      <template #footer>
        <AppButton variant="outline" size="sm" @click="showEditModal = false">Cancel</AppButton>
        <AppButton variant="primary" size="sm" :loading="editLoading" @click="saveEdit">Save</AppButton>
      </template>
    </AppModal>

    <!-- Delete Modal -->
    <AppModal v-model="showDeleteModal" title="Delete Player">
      <p class="text-gray-600 dark:text-gray-300 text-sm">
        Are you sure you want to delete
        <span class="font-semibold text-gray-900 dark:text-white">{{ deletingItem?.canonical_name }}</span>?
        This cannot be undone.
      </p>
      <p v-if="deleteError" class="mt-3 text-sm text-red-600">{{ deleteError }}</p>
      <template #footer>
        <AppButton variant="outline" size="sm" @click="showDeleteModal = false">Cancel</AppButton>
        <AppButton variant="danger" size="sm" :loading="deleteLoading" @click="executeDelete">
          <Icon name="lucide:trash-2" class="w-3.5 h-3.5" />
          Delete Player
        </AppButton>
      </template>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const columns = [
  { key: 'canonical_name', label: 'Name', sortable: true },
  { key: 'position', label: 'Position' },
  { key: 'aliases', label: 'Aliases' },
  { key: 'actions', label: 'Actions' },
]

const rows = ref<Record<string, any>[]>([])
const total = ref(0)
const page = ref(1)
const limit = 20
const loading = ref(false)
const searchInput = ref('')
const search = ref('')

const showEditModal = ref(false)
const editingId = ref<number | null>(null)
const editForm = reactive({ canonical_name: '', position: 'unset' })
const editLoading = ref(false)
const editError = ref('')

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
    fetchPlayers()
  }, 300)
})

const fetchPlayers = async () => {
  loading.value = true
  try {
    const res = await $fetch<{ data: { rows: any[]; total: number } }>('/api/admin/players', {
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

const changePage = (p: number) => {
  page.value = p
  fetchPlayers()
}

const openEditModal = (row: Record<string, any>) => {
  editingId.value = row.id
  editForm.canonical_name = row.canonical_name ?? ''
  editForm.position = row.position ?? 'unset'
  editError.value = ''
  showEditModal.value = true
}

const saveEdit = async () => {
  if (!editingId.value) return
  editLoading.value = true
  editError.value = ''
  try {
    await $fetch(`/api/admin/players/${editingId.value}`, { method: 'PUT', body: editForm })
    showEditModal.value = false
    await fetchPlayers()
  } catch (err: any) {
    editError.value = err?.data?.message ?? 'Failed to update player.'
  } finally {
    editLoading.value = false
  }
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
    await $fetch(`/api/admin/players/${deletingItem.value.id}`, { method: 'DELETE' })
    showDeleteModal.value = false
    deletingItem.value = null
    await fetchPlayers()
  } catch (err: any) {
    deleteError.value = err?.data?.message ?? 'Failed to delete player.'
  } finally {
    deleteLoading.value = false
  }
}

onMounted(() => fetchPlayers())
</script>

<style scoped>
@reference "tailwindcss";
.input-field {
  @apply w-full px-3.5 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] transition-colors;
}
</style>
