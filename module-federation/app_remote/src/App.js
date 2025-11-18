import React from "react";
import LocalButton from './Button'

const App = () => {
  return (
    <div style={{ border: '2px dashed orange', padding: '20px', margin: '10px' }}>
      <h2>App Remote（运行在 3001 端口）</h2>
        <p>这个应用暴露了一个 Button 组件。</p>
        <p>下面是 Remote 应用自己使用的 Button：</p>
        <LocalButton onClick={() => alert('Clicked Remotes own button!')}>
          Click Me (Remote Internal)
        </LocalButton>
    </div>
  )
}

export default App;