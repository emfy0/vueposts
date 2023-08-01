<script setup>
import BasicHeader from '@/components/BasicHeader.vue'
</script>

<template>
  <header>
    <BasicHeader />
  </header>
  <div class="wrapper">
    <slot />
  </div>
</template>

<style scoped>
</style>

