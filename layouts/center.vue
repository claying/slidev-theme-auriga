<template>
  <div class="slidev-layout auriga-center">
    <div class="center-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.auriga-center {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 60px;
  background: var(--auriga-bg);
  height: 100%;
}

.center-content {
  text-align: center;
  max-width: 85%;
}
</style>
