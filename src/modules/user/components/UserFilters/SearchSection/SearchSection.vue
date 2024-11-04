<script setup lang="ts">
import { BaseButton, SearchInput } from "@/ui"
import { useRouteQuery } from "@vueuse/router"

const searchFirstName = useRouteQuery<string | undefined>("firstName_like")
const searchLastName = useRouteQuery<string | undefined>("lastName_like")
const searchEmail = useRouteQuery<string | undefined>("email_like")

const handleSearch = (event: Event) => {
  const form = event.target as HTMLFormElement
  const { firstName, lastName, email } = Object.fromEntries(new FormData(form))

  if (firstName) searchFirstName.value = firstName as string
  else searchFirstName.value = undefined

  if (lastName) searchLastName.value = lastName as string
  else searchLastName.value = undefined

  if (email) searchEmail.value = email as string
  else searchEmail.value = undefined
}

const handleReset = () => {
  searchFirstName.value = undefined
  searchLastName.value = undefined
  searchEmail.value = undefined
}
</script>

<template>
  <form class="search-section" @submit.prevent="handleSearch" @reset="handleReset">
    <SearchInput :value="searchFirstName" name="firstName" placeholder="First Name" />
    <SearchInput :value="searchLastName" name="lastName" placeholder="Last Name" />
    <SearchInput :value="searchEmail" name="email" placeholder="E-mail" />

    <div class="search-section__actions">
      <BaseButton type="submit">Search</BaseButton>
      <BaseButton type="reset">Reset</BaseButton>
    </div>
  </form>
</template>

<style scoped lang="scss">
.search-section__actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
</style>
