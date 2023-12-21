<template>
  <div class="post">
    <p class="post__title">{{ post.title }}</p>
    <p class="post__body">{{ post.body }}</p>
    <button class="post__button" @click="$emit('onView')">View</button>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '@/interfaces'

defineProps<{
  post: Post
}>()

defineEmits<{
  onView: []
}>()
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

  &__button {
    margin-top: 10px;
  }
}
</style>
