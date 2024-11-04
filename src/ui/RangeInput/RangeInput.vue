<script setup lang="ts">
const [modelValue, { lazy }] = defineModel()
const event = lazy ? "change" : "input"

const handleUpdate = (event: Event) => {
  const input = event.target as HTMLInputElement
  modelValue.value = input.value
}
</script>

<template>
  <input
    :value="modelValue"
    type="range"
    class="range-input"
    @[event]="handleUpdate"
  />
</template>

<style scoped lang="scss" src="./style.scss" />
