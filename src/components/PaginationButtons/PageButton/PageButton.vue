<script setup lang="ts">
import { BaseButton } from "@/ui"

defineProps<{
  value: number;
  isMaxPagesDefined: boolean;
}>()

const currentPage = defineModel("currentPage")
</script>

<template>
  <BaseButton
    :disabled="value == currentPage || !isMaxPagesDefined"
    :isActive="value == currentPage"
    size="sm"
    class="pagination-buttons__page-button"
    @mouseup="currentPage = value"
  >
    {{ value }}
  </BaseButton>
</template>

<style scoped lang="scss">
.pagination-buttons__page-button {
  padding: 0;
}
</style>
