import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

let app;
export async function bootstrap() {
  console.log('vue3 app bootstraped');
}

function render(props = {}) {
  const { container } = props;

  app = createApp(App);
  app.mount('#app');
}
export async function mount(props) {
  console.log('vue3 app mount', props);
  render(props);
}

export async function unmount() {
  console.log('vue3 app unmount');
  app.unmount()
}

if (!window.__POWERED_BY_QIANKUN__) {
  mount()
  console.log('no')
} else {
  console.log('yes')
}