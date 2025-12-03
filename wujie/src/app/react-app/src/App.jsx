import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const {props, bus} = window.$wujie || {}
  console.log(window.$wujie)
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <h2>
          通过 window.parent 获取主应用状态 &nbsp;
          {window.parent.sayHello()}
        </h2>
        <h2>
          通过 window.$wujie.props 获取主应用状态 &nbsp;
          age：{props.age} + {props.title}
        </h2>
      </div>
      <button onClick={() => bus.$emit("postHost", 'I am React app')}>发送给主应用消息</button>
    </>
  )
}

export default App
