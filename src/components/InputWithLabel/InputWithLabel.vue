<script setup lang="ts">
import { htmlBooleanAttribute } from "@/lib"
import { InputField } from "@/ui"
import { computed, useAttrs, useId } from "vue"

defineProps<{ label?: string }>()
const modelValue = defineModel({ default: "" })

defineOptions({ inheritAttrs: false })

const id = useId()
const attrs = useAttrs()

const isRequired = computed(() => {
  if (!Object.prototype.hasOwnProperty.call(attrs, "required")) {
    return false
  }

  return htmlBooleanAttribute(attrs.required as string)
})
</script>

<template>
  <div class="input-with-label">
    <label :for="id" class="input-with-label__label">
      <slot name="label">{{ label }}</slot>
      <span v-if="isRequired" class="asterisk-icon">*</span>
    </label>

    <InputField v-bind="$attrs" v-model="modelValue" :id class="input-with-label__input" />
  </div>
</template>

<style scoped lang="scss" src="./style.scss" />
