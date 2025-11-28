import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

let app;
function render(props = {}) {
  const { container } = props;
  app = createApp(App);

  if (container) {
    // 使用 qiankun 启动子应用，将应用挂载到 qiankun 主应用提供的 container 中
    app.provide('qiankun', props); // 注入全局使用
    app.mount(container);
  } else {
    // 单独启动子应用挂载
    app.mount('#app');
  }
}

renderWithQiankun({
  mount(props) {
    console.log('mount', props);
    render(props);
  },
  bootstrap() {
    console.log('bootstrap');
  },
  unmount(props) {
    console.log('unmount');
    app.unmount();
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}