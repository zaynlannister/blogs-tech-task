<template>
  <div class="header">
    <div class="header__text">Blogs</div>
    <div>
      <PostSearchForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import PostSearchForm from './PostSearchForm.vue'
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid silver;
  padding: 15px 0;
  margin-bottom: 25px;

  &__text {
    font-size: 20px;
  }
}
</style>
