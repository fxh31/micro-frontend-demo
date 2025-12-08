import microApp from '@micro-zoe/micro-app'

export function setupMicroApp() {  
  // 向指定的子应用传递数据
  microApp.setData('vue-app', { count: 1, say: () => { alert('hello world') } })
  
  microApp.addDataListener('vue-app', (data) => {
    console.log('子应用传递的数据：', data)
    alert(`vue app 发来消息：${data.message}`)
    
    return '主应用已经成功收到的消息！'
  })
  
  /**
   * 框架级别引入 polyfill 后，组件上的 onDataChange
   * 原生好像无法监听，只有使用 Vue、React 在组件上监听
   */
  // const vueAppElement = document.querySelector("micro-app[name='vue-app']");
  // vueAppElement.addEventListener('data-change', (e) => {
  //   console.log('onDataChange - 子应用数据发生改变：', e.detail.data)
  // })
  
  // 全局数据监听
  microApp.addGlobalDataListener((data) => {
    console.log('全局数据', data)

    return '返回值1'
  }) 
  
  // 全局生命周期
  microApp.start({
    lifeCycles: {
      created(e, appName) {
        console.log('子应用创建完成：', appName)
      }
    },
    "router-mode": "search", // 全局路由模式
    "keep-router-state": true, // 保留全局路由状态
    
  })
  // microApp.start()
  
  // 路由守卫
  // microApp.router.beforeEach((to, from, appName) => {
  //   console.log('全局路由守卫：', to, from, appName)
  // })
  const cancelCallback = microApp.router.beforeEach({
    "vue-app": (to, from) => {
      console.log('子应用 vue-app 前置路由守卫', to, from)
    }
  })
  
  // 解绑路由监听
  // cancelCallback()
}

