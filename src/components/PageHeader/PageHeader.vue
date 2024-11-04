<script setup lang="ts">
import { FluidContainer } from "@/ui"
</script>

<template>
  <header class="page-header">
    <FluidContainer class="page-header__inner">
      <slot />
    </FluidContainer>
  </header>
</template>

<style scoped lang="scss" src="./style.scss" />
