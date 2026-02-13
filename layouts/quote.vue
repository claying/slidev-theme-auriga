<template>
  <div class="slidev-layout auriga-quote">
    <div class="quote-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.auriga-quote {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 80px;
  background: var(--auriga-bg);
  height: 100%;
}

.quote-content {
  max-width: 80%;
  border-left: 4px solid var(--auriga-dark-gray);
  padding-left: 1.5em;
}

.quote-content :deep(p) {
  font-size: 1.3em;
  font-style: italic;
  line-height: 1.5;
  color: var(--auriga-dark-gray);
  margin-bottom: 0.5em;
}

.quote-content :deep(p:last-child) {
  font-size: 0.9em;
  font-style: normal;
  color: var(--auriga-gray);
}
</style>
