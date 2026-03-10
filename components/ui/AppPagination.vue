<template>
  <div class="flex flex-col sm:flex-row items-center justify-between gap-3 py-3">
    <!-- Results info -->
    <p class="text-sm text-gray-500 dark:text-gray-400">
      Showing
      <span class="font-semibold text-gray-800 dark:text-gray-200">{{ fromRecord }}</span>
      –
      <span class="font-semibold text-gray-800 dark:text-gray-200">{{ toRecord }}</span>
      of
      <span class="font-semibold text-gray-800 dark:text-gray-200">{{ total }}</span>
      results
    </p>

    <!-- Page buttons -->
    <div class="flex items-center gap-1">
      <!-- Previous -->
      <button
        :disabled="page <= 1"
        :class="[
          'flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium transition-colors',
          page <= 1
            ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        ]"
        aria-label="Previous page"
        @click="goTo(page - 1)"
      >
        <Icon name="lucide:chevron-left" class="w-4 h-4" />
      </button>

      <!-- Page numbers -->
      <template v-for="(item, idx) in pageItems" :key="idx">
        <span
          v-if="item === '...'"
          class="flex items-center justify-center w-8 h-8 text-sm text-gray-400 dark:text-gray-500"
        >
          &hellip;
        </span>
        <button
          v-else
          :class="[
            'flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium transition-colors',
            item === page
              ? 'bg-[#001D3D] text-white'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          ]"
          :aria-current="item === page ? 'page' : undefined"
          @click="goTo(item as number)"
        >
          {{ item }}
        </button>
      </template>

      <!-- Next -->
      <button
        :disabled="page >= totalPages"
        :class="[
          'flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium transition-colors',
          page >= totalPages
            ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        ]"
        aria-label="Next page"
        @click="goTo(page + 1)"
      >
        <Icon name="lucide:chevron-right" class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  total: number
  page: number
  limit?: number
}

const props = withDefaults(defineProps<Props>(), {
  limit: 20,
})

const emit = defineEmits<{
  'update:page': [page: number]
}>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.limit)))
const fromRecord = computed(() => props.total === 0 ? 0 : (props.page - 1) * props.limit + 1)
const toRecord = computed(() => Math.min(props.page * props.limit, props.total))

const pageItems = computed<(number | '...')[]>(() => {
  const tp = totalPages.value
  const p = props.page

  if (tp <= 7) {
    return Array.from({ length: tp }, (_, i) => i + 1)
  }

  const items: (number | '...')[] = []

  if (p <= 4) {
    items.push(1, 2, 3, 4, 5, '...', tp)
  } else if (p >= tp - 3) {
    items.push(1, '...', tp - 4, tp - 3, tp - 2, tp - 1, tp)
  } else {
    items.push(1, '...', p - 1, p, p + 1, '...', tp)
  }

  return items
})

const goTo = (newPage: number) => {
  if (newPage < 1 || newPage > totalPages.value) return
  emit('update:page', newPage)
}
</script>
