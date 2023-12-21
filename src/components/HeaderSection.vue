<template>
  <div class="header">
    <p class="header__text">
      <slot></slot>
    </p>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.header {
  border-bottom: 1px solid silver;
  padding: 15px 0;
  margin-bottom: 25px;

  p {
    margin: 0;
  }

  &__text {
    font-size: 20px;
  }
}
</style>
