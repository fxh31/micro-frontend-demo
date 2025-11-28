import { registerMicroApps, start } from 'qiankun';
import { actions } from './store';

registerMicroApps([
  {
    name: 'home', // app name registered
    // entry: 'http://localhost:9001',
    entry: {
      scripts: [
        'http://localhost:9001/home.js', // 同上面的 entry
      ],
      html: 'http://localhost:9001/index.html',
    },
    container: '#home',
    activeRule: '/home',
    props: {
      appName: 'home-qiankun'
    }
  },
  {
    name: 'vue3-app-vite', // app name registered
    entry: '//localhost:5173/',
    container: '#vue3-app-vite',
    activeRule: (location) => location.pathname.startsWith("/vue3-vite"),
    // 传递给子应用进行通讯
    props: {
      name: 'qiankun-parent',
      appName: 'vue3-app-vite',
    },
  },
  {
    name: 'vue3-app-webpack',
    // entry: 'http://localhost:8082',
    entry: {
      scripts: ['http://localhost:8082/vue3-app.js'],
      styles: ['http://localhost:8082/public/css/style.css'], // 子应用样式打包后的地址
    },
    container: '#vue3-app-webpack',
    activeRule: '/vue3-webpack',
    // activeRule: (location) => location.pathname.startsWith("/vue3-webpack"),
  },
]);


start({
  sandbox: {
    // 开启严格的样式隔离。为每一个子应用包裹上一个 shadow dom 节点，确保子应用样式的不会影响全局
    strictStyleIsolation: true, // （开启后子应用样式将在主应用失效？scope 可能会，但有的时候又不会）
    // 开启样式隔离性，在子应用下面的样式都会包一个特殊的选择器规则来限定其影响范围
    // experimentalStyleIsolation: true,
  }
});

// 监听状态的变更
actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log('主应用', state, prev);
})
