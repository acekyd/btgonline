<template>
  <div class="max-w-5xl">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <NuxtLink to="/admin/imports" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <h1 class="text-xl font-black text-[#001D3D] dark:text-white">New Import</h1>
    </div>

    <!-- Stepper -->
    <div class="flex items-center gap-0 mb-8">
      <div v-for="(step, idx) in steps" :key="step" class="flex items-center">
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
              currentStep === idx + 1 ? 'text-[#001D3D] dark:text-white' : 'text-gray-400 dark:text-gray-500',
            ]"
          >{{ step }}</span>
        </div>
        <div v-if="idx < steps.length - 1" class="h-px w-8 sm:w-16 bg-gray-200 dark:bg-gray-700 mx-2" />
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════
         STEP 1 — Upload
    ════════════════════════════════════════════════ -->
    <template v-if="currentStep === 1">
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
        <h2 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-5">Upload CSV</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <!-- Season -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Season <span class="text-[#E30613]">*</span>
            </label>
            <select
              v-model="selectedSeasonId"
              class="input-field"
              :class="{ 'border-red-400': step1Errors.season }"
            >
              <option value="">Select season...</option>
              <option v-for="s in seasons" :key="s.id" :value="s.id">
                {{ s.name }} ({{ s.tournament_name }})
              </option>
            </select>
            <p v-if="step1Errors.season" class="mt-1 text-xs text-red-500">{{ step1Errors.season }}</p>
          </div>

          <!-- Import Type -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Import Type <span class="text-[#E30613]">*</span>
            </label>
            <select
              v-model="selectedImportType"
              class="input-field"
              :class="{ 'border-red-400': step1Errors.importType }"
            >
              <option value="">Select type...</option>
              <option value="team_stats">Team Stats</option>
              <option value="player_stats">Player Stats</option>
            </select>
            <p v-if="step1Errors.importType" class="mt-1 text-xs text-red-500">{{ step1Errors.importType }}</p>
          </div>
        </div>

        <!-- File Input -->
        <div class="mb-6">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            CSV File <span class="text-[#E30613]">*</span>
          </label>
          <div
            class="border-2 border-dashed rounded-xl p-6 text-center transition-colors"
            :class="[
              csvFile
                ? 'border-green-300 bg-green-50 dark:bg-green-900/10 dark:border-green-700'
                : 'border-gray-200 dark:border-gray-600 hover:border-[#E30613]/50 hover:bg-gray-50 dark:hover:bg-gray-700/30',
              step1Errors.file ? 'border-red-300 bg-red-50 dark:bg-red-900/10' : ''
            ]"
          >
            <input
              ref="csvInput"
              type="file"
              accept=".csv"
              class="hidden"
              @change="handleFileSelect"
            />
            <div v-if="csvFile" class="flex items-center justify-center gap-3">
              <Icon name="lucide:file-text" class="w-8 h-8 text-green-500" />
              <div class="text-left">
                <p class="font-semibold text-gray-800 dark:text-gray-200 text-sm">{{ csvFile.name }}</p>
                <p class="text-xs text-gray-400">{{ formatFileSize(csvFile.size) }}</p>
              </div>
              <button type="button" @click="clearFile" class="ml-2 text-gray-400 hover:text-red-500 transition-colors">
                <Icon name="lucide:x" class="w-4 h-4" />
              </button>
            </div>
            <div v-else>
              <Icon name="lucide:upload-cloud" class="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
              <p class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Drop your CSV here or click to browse</p>
              <p class="text-xs text-gray-400">Only .csv files are accepted</p>
              <AppButton variant="outline" size="sm" type="button" class="mt-3" @click="csvInput?.click()">
                Browse File
              </AppButton>
            </div>
          </div>
          <p v-if="step1Errors.file" class="mt-1 text-xs text-red-500">{{ step1Errors.file }}</p>
        </div>

        <div v-if="uploadError" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{{ uploadError }}</div>

        <AppButton variant="primary" :loading="uploading" @click="uploadAndPreview">
          <Icon name="lucide:upload" class="w-4 h-4" />
          Upload &amp; Preview
        </AppButton>
      </div>
    </template>

    <!-- ═══════════════════════════════════════════════
         STEP 2 — Preview
    ════════════════════════════════════════════════ -->
    <template v-if="currentStep === 2 && previewResult">
      <!-- Summary bar -->
      <div class="grid grid-cols-3 gap-4 mb-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 text-center">
          <p class="text-2xl font-black text-[#001D3D] dark:text-white">{{ previewResult.totalRows }}</p>
          <p class="text-xs text-gray-400 mt-0.5 font-semibold uppercase tracking-wide">Total Rows</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-green-100 dark:border-green-800 shadow-sm p-4 text-center">
          <p class="text-2xl font-black text-green-600">{{ previewResult.validRows }}</p>
          <p class="text-xs text-gray-400 mt-0.5 font-semibold uppercase tracking-wide">Valid Rows</p>
        </div>
        <div
          :class="[
            'rounded-xl border shadow-sm p-4 text-center',
            previewResult.errorRows > 0
              ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800'
              : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700',
          ]"
        >
          <p :class="['text-2xl font-black', previewResult.errorRows > 0 ? 'text-orange-600' : 'text-gray-400']">
            {{ previewResult.errorRows }}
          </p>
          <p class="text-xs text-gray-400 mt-0.5 font-semibold uppercase tracking-wide">Error Rows</p>
        </div>
      </div>

      <!-- Error rows table -->
      <div v-if="previewResult.errorRows > 0" class="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-700 rounded-xl p-5 mb-6">
        <div class="flex items-center gap-2 mb-3">
          <Icon name="lucide:alert-triangle" class="w-4 h-4 text-orange-500" />
          <h3 class="text-sm font-bold text-orange-700 dark:text-orange-400">
            {{ previewResult.errorRows }} row{{ previewResult.errorRows !== 1 ? 's' : '' }} have errors and will be skipped
          </h3>
        </div>
        <div class="overflow-x-auto rounded-lg border border-orange-200 dark:border-orange-700">
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
        <div class="px-5 py-3 border-b border-gray-100 dark:border-gray-700">
          <h3 class="text-sm font-bold text-gray-700 dark:text-gray-300">
            Preview — valid rows
            <span class="ml-1 text-xs font-normal text-gray-400">(showing up to 100)</span>
          </h3>
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
                v-for="(row, i) in previewResult.validRowsData?.slice(0, 100)"
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

      <div v-if="confirmError" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{{ confirmError }}</div>

      <div class="flex items-center gap-3">
        <AppButton
          variant="primary"
          :disabled="previewResult.validRows === 0"
          :loading="confirming"
          @click="confirmImport"
        >
          <Icon name="lucide:check" class="w-4 h-4" />
          Confirm Import
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
                ? 'bg-orange-100 dark:bg-orange-900/30'
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
                  ? 'text-orange-500'
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
          class="text-orange-600 dark:text-orange-400 text-sm mb-4"
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
          <AppButton variant="primary" @click="startOver">New Import</AppButton>
          <NuxtLink to="/admin/imports">
            <AppButton variant="outline">View Imports</AppButton>
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

const steps = ['Upload', 'Preview', 'Complete']
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

<style scoped>
@reference "tailwindcss";
.input-field {
  @apply w-full px-3.5 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E30613]/30 focus:border-[#E30613] transition-colors;
}
</style>
