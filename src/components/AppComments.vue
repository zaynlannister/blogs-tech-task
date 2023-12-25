<template>
  <div class="comments">
    <div class="comments__header">
      <CloseIcon @click="$emit('onCommentsClose')" class="comments__header-icon" />
      <p class="comments__header-text">Comments</p>
    </div>
    <div v-if="comments.length">
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <p class="comment__name">name: {{ comment.name }}</p>
        <p>{{ comment.body }}</p>
      </div>
    </div>
    <div v-else class="comments__loader">
      <AppLoader />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Comment } from '@/interfaces/index'
import CloseIcon from '@/icons/CloseIcon.vue'
import AppLoader from '@/components/AppLoader.vue'

defineProps<{
  comments: Comment[]
}>()

defineEmits<{
  onCommentsClose: []
}>()
</script>

<style scoped lang="scss">
.comments {
  width: 500px;
  background-color: #fff;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  border-left: 1px solid silver;
  padding: 20px;
  overflow-y: auto;

  &__header {
    position: relative;
    border-bottom: 1px solid silver;
    padding-bottom: 10px;
    margin-bottom: 10px;

    &-icon {
      position: absolute;
    }

    &-text {
      text-align: center;
      font-weight: 500;
      font-size: 20px;
    }
  }

  &__loader {
    display: flex;
    justify-content: center;
  }
}

.comment {
  border-bottom: 1px solid silver;
  margin-bottom: 10px;
  padding: 0 0 10px 0;

  &__name {
    margin-bottom: 5px;
    font-weight: 500;
  }
}

@media (max-width: 700px) {
  .comments {
    width: 400px;
  }
}

@media (max-width: 560px) {
  .comments {
    width: 300px;
  }
}

@media (max-width: 400px) {
  .comments {
    width: 100%;
  }
}
</style>
