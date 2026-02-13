<template>
  <span class="auriga-highlight" :style="{ color: color }">
    <slot />
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  color?: string
}>(), {
  color: '#2252a3',
})
</script>

<style scoped>
.auriga-highlight {
  font-weight: inherit;
  font-style: inherit;
}
</style>
