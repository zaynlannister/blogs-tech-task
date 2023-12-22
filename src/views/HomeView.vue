<template>
  <div>
    <div class="sort-content">
      <button @click="sortByTitle" class="button">{{ sortLabel }}</button>
    </div>
    <div>
      <SinglePost v-for="post in posts" :key="post.id" :post="post" @on-view="openPost(post)" />
    </div>
    <div class="load-content">
      <button v-if="!isFetching" @click="loadMore" class="button">{{ loadMoreLabel }}</button>
      <AppLoader v-else class="app-loader" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { $api } from '@/api'
import SinglePost from '@/components/SinglePost.vue'
import type { Post, Sorting } from '@/interfaces'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AppLoader from '@/components/AppLoader.vue'

const router = useRouter()
const page = ref<number>(1)
const pageSize = ref<number>(5)
const posts = ref<Post[]>([])
const sorting = ref<Sorting>({})

const hasSorting = computed(() => Object.keys(sorting.value).length > 0)

const queryParams = computed(() => {
  const params: any = {
    _page: page.value,
    _limit: pageSize.value
  }

  for (const key in sorting.value) {
    params[key] = sorting.value[key]
  }

  return '?' + new URLSearchParams(params as any)
})

const { isFetching, execute, onFetchResponse } = $api(() => `/posts${queryParams.value}`)
  .get()
  .json<Post[]>()

onFetchResponse(async (data) => {
  const response = (await data.json()) as Post[]

  if (hasSorting.value && page.value === 1) {
    posts.value = []
  }

  posts.value.push(...response)
})

const loadMoreLabel = computed(() => (isFetching.value ? 'Loading...' : 'Load more'))
const sortLabel = computed(() => (hasSorting.value ? 'Sort by default' : 'Sort by title'))

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

function sortByTitle() {
  sorting.value = {
    _sort: 'title'
  }
}

watch(sorting, () => {
  page.value = 1
  execute()
})
</script>

<style scoped lang="scss">
.load-content {
  padding: 10px 0 30px 0;
}

.sort-content {
  padding-bottom: 10px;
}
</style>
