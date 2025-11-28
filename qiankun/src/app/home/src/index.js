// 导出 qiankun 生命周期函数 [citation:1]
const bootstrap = async () => {
  console.log('纯 JS 应用 bootstraped');
};
console.log('home app')
const mount = async (props) => {
  console.log('纯 JS 应用 mount', props);

  // 创建应用内容
  const container = props.container;
  if (container) {
    const content = document.createElement('div');
    content.innerHTML = `
      <div style="padding: 20px; border: 2px solid #1890ff; background: #f0f8ff; border-radius: 8px;">
        <h2>纯 JS 子应用</h2>
        <p>这是一个纯 JavaScript 微应用</p>
        <div>
          <button id="js-app-btn" style="padding: 10px 20px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer;">
            点击计数: <span id="count">0</span>
          </button>
        </div>
        <p>当前时间: <span id="time"></span></p>
      </div>
    `;

    container.appendChild(content);

    // 添加交互功能
    let count = 0;
    const countElement = content.querySelector('#count');
    const timeElement = content.querySelector('#time');

    content.querySelector('#js-app-btn').addEventListener('click', () => {
      count++;
      countElement.textContent = count;
    });

    // 更新时间
    function updateTime() {
      timeElement.textContent = new Date().toLocaleTimeString();
    }
    setInterval(updateTime, 1000);
    updateTime();
  }
};

const unmount = async (props) => {
  console.log('纯 JS 应用 unmount', props);
  const container = props.container;
  if (container) {
    container.innerHTML = '';
  }
};

// 独立运行时，直接挂载到本地DOM
if (!window.__POWERED_BY_QIANKUN__) {
  mount({ container: document.querySelector('#app-home') });
}

window.qiankunLifecycle = {
  bootstrap,
  mount,
  unmount,
};

// 导出生命周期 [citation:1]
export { bootstrap, mount, unmount };