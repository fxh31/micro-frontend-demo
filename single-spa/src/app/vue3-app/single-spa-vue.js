// 集成 single-spa

import { createApp } from 'vue'
import App from './src/App.vue'
import './src/style.css' // 样式会对其他应用造成影响

let domElVue;
let app;

export const bootstrap = (props) =>
  Promise.resolve().then(() => {
    // 集成 single-spa 时创建的挂载 dom 元素
    domElVue = document.createElement('div');
    domElVue.id = 'vue-app';
    document.body.appendChild(domElVue);
  })

export const mount = (props) => {
  return Promise.resolve().then(() => {
    app = createApp(App);
    app.mount(domElVue);
    // if (!app) {
    // }
  })
}

export const unmount = (props) => {
  return Promise.resolve().then(() => {
    app.unmount();
    // if (domElVue) {
    //   document.body.removeChild(domElVue);
    // }
    // domElVue = null;
    // app = null;
  })
}