<template>
  <div class="slidev-layout auriga-references">
    <h1>{{ title }}</h1>
    <div v-if="references.length" class="reference-list">
      <div v-for="ref in references" :key="ref.num" class="reference-entry">
        <span class="ref-num">[{{ ref.num }}]</span>
        <span class="ref-text">{{ ref.text }}</span>
      </div>
    </div>
    <div v-else class="no-references">
      <p>No references to display.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { getPaginatedReferences, loadBib } from '../utils/bib'

const props = withDefaults(defineProps<{
  page?: number
  perPage?: number
  bib?: string
}>(), {
  page: 1,
  perPage: 5,
})

onMounted(async () => {
  if (props.bib) {
    await loadBib(props.bib)
  }
})

const references = computed(() => {
  return getPaginatedReferences(props.page, props.perPage)
})

const title = computed(() => {
  if (props.page <= 1) return 'References'
  return 'References (cont.)'
})
</script>

<style scoped>
.auriga-references {
  padding: 40px 50px 30px;
  background: var(--auriga-bg);
  height: 100%;
  overflow: auto;
}

.auriga-references h1 {
  font-family: 'Roboto', 'Lato', sans-serif;
  font-weight: 700;
  font-size: 1.75em;
  margin-bottom: 0.8em;
  color: var(--auriga-fg);
}

.reference-list {
  display: flex;
  flex-direction: column;
  gap: 0.7em;
}

.reference-entry {
  display: flex;
  align-items: baseline;
  gap: 0.6em;
  font-size: 0.85em;
  line-height: 1.5;
}

.ref-num {
  color: var(--auriga-blue);
  font-weight: 700;
  flex-shrink: 0;
  min-width: 2em;
}

.ref-text {
  color: var(--auriga-dark-gray);
}

.no-references {
  color: var(--auriga-gray);
  font-style: italic;
}
</style>
