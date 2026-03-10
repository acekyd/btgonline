import Papa from 'papaparse'

export interface ParsedCSV {
  data: Record<string, string>[]
  errors: string[]
}

export function parseCSV(content: string): ParsedCSV {
  const result = Papa.parse<Record<string, string>>(content, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim().toLowerCase().replace(/\s+/g, '_')
  })

  const errors = result.errors.map(e => `Row ${e.row}: ${e.message}`)

  const data = result.data.map(row => {
    const normalized: Record<string, string> = {}
    for (const [k, v] of Object.entries(row)) {
      normalized[k.trim()] = typeof v === 'string' ? v.trim() : String(v ?? '')
    }
    return normalized
  })

  return { data, errors }
}
