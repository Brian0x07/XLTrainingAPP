# TrainingAPP Codex Guide

## 文档作用

这是 Codex 在本仓库中的项目级工作说明。

- Codex 进入本仓库工作时，应优先遵守本文件。
- 用户当前消息的明确要求优先级最高。
- `CLAUDE.md` 是历史协作说明与进度来源；如果本文件缺少细节，可以参考 `CLAUDE.md`，但不要默认覆盖用户已有练习代码。
- 如果后续继续维护两份说明文档，关键进度与协作规则应保持一致，避免 `AGENTS.md` 与 `CLAUDE.md` 互相矛盾。

## 项目定位

本仓库是一个面向 iOS Software Engineer II 能力目标的综合编程练习环境。

它不是单一业务 App，而是一个由 AI 协助推进的训练仓库：

- AI 按知识点和难度出题。
- 用户直接在练习文件中写代码。
- 用户或 AI 运行命令查看结果。
- AI 根据代码与运行结果批改、补充笔记，并更新进度。

项目覆盖三大方向：

- JS 生态：JavaScript、TypeScript、Node.js、React、React Native、GraphQL。
- Apple 生态：Swift、SwiftUI、UIKit、SwiftData、AppKit、iOS SDK、架构模式。
- 通用技能：API 集成、A/B 测试、监控。

## 当前状态

仓库目前已经建立多技术栈目录框架，但真正已经落地并可直接练习的主线是 TypeScript。

当前进度：

- 当前主线：JS 生态 -> TypeScript。
- 最近完成：`js-ecosystem/ts/advanced/05-real-world-public-apis.ts` 第 4 题。
- 当前待做：TypeScript 下一阶段复盘或新专题。
- React Native 已有学习计划：`js-ecosystem/react-native/learning-plan.md`。
- SwiftData 已有学习计划：`apple-ecosystem/swiftdata/learning-plan.md`。
- 其他技术栈大多仍是目录占位，后续按学习进度逐步补题和补环境。

## 默认入口

如果用户说“继续做题”“出下一题”“继续训练”等，但没有指定技术栈，默认从 TypeScript 高级练习继续。

常用入口目录：

- `js-ecosystem/ts/beginner/`
- `js-ecosystem/ts/intermediate/`
- `js-ecosystem/ts/advanced/`
- `js-ecosystem/ts/playground.ts`

出题或批改前，应先查看相关练习文件的现有格式和最近记录，再继续写入。

## 协作流程

标准练习流程：

1. AI 在练习文件中出题，按知识点和难度分级。
2. 用户在文件中写代码实现。
3. 用户或 AI 运行对应命令查看输出或报错。
4. AI 验证结果并点评。
5. AI 在题目下方追加批改记录。
6. AI 更新进度清单。
7. 用户在做题过程中提出的问题，适合沉淀的内容应在批改记录下方以补充笔记形式写入文件，方便复习。

批改时要优先保护用户答案，不要擅自重写用户作答区域。除非用户明确要求修复代码，否则以点评、指出问题、补充笔记为主。

## 批改记录格式

每道题作答区域下方，追加以下注释格式：

```typescript
// ====== 批改记录 ======
// ✅ 通过 / ❌ 未通过
// 📝 发现的问题：
//   1. 具体问题描述
// 🔑 知识点：涉及的知识点总结
```

Swift 文件也使用 `//` 注释，格式相同。

如用户在答题过程中追问知识点，可在批改记录后追加：

```typescript
// ====== 补充笔记 ======
// 这里记录与本题直接相关、方便复习的解释。
```

## 出题规则

难度分级：

| 级别 | 目录 | 说明 |
| --- | --- | --- |
| beginner | `beginner/` | 基础语法、核心概念 |
| intermediate | `intermediate/` | 进阶用法，根据初级答题情况出题 |
| advanced | `advanced/` | 综合实战，根据中级答题情况出题 |

规则：

- 初级题目可以提前准备。
- 中级和高级题目不要求一次性全部生成。
- 中级和高级题目应根据用户答题表现，逐步、针对性地出题。
- 出题前若对应技术栈存在 `learning-plan.md`，应先读取并按其中模块顺序推进。
- 不要因为目录存在就假设练习内容已经完善；先检查文件实际内容。

## 仓库结构

高层目录职责：

- `js-ecosystem/`：JavaScript、TypeScript、Node.js、React、React Native、GraphQL。
- `apple-ecosystem/`：Swift、SwiftUI、UIKit、SwiftData、AppKit、iOS SDK、架构模式。
- `general/`：API 集成、A/B 测试、监控。
- `docs/`：环境搭建与运行说明。
- `CLAUDE.md`：历史项目规则、协作方式、学习优先级、全局进度。
- `AGENTS.md`：Codex 当前项目级工作说明。

各技术栈默认采用 `beginner/`、`intermediate/`、`advanced/` 三层结构。

## 文档职责

- `AGENTS.md`：Codex 执行规则、默认入口、当前主线、批改与出题规范。
- `CLAUDE.md`：历史协作规则与进度说明。
- `docs/setup-guide.md`：环境安装与工具准备。
- `docs/how-to-run.md`：各技术栈运行命令说明。
- 各技术栈下的 `learning-plan.md`：该技术栈的学习顺序与模块安排。

## 常用运行命令

TypeScript：

```bash
npx ts-node js-ecosystem/ts/beginner/01-basic-types.ts
npx ts-node js-ecosystem/ts/beginner/02-functions.ts
npx ts-node js-ecosystem/ts/beginner/03-interface-type.ts
```

JavaScript：

```bash
node js-ecosystem/js/beginner/<文件名>.js
```

Swift：

```bash
swift apple-ecosystem/swift/beginner/<文件名>.swift
```

React、React Native、SwiftUI、UIKit、AppKit 等需要项目环境，具体命令见 `docs/how-to-run.md`。

## 学习计划

出题前应先读取对应技术栈目录下的 `learning-plan.md`，如果该文件存在。

当前已登记：

| 技术栈 | 计划文档 |
| --- | --- |
| React Native | `js-ecosystem/react-native/learning-plan.md` |
| SwiftData | `apple-ecosystem/swiftdata/learning-plan.md` |

后续其他技术栈的学习计划文档会逐步补充。

## 学习优先级

对标 iOS Software Engineer II，建议优先级：

1. 最高优先：Swift -> SwiftUI -> UIKit -> SwiftData -> iOS SDK -> 架构模式（MVVM/TCA）。
2. 中优先：TypeScript -> Node.js -> GraphQL -> API 集成。
3. 了解即可：A/B Testing、监控工具、AppKit。

## 进度清单

### JS 生态 - TypeScript

#### beginner

- [x] `01-basic-types.ts` 第 1 题：变量声明
- [x] `01-basic-types.ts` 第 2 题：元组与类型注解
- [x] `01-basic-types.ts` 第 3 题：const vs let 与只读
- [x] `02-functions.ts` 第 1 题：基本函数
- [x] `02-functions.ts` 第 2 题：可选参数与默认值
- [x] `02-functions.ts` 第 3 题：箭头函数
- [x] `03-interface-type.ts` 第 1 题：定义接口
- [x] `03-interface-type.ts` 第 2 题：type 别名与联合类型
- [x] `03-interface-type.ts` 第 3 题：interface vs type
- [x] `04-control-flow.ts` 第 1 题：if/else + switch
- [x] `04-control-flow.ts` 第 2 题：for 循环
- [x] `04-control-flow.ts` 第 3 题：while + break/continue

#### intermediate

- [x] `01-narrowing.ts` 第 1 题：typeof 收窄
- [x] `01-narrowing.ts` 第 2 题：in 收窄
- [x] `01-narrowing.ts` 第 3 题：判别式联合
- [x] `02-generics.ts` 第 1 题：泛型函数基础
- [x] `02-generics.ts` 第 2 题：泛型接口
- [x] `02-generics.ts` 第 3 题：泛型约束
- [x] `03-class.ts` 第 1 题：class 基础
- [x] `03-class.ts` 第 2 题：继承 extends
- [x] `03-class.ts` 第 3 题：implements 接口

#### advanced

- [x] `01-utility-types.ts` 第 1 题：Partial 与 Required
- [x] `01-utility-types.ts` 第 2 题：Pick 与 Omit
- [x] `01-utility-types.ts` 第 3 题：Record 与综合运用
- [x] `02-conditional-types.ts` 第 1 题：条件类型基础
- [x] `02-conditional-types.ts` 第 2 题：infer 提取 Promise 结果
- [x] `02-conditional-types.ts` 第 3 题：分布式条件类型与联合类型过滤
- [x] `03-keyof-mapped-types.ts` 第 1 题：keyof 与安全取值
- [x] `03-keyof-mapped-types.ts` 第 2 题：映射类型生成表单错误
- [x] `03-keyof-mapped-types.ts` 第 3 题：key remapping 生成事件处理器
- [x] `04-api-response-modeling.ts` 第 1 题：API 请求结果建模
- [x] `04-api-response-modeling.ts` 第 2 题：列表数据归一化
- [x] `04-api-response-modeling.ts` 第 3 题：安全的 Patch Payload
- [x] `05-real-world-public-apis.ts` 第 1 题：Open-Meteo 天气 API
- [x] `05-real-world-public-apis.ts` 第 2 题：Open Library 图书搜索 API
- [x] `05-real-world-public-apis.ts` 第 3 题：Hacker News 官方 API
- [x] `05-real-world-public-apis.ts` 第 4 题：REST Countries 国家信息 API

### 其他方向

- JS 生态 - JavaScript：待开始。
- JS 生态 - Node.js：待开始。
- JS 生态 - React：待开始。
- JS 生态 - React Native：待开始。
- JS 生态 - GraphQL：待开始。
- Apple 生态 - Swift：待开始。
- Apple 生态 - SwiftUI：待开始。
- Apple 生态 - UIKit：待开始。
- Apple 生态 - SwiftData：待开始。
- Apple 生态 - AppKit：待开始。
- Apple 生态 - iOS SDK：待开始。
- Apple 生态 - 架构模式：待开始。
- 通用 - API 集成：待开始。
- 通用 - A/B 测试：待开始。
- 通用 - 监控：待开始。
