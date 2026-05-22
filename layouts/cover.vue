<template>
  <div class="slidev-layout auriga-cover">
    <div class="cover-content">
      <!-- Title / subtitle from slot -->
      <slot />

      <!-- Authors -->
      <div v-if="resolvedAuthors.length" class="cover-authors">
        <span
          v-for="(author, i) in resolvedAuthors"
          :key="i"
          class="cover-author-name"
        >
          {{ author.name }}<span v-if="i < resolvedAuthors.length - 1">,&ensp;</span>
        </span>
      </div>

      <!-- Institutions -->
      <div v-if="institutions.length" class="cover-institutions">
        <span
          v-for="(inst, i) in institutions"
          :key="i"
        >
          {{ inst }}<span v-if="i < institutions.length - 1"> · </span>
        </span>
      </div>

      <!-- Date -->
      <div v-if="date" class="cover-date">
        {{ date }}
      </div>
      <!-- Logos -->
      <div v-if="logos && logos.length" class="cover-logos">
        <img
          v-for="(logo, i) in logos"
          :key="i"
          :src="logo"
          class="cover-logo"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Author {
  name: string
  institution?: string
}

const props = defineProps<{
  authors?: Author[]
  date?: string
  logos?: string[]
}>()

const resolvedAuthors = computed<Author[]>(() => props.authors ?? [])

const institutions = computed(() => {
  const seen = new Set<string>()
  const result: string[] = []
  for (const a of resolvedAuthors.value) {
    if (a.institution && !seen.has(a.institution)) {
      seen.add(a.institution)
      result.push(a.institution)
    }
  }
  return result
})
</script>

<style scoped>
.auriga-cover {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 60px;
  background: var(--auriga-bg);
  height: 100%;
}

.cover-content {
  text-align: center;
  max-width: 85%;
}

.cover-logos {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5em;
  margin-bottom: 0em;
  padding-top: 4em;
}

.cover-logo {
  max-height: 60px;
  object-fit: contain;
}

.cover-content :deep(h1) {
  font-family: 'Roboto', 'Lato', sans-serif;
  font-weight: 700;
  font-size: 2.5em;
  line-height: 1.15;
  margin-bottom: 0.4em;
  color: var(--auriga-fg);
}

.cover-content :deep(h2) {
  font-family: 'Roboto', 'Lato', sans-serif;
  font-weight: 400;
  font-size: 1.2em;
  color: var(--auriga-dark-gray);
  margin-bottom: 0.3em;
}

.cover-content :deep(p) {
  font-size: 0.85em;
  color: var(--auriga-dark-gray);
  margin-bottom: 0.3em;
}

.cover-authors {
  margin-top: 1.2em;
  font-size: 0.95em;
  color: var(--auriga-fg);
}

.cover-institutions {
  margin-top: 0.4em;
  font-size: 0.8em;
  color: var(--auriga-dark-gray);
}

.cover-date {
  margin-top: 0.6em;
  font-size: 0.75em;
  color: var(--auriga-gray);
}
</style>
