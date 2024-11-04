<script setup lang="ts">
import type { User } from "@/modules/user"
import { BaseButton } from "@/ui"
import { computed } from "vue"

const { user } = defineProps<{ user: User }>()

const lastVisited = computed(() => {
  const date = new Date(user.lastVisitedAt * 1000)

  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit"
  })
})
</script>

<template>
  <li class="user-card">
    <div class="user-card__id-badge">ID #{{ user.id }}</div>

    <span class="user-card__full-name">
      {{ user.firstName }}&nbsp;{{ user.lastName }}
    </span>

    <ul class="user-card__properties">
      <li>
        <span class="user-card__property-label">e-mail:</span>
        {{ user.email }}
      </li>

      <li>
        <span class="user-card__property-label">last visited:</span>
        {{ lastVisited }}
      </li>
    </ul>

    <BaseButton class="user-card__edit-button">Edit</BaseButton>
  </li>
</template>

<style scoped lang="scss" src="./style.scss" />
