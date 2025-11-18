import React, { Suspense, lazy } from "react";

const RemoteButton = lazy(() => import("app_remote/Button"));

const App = () => (
  <div style={{ border: '2px dashed blue', padding: '20px', margin: '10px' }}>
    <h1>App Host (运行在 3000 端口)</h1>
    <p>这个应用消费来自 App Remote (3001) 的 Button 组件。</p>
    <hr/>
    <h2>下面是从 Remote 加载的 Button:</h2>
    {/* 使用 Suspense 包裹异步加载的组件 */}
    <Suspense fallback={<div>Loading Remote Button...</div>}>
      <RemoteButton onClick={() => alert('Clicked Remote Button from Host!')}>
        Click Me (From Remote)
      </RemoteButton>
    </Suspense>
    <hr/>
    <p>Host 也可以有自己的内容和组件。</p>
    <button onClick={() => alert('Clicked Hosts own button!')}>
      Host's Own Button
    </button>
  </div>
);

export default App;