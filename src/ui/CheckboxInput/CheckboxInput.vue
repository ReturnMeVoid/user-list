<script setup lang="ts">
const modelValue = defineModel({ default: false })
</script>

<template>
  <input v-model="modelValue" type="checkbox" class="checkbox-input" />
</template>

<style scoped lang="scss" src="./style.scss" />
