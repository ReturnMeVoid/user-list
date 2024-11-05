<script setup lang="ts">
import { InputField } from "@/ui"

const modelValue = defineModel({ default: "" })
</script>

<template>
  <InputField v-model="modelValue" type="search" class="search-input" />
</template>

<style scoped lang="scss">
.search-input::-webkit-search-cancel-button {
  display: none;
}
</style>
