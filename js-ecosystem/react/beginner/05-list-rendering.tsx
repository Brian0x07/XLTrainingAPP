// ====== 初级 05：列表渲染 ======
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
// 考察点: 列表渲染, map, key, 数组对象渲染, 列表与详情的基本拆分


// ====== 第 1 题：课程清单与当前课程详情 ======
// 难度: ⭐⭐
// 考察: React 列表渲染、`key`、点击列表项更新选中状态、根据选中项显示详情
//
// 背景：
// 前面你已经练过 JSX、props、useState 和条件渲染。
// 这一题开始练 React 里非常常见的场景：把数组数据渲染成一组 UI。
//
// 要求：
// 1. 导出默认组件 `ListRenderingExercise`
// 2. 从 React 中导入 `useState`
// 3. 定义一个课程类型：
//    type Course = {
//      id: string
//      title: string
//      level: "beginner" | "intermediate"
//      duration: number
//      isCompleted: boolean
//    }
// 4. 准备一个 `courses: Course[]` 数组，至少包含 4 门课程
// 5. 页面顶部至少输出：
//    - 主标题：`React Beginner 05`
//    - 副标题：`列表渲染`
// 6. 在页面上显示课程统计：
//    - `课程总数：x`
//    - `已完成：x`
// 7. 使用 `courses.map(...)` 渲染课程列表：
//    - 每一项必须设置 `key={course.id}`
//    - 每一项至少显示课程标题、难度、时长、完成状态
//    - 完成状态显示为：`已完成` 或 `未完成`
// 8. 增加一个 state：
//    - `selectedCourseId`: string，初始值为空字符串
//    - 点击某一门课程时，把 `selectedCourseId` 更新为当前课程的 id
// 9. 根据 `selectedCourseId` 找到当前选中的课程，并渲染详情区：
//    - 如果还没有选中课程，显示：`请选择一门课程`
//    - 如果已经选中课程，显示：
//      - `当前课程：xxx`
//      - `学习时长：x 分钟`
//      - `完成状态：已完成/未完成`
// 10. 至少保持两层以上结构，并使用简单样式让统计区、列表区、详情区分开
//
// 提示：
// - map 列表渲染：
//   {courses.map((course) => (
//     <div key={course.id}>{course.title}</div>
//   ))}
// - 不建议用数组下标 index 当 key；优先用稳定唯一 id
// - 统计已完成数量可以用：
//   const completedCount = courses.filter((course) => course.isCompleted).length
// - 查找当前选中课程可以用：
//   const selectedCourse = courses.find((course) => course.id === selectedCourseId)
// - 详情区可以继续使用上一题学过的条件渲染
//
// ====== 补充笔记：列表渲染核心思想 ======
// React 里通常不会手写很多重复 JSX，而是把一组数据放进数组，再用 `map` 转成一组组件或标签。
//
// `key` 的作用是帮助 React 识别“这一项是谁”。
// 当列表新增、删除、排序或更新时，稳定的 `key` 能让 React 更准确地复用已有 DOM 和组件状态。
//
// 常见原则：
// 1. 数据有唯一 id 时，优先使用 `key={item.id}`
// 2. 尽量不要用数组下标 `index` 当 key
// 3. `key` 只需要写在 `map` 返回的最外层 JSX 元素上
//
// 👇 在下面写你的代码

import type { CSSProperties } from "react"
import { useState } from "react"

type Course = {
    id: string
    title: string
    level: "beginner" | "intermediate"
    duration: number
    isCompleted: boolean
}

const courses: Course[] = [
    {
        id: "1",
        title: "english",
        level: "beginner",
        duration: 80,
        isCompleted: false,
    },
    {
        id: "2",
        title: "React JSX",
        level: "beginner",
        duration: 45,
        isCompleted: true,
    },
    {
        id: "3",
        title: "React Props",
        level: "beginner",
        duration: 50,
        isCompleted: true,
    },
    {
        id: "4",
        title: "React List Rendering",
        level: "intermediate",
        duration: 70,
        isCompleted: false,
    },
]

export default function ListRenderingExercise() {
    // TODO: 按上方要求完成本题。保留这个默认导出，练习环境才能正常挂载当前文件。

    const completedCount = courses.filter((course) => course.isCompleted ).length

    const [selectedCourseId, setSelectedCourseId] = useState("")

    const selectedCourse = courses.find((c)=>{
        return c.id === selectedCourseId
    })

    return (
        <div style={styles.page}>
            <div style={styles.shell}>
                <h1>React Beginner 05</h1>
                <h2>列表渲染</h2>
                <div>课程总数：{courses.length}</div>
                <div>已完成：{completedCount}</div>
                <div style={styles.list}> {courses.map((course) => (
                    <div style={styles.item} key={course.id} onClick={() => setSelectedCourseId(course.id)}>
                        <div>标题：{course.title}</div>
                        <div>难度：{course.level}</div>
                        <div>时长：{course.duration} 分钟</div>
                        <div>{course.isCompleted ? `已完成` : `未完成`}</div>
                    </div>
                ))} </div>
                <div>{
                    selectedCourse ?
                        `当前课程: ${selectedCourse.title} 
                        学习时长：${selectedCourse.duration} 分钟
                        完成状态：${selectedCourse.isCompleted ? `已完成` : `未完成` } ` :
                        "请选择一门课程"
                }</div>

            </div>
        </div>
    )
}

const styles: Record<string, CSSProperties> = {
    page: {
        minHeight: "100vh",
        margin: 0,
        padding: "40px 20px",
        background: "#f8fafc",
        fontFamily: "sans-serif",
        boxSizing: "border-box",
    },
    shell: {
        maxWidth: 760,
        margin: "0 auto",
        padding: 24,
        background: "#ffffff",
        borderRadius: 16,
        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
    },
    list: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
    },
    item: {
        padding: 12,
        color: "#34a1c0",
        background: "#2e0606",
    },
}

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. `npm run build` 已通过，列表渲染、`key={course.id}`、点击更新 `selectedCourseId`、
//      `find` 查找当前课程这些核心要求都完成了。
//   2. 详情区现在用模板字符串一次性输出多行内容，浏览器里可能会显示成一整段文本。
//      React 中更常见的写法是用多个 JSX 节点分别显示课程名、学习时长和完成状态。
//   3. `courses` 是固定练习数据，建议用 `const courses` 而不是 `let courses`。
//   4. `TODO` 注释可以在完成后删掉，避免以后复查时误以为题目还没完成。
// 🔑 知识点：数组 `map` 渲染列表、稳定 `key`、点击事件更新 state、用 `find` 从 id 派生当前详情数据、条件渲染详情区。
