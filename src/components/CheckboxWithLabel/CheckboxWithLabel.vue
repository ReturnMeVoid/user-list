<script setup lang="ts">
import { CheckboxInput } from "@/ui"
import { computed, useAttrs } from "vue"

defineProps<{ label?: string }>()
const modelValue = defineModel({ default: false })

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const classes = computed(() => ({
  "checkbox-with-label": true,
  "checkbox-with-label_disabled": attrs.disabled,
}))
</script>

<template>
  <label :class="classes">
    <CheckboxInput v-bind="$attrs" v-model="modelValue" />

    <span class="checkbox-with-label__label">
      <slot name="label">{{ label }}</slot>
    </span>
  </label>
</template>

<style scoped lang="scss" src="./style.scss" />
