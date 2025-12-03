# qiankun demo

## 项目结构

```text
qiankun/
├── src/
│ ├── app/ # 子应用
│ │ ├── home # js + webpack
│ │ ├── vue3-app # vue3 + webpack
│ │ ├── vue3-app-vite # vue3 + vite
│ │
│ ├── store/ # 主应用全局状态
│ │ ├──index.js
│ │
│ ├── index.js # 主应用入口文件
│ ├── registerApp.js # 主应用注册子应用
│ ├── utils.js # 主应用工具函数（包含事件监听处理）
│ ├──...
├── index.html # 主应用模板（提供 dom 容器供子应用挂载）
```

## 项目启动

启动项目需要按照主应用注册的地址启动。当注册的子应用都启动完成后，主应用再启动进行访问。

```bash
npm run start # home
npm run server # vue3-app
npm run dev # vue3-app-vite

npm run start # qiankun
```