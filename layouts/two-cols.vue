<template>
  <div class="slidev-layout auriga-two-cols">
    <div class="col-left">
      <slot />
    </div>
    <div class="col-right">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped>
.auriga-two-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2em;
  padding: 40px 50px 30px;
  background: var(--auriga-bg);
  height: 100%;
  overflow: auto;
}

.col-left,
.col-right {
  overflow: auto;
}
</style>
