<script setup lang="ts">
import { InputWithLabel, ModalDialog } from "@/components"
import type { User } from "@/modules/user"
import { USERS_QUERY_ID } from "@/modules/user/api/composables/useUsersQuery"
import { BaseButton, LoadingSpinner } from "@/ui"
import { useQueryClient } from "@tanstack/vue-query"
import { computed, ref } from "vue"
import { useEditUserMutation } from "../../api/composables/useEditUserMutation"

const { user } = defineProps<{ user?: User }>()
const isOpen = defineModel({ default: false })

const firstName = ref()
const lastName = ref()
const email = ref()

const onOpen = () => {
  if (!user) return

  firstName.value = user.firstName
  lastName.value = user.lastName
  email.value = user.email
}

const queryClient = useQueryClient()

const { mutate, isPending, isError, isSuccess } = useEditUserMutation(() => {
  queryClient.invalidateQueries({ queryKey: [USERS_QUERY_ID] })

  setTimeout(() => {
    isOpen.value = false
  }, 1200)
})

const handleEdit = (event: Event) => {
  const form = event.target as HTMLFormElement
  const { firstName, lastName, email } = Object.fromEntries(new FormData(form))

  if (!user) throw new Error('Cannot find user')

  mutate({
    id: user.id,
    firstName: firstName as string,
    lastName: lastName as string,
    email: email as string,
  })
}

const canSubmit = computed<boolean>(() => {
  if (firstName.value !== user?.firstName) return true
  if (lastName.value !== user?.lastName) return true
  return email.value !== user?.email
})
</script>

<template>
  <ModalDialog v-model="isOpen" class="user-edit-modal" @open="onOpen">
    <template #heading>
      Edit
      <span class="accent-text">User ID #{{ user?.id }}</span>
    </template>

    <form method="post" class="user-edit-modal__form" @submit.prevent="handleEdit">
      <InputWithLabel
        v-model="firstName"
        labelText="First Name"
        name="firstName"
        placeholder="Enter First Name..."
        minLength="2"
        required
      />

      <InputWithLabel
        v-model="lastName"
        labelText="Last Name"
        name="lastName"
        placeholder="Enter Last Name..."
        minLength="2"
        required
      />

      <InputWithLabel
        v-model="email"
        labelText="E-mail"
        name="email"
        placeholder="Enter E-mail..."
        type="email"
      />

      <div class="user-edit-modal__actions">
        <BaseButton fullWidth type="submit" :disabled="!canSubmit">
          <span v-if="isSuccess" class="user-edit-modal__success">Success</span>
          <span v-else-if="isError" class="user-edit-modal__error">Error</span>
          <LoadingSpinner v-else-if="isPending" />
          <template v-else>Submit</template>
        </BaseButton>

        <BaseButton :disabled="isPending" fullWidth @mouseup="isOpen = false">
          Cancel
        </BaseButton>
      </div>
    </form>
  </ModalDialog>
</template>

<style scoped lang="scss" src="./style.scss" />
