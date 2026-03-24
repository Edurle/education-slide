<script setup lang="ts">
defineProps<{
  content: string  // SVG 字符串
}>()
</script>

<template>
  <div class="svg-container" v-html="content"></div>
</template>

<style scoped>
.svg-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
.svg-container :deep(svg) {
  width: 100%;
  height: auto;
  max-width: 100%;
}
</style>
