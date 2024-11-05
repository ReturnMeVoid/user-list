<script setup lang="ts">
import { BaseButton, SearchInput } from "@/ui"
import { ref } from "vue"
import { useSearchHandler } from "./composables/useSearchHandler";

const {
  handleSearch,
  handleReset,
  searchFirstName,
  searchLastName,
  searchEmail,
} = useSearchHandler()

const firstNameValue = ref(searchFirstName.value)
const lastNameValue = ref(searchLastName.value)
const emailValue = ref(searchEmail.value)
</script>

<template>
  <form class="search-section" @submit.prevent="handleSearch" @reset="handleReset">
    <SearchInput v-model="firstNameValue" name="firstName" placeholder="First Name" />
    <SearchInput v-model="lastNameValue" name="lastName" placeholder="Last Name" />
    <SearchInput v-model="emailValue" name="email" placeholder="E-mail" />

    <div class="search-section__actions">
      <BaseButton type="submit">Search</BaseButton>
      <BaseButton type="reset">Reset</BaseButton>
    </div>
  </form>
</template>

<style scoped lang="scss" src="./style.scss" />
