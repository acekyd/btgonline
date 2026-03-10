<template>
  <div class="overflow-x-auto w-full rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
    <table class="w-full text-sm text-left">
      <thead class="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            :class="[
              'px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap transition-colors',
              col.sortable ? 'cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded' : ''
            ]"
            @click="col.sortable ? handleSort(col.key) : undefined"
          >
            <span class="inline-flex items-center gap-1">
              {{ col.label }}
              <span v-if="col.sortable" class="text-gray-400 dark:text-gray-500">
                <Icon
                  v-if="sortKey === col.key && sortDirection === 'asc'"
                  name="lucide:chevron-up"
                  class="w-3.5 h-3.5 text-[#E30613]"
                />
                <Icon
                  v-else-if="sortKey === col.key && sortDirection === 'desc'"
                  name="lucide:chevron-down"
                  class="w-3.5 h-3.5 text-[#E30613]"
                />
                <Icon
                  v-else
                  name="lucide:chevrons-up-down"
                  class="w-3.5 h-3.5"
                />
              </span>
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        <!-- Loading skeleton -->
        <template v-if="loading">
          <tr v-for="i in 3" :key="`skeleton-${i}`" class="border-b border-gray-100 dark:border-gray-700">
            <td
              v-for="col in columns"
              :key="col.key"
              class="px-4 py-3"
            >
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" :style="{ width: `${60 + Math.random() * 30}%` }" />
            </td>
          </tr>
        </template>

        <!-- Empty state -->
        <tr v-else-if="rows.length === 0">
          <td :colspan="columns.length" class="px-4 py-12 text-center text-gray-400 dark:text-gray-500 text-sm">
            {{ emptyMessage }}
          </td>
        </tr>

        <!-- Data rows -->
        <template v-else>
          <tr
            v-for="(row, rowIndex) in rows"
            :key="rowIndex"
            class="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              class="px-4 py-3 text-gray-800 dark:text-gray-200"
            >
              <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
                {{ row[col.key] ?? '—' }}
              </slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface Column {
  key: string
  label: string
  sortable?: boolean
}

interface Props {
  columns: Column[]
  rows: Record<string, any>[]
  loading?: boolean
  emptyMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  emptyMessage: 'No data found',
})

const emit = defineEmits<{
  sort: [{ key: string; direction: 'asc' | 'desc' }]
}>()

const sortKey = ref<string | null>(null)
const sortDirection = ref<'asc' | 'desc'>('asc')

const handleSort = (key: string) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDirection.value = 'asc'
  }
  emit('sort', { key, direction: sortDirection.value })
}
</script>
