<template>
  <div class="auriga-footnote">
    <slot />
  </div>
</template>

<style scoped>
.auriga-footnote {
  font-size: 0.7em;
  color: var(--auriga-gray);
  position: absolute;
  bottom: 36px;
  left: 50px;
  right: 50px;
}
</style>
