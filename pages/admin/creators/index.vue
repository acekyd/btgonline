<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-black text-[#001D3D] dark:text-white">Creators</h1>
      <NuxtLink to="/admin/creators/new">
        <AppButton variant="primary" size="sm">
          <Icon name="lucide:plus" class="w-4 h-4" />
          New Creator
        </AppButton>
      </NuxtLink>
    </div>

    <!-- Search -->
    <div class="mb-4">
      <input
        v-model="searchInput"
        type="text"
        placeholder="Search creators..."
        class="w-full sm:w-72 px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613]"
      />
    </div>

    <!-- Table -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <AppTable
        :columns="columns"
        :rows="rows"
        :loading="loading"
        empty-message="No creators found"
        @sort="handleSort"
      >
        <template #cell-is_active="{ value }">
          <AppBadge :variant="value ? 'active' : 'completed'">{{ value ? 'Active' : 'Inactive' }}</AppBadge>
        </template>
        <template #cell-is_featured="{ value }">
          <AppBadge :variant="value ? 'default' : 'completed'">{{ value ? 'Featured' : 'No' }}</AppBadge>
        </template>
        <template #cell-actions="{ row }">
          <div class="flex items-center gap-2">
            <NuxtLink :to="`/admin/creators/${row.id}`">
              <AppButton variant="outline" size="sm">Edit</AppButton>
            </NuxtLink>
            <AppButton variant="primary" size="sm" @click="confirmDelete(row)">Delete</AppButton>
          </div>
        </template>
      </AppTable>

      <div class="px-4 border-t border-gray-100 dark:border-gray-700">
        <AppPagination
          :total="total"
          :page="page"
          :limit="limit"
          @update:page="changePage"
        />
      </div>
    </div>

    <!-- Delete Confirm Modal -->
    <AppModal v-model="showDeleteModal" title="Delete Creator">
      <p class="text-gray-600 dark:text-gray-300 text-sm">
        Are you sure you want to delete
        <span class="font-bold text-gray-900 dark:text-white">{{ deletingCreator?.display_name }}</span>?
        This action cannot be undone.
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
  { key: 'sort_order', label: 'Sort Order', sortable: true },
  { key: 'display_name', label: 'Name', sortable: true },
  { key: 'is_active', label: 'Active' },
  { key: 'is_featured', label: 'Featured' },
  { key: 'actions', label: 'Actions' },
]

const rows = ref<Record<string, any>[]>([])
const total = ref(0)
const page = ref(1)
const limit = 20
const loading = ref(false)
const search = ref('')
const searchInput = ref('')
const sort = ref('sort_order')
const order = ref<'asc' | 'desc'>('asc')

const showDeleteModal = ref(false)
const deletingCreator = ref<Record<string, any> | null>(null)
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

watch([search, page, sort, order], () => {
  fetchCreators()
})

const fetchCreators = async () => {
  loading.value = true
  try {
    const res = await $fetch<{ data: { rows: any[]; total: number; page: number; limit: number } }>(
      '/api/admin/creators',
      {
        query: { page: page.value, limit, search: search.value, sort: sort.value, order: order.value },
      }
    )
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
}

const handleSort = ({ key, direction }: { key: string; direction: 'asc' | 'desc' }) => {
  sort.value = key
  order.value = direction
}

const confirmDelete = (row: Record<string, any>) => {
  deletingCreator.value = row
  deleteError.value = ''
  showDeleteModal.value = true
}

const executeDelete = async () => {
  if (!deletingCreator.value) return
  deleteLoading.value = true
  deleteError.value = ''
  try {
    await $fetch(`/api/admin/creators/${deletingCreator.value.id}`, { method: 'DELETE' })
    showDeleteModal.value = false
    deletingCreator.value = null
    await fetchCreators()
  } catch (err: any) {
    deleteError.value = err?.data?.message ?? 'Failed to delete creator.'
  } finally {
    deleteLoading.value = false
  }
}

onMounted(() => {
  fetchCreators()
})
</script>
