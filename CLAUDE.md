# TrainingAPP

## 项目目的

这是一个综合编程练习项目，用于交互式学习多种技术栈，目标对标 **iOS Software Engineer II** 岗位要求。

涵盖三大方向：
- **JS 生态**：JS → TS → Node.js → React → React Native → GraphQL
- **Apple 生态**：Swift → SwiftUI → UIKit → AppKit → iOS SDK → 架构模式
- **通用技能**：API 集成、A/B 测试、监控

## 学习方式

1. Claude 在练习文件中出题（按知识点、按难度分级）
2. 用户在文件中写代码实现
3. 用户运行对应命令查看输出
4. Claude 验证结果并点评
5. Claude 在题目下方写入**批改记录**（注释形式），包括：
   - 是否通过
   - 发现的问题
   - 涉及的知识点
6. Claude 更新本文件中的**进度清单**

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

## 难度分级

| 级别 | 目录 | 说明 |
|------|------|------|
| 初级 beginner | `beginner/` | 基础语法、核心概念 |
| 中级 intermediate | `intermediate/` | 进阶用法（根据初级答题情况出题） |
| 高级 advanced | `advanced/` | 综合实战（根据中级答题情况出题） |

> 中级和高级的题目不提前生成，根据用户答题表现针对性出题。

## 项目结构

```
TrainingAPP/
├── js-ecosystem/                # JavaScript 生态
│   ├── js/                      # JavaScript 语言基础
│   │   ├── beginner/
│   │   ├── intermediate/
│   │   └── advanced/
│   ├── ts/                      # TypeScript 类型系统
│   │   ├── beginner/            # （已有练习题）
│   │   │   ├── 01-basic-types.ts
│   │   │   ├── 02-functions.ts
│   │   │   └── 03-interface-type.ts
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
│   └── monitoring/              # Grafana/Graphite 监控基础
│       ├── beginner/
│       ├── intermediate/
│       └── advanced/
├── docs/
│   ├── setup-guide.md
│   └── how-to-run.md
└── CLAUDE.md
```

## 运行命令

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

> 其他技术栈（React、React Native、SwiftUI 等）需要项目环境，届时单独配置。

## 学习计划文档

每个技术栈目录下可能有 `learning-plan.md`，记录该技术的学习大纲和顺序。出题前 Claude 应先读取对应的 learning-plan.md（如果存在），按其中的模块和顺序出题。

| 技术栈 | 计划文档 |
|--------|---------|
| React Native | `js-ecosystem/react-native/learning-plan.md` |

> 后续其他技术栈的学习计划文档会陆续添加到此表。

## 学习优先级（对标 iOS Software Engineer II）

1. **最高优先**：Swift → SwiftUI → iOS SDK → 架构模式 (MVVM/TCA)
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
- [ ] `03-interface-type.ts` 第 2 题：type 别名与联合类型 ⭐⭐ ← 当前
- [ ] `03-interface-type.ts` 第 3 题：interface vs type ⭐⭐

#### 中级 intermediate
（待初级完成后根据答题情况生成）

#### 高级 advanced
（待中级完成后根据答题情况生成）

### JS 生态 — JavaScript
（待开始）

### JS 生态 — Node.js
（待开始）

### JS 生态 — React
（待开始）

### JS 生态 — React Native
（待开始）

### JS 生态 — GraphQL
（待开始）

### Apple 生态 — Swift
（待开始）

### Apple 生态 — SwiftUI
（待开始）

### Apple 生态 — UIKit
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
