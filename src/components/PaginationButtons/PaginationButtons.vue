<script setup lang="ts">
import { BaseButton } from "@/ui"
import { computed, ref, watch } from "vue"
import PageButton from "./PageButton/PageButton.vue"

const MAX_BUTTON_COUNT = 5

const props = defineProps<{
  maxPages?: number | null;
}>()

const currentPage = defineModel<number>("page", { default: 1 })

const maxPagesState = ref(props.maxPages ?? MAX_BUTTON_COUNT)

watch(() => props.maxPages, (newMaxPages) => {
  if (typeof newMaxPages === "number") {
    maxPagesState.value = newMaxPages
  }
})

const isMaxPagesDefined = computed(() => typeof props.maxPages === "number")

const isPrevButtonDisabled = computed(() => {
  return currentPage.value === 1 || !isMaxPagesDefined.value
})

const isNextButtonDisabled = computed(() => {
  return currentPage.value === maxPagesState.value || !isMaxPagesDefined.value
})

const buttons = computed<number[]>(() => {
  const pages: number[] = []
  const buttonCount = Math.min(maxPagesState.value, MAX_BUTTON_COUNT)
  const offset = Math.floor(buttonCount / 2)

  const startPage = Math.max(1, Math.min(
    currentPage.value - offset,
    maxPagesState.value - buttonCount + 1
  ))

  const endPage = Math.min(maxPagesState.value, startPage + buttonCount - 1)

  for (let i = startPage + 1; i < endPage; i++) {
    pages.push(i)
  }

  pages.unshift(1)
  if (maxPagesState.value > 1) pages.push(maxPagesState.value)

  return pages
})
</script>

<template>
  <div class="pagination-buttons">
    <BaseButton
      :disabled="isPrevButtonDisabled"
      size="sm"
      class="pagination-buttons__navigate-button"
      @mouseup="currentPage--"
    >
      ❮
    </BaseButton>

    <PageButton
      v-for="value in buttons"
      v-model:currentPage="currentPage"
      :key="value"
      :value
      :isMaxPagesDefined="isMaxPagesDefined"
    />

    <BaseButton
      :disabled="isNextButtonDisabled"
      size="sm"
      class="pagination-buttons__navigate-button"
      @mouseup="currentPage++"
    >
      ❯
    </BaseButton>
  </div>
</template>

<style scoped lang="scss" src="./style.scss" />
