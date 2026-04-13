# 如何运行练习文件

## 各技术栈运行命令

### JavaScript

```bash
node js-ecosystem/js/beginner/xxx.js
```

Node.js 直接运行 `.js` 文件，无需编译。

### TypeScript

```bash
npx ts-node js-ecosystem/ts/beginner/xxx.ts
```

`ts-node` 在内存中编译 TS 并立即执行，不生成 `.js` 文件。

### Swift

```bash
swift apple-ecosystem/swift/beginner/xxx.swift
```

macOS 自带 Swift 编译器（需安装 Xcode 或 Xcode Command Line Tools）。

### SwiftUI / UIKit / SwiftData / AppKit

这些框架需要 Xcode 项目环境，无法用单文件运行。练习时会在对应目录下创建 Xcode 项目，用 Xcode 打开运行。

SwiftData 练习建议使用 Xcode 15 或更高版本，并将最低部署目标设为 iOS 17 或更高版本。

### React

```bash
cd js-ecosystem/react/项目目录
npm start
```

React 项目需要先用 `create-react-app` 或 `vite` 初始化，然后在浏览器中查看。

### React Native

```bash
cd js-ecosystem/react-native/项目目录
npx react-native run-ios    # iOS 模拟器
npx react-native run-android # Android 模拟器
```

### Node.js

```bash
node js-ecosystem/nodejs/beginner/xxx.js
# 或 TypeScript 版本
npx ts-node js-ecosystem/nodejs/beginner/xxx.ts
```

---

## 命令拆解

`npx ts-node js-ecosystem/ts/beginner/01-basic-types.ts` 由三部分组成：

| 部分 | 含义 |
|------|------|
| `npx` | Node Package eXecute，运行本地安装的工具 |
| `ts-node` | TypeScript 即时执行器（编译 + 运行一步到位）|
| `js-ecosystem/ts/beginner/01-basic-types.ts` | 要运行的文件路径 |

---

## 名词解释

### npx

**全称**：Node Package eXecute

运行项目中已安装的命令行工具。它会自动去 `node_modules/.bin/` 里查找，省去输入完整路径。

### ts-node

**全称**：TypeScript Node

让 Node.js 直接运行 `.ts` 文件。内部自动编译再执行，一步到位。

### npm

**全称**：Node Package Manager

Node.js 的包管理器。npm 负责"安装"，npx 负责"运行"。

常用命令：

| 命令 | 作用 |
|------|------|
| `npm init -y` | 初始化项目 |
| `npm install xxx` | 安装包到生产依赖 |
| `npm install -D xxx` | 安装包到开发依赖 |
| `npm run xxx` | 运行 scripts 中定义的脚本 |

### tsc

**全称**：TypeScript Compiler

TypeScript 编译器，负责类型检查和编译 `.ts` → `.js`。

```bash
npx tsc --noEmit    # 只检查类型，不输出文件
npx tsc             # 编译整个项目
```

### nvm

**全称**：Node Version Manager

管理电脑上的 Node.js 版本，可在多个版本间切换。

```bash
nvm install 22      # 安装 Node.js 22.x
nvm use 22          # 切换到 22.x
nvm ls              # 查看已安装版本
```

### swift

macOS/Xcode 自带的 Swift 编译器，可以直接编译运行 `.swift` 文件。

```
nvm  — 管理 Node.js 版本
 └── Node.js 自带 npm 和 npx
      ├── npm  — 管理依赖包
      └── npx  — 运行已安装的工具
```

---

## 常见问题

### 报错 "Cannot find module 'ts-node'"

重新安装依赖：

```bash
npm install -D typescript ts-node @types/node
```

### 报错 "SyntaxError" 或 "TypeError"

代码有语法或类型错误，根据报错信息修改后重新运行。

### 想看类型错误但不想运行

```bash
npx tsc --noEmit
```

### 报错 "swift: command not found"

需要安装 Xcode Command Line Tools：

```bash
xcode-select --install
```
