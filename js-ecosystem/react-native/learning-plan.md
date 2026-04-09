# React Native 学习计划

## 概述

本计划对标外企 React Native 工程师岗位要求，按模块分类、按优先级排序。

---

## 一、React Native 核心（最高优先）

### 1.1 核心组件

| 组件 | 用途 |
|------|------|
| View | 基础容器，等同于 div |
| Text | 文本显示 |
| Image | 图片加载与显示 |
| TextInput | 文本输入框 |
| ScrollView | 可滚动容器（适合少量内容） |
| FlatList | 长列表渲染（虚拟化，性能优） |
| SectionList | 分组列表 |
| TouchableOpacity / Pressable | 可点击组件 |
| Modal | 弹窗 |
| ActivityIndicator | 加载指示器 |

### 1.2 导航 — React Navigation

| 导航类型 | 场景 |
|----------|------|
| Stack Navigator | 页面堆栈跳转（最常用） |
| Tab Navigator | 底部 Tab 栏 |
| Drawer Navigator | 侧边抽屉菜单 |
| 嵌套导航 | Stack + Tab 组合使用 |
| Deep Linking | 外部链接跳转到 App 指定页面 |

### 1.3 样式与布局

- Flexbox 布局（`flexDirection`、`justifyContent`、`alignItems`）
- StyleSheet.create 创建样式
- 响应式适配（Dimensions、useWindowDimensions、Platform）
- 安全区域处理（SafeAreaView）

### 1.4 动画

| 方案 | 适用场景 |
|------|----------|
| Animated API | 内置基础动画（淡入淡出、位移、缩放） |
| React Native Reanimated | 高性能复杂动画（手势驱动、共享元素过渡） |
| LayoutAnimation | 简单布局变化动画 |

### 1.5 原生模块桥接

- Native Modules 基本概念（JS 调用原生代码）
- New Architecture 理解：
  - **Fabric** — 新的渲染系统
  - **TurboModules** — 新的原生模块系统（懒加载、类型安全）
  - **JSI** — JavaScript Interface，替代旧的 Bridge

---

## 二、状态管理（高优先）

### 2.0 React 内置状态机制（前置基础）

- **useState / useReducer** — 组件内状态
- **Context API** — 跨组件共享状态（避免 prop drilling）
- **对比 Event Bus** — 为什么 React 中优先用 state/context 而不是事件总线
- 练习：用 Context 实现主题切换、用户登录状态共享

> 这是学习第三方状态管理库之前的必备基础。

### 2.1 客户端状态

| 方案 | 特点 |
|------|------|
| Redux + Redux Toolkit | 最主流，生态最完善，外企用得最多 |
| Zustand | 轻量简洁，API 极简 |
| MobX | 响应式，适合复杂状态 |
| Jotai | 原子化状态管理 |

> 建议至少精通 Redux Toolkit，了解 Zustand 作为备选。

### 2.2 服务端状态

| 方案 | 用途 |
|------|------|
| TanStack Query (React Query) | 请求缓存、自动重试、乐观更新、分页 |
| SWR | 类似 React Query，更轻量 |

---

## 三、平台知识（高优先）

### 3.1 iOS 平台

- Xcode 基本操作（项目结构、Build Settings、Scheme）
- CocoaPods 依赖管理（Podfile、pod install）
- 签名与证书（Development / Distribution Certificate、Provisioning Profile）
- iOS 模拟器使用

### 3.2 Android 平台

- Android Studio 基本操作
- Gradle 构建系统（build.gradle 配置）
- 签名打包（keystore 生成、release 签名）
- Android 模拟器 / 真机调试

### 3.3 调试工具

| 工具 | 用途 |
|------|------|
| Flipper | 全能调试器（网络、布局、数据库、日志） |
| React DevTools | 组件树、Props/State 查看 |
| Chrome Debugger | JS 断点调试 |
| Xcode Instruments | iOS 性能分析 |
| Android Profiler | Android 性能分析 |

---

## 四、工程化（中优先）

### 4.1 包管理

| 工具 | 说明 |
|------|------|
| npm | Node.js 默认包管理器 |
| yarn | Facebook 推出，速度更快 |
| pnpm | 磁盘空间最优，依赖管理最严格 |

### 4.2 构建与发布

| 工具 | 用途 |
|------|------|
| EAS Build | Expo 官方云构建服务 |
| Fastlane | 自动化构建、签名、上传 |
| CodePush | 热更新（不经过应用商店直接推送 JS 更新） |

### 4.3 CI/CD

| 平台 | 说明 |
|------|------|
| GitHub Actions | 最通用，与 GitHub 深度集成 |
| Bitrise | 移动端专用 CI/CD |
| CircleCI | 通用 CI/CD |

### 4.4 测试

| 工具 | 类型 |
|------|------|
| Jest | 单元测试 |
| React Native Testing Library | 组件测试 |
| Detox | E2E 端到端测试（模拟真实用户操作） |

---

## 五、网络与存储（中优先）

### 5.1 网络请求

| 方式 | 场景 |
|------|------|
| fetch / axios | RESTful API 调用 |
| Apollo Client / urql | GraphQL 调用 |
| WebSocket | 实时通信 |

### 5.2 本地存储

| 方案 | 适用场景 |
|------|----------|
| AsyncStorage | 简单键值对（类似 localStorage） |
| MMKV | 高性能键值存储（腾讯开源，比 AsyncStorage 快 30x） |
| SQLite | 结构化数据、复杂查询 |
| Realm | 移动端数据库（对象模型，同步能力强） |

---

## 六、加分项（了解即可，逐步深入）

### 6.1 Expo 生态

- Expo Router — 基于文件系统的路由
- EAS — 构建、提交、更新一站式服务
- Expo Modules — 自定义原生模块的简化方案

### 6.2 性能优化

- Hermes 引擎（默认 JS 引擎，启动快、内存占用低）
- FlatList 优化（`getItemLayout`、`windowSize`、`removeClippedSubviews`）
- 内存泄漏排查（未清理的定时器、事件监听、闭包引用）
- Bundle 体积优化

### 6.3 原生开发经验

- Swift（iOS 原生模块开发）
- Kotlin（Android 原生模块开发）

### 6.4 发布经验

- App Store 上架流程（App Store Connect、审核规范）
- Google Play 上架流程（Google Play Console、政策合规）
- 版本管理与灰度发布

### 6.5 无障碍适配 (Accessibility)

- `accessible`、`accessibilityLabel`、`accessibilityRole` 等属性
- VoiceOver (iOS) / TalkBack (Android) 适配
- 对比度、字体缩放支持

---

## 学习顺序建议

```
第一阶段：核心组件 + 导航 + 样式布局
    ↓
第二阶段：状态管理 (Redux Toolkit) + 网络请求 (React Query)
    ↓
第三阶段：动画 + 本地存储 + 平台知识 (iOS/Android)
    ↓
第四阶段：工程化 (CI/CD、测试、构建发布)
    ↓
第五阶段：加分项 (性能优化、Expo、无障碍)
```

> 每个阶段的练习题将在 `beginner/`、`intermediate/`、`advanced/` 中按进度生成。
