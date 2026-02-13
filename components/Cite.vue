<template>
  <span class="auriga-cite" :title="tooltip">
    [{{ displayLabel }}]
  </span>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { getCitationNumber, getBibEntry, formatReference, loadBib } from '../utils/bib'

const props = defineProps<{
  citeKey?: string
  label?: string
  bibFile?: string
}>()

onMounted(async () => {
  if (props.bibFile) {
    await loadBib(props.bibFile)
  }
})

const displayLabel = computed(() => {
  if (props.label) return props.label
  if (props.citeKey) return getCitationNumber(props.citeKey)
  return '?'
})

const tooltip = computed(() => {
  if (!props.citeKey) return ''
  const entry = getBibEntry(props.citeKey)
  if (!entry) return props.citeKey
  return formatReference(entry)
})
</script>

<style scoped>
.auriga-cite {
  font-size: 0.8em;
  color: var(--auriga-blue);
  vertical-align: super;
  cursor: default;
  line-height: 1;
}
</style>
