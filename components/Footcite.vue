<template>
  <span class="auriga-footcite-marker">
    [{{ displayLabels }}]
  </span>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useSlideContext } from '@slidev/client'
import { getCitationNumber, registerFootcite, loadBib } from '../utils/bib'

const props = defineProps<{
  citeKey?: string
  citeKeys?: string[]
  label?: string
  bibFile?: string
}>()

const { $page } = useSlideContext()
const page = ref(typeof $page?.value === 'number' ? $page.value : 1)

const allKeys = computed(() => {
  if (props.citeKeys && props.citeKeys.length > 0) return props.citeKeys
  if (props.citeKey) return [props.citeKey]
  return []
})

onMounted(async () => {
  if (props.bibFile) {
    await loadBib(props.bibFile)
  }
  // Register each key for this slide's footnote area
  for (const k of allKeys.value) {
    registerFootcite(page.value, k)
  }
})

const citationNumbers = computed(() => {
  return allKeys.value.map((k) => getCitationNumber(k))
})

const displayLabels = computed(() => {
  if (props.label) return props.label
  return citationNumbers.value.join(',')
})
</script>

<style scoped>
.auriga-footcite-marker {
  font-size: 0.8em;
  color: var(--auriga-blue);
  vertical-align: super;
  cursor: default;
  line-height: 1;
}
</style>
