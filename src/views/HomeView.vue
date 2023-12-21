<template>
  <p v-if="isLoading">Loading...</p>
  <div v-else>
    <SinglePost v-for="item in data" :key="item.id" :post="item" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SinglePost from '@/components/SinglePost.vue'
import type { Post } from '@/interfaces'

const data = ref<Post[]>([])
const isLoading = ref(true)

const fetchData = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (response.ok) {
      const result = await response.json()
      data.value = result
      isLoading.value = false
    } else {
      throw new Error('Error in data loading!')
    }
  } catch (error) {
    console.log(error)
    isLoading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped></style>
