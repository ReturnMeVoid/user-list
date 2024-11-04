<script setup lang="ts">
import { computed } from "vue"

const { size, fullWidth, isActive } = defineProps<{
  size?: "sm" | "default";
  fullWidth?: boolean;
  isActive?: boolean;
}>()

const classes = computed(() => ({
  button: true,
  button_sm: size === "sm",
  button_full: fullWidth,
  button_active: isActive,
}))
</script>

<template>
  <button :class="classes">
    <slot />
  </button>
</template>

<style scoped lang="scss" src="./style.scss" />
