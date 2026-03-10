<template>
  <div class="max-w-4xl">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <NuxtLink to="/admin/players" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <h1 class="text-xl font-black text-[#001D3D] dark:text-white">Merge Players</h1>
    </div>

    <!-- Stepper -->
    <div class="flex items-center gap-0 mb-8">
      <div
        v-for="(step, idx) in steps"
        :key="step"
        class="flex items-center"
      >
        <div class="flex items-center gap-2">
          <div
            :class="[
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors',
              currentStep > idx + 1
                ? 'bg-green-500 text-white'
                : currentStep === idx + 1
                  ? 'bg-[#001D3D] text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500',
            ]"
          >
            <Icon v-if="currentStep > idx + 1" name="lucide:check" class="w-4 h-4" />
            <span v-else>{{ idx + 1 }}</span>
          </div>
          <span
            :class="[
              'text-sm font-semibold hidden sm:block',
              currentStep === idx + 1
                ? 'text-[#001D3D] dark:text-white'
                : 'text-gray-400 dark:text-gray-500',
            ]"
          >{{ step }}</span>
        </div>
        <div v-if="idx < steps.length - 1" class="h-px w-8 sm:w-12 bg-gray-200 dark:bg-gray-700 mx-2" />
      </div>
    </div>

    <!-- STEP 1: Select Players -->
    <template v-if="currentStep === 1">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Source -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
          <h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Source Player
            <span class="text-red-500 normal-case font-normal ml-1">(will be deleted)</span>
          </h2>
          <input
            v-model="sourceSearch"
            type="text"
            placeholder="Search by name..."
            class="input-field mb-3"
            @input="debouncedSearch('source')"
          />
          <!-- Dropdown results -->
          <div v-if="sourceResults.length > 0 && !sourcePlayer" class="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden mb-3">
            <button
              v-for="p in sourceResults"
              :key="p.id"
              type="button"
              class="w-full text-left px-3 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors"
              @click="selectPlayer('source', p)"
            >
              <span class="font-semibold text-gray-800 dark:text-gray-200">{{ p.canonical_name }}</span>
              <span v-if="p.position && p.position !== 'unset'" class="ml-2 text-xs text-gray-400">{{ p.position }}</span>
            </button>
          </div>
          <!-- Selected player -->
          <div v-if="sourcePlayer" class="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div>
              <p class="font-bold text-gray-900 dark:text-white text-sm">{{ sourcePlayer.canonical_name }}</p>
              <p v-if="sourcePlayer.position && sourcePlayer.position !== 'unset'" class="text-xs text-gray-500 mt-0.5">{{ sourcePlayer.position }}</p>
            </div>
            <button type="button" @click="clearPlayer('source')" class="text-gray-400 hover:text-red-500 transition-colors">
              <Icon name="lucide:x" class="w-4 h-4" />
            </button>
          </div>
          <p v-if="sourceSearching" class="text-xs text-gray-400 mt-2">Searching...</p>
        </div>

        <!-- Target -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
          <h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Target Player
            <span class="text-green-600 normal-case font-normal ml-1">(will be kept)</span>
          </h2>
          <input
            v-model="targetSearch"
            type="text"
            placeholder="Search by name..."
            class="input-field mb-3"
            @input="debouncedSearch('target')"
          />
          <div v-if="targetResults.length > 0 && !targetPlayer" class="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden mb-3">
            <button
              v-for="p in targetResults"
              :key="p.id"
              type="button"
              class="w-full text-left px-3 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors"
              @click="selectPlayer('target', p)"
            >
              <span class="font-semibold text-gray-800 dark:text-gray-200">{{ p.canonical_name }}</span>
              <span v-if="p.position && p.position !== 'unset'" class="ml-2 text-xs text-gray-400">{{ p.position }}</span>
            </button>
          </div>
          <div v-if="targetPlayer" class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div>
              <p class="font-bold text-gray-900 dark:text-white text-sm">{{ targetPlayer.canonical_name }}</p>
              <p v-if="targetPlayer.position && targetPlayer.position !== 'unset'" class="text-xs text-gray-500 mt-0.5">{{ targetPlayer.position }}</p>
            </div>
            <button type="button" @click="clearPlayer('target')" class="text-gray-400 hover:text-red-500 transition-colors">
              <Icon name="lucide:x" class="w-4 h-4" />
            </button>
          </div>
          <p v-if="targetSearching" class="text-xs text-gray-400 mt-2">Searching...</p>
        </div>
      </div>

      <div v-if="step1Error" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{{ step1Error }}</div>

      <AppButton
        variant="primary"
        :disabled="!sourcePlayer || !targetPlayer"
        :loading="previewLoading"
        @click="loadPreview"
      >
        Load Preview
      </AppButton>
    </template>

    <!-- STEP 2: Preview -->
    <template v-if="currentStep === 2 && previewData">
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 mb-6">
        <div class="flex flex-col sm:flex-row gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
          <div class="flex-1 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
            <p class="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">Source (deleted)</p>
            <p class="font-black text-gray-900 dark:text-white text-lg">{{ sourcePlayer?.canonical_name }}</p>
          </div>
          <div class="flex items-center justify-center">
            <Icon name="lucide:arrow-right" class="w-6 h-6 text-gray-400" />
          </div>
          <div class="flex-1 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
            <p class="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Target (kept)</p>
            <p class="font-black text-gray-900 dark:text-white text-lg">{{ targetPlayer?.canonical_name }}</p>
          </div>
        </div>

        <!-- Stats to be moved -->
        <div class="mb-5">
          <h3 class="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Stats rows to be moved
            <span class="ml-1 text-xs font-normal text-gray-400">({{ previewData.statsToMove?.length ?? 0 }} rows)</span>
          </h3>
          <div v-if="previewData.statsToMove?.length > 0" class="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
            <div
              v-for="(stat, i) in previewData.statsToMove"
              :key="i"
              class="flex items-center justify-between px-4 py-2.5 text-sm border-b border-gray-100 dark:border-gray-700 last:border-0"
            >
              <span class="text-gray-700 dark:text-gray-300 font-medium">{{ stat.season_name ?? stat.season_id }}</span>
              <span class="text-gray-400 text-xs">
                G: {{ stat.goals ?? 0 }} · A: {{ stat.assists ?? 0 }}
              </span>
            </div>
          </div>
          <p v-else class="text-sm text-gray-400 italic">No stats rows to move.</p>
        </div>

        <!-- Aliases to be moved -->
        <div class="mb-5">
          <h3 class="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Aliases to be moved
            <span class="ml-1 text-xs font-normal text-gray-400">({{ previewData.aliasesToMove?.length ?? 0 }})</span>
          </h3>
          <div v-if="previewData.aliasesToMove?.length > 0" class="flex flex-wrap gap-2">
            <span
              v-for="a in previewData.aliasesToMove"
              :key="a"
              class="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full border border-blue-200 dark:border-blue-700"
            >{{ a }}</span>
          </div>
          <p v-else class="text-sm text-gray-400 italic">No aliases to move.</p>
        </div>

        <!-- Aliases skipped -->
        <div v-if="previewData.aliasesSkipped?.length > 0">
          <h3 class="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Aliases skipped (duplicates)
            <span class="ml-1 text-xs font-normal text-gray-400">({{ previewData.aliasesSkipped.length }})</span>
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="a in previewData.aliasesSkipped"
              :key="a"
              class="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs font-semibold rounded-full line-through"
            >{{ a }}</span>
          </div>
        </div>
      </div>

      <div v-if="mergeError" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{{ mergeError }}</div>

      <div class="flex items-center gap-3">
        <AppButton variant="primary" :loading="mergeLoading" @click="confirmMerge">
          <Icon name="lucide:git-merge" class="w-4 h-4" />
          Confirm Merge
        </AppButton>
        <AppButton variant="outline" @click="resetMerge">Cancel</AppButton>
      </div>
    </template>

    <!-- STEP 3: Result -->
    <template v-if="currentStep === 3 && mergeResult">
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-8 text-center">
        <div class="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
          <Icon name="lucide:check-circle-2" class="w-8 h-8 text-green-500" />
        </div>
        <h2 class="text-xl font-black text-gray-900 dark:text-white mb-2">Merge Complete</h2>
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-6">
          <span class="font-semibold text-gray-800 dark:text-gray-200">{{ mergeResult.sourceName }}</span>
          has been merged into
          <span class="font-semibold text-gray-800 dark:text-gray-200">{{ mergeResult.targetName }}</span>.
        </p>
        <div class="flex items-center justify-center gap-6 mb-8 text-sm">
          <div class="text-center">
            <p class="text-2xl font-black text-[#001D3D] dark:text-white">{{ mergeResult.statsMoved ?? 0 }}</p>
            <p class="text-gray-400">Stats moved</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-black text-[#001D3D] dark:text-white">{{ mergeResult.aliasesMoved ?? 0 }}</p>
            <p class="text-gray-400">Aliases moved</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-black text-[#001D3D] dark:text-white">{{ mergeResult.aliasesSkipped ?? 0 }}</p>
            <p class="text-gray-400">Aliases skipped</p>
          </div>
        </div>
        <div class="flex items-center justify-center gap-3">
          <AppButton variant="primary" @click="resetMerge">Merge Another</AppButton>
          <NuxtLink to="/admin/players">
            <AppButton variant="outline">Back to Players</AppButton>
          </NuxtLink>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

interface Player {
  id: number
  canonical_name: string
  position?: string
  aliases?: any[]
  stats?: any[]
}

interface PreviewData {
  statsToMove: any[]
  aliasesToMove: string[]
  aliasesSkipped: string[]
}

interface MergeResult {
  sourceName: string
  targetName: string
  statsMoved: number
  aliasesMoved: number
  aliasesSkipped: number
}

const steps = ['Select Players', 'Preview', 'Complete']
const currentStep = ref(1)

const sourceSearch = ref('')
const targetSearch = ref('')
const sourceResults = ref<Player[]>([])
const targetResults = ref<Player[]>([])
const sourceSearching = ref(false)
const targetSearching = ref(false)
const sourcePlayer = ref<Player | null>(null)
const targetPlayer = ref<Player | null>(null)

const previewLoading = ref(false)
const previewData = ref<PreviewData | null>(null)
const step1Error = ref('')

const mergeLoading = ref(false)
const mergeError = ref('')
const mergeResult = ref<MergeResult | null>(null)

let sourceDebounce: ReturnType<typeof setTimeout> | null = null
let targetDebounce: ReturnType<typeof setTimeout> | null = null

const debouncedSearch = (side: 'source' | 'target') => {
  const query = side === 'source' ? sourceSearch.value : targetSearch.value
  const debounceRef = side === 'source' ? sourceDebounce : targetDebounce

  if (debounceRef) clearTimeout(debounceRef)

  const timer = setTimeout(async () => {
    if (query.trim().length < 2) {
      if (side === 'source') sourceResults.value = []
      else targetResults.value = []
      return
    }
    if (side === 'source') sourceSearching.value = true
    else targetSearching.value = true

    try {
      const res = await $fetch<{ data: { rows: Player[] } }>('/api/admin/players', {
        query: { search: query, limit: 10, page: 1 },
      })
      const results = res?.data?.rows ?? []
      if (side === 'source') sourceResults.value = results
      else targetResults.value = results
    } catch {
      if (side === 'source') sourceResults.value = []
      else targetResults.value = []
    } finally {
      if (side === 'source') sourceSearching.value = false
      else targetSearching.value = false
    }
  }, 300)

  if (side === 'source') sourceDebounce = timer
  else targetDebounce = timer
}

const selectPlayer = (side: 'source' | 'target', player: Player) => {
  if (side === 'source') {
    sourcePlayer.value = player
    sourceResults.value = []
    sourceSearch.value = ''
  } else {
    targetPlayer.value = player
    targetResults.value = []
    targetSearch.value = ''
  }
}

const clearPlayer = (side: 'source' | 'target') => {
  if (side === 'source') {
    sourcePlayer.value = null
    sourceSearch.value = ''
    sourceResults.value = []
  } else {
    targetPlayer.value = null
    targetSearch.value = ''
    targetResults.value = []
  }
}

const loadPreview = async () => {
  if (!sourcePlayer.value || !targetPlayer.value) return
  if (sourcePlayer.value.id === targetPlayer.value.id) {
    step1Error.value = 'Source and target must be different players.'
    return
  }
  step1Error.value = ''
  previewLoading.value = true
  try {
    const [srcRes, tgtRes] = await Promise.all([
      $fetch<{ data: Player }>(`/api/admin/players/${sourcePlayer.value.id}`),
      $fetch<{ data: Player }>(`/api/admin/players/${targetPlayer.value.id}`),
    ])
    const src = srcRes.data
    const tgt = tgtRes.data

    const targetAliasNames = new Set((tgt.aliases ?? []).map((a: any) => a.display_name ?? a))
    const srcAliases = (src.aliases ?? []).map((a: any) => a.display_name ?? a)

    previewData.value = {
      statsToMove: src.stats ?? [],
      aliasesToMove: srcAliases.filter((a: string) => !targetAliasNames.has(a)),
      aliasesSkipped: srcAliases.filter((a: string) => targetAliasNames.has(a)),
    }
    currentStep.value = 2
  } catch {
    step1Error.value = 'Failed to load player details. Please try again.'
  } finally {
    previewLoading.value = false
  }
}

const confirmMerge = async () => {
  if (!sourcePlayer.value || !targetPlayer.value) return
  mergeLoading.value = true
  mergeError.value = ''
  try {
    const res = await $fetch<{ data: MergeResult }>('/api/admin/players/merge', {
      method: 'POST',
      body: { sourceId: sourcePlayer.value.id, targetId: targetPlayer.value.id },
    })
    mergeResult.value = {
      sourceName: sourcePlayer.value.canonical_name,
      targetName: targetPlayer.value.canonical_name,
      statsMoved: res?.data?.statsMoved ?? previewData.value?.statsToMove.length ?? 0,
      aliasesMoved: res?.data?.aliasesMoved ?? previewData.value?.aliasesToMove.length ?? 0,
      aliasesSkipped: res?.data?.aliasesSkipped ?? previewData.value?.aliasesSkipped.length ?? 0,
    }
    currentStep.value = 3
  } catch (err: any) {
    mergeError.value = err?.data?.message ?? 'Merge failed. Please try again.'
  } finally {
    mergeLoading.value = false
  }
}

const resetMerge = () => {
  currentStep.value = 1
  sourcePlayer.value = null
  targetPlayer.value = null
  sourceSearch.value = ''
  targetSearch.value = ''
  sourceResults.value = []
  targetResults.value = []
  previewData.value = null
  mergeResult.value = null
  step1Error.value = ''
  mergeError.value = ''
}
</script>

<style scoped>
@reference "tailwindcss";
.input-field {
  @apply w-full px-3.5 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] transition-colors;
}
</style>
