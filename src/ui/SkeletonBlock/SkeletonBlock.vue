<script setup lang="ts">
const {
  width = "auto",
  height = "auto",
  background = "#9eaad3",
  borderRadius = "0.25em",
} = defineProps<{
  width?: string;
  height?: string;
  background?: string;
  borderRadius?: string;
}>()
</script>

<template>
  <div class="skeleton-block" />
</template>

<style scoped lang="scss">
.skeleton-block {
  display: block;
  width: v-bind(width);
  height: v-bind(height);
  background: v-bind(background);
  border-radius: v-bind(borderRadius);
  box-shadow: 3px 3px 1px rgb(0 0 0 / 10%);
}
</style>
