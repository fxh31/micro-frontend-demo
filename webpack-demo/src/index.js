import _ from 'lodash';
import printMe from './print.js';
import './style.css'; // css 热更新直接在 js 中引入样式表

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
 
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe.bind(null, 'hello webpack888');

  element.appendChild(btn);

  return element;
}
// document.body.appendChild(component());
 let element = component(); // 存储 element，以在 print.js 修改时重新渲染
 document.body.appendChild(element);

 if (module.hot) {
   module.hot.accept('./print.js', function() {
     console.log('Accepting the updated printMe module!');
     // printMe();
     document.body.removeChild(element);
     element = component();
     document.body.appendChild(element);
   })
 }

// 动态分离出 lodash
// function getComponent() {
//   return import('lodash').then(_ => {
//     const element = document.createElement('div');
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//     return element;
//   })
//     .catch((error) => 'An error occurred while loading the component');
// }

// async function getComponent() {
//   const element = document.createElement('div');
//   const { default: _ } = await import('lodash');
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//   return element;
// }

//  getComponent().then((component) => {
//    document.body.appendChild(component);
//  });

// 运行时访问 webpack 暴露的全局变量
// __webpack_public_path__ = process.env.ASSET_PATH;
// 如果是