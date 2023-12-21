<template>
  <p v-if="isFetching">Loading...</p>
  <div v-else>
    <SinglePost v-for="item in data" :key="item.id" :post="item" @on-view="openPost(item)" />
  </div>
</template>

<script setup lang="ts">
import { $api } from '@/api'
import SinglePost from '@/components/SinglePost.vue'
import type { Post } from '@/interfaces'
import { useRouter } from 'vue-router'

const router = useRouter()
const { isFetching, data } = $api('/posts').get().json<Post[]>()

function openPost(post: Post) {
  router.push({
    name: 'post',
    params: {
      id: post.id
    }
  })
}
</script>

<style scoped></style>
