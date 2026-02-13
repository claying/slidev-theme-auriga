<template>
  <div class="auriga-block" :class="{ 'has-title': !!title }" :style="blockStyle">
    <div v-if="title" class="block-title" :style="titleStyle">
      {{ title }}
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

const blockStyle = computed(() =>
  props.title
    ? { '--block-color': color.value } as Record<string, string>
    : { borderLeft: `3px solid ${color.value}`, backgroundColor: `${color.value}0a` }
)

const titleStyle = computed(() => ({
  backgroundColor: color.value,
}))
</script>

<style scoped>
.auriga-block {
  border-radius: 4px;
  overflow: hidden;
  margin: 1em 0;
}

.auriga-block.has-title {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.block-title {
  font-family: 'Roboto', 'Lato', sans-serif;
  font-weight: 700;
  font-size: 0.9em;
  color: #ffffff;
  padding: 0.45em 1em;
}

.block-content {
  padding: 0.8em 1em;
}

.auriga-block.has-title .block-content {
  border-left: 3px solid var(--block-color);
}

.block-content :deep(p) {
  margin-bottom: 0.4em;
}

.block-content :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
