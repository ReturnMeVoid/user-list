<script setup lang="ts">
const modelValue = defineModel({ default: "" })
</script>

<template>
  <input v-model="modelValue" class="input-field" autocomplete="off" />
</template>

<style scoped lang="scss" src="./style.scss" />
