<template>
  <div class="post">
    <p class="post__title">{{ post.title }}</p>
    <p class="post__body">{{ post.body }}</p>
    <div class="post__icon">
      <EyeIcon @click="$emit('onView')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '@/interfaces'
import EyeIcon from '@/icons/EyeIcon.vue'

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
  padding: 20px 10px 10px;
  margin-bottom: 20px;
  border-radius: 4px;

  &__title {
    font-weight: 600;
    margin-bottom: 10px;
  }

  &__body {
    color: #404040;
  }

  &__icon {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
