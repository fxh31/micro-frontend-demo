<template>
  <div class="detail-container">
    detail
    {{ count }}
  </div>
</template>

<script setup>
import {ref} from 'vue'
const count = ref(1)
</script>

<style lang="scss">
.detail-container {
  color: yellow;
}
</style>