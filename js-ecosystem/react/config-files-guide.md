# React 配置文件说明

这份文档专门解释 `js-ecosystem/react/` 下这些配置文件各自是干什么的。

目标不是让你一次记住所有前端工程化细节，而是先建立一个稳定的直觉：

- 哪些文件是你要手写和维护的
- 哪些文件是工具自动生成的
- 页面渲染时，代码大致是怎么串起来的

---

## 一、先看整体关系

当前这个 React 练习环境，可以先粗略理解成下面这条链路：

```text
浏览器
  -> index.html
  -> src/main.tsx
  -> src/App.tsx
  -> beginner/01-jsx-components.tsx
```

而这条链路能正常运行，依赖另外几类配置：

- `package.json`：告诉 npm 和 Vite 这个项目怎么运行
- `tsconfig.json`：告诉 TypeScript 怎么理解 `.ts` / `.tsx`
- `vite.config.ts`：告诉 Vite 用什么方式启动和打包 React

所以你可以先把这些文件分成两类：

1. 页面入口链路文件
2. 工具配置文件

---

## 二、你现在最该认识的文件

### 1. `package.json`

位置：`js-ecosystem/react/package.json`

它的作用：

- 记录这个 React 子项目依赖了哪些包
- 定义常用命令，比如 `npm run dev`
- 告诉 Node 这个项目用什么模块系统

你当前最常会用到的部分是：

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview"
}
```

这表示：

- `npm run dev`：启动开发环境
- `npm run build`：先做 TypeScript 构建检查，再做前端打包
- `npm run preview`：本地预览打包结果

你可以把它理解成：

“这个项目的总开关和依赖清单”

什么时候会改它：

- 新装依赖
- 新增脚本命令
- 调整模块类型

---

### 2. `package-lock.json`

位置：`js-ecosystem/react/package-lock.json`

它的作用：

- 锁定依赖的精确版本
- 保证下次安装时结果尽量一致

你可以把它理解成：

“这次 npm 实际装到了什么版本的快照”

通常：

- 需要保留
- 不需要手改

---

### 3. `tsconfig.json`

位置：`js-ecosystem/react/tsconfig.json`

它的作用：

- 告诉 TypeScript 这个 React 项目怎么检查代码
- 告诉 TS 要不要识别 JSX
- 告诉 TS 哪些目录参与类型检查

这里最关键的几项：

- `jsx: "react-jsx"`
  让 TypeScript 知道这是 React JSX 项目
- `include: ["src", "beginner", "intermediate", "advanced"]`
  让练习题目录也被纳入检查
- `strict: true`
  开启严格类型检查

你可以把它理解成：

“TypeScript 在这个 React 项目里的规则说明书”

什么时候会改它：

- 想放宽或加强类型规则
- 想让更多目录参与检查
- 需要适配新的编译行为

---

### 4. `tsconfig.node.json`

位置：`js-ecosystem/react/tsconfig.node.json`

它的作用：

- 专门给 Node 环境下的工具文件用
- 当前主要是给 `vite.config.ts` 这种配置文件服务

为什么需要单独拆一个：

- React 页面代码运行在浏览器环境
- `vite.config.ts` 运行在 Node 环境
- 两边的类型和模块语义不完全一样

所以它的职责不是给页面组件用，而是给“构建工具本身”用。

你可以把它理解成：

“给 Vite 配置文件准备的 TypeScript 规则”

---

### 5. `vite.config.ts`

位置：`js-ecosystem/react/vite.config.ts`

它的作用：

- 告诉 Vite 这个项目怎么启动和打包
- 当前最重要的是启用 React 插件

现在这份内容很短：

```ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
})
```

核心含义是：

- 这是一个 Vite 项目
- 这个项目要按 React 的方式处理 TSX / JSX

你可以把它理解成：

“Vite 的项目开机配置”

什么时候会改它：

- 你想加路径别名
- 想改开发服务器端口
- 想加别的 Vite 插件

---

### 6. `index.html`

位置：`js-ecosystem/react/index.html`

它的作用：

- 是浏览器打开时的最外层 HTML 页面
- 提供 React 挂载用的根节点

这里最关键的是：

```html
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
```

意思是：

- 页面里先有一个空的 `root`
- 然后加载 `src/main.tsx`
- React 再把组件渲染进这个 `root`

你可以把它理解成：

“浏览器入口壳子”

---

### 7. `src/main.tsx`

位置：`js-ecosystem/react/src/main.tsx`

它的作用：

- 是 React 代码的真正启动入口
- 把 `App` 挂载到 `index.html` 里的 `#root`

关键逻辑：

```tsx
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

它干的事情就是：

- 找到页面里的 `root`
- 创建 React 根节点
- 渲染 `<App />`

你可以把它理解成：

“把 React 应用插到页面上的启动器”

---

### 8. `src/App.tsx`

位置：`js-ecosystem/react/src/App.tsx`

它的作用：

- 作为当前练习的页面装配层
- 决定当前浏览器里显示哪一道题

现在它是：

```tsx
import LearningStatusPanel from "../beginner/01-jsx-components"

export default function App() {
  return <LearningStatusPanel />
}
```

也就是说：

- `App` 自己不做复杂事
- 它只是把当前练习组件接进来

你可以把它理解成：

“当前练习题的总入口”

以后切题时，你最常改的文件之一就是它。

---

### 9. `src/vite-env.d.ts`

位置：`js-ecosystem/react/src/vite-env.d.ts`

它的作用：

- 给 TypeScript 提供 Vite 的类型声明

内容很短：

```ts
/// <reference types="vite/client" />
```

它的意义是：

- 让 TS 认识 Vite 提供的类型
- 避免后续使用 `import.meta.env` 之类能力时报类型错误

你可以把它理解成：

“Vite 给 TypeScript 的类型补充说明”

---

## 三、练习题文件算什么

### `beginner/01-jsx-components.tsx`

位置：`js-ecosystem/react/beginner/01-jsx-components.tsx`

它不是工具配置文件，而是你的练习代码本体。

当前关系是：

```text
App.tsx
  -> import LearningStatusPanel
  -> 渲染练习题组件
```

所以：

- `App.tsx` 是入口
- `01-jsx-components.tsx` 是当前真正要写的题目

---

## 四、哪些文件是自动生成的

下面这些通常不是你日常要手改的重点：

### 1. `node_modules/`

作用：

- 保存 npm 安装下来的依赖包

特点：

- 自动生成
- 很大
- 不手改

### 2. `dist/`

作用：

- 保存 `npm run build` 之后生成的产物

特点：

- 自动生成
- 用来部署或预览构建结果
- 不拿来写业务代码

### 3. `tsconfig.tsbuildinfo` / `tsconfig.node.tsbuildinfo`

作用：

- TypeScript 构建缓存

特点：

- 自动生成
- 提高增量构建速度
- 不手改

### 4. `vite.config.js` / `vite.config.d.ts`

作用：

- 是构建过程中根据 `vite.config.ts` 生成的产物

特点：

- 源文件是 `vite.config.ts`
- 真正该维护的是 `.ts` 版本
- 生成物通常不需要你手改

---

## 五、最实用的理解方式

如果你只想先建立一个足够用的认知，可以记成下面这组：

- `package.json`
  管依赖和命令
- `tsconfig.json`
  管 TypeScript 和 JSX 规则
- `vite.config.ts`
  管开发服务器和构建方式
- `index.html`
  浏览器页面入口
- `src/main.tsx`
  React 启动入口
- `src/App.tsx`
  当前练习总入口
- `beginner/*.tsx`
  真正写题的地方

---

## 六、你最常改哪些文件

在当前训练阶段，最常改的通常只有：

1. `beginner/01-jsx-components.tsx`
   你写题的主战场
2. `src/App.tsx`
   切换当前显示哪道题

偶尔会改：

3. `package.json`
   安装新依赖或补脚本
4. `tsconfig.json`
   调整类型检查范围或规则

通常不会碰：

- `package-lock.json`
- `node_modules/`
- `dist/`
- `.tsbuildinfo`
- 构建生成的 `.js` / `.d.ts`

---

## 七、一句话总结

你可以这样记：

- `package.json` 决定“项目怎么跑”
- `tsconfig.json` 决定“TSX 怎么看懂”
- `vite.config.ts` 决定“Vite 怎么启动”
- `index.html -> main.tsx -> App.tsx -> 练习题组件`
  决定“页面最终显示什么”
