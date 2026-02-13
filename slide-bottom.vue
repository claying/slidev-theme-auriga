<template>
  <div v-if="footnotes.length" class="footcite-area">
    <div v-for="fn in footnotes" :key="fn.num" class="footcite-entry">
      [{{ fn.num }}] {{ fn.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import { getSlideFootcites, getCitationNumber, getBibEntry, formatReference } from './utils/bib'

const { $page } = useSlideContext()
const pageNum = typeof $page?.value === 'number' ? $page.value : 1

const footnotes = computed(() => {
  const keys = getSlideFootcites(pageNum)
  return keys.map((k) => {
    const num = getCitationNumber(k)
    const entry = getBibEntry(k)
    const text = entry ? formatReference(entry) : k
    return { num, text }
  })
})
</script>

<style scoped>
.footcite-area {
  position: absolute;
  bottom: 28px;
  left: 50px;
  right: 50px;
  font-size: 0.65em;
  color: var(--auriga-gray);
  line-height: 1.4;
  border-top: 1px solid var(--auriga-light-gray);
  padding-top: 6px;
}

.footcite-entry {
  margin-bottom: 2px;
}
</style>
