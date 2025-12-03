import { bus, setupApp, preloadApp, startApp, destroyApp } from "wujie";

setupApp({ name: "vue-app", url: "http://localhost:5173/", exec: true, el: "#wujie-vue", sync: true })
setupApp({
  name: "react-app", url: "http://localhost:5174/", exec: true, el: "#wujie-react", sync: true,
  props: {
    age: 19,
    title: 'react'
  }
})

startApp({ name: "vue-app" });
startApp({ name: "react-app" });

const name = 'wujie host app'

window.sayHello = function () {
  return `Hi! I am ${name}`
}

// 使用 event bus 通讯
// 主应用监听
bus.$on('postHost', (args) => {
  alert(args)
})