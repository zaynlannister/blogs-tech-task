<template>
  <div class="post">
    <div>
      <ArrowIcon @click="goToTheMain" />
    </div>
    <div class="post__content" v-if="!isFetching">
      <p><span class="post__title">Title:</span> {{ data?.title }}</p>
      <p class="post__body-container">
        <span class="post__body">Description:</span> {{ data?.body }}
      </p>
    </div>
    <div v-else>
      <AppLoader />
    </div>
  </div>
</template>

<script setup lang="ts">
import { $api } from '@/api'
import type { Post } from '@/interfaces'
import { useRoute, useRouter } from 'vue-router'
import ArrowIcon from '@/icons/ArrowIcon.vue'
import AppLoader from '@/components/AppLoader.vue'

const route = useRoute()
const router = useRouter()
const { data, isFetching } = $api(`/posts/${route.params.id}`).get().json<Post>()

function goToTheMain() {
  router.push({
    path: '/'
  })
}
</script>

<style lang="scss" scoped>
.post {
  &__content {
    border: 1px solid silver;
    padding: 20px 10px;
    margin-top: 20px;
    border-radius: 4px;
  }

  &__title,
  &__body {
    font-weight: bold;
  }

  &__body-container {
    margin-top: 10px;
  }
}
</style>
