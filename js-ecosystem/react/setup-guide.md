# React 环境配置文档

这份文档的目标不是搭一个完整业务项目，而是给 `js-ecosystem/react/` 下的练习题提供一个可运行、可类型检查、可在编辑器里正常识别 JSX 的最小环境。

适用场景：

- 你想继续做 `js-ecosystem/react/beginner/*.tsx` 里的练习
- 你想消除当前 `.tsx` 文件中的 `react` / `jsx` / `JSX.IntrinsicElements` 报错
- 你希望后续 React 练习都能在同一个环境里运行

---

## 一、为什么现在会报错

当前仓库根目录的环境主要是给 TypeScript 单文件练习用的，不是给 React 用的。

所以会出现这些问题：

- 根目录没有安装 `react`、`react-dom`、`@types/react`、`@types/react-dom`
- 根目录 `package.json` 是 `"type": "commonjs"`
- 根目录 `tsconfig.json` 不是为 React Web 练习单独设计的

因此，`js-ecosystem/react/beginner/01-jsx-components.tsx` 现在会出现类似这些报错：

- `Cannot find module 'react'`
- `JSX element implicitly has type 'any'`
- `react/jsx-runtime could not be found`

解决方式不是继续改练习题本身，而是在 `js-ecosystem/react/` 下单独搭一个 React 练习环境。

---

## 二、推荐结构

建议把 `js-ecosystem/react/` 作为一个独立的 React Web 小项目根目录：

```text
js-ecosystem/react/
├── beginner/
│   └── 01-jsx-components.tsx
├── intermediate/
├── advanced/
├── learning-plan.md
├── setup-guide.md
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── index.html
└── src/
    ├── App.tsx
    ├── main.tsx
    └── vite-env.d.ts
```

这样做的好处：

- `js-ecosystem/react/` 下会有自己的 `package.json` 和 `tsconfig.json`
- 编辑器会优先使用这个目录下的配置
- `beginner/` 里的练习文件也会被这个 React 环境正确识别

---

## 三、推荐方案

推荐技术栈：

- React
- TypeScript
- Vite

原因：

- 启动快
- 配置少
- 对学习组件题最轻
- 比 `create-react-app` 更适合作为练习环境

---

## 四、安装步骤

以下命令都在仓库根目录执行。

### 1. 进入 React 目录

```bash
cd js-ecosystem/react
```

### 2. 初始化局部 `package.json`

```bash
npm init -y
```

### 3. 安装运行依赖

```bash
npm install react react-dom
```

### 4. 安装开发依赖

```bash
npm install -D typescript vite @vitejs/plugin-react @types/react @types/react-dom
```

---

## 五、需要创建或修改的文件

下面是推荐的最小配置。

### 1. `package.json`

安装完依赖后，把 `scripts` 和 `type` 调整成下面这样：

```json
{
  "name": "trainingapp-react",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^5.0.0",
    "typescript": "^6.0.0",
    "vite": "^7.0.0"
  }
}
```

说明：

- 版本号不用和上面完全一模一样，以 `npm install` 实际装到的版本为准
- 重点是 `type: "module"` 和 `dev/build/preview` 这三个脚本

### 2. `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "beginner", "intermediate", "advanced"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 3. `tsconfig.node.json`

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

### 4. `vite.config.ts`

```ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
})
```

### 5. `index.html`

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TrainingAPP React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 6. `src/main.tsx`

```tsx
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

### 7. `src/App.tsx`

第一题先这样接：

```tsx
import LearningStatusPanel from "../beginner/01-jsx-components"

export default function App() {
  return <LearningStatusPanel />
}
```

### 8. `src/vite-env.d.ts`

```ts
/// <reference types="vite/client" />
```

---

## 六、启动方式

在 `js-ecosystem/react/` 目录执行：

```bash
npm run dev
```

启动后终端通常会给出一个本地地址，例如：

```bash
http://localhost:5173/
```

用浏览器打开即可。

---

## 七、如何接当前练习题

当前 React 第 1 题文件是：

`js-ecosystem/react/beginner/01-jsx-components.tsx`

只要你把 `src/App.tsx` 写成：

```tsx
import LearningStatusPanel from "../beginner/01-jsx-components"

export default function App() {
  return <LearningStatusPanel />
}
```

这个练习题就会直接渲染出来。

后面每换一道题，只需要改 `App.tsx` 的 import 即可。

---

## 八、安装完成后的自检

你可以按下面顺序确认环境是否正常：

1. `js-ecosystem/react/package.json` 已存在
2. `js-ecosystem/react/node_modules/` 已生成
3. `js-ecosystem/react/tsconfig.json` 已存在
4. `js-ecosystem/react/src/App.tsx` 能成功 import `../beginner/01-jsx-components`
5. 执行 `npm run dev` 能打开页面
6. 编辑器里 `01-jsx-components.tsx` 不再报 `react` / `jsx` 类型错误

---

## 九、常见问题

### 1. 还是提示 `Cannot find module 'react'`

通常是因为：

- 你没有在 `js-ecosystem/react/` 目录执行 `npm install`
- 或编辑器还没重新加载 TypeScript 项目

可以尝试：

```bash
cd js-ecosystem/react
npm install
```

然后重启编辑器，或者执行 “TypeScript: Restart TS Server”。

### 2. `App.tsx` 里 import 练习题失败

先检查路径是不是：

```tsx
import LearningStatusPanel from "../beginner/01-jsx-components"
```

`App.tsx` 在 `src/` 里，所以回到上一层再进 `beginner/` 是正确的。

### 3. 打开页面是空白

优先检查：

- `src/main.tsx` 有没有挂载 `App`
- `src/App.tsx` 有没有正确返回组件
- 练习题组件里是不是只写了 `TODO`

### 4. 根目录的 TypeScript 练习会不会受影响

不会。

因为 React 环境是单独放在 `js-ecosystem/react/` 下面的，不需要去改仓库根目录的 `package.json` 和 `tsconfig.json`。

---

## 十、建议

建议你按这个顺序操作：

1. 先把 `js-ecosystem/react/` 的最小环境搭起来
2. 确认 `npm run dev` 能跑
3. 再回头做 `beginner/01-jsx-components.tsx`

这样后面 React 前置题和 RN 前的 React 组件题，都能在同一个环境里复用。
