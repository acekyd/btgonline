<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-black text-[#001D3D] dark:text-white">Imports</h1>
      <NuxtLink to="/admin/imports/new">
        <AppButton variant="primary" size="sm">
          <Icon name="lucide:upload" class="w-4 h-4" />
          New Import
        </AppButton>
      </NuxtLink>
    </div>

    <!-- Table -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <AppTable
        :columns="columns"
        :rows="rows"
        :loading="loading"
        empty-message="No imports yet"
      >
        <template #cell-created_at="{ value }">
          {{ formatDate(value) }}
        </template>
        <template #cell-status="{ value }">
          <AppBadge :variant="statusVariant(value)">{{ value }}</AppBadge>
        </template>
        <template #cell-rows_failed="{ value }">
          <span :class="value > 0 ? 'text-red-600 font-semibold' : 'text-gray-500'">{{ value }}</span>
        </template>
        <template #cell-import_type="{ value }">
          <span class="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
            {{ value?.replace(/_/g, ' ') ?? '—' }}
          </span>
        </template>
      </AppTable>

      <div class="px-4 border-t border-gray-100 dark:border-gray-700">
        <AppPagination :total="total" :page="page" :limit="limit" @update:page="changePage" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const columns = [
  { key: 'created_at', label: 'Date' },
  { key: 'season_name', label: 'Season' },
  { key: 'import_type', label: 'Type' },
  { key: 'file_name', label: 'File Name' },
  { key: 'rows_saved', label: 'Rows Saved' },
  { key: 'rows_failed', label: 'Rows Failed' },
  { key: 'status', label: 'Status' },
]

const rows = ref<Record<string, any>[]>([])
const total = ref(0)
const page = ref(1)
const limit = 20
const loading = ref(false)

const formatDate = (val: string) => {
  if (!val) return '—'
  return new Date(val).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

const statusVariant = (status: string) => {
  const map: Record<string, any> = {
    complete: 'active',
    completed: 'active',
    partial: 'partial',
    failed: 'failed',
    pending: 'upcoming',
  }
  return map[status] ?? 'default'
}

const fetchImports = async () => {
  loading.value = true
  try {
    const res = await $fetch<{ data: { rows: any[]; total: number } }>('/api/admin/imports', {
      query: { page: page.value, limit },
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
  fetchImports()
}

onMounted(() => fetchImports())
</script>
