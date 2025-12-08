import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

// 子应用加载过程中监听 micro-app 的全局事件
window.onmount = (data) => {
  console.log('子应用已经渲染', data)
}
window.onunmount = () => {
  // 执行卸载相关操作
  console.log('子应用已经卸载')
}