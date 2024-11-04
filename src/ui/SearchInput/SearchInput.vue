<script setup lang="ts">
import { InputField } from "@/ui"
</script>

<template>
  <InputField type="search" class="search-input" />
</template>

<style scoped lang="scss">
.search-input::-webkit-search-cancel-button {
  display: none;
}
</style>
