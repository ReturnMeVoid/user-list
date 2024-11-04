<script setup lang="ts">
const {
  is = "div"
} = defineProps<{
  is?: string | object
}>()
</script>

<template>
  <component :is="is" class="fluid-container">
    <slot />
  </component>
</template>

<style scoped lang="scss">
.fluid-container {
  max-width: 1050px;
  padding: 0 16px;
  margin: 0 auto;
}
</style>
