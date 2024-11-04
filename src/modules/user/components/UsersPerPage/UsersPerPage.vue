<script setup lang="ts">
import { RangeInput } from "@/ui";
import { useQueryClient } from "@tanstack/vue-query";
import { ref } from "vue";
import { USERS_QUERY_ID } from "../../api/composables/useUsersQuery";

const pageSize = defineModel<number>("pageSize")
const inputValue = ref(pageSize.value);

const queryClient = useQueryClient()

const handleChange = () => {
  queryClient.cancelQueries({ queryKey: [USERS_QUERY_ID] })
  queryClient.removeQueries({ queryKey: [USERS_QUERY_ID] })
  pageSize.value = inputValue.value || 1
}

</script>

<template>
  <div class="users-per-page">
    Per page
    <span class="users-per-page__number">{{ inputValue || 1 }}</span>

    <RangeInput
      v-model.number="inputValue"
      step="5"
      min="0"
      max="25"
      @change="handleChange"
    />
  </div>
</template>

<style scoped lang="scss" src="./style.scss" />
