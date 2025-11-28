import { actions } from './store';

const btn_home = document.querySelector('#btn_home')
const btn_vue3_vite = document.querySelector('#btn_vue3_vite')
const btn_vue3_webpack = document.querySelector('#btn_vue3_webpack')
const btn_change_state = document.querySelector('#change_state')

function createEventListener(el, eventName, callback) {
  el.addEventListener(eventName, callback)
}

export function handleEventListener() {
  createEventListener(btn_home, 'click', () => {
    window.history.pushState({}, '', '/home')
  })

  createEventListener(btn_vue3_vite, 'click', () => {
    window.history.pushState({}, '', '/vue3-vite')
  })

  createEventListener(btn_vue3_webpack, 'click', () => {
    window.history.pushState({}, '', '/vue3-webpack')
  })

  createEventListener(btn_change_state, 'click', () => {
    // 主应用变更状态
    actions.setGlobalState({
      name: 'qiankun-change-name'
    });
  })
}