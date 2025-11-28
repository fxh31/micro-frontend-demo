<template>
  <div class="main-container">
    home
    {{ count }}
  </div>
</template>

<script setup>
import {ref} from 'vue'
const count = ref(1)
</script>

<style lang="scss">
.main-container {
  color: blue;
}
</style>
