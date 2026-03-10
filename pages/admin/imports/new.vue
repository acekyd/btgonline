<template>
  <div class="max-w-5xl">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <NuxtLink to="/admin/imports" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <h1 class="text-xl font-black text-[#001D3D] dark:text-white">New Import</h1>
    </div>

    <!-- Enhanced Stepper -->
    <div class="flex items-center mb-8">
      <template v-for="(stepLabel, i) in ['Upload CSV', 'Preview Data', 'Complete']" :key="i">
        <div class="flex items-center gap-2">
          <div :class="[
            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-colors',
            currentStep > i + 1 ? 'bg-green-500 text-white' :
            currentStep === i + 1 ? 'bg-[#E30613] text-white' :
            'bg-gray-200 dark:bg-gray-700 text-gray-400'
          ]">
            <Icon v-if="currentStep > i + 1" name="lucide:check" class="w-4 h-4" />
            <span v-else>{{ i + 1 }}</span>
          </div>
          <span :class="[
            'text-sm font-semibold hidden sm:block',
            currentStep === i + 1 ? 'text-gray-900 dark:text-white' : 'text-gray-400'
          ]">{{ stepLabel }}</span>
        </div>
        <div v-if="i < 2" :class="['flex-1 h-1 mx-3 rounded-full transition-colors', currentStep > i + 1 ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700']" />
      </template>
    </div>

    <!-- ═══════════════════════════════════════════════
         STEP 1 — Upload
    ════════════════════════════════════════════════ -->
    <template v-if="currentStep === 1">
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
        <div class="px-0 pb-4 mb-5 border-b border-gray-100 dark:border-gray-700">
          <h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Upload CSV</h2>
        </div>

        <!-- Season -->
        <div class="mb-5">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Season <span class="text-[#E30613]">*</span>
            </label>
            <select
              v-model="selectedSeasonId"
              :class="[
                'w-full px-4 py-2.5 text-sm rounded-lg border transition-colors bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] focus:outline-none',
                step1Errors.season ? 'border-red-400' : 'border-gray-200 dark:border-gray-600'
              ]"
            >
              <option value="">— Select a season —</option>
              <option v-for="s in seasons" :key="s.id" :value="s.id">
                {{ s.name }} ({{ s.tournament_name }})
              </option>
            </select>
            <p v-if="step1Errors.season" class="text-xs text-red-500 flex items-center gap-1">
              <Icon name="lucide:alert-circle" class="w-3.5 h-3.5 flex-shrink-0" />
              {{ step1Errors.season }}
            </p>
          </div>
        </div>

        <!-- Import Type — Card selector -->
        <div class="mb-5">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">
            Import Type <span class="text-[#E30613]">*</span>
          </label>
          <div class="grid grid-cols-2 gap-4">
            <button
              v-for="type in ['team_stats', 'player_stats']"
              :key="type"
              type="button"
              @click="selectedImportType = type"
              :class="[
                'p-4 rounded-xl border-2 text-left transition-all',
                selectedImportType === type
                  ? 'border-[#E30613] bg-[#E30613]/5 dark:bg-[#E30613]/10'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              ]"
            >
              <Icon
                :name="type === 'team_stats' ? 'lucide:shield' : 'lucide:user'"
                class="w-5 h-5 mb-2"
                :class="selectedImportType === type ? 'text-[#E30613]' : 'text-gray-400'"
              />
              <p class="font-semibold text-sm text-gray-800 dark:text-gray-200">{{ type === 'team_stats' ? 'Team Stats' : 'Player Stats' }}</p>
              <p class="text-xs text-gray-400 mt-0.5">{{ type === 'team_stats' ? 'Standings, goals, points' : 'Goals, assists, appearances' }}</p>
            </button>
          </div>
          <p v-if="step1Errors.importType" class="mt-1.5 text-xs text-red-500 flex items-center gap-1">
            <Icon name="lucide:alert-circle" class="w-3.5 h-3.5 flex-shrink-0" />
            {{ step1Errors.importType }}
          </p>
        </div>

        <!-- File Drop Zone -->
        <div class="mb-6">
          <label class="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">
            CSV File <span class="text-[#E30613]">*</span>
          </label>
          <div
            class="relative overflow-hidden border-2 border-dashed rounded-xl p-8 text-center transition-colors"
            :class="[
              csvFile
                ? 'border-green-400 bg-green-50 dark:bg-green-900/10'
                : step1Errors.file
                  ? 'border-red-300 bg-red-50 dark:bg-red-900/10'
                  : 'border-gray-300 dark:border-gray-600 hover:border-[#E30613]/50'
            ]"
          >
            <input
              ref="csvInput"
              type="file"
              accept=".csv"
              @change="handleFileSelect"
              class="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Icon
              :name="csvFile ? 'lucide:check-circle-2' : 'lucide:upload-cloud'"
              :class="['w-10 h-10 mx-auto mb-3', csvFile ? 'text-green-500' : 'text-gray-400']"
            />
            <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {{ csvFile ? csvFile.name : 'Drop CSV file here or click to browse' }}
            </p>
            <p v-if="!csvFile" class="text-xs text-gray-400 mt-1">Accepts .csv files only</p>
            <p v-else class="text-xs text-green-500 mt-1">File ready to upload · {{ formatFileSize(csvFile.size) }}</p>
            <button
              v-if="csvFile"
              type="button"
              @click.stop="clearFile"
              class="mt-3 text-xs text-gray-400 hover:text-red-500 transition-colors relative z-10"
            >
              Remove file
            </button>
          </div>
          <p v-if="step1Errors.file" class="mt-1.5 text-xs text-red-500 flex items-center gap-1">
            <Icon name="lucide:alert-circle" class="w-3.5 h-3.5 flex-shrink-0" />
            {{ step1Errors.file }}
          </p>
        </div>

        <div v-if="uploadError" class="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 mb-4">
          <Icon name="lucide:alert-circle" class="w-5 h-5 flex-shrink-0" />
          <span class="text-sm font-medium">{{ uploadError }}</span>
        </div>

        <AppButton variant="primary" class="w-full" :loading="uploading" @click="uploadAndPreview">
          <Icon name="lucide:upload" class="w-4 h-4" />
          Upload &amp; Preview
        </AppButton>
      </div>
    </template>

    <!-- ═══════════════════════════════════════════════
         STEP 2 — Preview
    ════════════════════════════════════════════════ -->
    <template v-if="currentStep === 2 && previewResult">
      <!-- Summary stat cards -->
      <div class="grid grid-cols-3 gap-4 mb-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-4 text-center">
          <p class="text-2xl font-black text-gray-700 dark:text-gray-200">{{ previewResult.totalRows }}</p>
          <p class="text-xs text-gray-400 mt-0.5 font-semibold uppercase tracking-wide">Total Rows</p>
        </div>
        <div class="bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-200 dark:border-green-800 shadow-sm p-4 text-center">
          <p class="text-2xl font-black text-green-600">{{ previewResult.validRows }}</p>
          <p class="text-xs text-gray-400 mt-0.5 font-semibold uppercase tracking-wide">Valid Rows</p>
        </div>
        <div
          :class="[
            'rounded-xl border shadow-sm p-4 text-center',
            previewResult.errorRows > 0
              ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700',
          ]"
        >
          <p :class="['text-2xl font-black', previewResult.errorRows > 0 ? 'text-red-600' : 'text-gray-300']">
            {{ previewResult.errorRows }}
          </p>
          <p class="text-xs text-gray-400 mt-0.5 font-semibold uppercase tracking-wide">Error Rows</p>
        </div>
      </div>

      <!-- Zero valid rows warning -->
      <div v-if="previewResult.validRows === 0" class="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 mb-6">
        <Icon name="lucide:x-circle" class="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div>
          <p class="text-sm font-bold">No valid rows to import.</p>
          <p class="text-sm mt-0.5">Please fix the errors in your CSV and try uploading again.</p>
        </div>
      </div>

      <!-- Error rows section (collapsible) -->
      <div v-if="previewResult.errorRows > 0" class="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-700 rounded-xl p-5 mb-6">
        <button
          type="button"
          class="w-full flex items-center justify-between"
          @click="showErrors = !showErrors"
        >
          <div class="flex items-center gap-2">
            <Icon name="lucide:alert-triangle" class="w-4 h-4 text-orange-500" />
            <h3 class="text-sm font-bold text-orange-700 dark:text-orange-400">
              {{ previewResult.errorRows }} row{{ previewResult.errorRows !== 1 ? 's' : '' }} have errors and will be skipped
            </h3>
          </div>
          <Icon :name="showErrors ? 'lucide:chevron-up' : 'lucide:chevron-down'" class="w-4 h-4 text-orange-500" />
        </button>
        <div v-if="showErrors" class="mt-3 overflow-x-auto rounded-lg border border-orange-200 dark:border-orange-700">
          <table class="w-full text-xs">
            <thead class="bg-orange-100 dark:bg-orange-900/30">
              <tr>
                <th class="px-3 py-2 text-left font-semibold text-orange-700 dark:text-orange-300">Row #</th>
                <th
                  v-for="field in errorTableFields"
                  :key="field"
                  class="px-3 py-2 text-left font-semibold text-orange-700 dark:text-orange-300"
                >{{ field }}</th>
                <th class="px-3 py-2 text-left font-semibold text-orange-700 dark:text-orange-300">Error</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(errRow, i) in previewResult.errorRowsData"
                :key="i"
                class="border-t border-orange-100 dark:border-orange-800"
              >
                <td class="px-3 py-2 text-orange-600 font-bold">{{ errRow.rowNumber }}</td>
                <td
                  v-for="field in errorTableFields"
                  :key="field"
                  class="px-3 py-2 text-gray-600 dark:text-gray-300"
                >{{ errRow.data?.[field] ?? '—' }}</td>
                <td class="px-3 py-2 text-red-600 dark:text-red-400 font-medium">{{ errRow.error }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Valid rows preview -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
        <div class="px-5 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <h3 class="text-sm font-bold text-gray-700 dark:text-gray-300">
            Preview — valid rows
          </h3>
          <span class="text-xs text-gray-400">Showing first 50 rows. All valid rows will be imported.</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead class="bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th
                  v-for="col in previewColumns"
                  :key="col"
                  class="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap"
                >{{ col.replace(/_/g, ' ') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="previewResult.validRowsData?.length === 0">
                <td :colspan="previewColumns.length" class="px-4 py-8 text-center text-gray-400 text-sm">No valid rows to preview.</td>
              </tr>
              <tr
                v-for="(row, i) in previewResult.validRowsData?.slice(0, 50)"
                :key="i"
                class="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td
                  v-for="col in previewColumns"
                  :key="col"
                  class="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap"
                >{{ row[col] ?? '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="confirmError" class="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 mb-4">
        <Icon name="lucide:alert-circle" class="w-5 h-5 flex-shrink-0" />
        <span class="text-sm font-medium">{{ confirmError }}</span>
      </div>

      <div class="flex items-center gap-3">
        <AppButton
          variant="primary"
          :disabled="previewResult.validRows === 0"
          :loading="confirming"
          @click="confirmImport"
        >
          <Icon name="lucide:check" class="w-4 h-4" />
          Import {{ previewResult.validRows }} Row{{ previewResult.validRows !== 1 ? 's' : '' }}
        </AppButton>
        <AppButton variant="outline" @click="startOver">
          Start Over
        </AppButton>
      </div>
    </template>

    <!-- ═══════════════════════════════════════════════
         STEP 3 — Complete
    ════════════════════════════════════════════════ -->
    <template v-if="currentStep === 3 && importResult">
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-8 text-center">
        <!-- Status icon -->
        <div
          :class="[
            'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4',
            importResult.status === 'complete' || importResult.status === 'completed'
              ? 'bg-green-100 dark:bg-green-900/30'
              : importResult.status === 'partial'
                ? 'bg-amber-100 dark:bg-amber-900/30'
                : 'bg-red-100 dark:bg-red-900/30',
          ]"
        >
          <Icon
            :name="
              importResult.status === 'complete' || importResult.status === 'completed'
                ? 'lucide:check-circle-2'
                : importResult.status === 'partial'
                  ? 'lucide:alert-triangle'
                  : 'lucide:x-circle'
            "
            :class="[
              'w-8 h-8',
              importResult.status === 'complete' || importResult.status === 'completed'
                ? 'text-green-500'
                : importResult.status === 'partial'
                  ? 'text-amber-500'
                  : 'text-red-500',
            ]"
          />
        </div>

        <!-- Status message -->
        <h2 class="text-xl font-black text-gray-900 dark:text-white mb-2">
          <template v-if="importResult.status === 'complete' || importResult.status === 'completed'">
            Import Complete
          </template>
          <template v-else-if="importResult.status === 'partial'">
            Import Partially Complete
          </template>
          <template v-else>
            Import Failed
          </template>
        </h2>

        <p
          v-if="importResult.status === 'partial'"
          class="text-amber-600 dark:text-amber-400 text-sm mb-4"
        >
          {{ importResult.rowsFailed }} row{{ importResult.rowsFailed !== 1 ? 's' : '' }} could not be imported.
        </p>
        <p
          v-else-if="importResult.status === 'failed'"
          class="text-red-600 dark:text-red-400 text-sm mb-4"
        >
          The import failed. Please check your CSV and try again.
        </p>

        <!-- Stats -->
        <div class="flex items-center justify-center gap-8 mb-8">
          <div class="text-center">
            <p class="text-2xl font-black text-green-600">{{ importResult.rowsSaved }}</p>
            <p class="text-xs text-gray-400 mt-0.5 font-semibold uppercase tracking-wide">Rows Saved</p>
          </div>
          <div class="text-center">
            <p :class="['text-2xl font-black', importResult.rowsFailed > 0 ? 'text-red-500' : 'text-gray-300']">
              {{ importResult.rowsFailed }}
            </p>
            <p class="text-xs text-gray-400 mt-0.5 font-semibold uppercase tracking-wide">Rows Failed</p>
          </div>
          <div class="text-center">
            <AppBadge :variant="statusVariant(importResult.status)" size="md">{{ importResult.status }}</AppBadge>
            <p class="text-xs text-gray-400 mt-1 font-semibold uppercase tracking-wide">Status</p>
          </div>
        </div>

        <div class="flex items-center justify-center gap-3">
          <AppButton variant="outline" @click="startOver">
            <Icon name="lucide:plus" class="w-4 h-4" />
            New Import
          </AppButton>
          <NuxtLink to="/admin/imports">
            <AppButton variant="primary">
              <Icon name="lucide:list" class="w-4 h-4" />
              View All Imports
            </AppButton>
          </NuxtLink>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

interface SeasonOption {
  id: number
  name: string
  tournament_name: string
}

interface PreviewResult {
  importId: string | number
  totalRows: number
  validRows: number
  errorRows: number
  validRowsData: Record<string, any>[]
  errorRowsData: { rowNumber: number; data: Record<string, any>; error: string }[]
}

interface ImportResult {
  status: string
  rowsSaved: number
  rowsFailed: number
}

const steps = ['Upload CSV', 'Preview Data', 'Complete']
const currentStep = ref(1)

// Step 1
const seasons = ref<SeasonOption[]>([])
const selectedSeasonId = ref<string | number>('')
const selectedImportType = ref('')
const csvInput = ref<HTMLInputElement | null>(null)
const csvFile = ref<File | null>(null)
const uploading = ref(false)
const uploadError = ref('')
const step1Errors = reactive({ season: '', importType: '', file: '' })

// Step 2
const previewResult = ref<PreviewResult | null>(null)
const confirming = ref(false)
const confirmError = ref('')
const importId = ref<string | number | null>(null)
const showErrors = ref(false)

// Step 3
const importResult = ref<ImportResult | null>(null)

// Column definitions per import type
const teamStatsColumns = ['team_name', 'played', 'wins', 'draws', 'losses', 'goals_for', 'goals_against', 'points', 'finish_position']
const playerStatsColumns = ['player_name', 'team_name', 'appearances', 'goals', 'assists', 'clean_sheets', 'motm', 'average_rating']

const previewColumns = computed(() => {
  return selectedImportType.value === 'team_stats' ? teamStatsColumns : playerStatsColumns
})

const errorTableFields = computed(() => {
  return selectedImportType.value === 'team_stats'
    ? ['team_name', 'played', 'points']
    : ['player_name', 'team_name', 'goals']
})

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const statusVariant = (status: string) => {
  const map: Record<string, any> = {
    complete: 'active', completed: 'active', partial: 'partial', failed: 'failed'
  }
  return map[status] ?? 'default'
}

const handleFileSelect = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    csvFile.value = file
    step1Errors.file = ''
  }
}

const clearFile = () => {
  csvFile.value = null
  if (csvInput.value) csvInput.value.value = ''
}

const validateStep1 = () => {
  step1Errors.season = ''
  step1Errors.importType = ''
  step1Errors.file = ''
  if (!selectedSeasonId.value) step1Errors.season = 'Please select a season.'
  if (!selectedImportType.value) step1Errors.importType = 'Please select an import type.'
  if (!csvFile.value) step1Errors.file = 'Please select a CSV file.'
  return !step1Errors.season && !step1Errors.importType && !step1Errors.file
}

const uploadAndPreview = async () => {
  if (!validateStep1()) return
  uploading.value = true
  uploadError.value = ''
  try {
    const formData = new FormData()
    formData.append('file', csvFile.value!)
    formData.append('season_id', String(selectedSeasonId.value))
    formData.append('import_type', selectedImportType.value)

    const res = await $fetch<{ data: PreviewResult }>('/api/admin/imports/upload', {
      method: 'POST',
      body: formData,
    })

    const d = res.data
    importId.value = d.importId
    previewResult.value = d
    currentStep.value = 2
  } catch (err: any) {
    uploadError.value = err?.data?.message ?? 'Upload failed. Please check your file and try again.'
  } finally {
    uploading.value = false
  }
}

const confirmImport = async () => {
  if (!importId.value) return
  confirming.value = true
  confirmError.value = ''
  try {
    const res = await $fetch<{ data: ImportResult }>('/api/admin/imports/confirm', {
      method: 'POST',
      body: { importId: importId.value },
    })
    importResult.value = res.data
    currentStep.value = 3
  } catch (err: any) {
    confirmError.value = err?.data?.message ?? 'Import confirmation failed. Please try again.'
  } finally {
    confirming.value = false
  }
}

const startOver = () => {
  currentStep.value = 1
  selectedSeasonId.value = ''
  selectedImportType.value = ''
  csvFile.value = null
  if (csvInput.value) csvInput.value.value = ''
  previewResult.value = null
  importResult.value = null
  importId.value = null
  uploadError.value = ''
  confirmError.value = ''
  showErrors.value = false
  step1Errors.season = ''
  step1Errors.importType = ''
  step1Errors.file = ''
}

onMounted(async () => {
  try {
    const res = await $fetch<{ data: { rows: SeasonOption[] } }>('/api/admin/seasons', {
      query: { limit: 200 },
    })
    // Flatten for the dropdown — try to handle different API shapes
    const rows = res?.data?.rows ?? (res as any)?.data ?? []
    seasons.value = Array.isArray(rows) ? rows : []
  } catch {
    seasons.value = []
  }
})
</script>
