import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from "vite-plugin-qiankun"; // vite 应用需借助 qiankun 插件

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    qiankun('vue3-app-vite', {
      useDevMode: true,
    }),
  ],
  server: {
    origin: 'http://localhost:5173' // 定义开发调试阶段生成资源的origin。
  }
  // publicDir: '//localhost:5173',
  // base: 'localhost:5173'
  // base: '/base'
})
