<template>
  <div>
    <div>
      <SinglePost v-for="post in posts" :key="post.id" :post="post" @on-view="openPost(post)" />
    </div>
    <div class="load-content">
      <button @click="loadMore">{{ loadMoreLabel }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { $api } from '@/api'
import SinglePost from '@/components/SinglePost.vue'
import type { Post } from '@/interfaces'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const page = ref<number>(1)
const pageSize = ref<number>(5)
const posts = ref<Post[]>([])

const { isFetching, execute, onFetchResponse } = $api(
  () => `/posts?page=${page.value}&_limit=${pageSize.value}`
)
  .get()
  .json<Post[]>()

onFetchResponse(async (data) => {
  const response = (await data.json()) as Post[]

  posts.value.push(...response)
})

const loadMoreLabel = computed(() => (isFetching.value ? 'Loading...' : 'Load more'))

function openPost(post: Post) {
  router.push({
    name: 'post',
    params: {
      id: post.id
    }
  })
}

function loadMore() {
  page.value++
  execute()
}
</script>

<style scoped lang="scss">
.load-content {
  padding: 10px 0 40px 0;
}
</style>
