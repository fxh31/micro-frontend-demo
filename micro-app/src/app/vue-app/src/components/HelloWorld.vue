<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()
const data = window.microApp.getData() 

const count = ref(0)

const handlePostMessage = () => {
  window.microApp.dispatch({
    type: 'vue-app-message',
    message: 'hi'
  }, (data: any[]) => {
    console.log(data)
  })
}

const handleSetGlobalData = () => {
  window.microApp.setGlobalData({
    count: count.value ++
  })
}

</script>

<template>
  <h1>{{ msg }}</h1>
  <h2>来自主应用的 setData - {{ data.count }}</h2>
  <p>
    Learn more about IDE Support for Vue in the

  </p>
  <button @click="handlePostMessage">发送主应用消息</button>
  <button @click="handleSetGlobalData">设置全局消息（用于跨应用，应用级别的 store）</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
