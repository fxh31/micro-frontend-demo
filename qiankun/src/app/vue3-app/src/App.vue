<template>
	<div class="container">
    <p>Vue3 Project</p>
    <p class="text">count: {{ count }}</p>
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'
const count = ref(1)
</script>

<style>
  .text {
    color: yellowgreen;
  }
</style>