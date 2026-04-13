# 练习环境搭建方案

## 目标

搭建一个支持多技术栈的练习环境，涵盖 JS 生态、Apple 生态和通用技能。

---

## VS Code 插件推荐

### 已内置（无需安装）

- **JavaScript / TypeScript 支持** — VS Code 自带 JS/TS 语法高亮、代码提示、类型检查、跳转定义等，开箱即用。

### 推荐安装

| 插件名 | 适用技术栈 | 作用 |
|--------|-----------|------|
| **Swift** (Apple 官方 `sswg.swift-lang`) | Swift / SwiftUI | 语法高亮、代码补全、错误提示、调试支持 |
| **ES7+ React/Redux/React-Native Snippets** | React / RN | JSX/TSX 代码片段快捷输入，如输入 `rfce` 自动生成组件模板 |
| **GraphQL: Language Feature Support** | GraphQL | 语法高亮、自动补全、Schema 验证 |
| **Error Lens** | 所有语言 | 把错误和警告信息直接显示在代码行末尾，无需悬停查看 |
| **Prettier - Code Formatter** | 所有语言 | 保存时自动格式化代码，保持风格统一 |

### 安装方式

1. 打开 VS Code
2. 按 `Cmd + Shift + X` 打开扩展面板
3. 搜索插件名，点击 Install

或者用命令行一键安装：

```bash
code --install-extension sswg.swift-lang
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension GraphQL.vscode-graphql
code --install-extension usernamehw.errorlens
code --install-extension esbenp.prettier-vscode
```

---

## 一、JS 生态环境（JS / TS / Node.js）

### 技术栈

| 工具 | 作用 |
|------|------|
| Node.js | JavaScript 运行时 |
| npm | 包管理器 |
| TypeScript | 类型检查与编译 |
| ts-node | 直接运行 `.ts` 文件 |
| @types/node | Node.js 的类型定义 |

### 搭建步骤

```bash
# 1. 初始化项目（已完成）
npm init -y

# 2. 安装 TypeScript 相关依赖（已完成）
npm install -D typescript ts-node @types/node

# 3. 生成 tsconfig.json（已完成）
npx tsc --init
```

### 日常使用

```bash
# 运行 JS 文件
node js-ecosystem/js/beginner/xxx.js

# 运行 TS 文件
npx ts-node js-ecosystem/ts/beginner/xxx.ts

# 只做类型检查
npx tsc --noEmit
```

---

## 二、Apple 生态环境（Swift / SwiftUI / UIKit / SwiftData / AppKit）

### 前提条件

- macOS 系统
- 已安装 Xcode（提供 Swift 编译器和 iOS SDK）
- SwiftData 练习建议使用 Xcode 15 或更高版本，并将最低部署目标设为 iOS 17 或更高版本

### 验证安装

```bash
# 检查 Swift 是否可用
swift --version

# 检查 Xcode 命令行工具
xcode-select -p
```

### 日常使用

```bash
# 运行 Swift 文件（语法练习）
swift apple-ecosystem/swift/beginner/xxx.swift
```

> SwiftUI / UIKit / SwiftData / AppKit 练习需要 Xcode 项目环境，届时单独创建。

---

## 三、React / React Native（待搭建）

需要时再配置，大致依赖：

```bash
# React（Web）
npx create-react-app my-app --template typescript

# React Native
npx react-native init MyApp
```

---

## 四、GraphQL（待搭建）

语法层面可以用 `.ts` 文件配合 `graphql` 包练习：

```bash
npm install graphql
```

---

## 项目结构

```
TrainingAPP/
├── js-ecosystem/            # JS / TS / Node.js / React / RN / GraphQL
├── apple-ecosystem/         # Swift / SwiftUI / UIKit / SwiftData / AppKit / iOS SDK / 架构
├── general/                 # API 集成 / A/B 测试 / 监控
├── docs/                    # 文档
├── node_modules/            # 依赖包（自动生成，已 gitignore）
├── package.json
├── package-lock.json
├── tsconfig.json
└── CLAUDE.md
```

---

## 补充说明

### npx 和 npm 的区别

| 命令 | 作用 |
|------|------|
| `npm install` | 下载和安装包 |
| `npm run xxx` | 运行 `package.json` 中 `scripts` 里定义的命令 |
| `npx xxx` | 直接运行本地安装的可执行命令 |

### nvm

**全称**：Node Version Manager

管理电脑上安装的 Node.js 版本。不同项目可能要求不同版本的 Node.js，nvm 让你在多个版本间自由切换。

常用命令：

| 命令 | 作用 |
|------|------|
| `nvm install 22` | 安装 Node.js 22.x |
| `nvm use 22` | 切换到 Node.js 22.x |
| `nvm ls` | 查看本机已安装的所有版本 |
| `nvm current` | 查看当前使用的版本 |
| `nvm alias default 22` | 设置默认版本 |

三者关系：

```
nvm  — 管理 Node.js 版本（装哪个版本的 Node）
 └── Node.js 自带 npm 和 npx
      ├── npm  — 管理项目依赖包（装哪些库）
      └── npx  — 运行已安装的工具（执行命令）
```

### 为什么用 ts-node 而不是先 tsc 再 node？

不用 ts-node 的话，流程是：

```bash
npx tsc playground.ts    # 编译，生成 playground.js
node playground.js        # 运行
```

用 ts-node 一步搞定：

```bash
npx ts-node playground.ts  # 编译 + 运行
```

对于语法练习来说，ts-node 更高效。
