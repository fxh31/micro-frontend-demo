import { createApp } from 'vue'
import App from './App.vue'
import router from "./routers"

let app;
async function bootstrap() {
  console.log('vue3 app bootstraped');
}

async function mount(props) {
  app = createApp(App)
  app.use(router)

  app.mount(props?.container || '#app')
}

async function unmount() {
  console.log('vue3 app unmount');
  app.unmount()
}

if (!window.__POWERED_BY_QIANKUN__) {
  mount()
}
window.qiankunLifecycle = {
  bootstrap,
  mount,
  unmount,
};

export { bootstrap, mount, unmount };