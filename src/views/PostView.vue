<template>
  <div>post page {{ $route.params }}</div>
  <div>{{ data }}</div>
</template>

<script setup lang="ts">
import { $api } from '@/api'
import { useRoute } from 'vue-router'

const route = useRoute()
const { data } = $api(`/posts/${route.params.id}`)
</script>

<style lang="scss" scoped></style>
