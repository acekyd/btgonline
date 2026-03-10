<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-black text-[#001D3D] dark:text-white">Teams</h1>
      <NuxtLink to="/admin/teams/merge">
        <AppButton variant="secondary" size="sm">
          <Icon name="lucide:git-merge" class="w-4 h-4" />
          Merge Teams
        </AppButton>
      </NuxtLink>
    </div>

    <!-- Search -->
    <div class="mb-4">
      <input
        v-model="searchInput"
        type="text"
        placeholder="Search teams..."
        class="w-full sm:w-72 px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613]"
      />
    </div>

    <!-- Table -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <AppTable
        :columns="columns"
        :rows="rows"
        :loading="loading"
        empty-message="No teams found"
      >
        <template #cell-aliases="{ row }">
          <span class="text-xs text-gray-500 dark:text-gray-400">
            {{ (row.aliases ?? []).map((a: any) => a.display_name ?? a).join(', ') || '—' }}
          </span>
        </template>
        <template #cell-actions="{ row }">
          <div class="flex items-center gap-2">
            <AppButton variant="outline" size="sm" @click="openEditModal(row)">Edit</AppButton>
            <AppButton variant="primary" size="sm" @click="confirmDelete(row)">Delete</AppButton>
          </div>
        </template>
      </AppTable>

      <div class="px-4 border-t border-gray-100 dark:border-gray-700">
        <AppPagination :total="total" :page="page" :limit="limit" @update:page="changePage" />
      </div>
    </div>

    <!-- Edit Modal -->
    <AppModal v-model="showEditModal" title="Edit Team">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Canonical Name</label>
          <input v-model="editForm.canonical_name" type="text" class="input-field" />
        </div>

        <!-- Logo Upload -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Logo</label>
          <div class="flex items-center gap-3">
            <div v-if="editForm.logo_url" class="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 flex-shrink-0">
              <img :src="editForm.logo_url" alt="Team logo" class="w-full h-full object-contain" />
            </div>
            <div v-else class="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
              <Icon name="lucide:shield" class="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <input ref="editLogoInput" type="file" accept="image/*" class="hidden" @change="handleLogoUpload" />
              <AppButton variant="outline" size="sm" type="button" :loading="logoUploading" @click="editLogoInput?.click()">
                <Icon name="lucide:upload" class="w-3.5 h-3.5" />
                {{ editForm.logo_url ? 'Change' : 'Upload' }}
              </AppButton>
              <p v-if="logoUploadError" class="mt-1 text-xs text-red-500">{{ logoUploadError }}</p>
            </div>
          </div>
        </div>

        <p v-if="editError" class="text-sm text-red-600">{{ editError }}</p>
      </div>
      <template #footer>
        <AppButton variant="outline" size="sm" @click="showEditModal = false">Cancel</AppButton>
        <AppButton variant="primary" size="sm" :loading="editLoading" @click="saveEdit">Save</AppButton>
      </template>
    </AppModal>

    <!-- Delete Modal -->
    <AppModal v-model="showDeleteModal" title="Delete Team">
      <p class="text-gray-600 dark:text-gray-300 text-sm">
        Are you sure you want to delete
        <span class="font-bold text-gray-900 dark:text-white">{{ deletingItem?.canonical_name }}</span>?
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
  { key: 'canonical_name', label: 'Name', sortable: true },
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
const editForm = reactive({ canonical_name: '', logo_url: '' })
const editLoading = ref(false)
const editError = ref('')

const editLogoInput = ref<HTMLInputElement | null>(null)
const logoUploading = ref(false)
const logoUploadError = ref('')

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
    fetchTeams()
  }, 300)
})

const fetchTeams = async () => {
  loading.value = true
  try {
    const res = await $fetch<{ data: { rows: any[]; total: number } }>('/api/admin/teams', {
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
  fetchTeams()
}

const openEditModal = (row: Record<string, any>) => {
  editingId.value = row.id
  editForm.canonical_name = row.canonical_name ?? ''
  editForm.logo_url = row.logo_url ?? ''
  editError.value = ''
  logoUploadError.value = ''
  showEditModal.value = true
}

const handleLogoUpload = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  logoUploading.value = true
  logoUploadError.value = ''
  try {
    const fd = new FormData()
    fd.append('file', file)
    const res = await $fetch<{ url: string }>('/api/admin/upload', { method: 'POST', body: fd })
    editForm.logo_url = res.url
  } catch {
    logoUploadError.value = 'Upload failed. Please try again.'
  } finally {
    logoUploading.value = false
  }
}

const saveEdit = async () => {
  if (!editingId.value) return
  editLoading.value = true
  editError.value = ''
  try {
    await $fetch(`/api/admin/teams/${editingId.value}`, { method: 'PUT', body: editForm })
    showEditModal.value = false
    await fetchTeams()
  } catch (err: any) {
    editError.value = err?.data?.message ?? 'Failed to update team.'
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
    await $fetch(`/api/admin/teams/${deletingItem.value.id}`, { method: 'DELETE' })
    showDeleteModal.value = false
    deletingItem.value = null
    await fetchTeams()
  } catch (err: any) {
    deleteError.value = err?.data?.message ?? 'Failed to delete team.'
  } finally {
    deleteLoading.value = false
  }
}

onMounted(() => fetchTeams())
</script>

<style scoped>
@reference "tailwindcss";
.input-field {
  @apply w-full px-3.5 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] transition-colors;
}
</style>
