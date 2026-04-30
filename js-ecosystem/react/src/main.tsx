import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

// React 启动入口：把根组件 App 渲染到 index.html 里的 #root
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
