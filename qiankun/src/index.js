import { registerMicroApps, start } from 'qiankun';
import { actions } from './store';

registerMicroApps([
  // {
  //   name: 'home', // app name registered
  //   entry: '//localhost:9001/home.js',
  //   container: '#home',
  //   activeRule: '/home',
  // },
  {
    name: 'vue3-app-vite', // app name registered
    entry: '//localhost:5173',
    container: '#vue3-app-vite',
    activeRule: (location) => location.pathname.startsWith("/vue3-vite"),
    // 传递给子应用进行通讯
    props: {
      name: 'qiankun-parent',
      appName: 'vue3-app-vite',
    },
  },
  // {
  //   name: 'vue app',
  //   entry: { scripts: ['//localhost:5173/'] },
  //   container: '#vue3_app',
  //   activeRule: '/vue3',
  // },
]);

const btn_home = document.querySelector('#btn_home')
const btn_vue3_vite = document.querySelector('#btn_vue3_vite')
const btn_change_state = document.querySelector('#change_state')
btn_home.addEventListener('click', () => {
  // console.log('btn_home')
  // console.log(window.microApp)
  window.history.pushState({}, '', '/home')
})
btn_vue3_vite.addEventListener('click', () => {
  window.history.pushState({}, '', '/vue3-vite')
})
btn_change_state.addEventListener('click', () => {
  // 主应用变更状态
  actions.setGlobalState({
    name: 'qiankun-change-name'
  });
})

start({
  sandbox: {
    // 开启严格的样式隔离。为每一个子应用包裹上一个 shadow dom 节点，确保子应用样式的不会影响全局
    // strictStyleIsolation: true, // 开启后子应用样式将在主应用失效
    // 开启样式隔离性，在子应用下面的样式都会包一个特殊的选择器规则来限定其影响范围
    // experimentalStyleIsolation: true,
  }
});

// 监听状态的变更
actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log('主应用', state, prev);
})

