<template>
  <div class="auriga-theorem" :style="theoremStyle">
    <div class="theorem-header">
      <span class="theorem-label" :style="{ color: borderColor }">
        {{ label }} {{ displayNumber }}
      </span>
      <span v-if="title" class="theorem-title"> ({{ title }})</span>
    </div>
    <div class="theorem-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getNextTheoremNumber } from '../utils/bib'

const props = withDefaults(defineProps<{
  type?: 'theorem' | 'lemma' | 'definition' | 'corollary' | 'proposition' | 'proof' | 'remark'
  title?: string
  number?: string
}>(), {
  type: 'theorem',
})

const typeColors: Record<string, string> = {
  theorem: '#2252a3',
  lemma: '#6b21a8',
  definition: '#0076ba',
  corollary: '#047857',
  proposition: '#0891b2',
  proof: '#4f4f4f',
  remark: '#929292',
}

const typeLabels: Record<string, string> = {
  theorem: 'Theorem',
  lemma: 'Lemma',
  definition: 'Definition',
  corollary: 'Corollary',
  proposition: 'Proposition',
  proof: 'Proof',
  remark: 'Remark',
}

const borderColor = computed(() => typeColors[props.type] ?? typeColors.theorem)

const autoNumber = ref(0)

onMounted(() => {
  if (!props.number) {
    autoNumber.value = getNextTheoremNumber(props.type)
  }
})

const displayNumber = computed(() => {
  if (props.number) return props.number
  return autoNumber.value > 0 ? autoNumber.value : ''
})

const label = computed(() => typeLabels[props.type] ?? 'Theorem')

const theoremStyle = computed(() => ({
  borderLeftColor: borderColor.value,
  backgroundColor: `${borderColor.value}14`,
}))
</script>

<style scoped>
.auriga-theorem {
  border-left: 3px solid;
  border-radius: 2px;
  margin: 1em 0;
  padding: 0.8em 1em;
}

.theorem-header {
  font-family: 'Roboto', 'Lato', sans-serif;
  margin-bottom: 0.4em;
}

.theorem-label {
  font-weight: 700;
}

.theorem-title {
  font-style: italic;
  color: var(--auriga-dark-gray);
}

.theorem-content :deep(p) {
  margin-bottom: 0.4em;
}

.theorem-content :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
