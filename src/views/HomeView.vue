<template>
  <div>
    <div class="sort-content">
      <button @click="sortByTitle" class="button">{{ sortLabel }}</button>
    </div>
    <div>
      <SinglePost
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @on-view="openPost(post)"
        @on-comment="openComment(post)"
      />
    </div>
    <div class="load-content">
      <button v-if="!isFetching" @click="loadMore" class="button">{{ loadMoreLabel }}</button>
      <AppLoader v-else class="app-loader" />
    </div>
    <OnClickOutside @trigger="closeComments">
      <AppComments
        v-if="commentsData && isCommentsOpened"
        :comments="comments"
        @on-comments-close="closeComments"
      />
    </OnClickOutside>
  </div>
</template>

<script setup lang="ts">
import { $api } from '@/api'
import SinglePost from '@/components/SinglePost.vue'
import AppComments from '@/components/AppComments.vue'
import type { Comment, Post, Sorting } from '@/interfaces'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AppLoader from '@/components/AppLoader.vue'
import { OnClickOutside } from '@vueuse/components'

const router = useRouter()
const page = ref<number>(1)
const pageSize = ref<number>(5)
const posts = ref<Post[]>([])
const sorting = ref<Sorting>({})
const postId = ref<number>(1)
const comments = ref<Comment[]>([])
const isCommentsOpened = ref<boolean>(false)

const hasSorting = computed(() => Object.keys(sorting.value).length > 0)

// post params

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

// post fetch

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

// comments fetch

const {
  data: commentsData,
  execute: executeComments,
  onFetchResponse: onCommentsFetchResponse
} = $api(() => `/posts/${postId.value}/comments`)
  .get()
  .json()

onCommentsFetchResponse(async (data) => {
  const response = (await data.json()) as Comment[]

  comments.value.push(...response)
})

// loaders

const loadMoreLabel = computed(() => (isFetching.value ? 'Loading...' : 'Load more'))
const sortLabel = computed(() => (hasSorting.value ? 'Sort by default' : 'Sort by title'))

// functions

function openPost(post: Post) {
  router.push({
    name: 'post',
    params: {
      id: post.id
    }
  })
}

function openComment(post: Post) {
  comments.value = []
  postId.value = post.id

  executeComments()
  isCommentsOpened.value = true
}

function closeComments() {
  isCommentsOpened.value = false
}

function loadMore() {
  page.value++
  execute()
}

function sortByTitle() {
  if (sorting.value._sort) {
    delete sorting.value._sort
    posts.value = []
    execute()
  } else {
    sorting.value = {
      _sort: 'title'
    }
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
