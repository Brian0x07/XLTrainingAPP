# React 学习计划（面向 React Native 前置基础）

## 目标

这份计划不是为了把 React Web 单独学得很深，而是为了给 React Native 打前置基础。

核心原则：

- 先掌握 React 最小必需能力
- 再进入 React Native 核心组件与平台知识
- 在 RN 练习中继续巩固 React 思维，而不是把 React 和 RN 完全割裂开学

---

## 第一阶段：React 最小前置基础（当前主线）

这一阶段只覆盖 RN 必需的 React 基础，不展开 Web 工程化、路由、SSR 等内容。

### 1. JSX 与组件基础

- JSX 基本语法
- 函数组件
- 组件返回结构
- 常见表达式写法

### 2. Props

- 父传子
- props 类型约束
- 解构 props
- 组件复用

### 3. useState

- 基础状态
- 输入框受控组件
- 点击事件更新状态
- 多个 state 的拆分

### 4. 条件渲染

- `if`
- 三元表达式
- `&&`
- 空状态 / 错误状态 / 加载状态

### 5. 列表渲染

- `map`
- `key`
- 列表与详情的基本拆分

### 6. useEffect

- 副作用概念
- 首次渲染执行
- 依赖数组
- 清理函数的基本概念

### 7. 组件拆分思维

- 哪些内容应该拆成子组件
- 展示组件和状态组件的基本区分
- props 向下传递、事件向上传递

---

## 第二阶段：切回 React Native 核心

当前置 React 基础达到可独立完成小型组件题后，切回 React Native 主线：

1. 核心组件：`View`、`Text`、`TextInput`、`Image`、`ScrollView`、`FlatList`
2. 布局与样式：Flexbox、`StyleSheet.create`、响应式适配、安全区域
3. 交互：`Pressable`、表单输入、列表点击
4. 页面组织：简单页面拆分
5. 再进入导航、状态管理、网络请求

---

## 当前执行策略

当前训练路径固定为：

`React 最小前置基础 -> React Native Beginner -> React Native Intermediate -> React Native Advanced`

也就是说，接下来不会直接继续 RN 题，而是先补 React 前置题。
