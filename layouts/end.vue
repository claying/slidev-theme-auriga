<template>
  <div class="slidev-layout auriga-end">
    <div class="end-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.auriga-end {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 60px;
  background: var(--auriga-bg);
  height: 100%;
}

.end-content {
  text-align: center;
}

.end-content :deep(h1) {
  font-family: 'Roboto', 'Lato', sans-serif;
  font-weight: 700;
  font-size: 2.2em;
  color: var(--auriga-fg);
}

.end-content :deep(p) {
  font-size: 0.9em;
  color: var(--auriga-dark-gray);
  margin-top: 0.5em;
}
</style>
