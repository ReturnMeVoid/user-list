<script setup lang="ts">
import type { APISortDirection } from "@/api"
import type { User } from "@/modules/user"
import { BaseButton } from "@/ui"
import { useRouteQuery } from "@vueuse/router"

const sort = useRouteQuery<keyof User | undefined>("sort")
const order = useRouteQuery<APISortDirection | undefined>("order")

const sortingProperties: Partial<Record<keyof User, string>> = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "E-mail",
}

const handleSort = (property: keyof typeof sortingProperties) => {
  if (sort.value !== property) {
    order.value = "asc"
    sort.value = property
    return
  }

  switch (order.value) {
    case "asc":
      order.value = "desc"
      sort.value = property
      break
    case "desc":
      order.value = undefined
      sort.value = undefined
      break
    case undefined:
      order.value = "asc"
      sort.value = property
      break
  }
}
</script>

<template>
  <div class="sort-section">
    <BaseButton
      v-for="(text, key) in sortingProperties"
      :key
      :isActive="sort === key && !!order"
      fullWidth
      class="sort-section__button sort-button"
      @mouseup="handleSort(key)"
    >
      Sort By {{ text }}&nbsp;

      <span :class="`sort-button__icon-wrapper sort-button__icon-wrapper_${order}`">
        <span v-show="sort === key" class="sort-button__icon" />
      </span>
    </BaseButton>
  </div>
</template>

<style scoped lang="scss" src="./style.scss" />
