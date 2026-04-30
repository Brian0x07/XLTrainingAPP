// ====== 初级 02：Props 与组件复用 ======
// 适用环境：React 项目中的 `.tsx` 组件文件
// 建议运行方式：
// 1. 进入 React 练习环境目录：
//    cd /Users/xiaolei/Documents/文稿/TrainingAPP/js-ecosystem/react
// 2. 启动开发环境：
//    npm run dev
// 3. 浏览器默认打开：
//    http://localhost:5173/
// 4. 如果 5173 端口被占用，以终端里实际输出的地址为准
// 5. 当前题目已经通过 `src/App.tsx` 挂载，可直接运行查看
// 考察点: props, 类型约束, 参数解构, 组件复用, 条件渲染


// ====== 第 1 题：课程卡片列表 ======
// 难度: ⭐⭐
// 考察: 父传子、props 类型、组件拆分、重复 UI 复用
//
// 背景：
// 上一题你已经练了 JSX 和函数组件。
// 这一题开始进入 React 最核心的第二步：把“数据”从父组件传给子组件。
//
// 要求：
// 1. 导出默认组件 `PropsCardsExercise`
// 2. 定义 `LessonCardProps`，至少包含：
//    - title: string
//    - minutes: number
//    - level: "beginner" | "intermediate"
//    - isCompleted: boolean
// 3. 写一个可复用子组件 `LessonCard`
//    - 使用参数解构接收 props
//    - 类型标注为 `LessonCardProps`
// 4. `LessonCard` 组件中至少输出：
//    - 课程名
//    - 学习时长，例如：`时长：25 分钟`
//    - 难度，例如：`难度：beginner`
//    - 完成状态：
//      `已完成` 或 `未完成`
// 5. 完成状态必须通过条件渲染得到，不能手写死
// 6. 在父组件 `PropsCardsExercise` 中，至少渲染 3 个 `LessonCard`
//    - 三张卡片的数据不能完全相同
// 7. 至少有一个 prop 用表达式形式传入，例如：
//    - `minutes={25}`
//    - `isCompleted={true}`
// 8. 页面顶部至少输出：
//    - 主标题：`React Beginner 02`
//    - 副标题：`Props 与组件复用`
//    - 这里的“页面顶部”指父组件 `PropsCardsExercise` 的返回结构里，
//      写在最外层页面容器内部，并放在 3 个 `LessonCard` 上方
// 9. 至少保持两层以上结构，并使用简单样式让卡片之间有明确间距
//
// 提示：
// - props 可以理解成“父组件传给子组件的数据”
// - 组件参数解构写法示例：
//   function Demo({ title, count }: DemoProps) {}
// - JSX 中传字符串 prop 时可以直接写：
//   title="React"
// - JSX 中传 number / boolean 时通常写成：
//   minutes={25}
//   isCompleted={false}
//
// 👇 在下面写你的代码

import React from "react"

export default function PropsCardsExercise() {
    // 页面级父组件：当前这整页内容都从这里开始组织
    return (
        <div style={styles.page}>
            <div style={styles.shell}>
                <h1>React Beginner 02</h1>
                <h2>Props 与组件复用 </h2>

                <LessonCard
                    title="english"
                    minutes={60}
                    level="beginner"
                    isCompleted={false}
                />
                <LessonCard
                    title="math"
                    minutes={30}
                    level="intermediate"
                    isCompleted={true}
                />
                <LessonCard
                    title="baseball"
                    minutes={60}
                    level="beginner"
                    isCompleted={false}
                />
            </div>
        </div>
    )
}

// 子组件接收的数据结构：父组件传什么，子组件就按这个类型收
type LessonCardProps = {
    title: string
    minutes: number
    level: "beginner" | "intermediate"
    isCompleted: boolean
}

function LessonCard({ title, minutes, level, isCompleted }: LessonCardProps) {
    // 可复用子组件：专门负责渲染单张课程卡片
    return <div style={styles.card}>
        <div>课程名: {title}</div>
        <div>时长：{minutes} 分钟</div>
        <div>难度：{level}</div>
        <div>{isCompleted? "已完成" : "未完成"}</div>
    </div>
}


const styles: Record<string, React.CSSProperties> = {
    // page: 整个页面最外层容器
    page: {
        minHeight: "100vh",
        margin: 0,
        padding: "40px 20px",
        background: "#eef2ff",
        fontFamily: "sans-serif",
        boxSizing: "border-box",
    },
    // shell: 中间那块白色内容容器
    shell: {
        maxWidth: 720,
        margin: "0 auto",
        padding: 24,
        background: "#ffffff",
        borderRadius: 18,
        boxShadow: "0 12px 30px rgba(30, 41, 59, 0.08)",
    },
    card: {
        margin: "15px 15px",
        background: "#affffa",
        padding:"10px 10px",
        borderRadius: 10,
    },
}

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 副标题末尾多了一个空格，不影响 props、组件拆分和运行结果，属于格式层面的小问题
//   2. `课程名:` 使用半角冒号、`时长：` 使用全角冒号，文案风格可以再统一，但不影响本题通过
// 🔑 知识点：props 类型约束、父组件向子组件传值、参数解构、组件复用、布尔条件渲染、基础样式拆分
