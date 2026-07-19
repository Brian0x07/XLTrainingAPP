# React 学习计划（面向 React Native 前置基础）

## 目标

这份计划不是为了把 React Web 单独学得很深，而是为了给 React Native 打前置基础。

核心原则：

- 先掌握 React 最小必需能力
- 再进入 React Native 核心组件与平台知识
- 在 RN 练习中继续巩固 React 思维，而不是把 React 和 RN 完全割裂开学

## 练习设计原则

- 每道初级题只新增一个主要知识点，其他代码尽量由题目提供。
- 首次使用 Hook 或 API 前，先说明其作用、常见场景、参数、返回值和清理要求。
- 一个真实功能包含多个新概念时，先拆成短小练习，再安排综合题。
- 题目优先选择设备连接、计时、自动保存、输入交互等可直接迁移到 React Native 的实用场景。
- 相邻题目应轮换业务背景，避免反复使用课程、学习列表等单一模板。
- 用户需要编写的区域应明确标出，验收结果应能通过页面交互直接观察。

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
- [x] 06A 设备连接提示：首次渲染、`setTimeout`、`clearTimeout`
- [x] 06B 运动秒表：状态依赖、`setInterval`、`clearInterval`
- [ ] 06C 草稿自动保存：依赖变化、取消上一次延迟任务
- 每道题只引入一种新的 effect 行为，完成小题后再做综合练习

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
