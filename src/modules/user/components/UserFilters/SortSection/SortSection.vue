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

const handleSort = (key: keyof typeof sortingProperties) => {
  if (key === sort.value) {
    if (order.value === "asc") {
      order.value = "desc"
      sort.value = key
    } else if (order.value === "desc") {
      order.value = undefined
      sort.value = undefined
    } else {
      order.value = "asc"
      sort.value = key
    }
  } else {
    order.value = "asc"
    sort.value = key
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
      class="sort-section__button"
      @mouseup="handleSort(key)"
    >
      Sort By {{ text }}&nbsp;

      <span class="arrow-icon">
        {{ sort === key && order === "asc" ? "⬆" : null }}
        {{ sort === key && order === "desc" ? "⬇" : null }}
      </span>
    </BaseButton>
  </div>
</template>

<style scoped lang="scss" src="./style.scss" />
