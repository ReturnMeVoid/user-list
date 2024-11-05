<script setup lang="ts">
import { InputWithLabel, ModalDialog } from "@/components"
import type { User } from "@/modules/user"
import { BaseButton, LoadingSpinner } from "@/ui"
import { computed, ref, toRef } from "vue"
import { useEditUserHandler } from "./composables/useEditUserHandler"

const { user } = defineProps<{ user?: User }>()
const isOpen = defineModel({ default: false })

const {
  handleEditUser,
  isPending,
  isError,
  isSuccess
} = useEditUserHandler(toRef(() => user), isOpen)

const firstName = ref()
const lastName = ref()
const email = ref()

const onOpen = () => {
  if (!user) return

  firstName.value = user.firstName
  lastName.value = user.lastName
  email.value = user.email
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

    <form method="post" class="user-edit-modal__form" @submit.prevent="handleEditUser">
      <InputWithLabel
        v-model="firstName"
        label="First Name"
        name="firstName"
        placeholder="Enter First Name..."
        minLength="2"
        required
      />

      <InputWithLabel
        v-model="lastName"
        label="Last Name"
        name="lastName"
        placeholder="Enter Last Name..."
        minLength="2"
        required
      />

      <InputWithLabel
        v-model="email"
        label="E-mail"
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
