<template>
  <div class="auriga-block" :style="blockStyle">
    <div v-if="title" class="block-header">
      <span class="block-label" :style="{ color: color }">{{ title }}</span>
    </div>
    <div class="block-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type?: 'default' | 'info' | 'success' | 'warning' | 'danger' | 'example' | 'alert'
  title?: string
}>(), {
  type: 'default',
})

const typeColors: Record<string, string> = {
  default: '#4f4f4f',
  info: '#0076ba',
  success: '#047857',
  warning: '#b45309',
  danger: '#b51700',
  example: '#6b21a8',
  alert: '#b51700',
}

const color = computed(() => typeColors[props.type] ?? typeColors.default)

const blockStyle = computed(() => ({
  borderLeftColor: color.value,
  backgroundColor: `${color.value}14`,
}))
</script>

<style scoped>
.auriga-block {
  border-left: 3px solid;
  border-radius: 2px;
  margin: 1em 0;
  padding: 0.8em 1em;
}

.block-header {
  font-family: 'Roboto', 'Lato', sans-serif;
  margin-bottom: 0.4em;
}

.block-label {
  font-weight: 700;
}

.block-content :deep(p) {
  margin-bottom: 0.4em;
}

.block-content :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
