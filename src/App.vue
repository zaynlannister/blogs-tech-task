<template>
  <div class="container">
    <AppHeader />
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
</script>

<style lang="scss" scoped></style>
