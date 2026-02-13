<template>
  <div class="slidev-layout auriga-two-cols-header">
    <div class="header">
      <slot />
    </div>
    <div class="columns">
      <div class="col-left">
        <slot name="left" />
      </div>
      <div class="col-right">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.auriga-two-cols-header {
  display: flex;
  flex-direction: column;
  padding: 40px 50px 30px;
  background: var(--auriga-bg);
  height: 100%;
  overflow: auto;
}

.header {
  margin-bottom: 1em;
}

.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2em;
  flex: 1;
  overflow: auto;
}

.col-left,
.col-right {
  overflow: auto;
}
</style>
