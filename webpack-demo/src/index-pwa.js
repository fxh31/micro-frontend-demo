import _ from 'lodash';
import printMe from './print.js';
import s from './setting.png'

// 确保 service worker 特性被支持
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // service-worker.js 文件是留在 app 内的 js 文件，地址是相对于相对于源（origin）的
    // 一般生成在 dist/service-worker.js
    navigator.serviceWorker.register('/service-worker.js', {
      scope: "/", // 指定想要 service worker 控制的子作用域。默认为 /
    }).then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
console.log(s)