// 集成 single-spa

import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './src/App.jsx'
import './src/index.css' // 样式会对其他应用造成影响

let domElReact;

export const bootstrap = (props) =>
  Promise.resolve().then(() => {
    // 集成 single-spa 时创建的挂载 dom 元素
    // console.log(props)
    domElReact = document.createElement("div");
    domElReact.id = "root-react";
    document.body.appendChild(domElReact);
  });

export const mount = (props) =>
  Promise.resolve().then(() => {
    // console.log(props)
    createRoot(domElReact).render(<App />);
  });

export const unmount = (props) =>
  Promise.resolve().then(() => {
    document.body.removeChild(domElReact);
  });
