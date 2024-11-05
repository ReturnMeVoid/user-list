<script setup lang="ts">
import { BaseButton } from "@/ui"
import { useTemplateRef, watch } from "vue"

defineProps<{ heading?: string }>()
const isOpen = defineModel({ default: false })

const emit = defineEmits<{
  open: [];
  close: [];
}>()

const dialog = useTemplateRef<HTMLDialogElement>("dialog")

const openDialog = () => {
  if (!dialog.value) return

  dialog.value.showModal()
  document.body.classList.add("modal-open")
  isOpen.value = true
  emit("open")
}

const closeDialog = () => {
  if (!dialog.value) return

  dialog.value.close()
  document.body.classList.remove("modal-open")
  isOpen.value = false
  emit("close")
}

watch(isOpen, (newValue) => {
  if (newValue) openDialog()
  else closeDialog()
})
</script>

<template>
  <Teleport to="body">
    <dialog v-bind="$attrs" ref="dialog" class="modal-dialog">
      <header class="modal-dialog__header">
        <h2 class="modal-dialog__heading">
          <slot name="heading">{{ heading }}</slot>
        </h2>

        <BaseButton size="sm" class="modal-dialog__close-button" @mouseup="closeDialog">
          ✖
        </BaseButton>
      </header>

      <main class="modal-dialog__content">
        <slot />
      </main>
    </dialog>
  </Teleport>
</template>

<style scoped lang="scss" src="./style.scss" />
