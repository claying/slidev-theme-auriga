<template>
  <div class="slidev-layout auriga-fact">
    <div class="fact-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.auriga-fact {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 60px;
  background: var(--auriga-bg);
  height: 100%;
}

.fact-content {
  text-align: center;
  max-width: 80%;
}

.fact-content :deep(h1) {
  font-family: 'Roboto', 'Lato', sans-serif;
  font-weight: 700;
  font-size: 3em;
  color: var(--auriga-fg);
  margin-bottom: 0.3em;
}

.fact-content :deep(p) {
  font-size: 1.1em;
  color: var(--auriga-dark-gray);
}
</style>
