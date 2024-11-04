<script setup lang="ts">
import SearchSection from "./SearchSection/SearchSection.vue"
import SortSection from "./SortSection/SortSection.vue"
</script>

<template>
  <aside class="user-filters">
    <SearchSection class="user-filters__form-panel" />
    <SortSection class="user-filters__form-panel" />
  </aside>
</template>

<style scoped lang="scss" src="./style.scss" />
