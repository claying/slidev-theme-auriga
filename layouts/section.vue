<template>
  <div class="slidev-layout auriga-section">
    <div class="section-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.auriga-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 60px;
  background: var(--auriga-bg);
  height: 100%;
}

.section-content {
  text-align: center;
}

.section-content :deep(h1) {
  font-family: 'Roboto', 'Lato', sans-serif;
  font-weight: 700;
  font-size: 2.2em;
  color: var(--auriga-fg);
}

.section-content :deep(p) {
  font-size: 1em;
  color: var(--auriga-dark-gray);
  margin-top: 0.5em;
}
</style>
