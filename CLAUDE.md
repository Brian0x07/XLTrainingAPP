# TrainingAPP

## 项目定位

这是一个面向 **iOS Software Engineer II** 能力目标的综合编程练习仓库。

它不是一个单一业务 App，而是一个由 Claude 协助推进的训练环境：
- Claude 按知识点和难度出题
- 用户直接在练习文件中写代码
- 用户运行命令查看结果
- Claude 根据结果批改、补充笔记，并更新进度

项目覆盖三大方向：
- **JS 生态**：JS → TS → Node.js → React → React Native → GraphQL
- **Apple 生态**：Swift → SwiftUI → UIKit → SwiftData → AppKit → iOS SDK → 架构模式
- **通用技能**：API 集成、A/B 测试、监控

## 当前状态

为避免误解，先说明仓库现状：

- 仓库的多技术栈目录框架已经建好
- 当前已完成并沉淀较完整的主线是 **TypeScript**，下一阶段切到 **React 前置基础 -> React Native**
- `React` 目前已有学习计划文档：`js-ecosystem/react/learning-plan.md`
- `React Native` 目前已有学习计划文档：`js-ecosystem/react-native/learning-plan.md`
- `SwiftData` 目前已有学习计划文档：`apple-ecosystem/swiftdata/learning-plan.md`
- 其他技术栈大多还是目录占位，后续会按学习进度逐步补题和补环境

当前练习进度：
- 当前主线：**JS 生态 → React（为 React Native 做前置准备）**
- 最近完成：`js-ecosystem/react/beginner/06b-use-effect-interval.tsx` 第 1 题：运动秒表
- 当前待做：`js-ecosystem/react/beginner/06c-use-effect-autosave.tsx` 第 1 题：草稿自动保存

## 当前入口

如果现在继续做题，默认从这里开始：

1. 先按 `js-ecosystem/react/learning-plan.md` 补 React 最小前置基础
2. 运行对应命令查看输出或报错
3. Claude 批改并在题目下方追加批改记录
4. Claude 更新本文件中的进度清单

`general/coding-assessment/` 是按需打开的旁路练习专题，不属于默认主线。不要因为用户说“继续训练”就切过去。只有用户明确提到知名外企笔试、在线测评、算法笔试、coding assessment，或在完成一个主线小题后需要轻量提醒时，才提及它。提醒频率控制在每周 1 到 2 次，每次建议 30 到 45 分钟，不打断 React -> React Native 主线。

常用入口文件：
- `js-ecosystem/react/`
- `js-ecosystem/ts/beginner/`
- `js-ecosystem/ts/intermediate/`
- `js-ecosystem/ts/advanced/`
- `js-ecosystem/ts/playground.ts`

## 协作方式

标准练习流程如下：

1. Claude 在练习文件中出题，按知识点和难度分级
2. 用户在文件中写代码实现
3. 用户运行对应命令查看输出
4. Claude 验证结果并点评
5. Claude 在题目下方写入**批改记录**
6. Claude 更新本文件中的**进度清单**
7. 用户在做题过程中提出的问题，Claude 在批改记录下方以**补充笔记**形式写入文件，方便复习

## 批改记录格式

每道题作答区域下方，Claude 追加以下注释：

```typescript
// ====== 批改记录 ======
// ✅ 通过 / ❌ 未通过
// 📝 发现的问题：
//   1. 具体问题描述
// 🔑 知识点：涉及的知识点总结
```

> Swift 文件使用 `//` 注释，格式相同。

## 难度分级与出题规则

| 级别 | 目录 | 说明 |
|------|------|------|
| 初级 beginner | `beginner/` | 基础语法、核心概念 |
| 中级 intermediate | `intermediate/` | 进阶用法（根据初级答题情况出题） |
| 高级 advanced | `advanced/` | 综合实战（根据中级答题情况出题） |

出题规则：
- 初级题目可以提前准备
- 中级和高级题目不要求一次性全部生成
- 中级和高级的题目应根据用户答题表现，逐步、针对性地出题
- 题目描述必须尽量清晰，尤其是 React / React Native 等 UI 题：应按“真实场景 -> 用户行为 -> 为什么需要这个知识点 -> 明确验收要求”的结构说明，避免只写“用某 API 完成某功能”导致题意难以推断
- 每道练习文件顶部必须写清楚运行方法，包括进入哪个目录、执行什么命令、从哪里查看结果，以及端口或运行环境的必要说明；不能只假设用户记得上一题的运行方式

渐进式教学规则：

- 初级阶段每道题默认只设置一个新的主学习目标。必要的配套 API 可以一起出现，例如 `setInterval` 与 `clearInterval`，但不能同时加入列表渲染、数据加载、选择状态、计时器等多个独立知识点
- 新 API 或新概念首次出现时，题目必须先用直白语言说明它解决什么问题、常见使用场景、关键参数和返回值；不能只要求用户照着 API 名称实现
- 与本题主目标无关的页面结构、样式、模拟数据和交互应尽量预先提供，让用户只填写当前知识点对应的最小代码区域
- 如果一个完整场景涉及多个新知识点，应拆成 `A/B/C` 等递进小题。只有相关小题分别通过后，才能安排明确标注的综合练习
- 练习场景应优先来自真实且有使用价值的功能，例如设备连接、秒表、草稿保存、搜索防抖、网络状态和表单交互；场景要适度轮换，不要机械重复“课程列表”或为了套知识点编造无意义业务
- 新题可以复用已经通过的知识点，但不应让旧知识点的代码量掩盖本题目标；若复用部分较复杂，应直接提供脚手架

## 仓库结构

先看高层目录职责：

- `js-ecosystem/`
  - JavaScript、TypeScript、Node.js、React、React Native、GraphQL
- `apple-ecosystem/`
  - Swift、SwiftUI、UIKit、SwiftData、AppKit、iOS SDK、架构模式
- `general/`
  - API 集成、A/B 测试、监控
- `docs/`
  - 环境搭建与运行说明
- `CLAUDE.md`
  - 项目规则、协作方式、学习优先级、全局进度

补充说明：
- 各技术栈默认采用 `beginner/`、`intermediate/`、`advanced/` 三层结构
- 目录框架可以先建立，但练习文件和项目环境按实际学习进度逐步补齐
- 当前已实际落地的练习内容主要集中在 `js-ecosystem/ts/`

完整目录总览如下。

> 说明：下面是项目的整体结构规划与当前目录布局，不代表每个目录都已经有完整练习内容。

```text
TrainingAPP/
├── js-ecosystem/                # JavaScript 生态
│   ├── js/                      # JavaScript 语言基础
│   │   ├── beginner/
│   │   ├── intermediate/
│   │   └── advanced/
│   ├── ts/                      # TypeScript 类型系统
│   │   ├── beginner/
│   │   ├── intermediate/
│   │   ├── advanced/
│   │   └── playground.ts        # 草稿本
│   ├── nodejs/                  # Node.js 后端/运行时
│   │   ├── beginner/
│   │   ├── intermediate/
│   │   └── advanced/
│   ├── react/                   # React Web 前端
│   │   ├── beginner/
│   │   ├── intermediate/
│   │   └── advanced/
│   ├── react-native/            # React Native 跨平台移动端
│   │   ├── beginner/
│   │   ├── intermediate/
│   │   └── advanced/
│   └── graphql/                 # GraphQL 查询与 Schema
│       ├── beginner/
│       ├── intermediate/
│       └── advanced/
├── apple-ecosystem/             # Apple 生态
│   ├── swift/                   # Swift 语言基础
│   │   ├── beginner/
│   │   ├── intermediate/
│   │   └── advanced/
│   ├── swiftui/                 # SwiftUI 声明式 UI
│   │   ├── beginner/
│   │   ├── intermediate/
│   │   └── advanced/
│   ├── uikit/                   # UIKit（iOS 传统 UI）
│   │   ├── beginner/
│   │   ├── intermediate/
│   │   └── advanced/
│   ├── swiftdata/               # SwiftData（本地持久化与数据建模）
│   │   ├── beginner/
│   │   ├── intermediate/
│   │   ├── advanced/
│   │   └── learning-plan.md
│   ├── appkit/                  # AppKit（macOS 桌面 UI）
│   │   ├── beginner/
│   │   ├── intermediate/
│   │   └── advanced/
│   ├── ios-sdk/                 # iOS SDK（生命周期、权限、网络、持久化）
│   │   ├── beginner/
│   │   ├── intermediate/
│   │   └── advanced/
│   └── architecture/            # 架构模式（MVVM、TCA）
│       ├── beginner/
│       ├── intermediate/
│       └── advanced/
├── general/                     # 通用技能
│   ├── api-integration/         # REST & GraphQL API 对接
│   │   ├── beginner/
│   │   ├── intermediate/
│   │   └── advanced/
│   ├── ab-testing/              # A/B 测试概念与实践
│   │   ├── beginner/
│   │   ├── intermediate/
│   │   └── advanced/
│   └── monitoring/              # 监控基础
│       ├── beginner/
│       ├── intermediate/
│       └── advanced/
├── docs/
│   ├── setup-guide.md
│   └── how-to-run.md
└── CLAUDE.md
```

## 文档职责

为避免信息混杂，各文档职责如下：

- `CLAUDE.md`
  - 项目定位
  - 协作规则
  - 批改方式
  - 学习优先级
  - 当前进度
- `docs/setup-guide.md`
  - 环境安装与工具准备
- `docs/how-to-run.md`
  - 各技术栈的运行命令说明
- 各技术栈下的 `learning-plan.md`
  - 该技术栈的学习顺序与模块安排

## 运行命令

当前最常用的运行方式如下：

### TypeScript

```bash
npx ts-node js-ecosystem/ts/beginner/01-basic-types.ts
npx ts-node js-ecosystem/ts/beginner/02-functions.ts
npx ts-node js-ecosystem/ts/beginner/03-interface-type.ts
```

### JavaScript

```bash
node js-ecosystem/js/beginner/<文件名>.js
```

### Swift

```bash
swift apple-ecosystem/swift/beginner/<文件名>.swift
```

> React、React Native、SwiftUI、UIKit、AppKit 等需要项目环境，具体命令见 `docs/how-to-run.md`。

## 学习计划文档

出题前，Claude 应先读取对应技术栈目录下的 `learning-plan.md`（如果存在），按其中的模块和顺序出题。

当前已登记的学习计划文档：

| 技术栈 | 计划文档 |
|--------|---------|
| React | `js-ecosystem/react/learning-plan.md` |
| React Native | `js-ecosystem/react-native/learning-plan.md` |
| SwiftData | `apple-ecosystem/swiftdata/learning-plan.md` |

> 后续其他技术栈的学习计划文档会陆续补充到这里。

## 学习优先级

对标 iOS Software Engineer II，建议优先级如下：

1. **最高优先**：Swift → SwiftUI → UIKit → SwiftData → iOS SDK → 架构模式 (MVVM/TCA)
2. **中优先**：TS → Node.js → GraphQL → API 集成
3. **了解即可**：A/B Testing、监控工具、AppKit

## 进度清单

### JS 生态 — TypeScript

#### 初级 beginner

- [x] `01-basic-types.ts` 第 1 题：变量声明 ⭐
- [x] `01-basic-types.ts` 第 2 题：元组与类型注解 ⭐⭐
- [x] `01-basic-types.ts` 第 3 题：const vs let 与只读 ⭐
- [x] `02-functions.ts` 第 1 题：基本函数 ⭐
- [x] `02-functions.ts` 第 2 题：可选参数与默认值 ⭐⭐
- [x] `02-functions.ts` 第 3 题：箭头函数 ⭐⭐
- [x] `03-interface-type.ts` 第 1 题：定义接口 ⭐
- [x] `03-interface-type.ts` 第 2 题：type 别名与联合类型 ⭐⭐
- [x] `03-interface-type.ts` 第 3 题：interface vs type ⭐⭐
- [x] `04-control-flow.ts` 第 1 题：if/else + switch ⭐
- [x] `04-control-flow.ts` 第 2 题：for 循环 ⭐
- [x] `04-control-flow.ts` 第 3 题：while + break/continue ⭐⭐

#### 中级 intermediate

- [x] `01-narrowing.ts` 第 1 题：typeof 收窄 ⭐
- [x] `01-narrowing.ts` 第 2 题：in 收窄 ⭐⭐
- [x] `01-narrowing.ts` 第 3 题：判别式联合 ⭐⭐⭐
- [x] `02-generics.ts` 第 1 题：泛型函数基础 ⭐⭐
- [x] `02-generics.ts` 第 2 题：泛型接口 ⭐⭐
- [x] `02-generics.ts` 第 3 题：泛型约束 ⭐⭐⭐
- [x] `03-class.ts` 第 1 题：class 基础 ⭐⭐
- [x] `03-class.ts` 第 2 题：继承 extends ⭐⭐
- [x] `03-class.ts` 第 3 题：implements 接口 ⭐⭐⭐

#### 高级 advanced

- [x] `01-utility-types.ts` 第 1 题：Partial 与 Required ⭐⭐
- [x] `01-utility-types.ts` 第 2 题：Pick 与 Omit ⭐⭐
- [x] `01-utility-types.ts` 第 3 题：Record 与综合运用 ⭐⭐⭐
- [x] `02-conditional-types.ts` 第 1 题：条件类型基础 ⭐⭐
- [x] `02-conditional-types.ts` 第 2 题：infer 提取 Promise 结果 ⭐⭐⭐
- [x] `02-conditional-types.ts` 第 3 题：分布式条件类型与联合类型过滤 ⭐⭐⭐
- [x] `03-keyof-mapped-types.ts` 第 1 题：keyof 与安全取值 ⭐⭐
- [x] `03-keyof-mapped-types.ts` 第 2 题：映射类型生成表单错误 ⭐⭐⭐
- [x] `03-keyof-mapped-types.ts` 第 3 题：key remapping 生成事件处理器 ⭐⭐⭐⭐
- [x] `04-api-response-modeling.ts` 第 1 题：API 请求结果建模 ⭐⭐⭐
- [x] `04-api-response-modeling.ts` 第 2 题：列表数据归一化 ⭐⭐⭐
- [x] `04-api-response-modeling.ts` 第 3 题：安全的 Patch Payload ⭐⭐⭐⭐
- [x] `05-real-world-public-apis.ts` 第 1 题：Open-Meteo 天气 API ⭐⭐⭐⭐
- [x] `05-real-world-public-apis.ts` 第 2 题：Open Library 图书搜索 API ⭐⭐⭐⭐
- [x] `05-real-world-public-apis.ts` 第 3 题：Hacker News 官方 API ⭐⭐⭐⭐⭐
- [x] `05-real-world-public-apis.ts` 第 4 题：REST Countries 国家信息 API ⭐⭐⭐⭐
- [x] `06-review-mini-api-client.ts` 第 1 题：封装 JSONPlaceholder Mini Client ⭐⭐⭐⭐⭐

### JS 生态 — JavaScript
（待开始）

### JS 生态 — Node.js
（待开始）

### JS 生态 — React

#### beginner
- [x] `01-jsx-components.tsx` 第 1 题：学习状态面板 ⭐
- [x] `02-props-cards.tsx` 第 1 题：课程卡片列表 ⭐⭐
- [x] `03-use-state.tsx` 第 1 题：学习打卡面板 ⭐⭐
- [x] `04-conditional-rendering.tsx` 第 1 题：学习任务状态面板 ⭐⭐
- [x] `05-list-rendering.tsx` 第 1 题：课程清单与当前课程详情 ⭐⭐
- [x] `06a-use-effect-timeout.tsx` 第 1 题：设备连接提示 ⭐
- [x] `06b-use-effect-interval.tsx` 第 1 题：运动秒表 ⭐
- [ ] `06c-use-effect-autosave.tsx` 第 1 题：草稿自动保存 ⭐⭐
- [ ] `06-use-effect.tsx` 综合练习：课程学习页的数据加载与学习计时器 ⭐⭐⭐（已保留草稿，暂缓）

### JS 生态 — React Native

#### beginner
- [ ] `01-core-components.tsx` 第 1 题：个人资料卡片 ⭐

### JS 生态 — GraphQL
（待开始）

### Apple 生态 — Swift
（待开始）

### Apple 生态 — SwiftUI
（待开始）

### Apple 生态 — UIKit
（待开始）

### Apple 生态 — SwiftData
（待开始）

### Apple 生态 — AppKit
（待开始）

### Apple 生态 — iOS SDK
（待开始）

### Apple 生态 — 架构模式
（待开始）

### 通用 — API 集成
（待开始）

### 通用 — A/B 测试
（待开始）

### 通用 — 监控
（待开始）
