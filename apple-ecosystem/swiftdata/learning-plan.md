# SwiftData 学习计划

## 定位

SwiftData 是 Apple 生态中面向本地持久化和数据建模的现代框架，适合放在 SwiftUI 基础之后、iOS SDK 持久化专题之前学习。

本计划面向 iOS Software Engineer II 能力目标，重点不是只会写 demo，而是理解模型设计、查询、关系、数据生命周期、迁移和架构边界。

## 前置知识

开始 SwiftData 前，建议先具备：

- Swift 基础：struct/class、protocol、generic、error handling、async/await。
- SwiftUI 基础：`View`、`@State`、`@Binding`、列表、表单、导航。
- iOS App 基础：App 生命周期、Scene、文件与沙盒的基本概念。

## 学习顺序

### beginner

目标：能创建最小可运行的 SwiftData + SwiftUI 练习项目。

1. SwiftData 基础概念
   - `@Model`
   - `ModelContainer`
   - `ModelContext`
   - `@Environment(\.modelContext)`
   - `@Query`
2. 单表 CRUD
   - 新增模型对象
   - 查询列表
   - 修改字段
   - 删除对象
3. SwiftUI 集成
   - 列表展示
   - 表单编辑
   - 空状态
   - 基础错误提示

### intermediate

目标：能处理真实 App 中常见的数据关系和查询需求。

1. 模型设计
   - 必填字段与可选字段
   - 默认值
   - 唯一标识
   - 枚举字段的设计方式
2. 查询与排序
   - `@Query` 的 predicate
   - 排序
   - 搜索过滤
   - 分组展示
3. 关系建模
   - 一对多
   - 多对一
   - 级联删除
   - 反向关系
4. 与 ViewModel / Service 分层协作
   - 哪些逻辑留在 View
   - 哪些逻辑进入 Store 或 Repository
   - 如何避免把持久化细节扩散到 UI 层

### advanced

目标：能评估 SwiftData 在中型 App 中的风险和架构取舍。

1. 数据迁移
   - 模型版本变化
   - 字段新增/删除/重命名
   - 迁移策略
2. 性能与数据规模
   - 大列表查询
   - 分页或增量加载思路
   - 避免不必要的 UI 刷新
3. 并发与数据一致性
   - 后台任务中的数据写入
   - 主线程 UI 更新边界
   - 与网络同步的冲突处理
4. 测试
   - 内存型容器
   - CRUD 单元测试
   - Repository 测试
5. 与 Core Data 的关系
   - SwiftData 适合的场景
   - Core Data 仍然更合适的场景
   - 旧项目迁移评估

## 练习项目建议

推荐用一个小型但接近真实业务的项目贯穿练习：

- 任务清单：Task / Project / Tag
- 读书笔记：Book / Note / Highlight
- 训练日志：Workout / Exercise / SetRecord

默认从“任务清单”开始，因为它能覆盖 CRUD、排序、过滤、关系、删除策略和简单统计。

## 运行方式

SwiftData 练习需要 Xcode 项目环境，不能像单文件 Swift 练习一样直接用 `swift xxx.swift` 完整覆盖。

建议环境：

- Xcode 15 或更高版本。
- iOS 17 或更高版本作为最低部署目标。
- SwiftUI App 模板。

后续实际开始 SwiftData 练习时，在 `apple-ecosystem/swiftdata/` 下创建具体 Xcode 项目或练习工程。
