import { ref } from 'vue'

export interface BibEntry {
  key: string
  type: string
  author?: string
  title?: string
  year?: string
  journal?: string
  booktitle?: string
  publisher?: string
  volume?: string
  number?: string
  pages?: string
  doi?: string
  url?: string
  [field: string]: string | undefined
}

// --- Global reactive state ---

const bibEntries = ref<Map<string, BibEntry>>(new Map())
const citationOrder = ref<string[]>([])
const theoremCounters = ref<Map<string, number>>(new Map())
let bibLoaded = false
let bibLoadingPromise: Promise<void> | null = null

// --- BibTeX Parser ---

export function parseBibTeX(raw: string): BibEntry[] {
  const entries: BibEntry[] = []
  // Match @type{key, ... } blocks
  const entryRegex = /@(\w+)\s*\{([^,]+),\s*([\s\S]*?)(?=\n@|\n*$)/g
  let match: RegExpExecArray | null

  while ((match = entryRegex.exec(raw)) !== null) {
    const type = match[1].toLowerCase()
    const key = match[2].trim()

    if (type === 'comment' || type === 'preamble' || type === 'string') continue

    const body = match[3]
    const entry: BibEntry = { key, type }

    // Parse fields: fieldname = {value} or fieldname = "value" or fieldname = number
    const fieldRegex = /(\w+)\s*=\s*(?:\{([^}]*(?:\{[^}]*\}[^}]*)*)\}|"([^"]*)"|(\d+))/g
    let fieldMatch: RegExpExecArray | null

    while ((fieldMatch = fieldRegex.exec(body)) !== null) {
      const fieldName = fieldMatch[1].toLowerCase()
      const value = (fieldMatch[2] ?? fieldMatch[3] ?? fieldMatch[4] ?? '').trim()
      entry[fieldName] = value
    }

    entries.push(entry)
  }

  return entries
}

// --- BibTeX Loading ---

export async function loadBib(path: string): Promise<void> {
  if (bibLoaded) return
  if (bibLoadingPromise) return bibLoadingPromise

  bibLoadingPromise = (async () => {
    try {
      const response = await fetch(path)
      if (!response.ok) {
        console.warn(`[auriga] Failed to load bib file: ${path} (${response.status})`)
        return
      }
      const raw = await response.text()
      const entries = parseBibTeX(raw)
      for (const entry of entries) {
        bibEntries.value.set(entry.key, entry)
      }
      bibLoaded = true
    } catch (e) {
      console.warn(`[auriga] Error loading bib file: ${path}`, e)
    }
  })()

  return bibLoadingPromise
}

// --- Citation Registry ---

export function registerCitation(key: string): number {
  const idx = citationOrder.value.indexOf(key)
  if (idx >= 0) return idx + 1
  citationOrder.value.push(key)
  return citationOrder.value.length
}

export function getCitationNumber(key: string): number {
  const idx = citationOrder.value.indexOf(key)
  if (idx >= 0) return idx + 1
  return registerCitation(key)
}

export function getBibEntry(key: string): BibEntry | undefined {
  return bibEntries.value.get(key)
}

// --- Format Reference ---

function formatAuthors(raw: string): string {
  // BibTeX uses "and" to separate authors
  const authors = raw.split(/\s+and\s+/)
  if (authors.length === 1) return authors[0]
  if (authors.length === 2) return `${authors[0]} and ${authors[1]}`
  return `${authors[0]} et al.`
}

export function formatReference(entry: BibEntry): string {
  const parts: string[] = []
  if (entry.author) parts.push(formatAuthors(entry.author) + '.')
  if (entry.title) parts.push(entry.title + '.')
  if (entry.journal) parts.push(entry.journal + ',')
  else if (entry.booktitle) parts.push(entry.booktitle + ',')
  if (entry.year) parts.push(entry.year + '.')
  return parts.join(' ')
}

// --- Per-slide Footcite Registry ---

const slideFootcites = ref<Map<number, string[]>>(new Map())

export function registerFootcite(page: number, key: string): void {
  const existing = slideFootcites.value.get(page) ?? []
  if (!existing.includes(key)) {
    slideFootcites.value.set(page, [...existing, key])
  }
}

export function getSlideFootcites(page: number): string[] {
  return slideFootcites.value.get(page) ?? []
}

// --- Paginated References ---

export function getPaginatedReferences(page: number, perPage: number): Array<{ num: number; text: string }> {
  const start = (page - 1) * perPage
  const end = start + perPage
  const keys = citationOrder.value.slice(start, end)
  return keys.map((k) => {
    const entry = bibEntries.value.get(k)
    return {
      num: getCitationNumber(k),
      text: entry ? formatReference(entry) : k,
    }
  })
}

export function getTotalReferencePages(perPage: number): number {
  return Math.ceil(citationOrder.value.length / perPage)
}

// --- Theorem Counters ---

export function getNextTheoremNumber(type: string): number {
  const current = theoremCounters.value.get(type) ?? 0
  const next = current + 1
  theoremCounters.value.set(type, next)
  return next
}

// --- Composable ---

export function useBib() {
  return {
    bibEntries,
    citationOrder,
    theoremCounters,
    slideFootcites,
    loadBib,
    parseBibTeX,
    registerCitation,
    getCitationNumber,
    getBibEntry,
    formatReference,
    getNextTheoremNumber,
    registerFootcite,
    getSlideFootcites,
    getPaginatedReferences,
    getTotalReferencePages,
  }
}
