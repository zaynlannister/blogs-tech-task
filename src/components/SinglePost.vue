<template>
  <div class="post">
    <p class="post__title">{{ post.title }}</p>
    <p class="post__body">{{ post.body }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '@/interfaces'

const props = defineProps<{
  post: Post
}>()

const { post } = props
</script>

<style scoped lang="scss">
.post {
  border: 1px solid silver;
  padding: 20px 10px;
  margin-bottom: 20px;
  border-radius: 4px;

  &__title {
    font-weight: 600;
    margin-bottom: 10px;
  }

  &__body {
    color: #404040;
  }
}
</style>
