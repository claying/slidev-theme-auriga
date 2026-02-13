<template>
  <footer v-if="showFooter" class="auriga-footer">
    <span class="page-number">{{ displayPage }} / {{ mainTotal }}</span>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $nav } = useSlideContext()

const endSlideIndex = computed(() => {
  const slides = $nav.value.slides
  for (let i = 0; i < slides.length; i++) {
    const layout = slides[i]?.meta?.layout
      || (slides[i]?.no === 1 ? 'cover' : 'default')
    if (layout === 'end') {
      return slides[i].no
    }
  }
  return $nav.value.total
})

const mainTotal = computed(() => endSlideIndex.value - 2)
const displayPage = computed(() => $nav.value.currentPage - 1)

const showFooter = computed(() => {
  const layout = $nav.value.currentLayout
  const page = $nav.value.currentPage
  if (layout === 'cover' || layout === 'end' || layout === 'references') return false
  if (page >= endSlideIndex.value) return false
  return true
})
</script>

<style scoped>
.auriga-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 50px;
  display: flex;
  justify-content: flex-end;
  pointer-events: none;
  z-index: 10;
}

.page-number {
  font-family: 'Lato', sans-serif;
  font-size: 0.75em;
  color: var(--auriga-dark-gray);
}
</style>
