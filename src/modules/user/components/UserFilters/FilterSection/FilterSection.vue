<script setup lang="ts">
import { CheckboxWithLabel } from "@/components";
import { getYearBounds } from "@/lib";
import { useRouteQuery } from "@vueuse/router";
import { computed, reactive, ref, watchEffect } from "vue";

const YEARS = [2024, 2023, 2022, 2021] as const
type Year = typeof YEARS[number]

const lastVisitedFrom = useRouteQuery<number | undefined>("lastVisited_gte")
const lastVisitedTo = useRouteQuery<number | undefined>("lastVisited_lte")

const checkboxModelEntries: [Year, boolean][] = YEARS.map(year => [year, true])
const checkboxModels = reactive(Object.fromEntries(checkboxModelEntries))

const from = ref<Year | null>(null)
const to = ref<Year | null>(null)

watchEffect(() => {
  const checkedYears = Object.entries(checkboxModels)
    .filter(([, checked]) => checked)
    .map(([year]) => Number(year))

  const min = Math.min(...checkedYears) as Year
  const max = Math.max(...checkedYears) as Year

  from.value = checkedYears.length ? min : null
  to.value = checkedYears.length ? max : null
})

watchEffect(() => {
  const lowerLimit = from.value ? getYearBounds(from.value)[0] / 1000 : undefined
  const upperLimit = to.value ? getYearBounds(to.value)[1] / 1000 : undefined

  if (from.value === Math.min(...YEARS) && to.value === Math.max(...YEARS)) {
    lastVisitedFrom.value = undefined
    lastVisitedTo.value = undefined
  } else {
    lastVisitedFrom.value = lowerLimit
    lastVisitedTo.value = upperLimit
  }
})

const isCheckboxDisabled = computed(() => (year: Year) => {
  if (!from.value || !to.value) return false

  const isOutsideRange = year > from.value && year < to.value
  const isFarFromExtrema = year - to.value > 1 || from.value - year > 1

  return isOutsideRange || isFarFromExtrema
})
</script>

<template>
  <div class="filter-section">
    <CheckboxWithLabel
      v-for="(year, key) in YEARS"
      v-model="checkboxModels[year]"
      :disabled="isCheckboxDisabled(year)"
      :key
      class="filter-section__checkbox-with-label"
    >
      <template #label>
        <span class="filter-section__label">
          Last visited in <span class="accent-text">{{ year }}</span>
        </span>
      </template>
    </CheckboxWithLabel>
  </div>
</template>

<style scoped lang="scss" src="./style.scss" />
