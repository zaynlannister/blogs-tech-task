<template>
  <div class="search">
    <input v-model="searchQuery" class="search__input" type="text" placeholder="Search..." />
    <div v-if="data && data.length > 0" class="search__results">
      <div v-for="post in data" :key="post.id" class="search__result" @click="openPost(post)">
        {{ post.title }}
      </div>
    </div>
    <div v-if="isFetching" class="search__loading">Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { $api } from '@/api'
import type { Post } from '@/interfaces'
import { useRouter } from 'vue-router'
import { debounce } from '@/helpers'

const router = useRouter()
const searchQuery = ref<string>('')
const { data, isFetching, execute } = $api(() => `/posts?q=${searchQuery.value}&_limit=5`, {
  immediate: false
})
  .get()
  .json<Post[]>()

watch(
  searchQuery,
  debounce((query) => {
    if (query.length > 1) {
      execute()
    } else {
      clearSearchResult()
    }
  }, 300)
)

function clearSearchResult() {
  data.value = []
}

function openPost(post: Post) {
  clearSearchResult()
  router.push({
    name: 'post',
    params: {
      id: post.id
    }
  })
}
</script>

<style scoped lang="scss">
.search {
  position: relative;

  &__input {
    padding: 6px 10px;
    outline: none;
  }

  &__results {
    width: 600px;
    position: absolute;
    background-color: #ffff;
    border: 1px solid #000;
    top: 42px;
    right: 0;
    padding: 10px 0;
  }

  &__result {
    border-bottom: 1px solid silver;
    padding: 10px;

    &:hover {
      cursor: pointer;
      background-color: #eee;
    }
  }

  &__loading {
    width: 600px;
    position: absolute;
    background-color: #ffff;
    border: 1px solid #000;
    top: 42px;
    right: 0;
    padding: 10px;
  }
}

@media (max-width: 641px) {
  .search {
    &__results {
      width: 400px;
    }
  }
}

@media (max-width: 441px) {
  .search {
    &__results {
      width: 300px;
    }
  }
}

@media (max-width: 341px) {
  .search {
    &__results {
      width: 250px;
    }
  }
}
</style>
