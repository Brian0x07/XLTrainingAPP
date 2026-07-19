// ====== 初级 06：useEffect ======
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
// 考察点: useEffect, 首次渲染副作用, 依赖数组, setTimeout, setInterval, cleanup


// ====== 第 1 题：课程学习页的数据加载与学习计时器 ======
// 难度: ⭐⭐⭐
// 考察: React useEffect、模拟接口加载、依赖数组、定时器清理、state 与派生数据
//
// 真实场景：
// 你在做一个学习 App 的“课程学习页”。
// 用户打开页面时，课程列表不是一开始就有，而是需要从服务端请求。
// 在真实项目里，这通常是调用接口；本题先用 `setTimeout` 模拟一次接口请求。
//
// 用户选择某一门课程后，可以点击“开始学习”。
// 学习开始后，页面上会显示本次学习已经持续了多少秒。
// 用户点击“暂停学习”后，计时应该停止。
// 如果用户切换到了另一门课程，当前计时应该重置，因为这是新的学习会话。
//
// 这个场景在 React Native 里也很常见：
// - 页面打开后请求课程、文章、订单或个人资料
// - 用户进入某个详情页后启动计时、轮询或订阅
// - 页面离开或状态变化时清理定时器、监听器或订阅
//
// 要求：
// 1. 导出默认组件 `UseEffectExercise`
// 2. 从 React 中导入 `useEffect` 和 `useState`
// 3. 定义一个课程类型：
//    type Course = {
//      id: string
//      title: string
//      duration: number
//    }
// 4. 在组件中至少定义这些 state：
//    - `courses`: Course[]，初始值为空数组
//    - `isLoading`: boolean，初始值为 true
//    - `selectedCourseId`: string，初始值为空字符串
//    - `isStudying`: boolean，初始值为 false
//    - `seconds`: number，初始值为 0
// 5. 页面顶部至少输出：
//    - 主标题：`React Beginner 06`
//    - 副标题：`课程学习页：加载与计时`
// 6. 使用第一个 `useEffect` 模拟首次加载课程：
//    - 这个 effect 只在组件首次出现时执行一次
//    - 在 effect 里使用 `setTimeout`
//    - 约 800 到 1000 毫秒后，把 `courses` 设置为至少 3 门课程
//    - 加载完成后，把 `isLoading` 设置为 false
//    - cleanup 中调用 `clearTimeout`
// 7. 根据加载状态条件渲染：
//    - `isLoading` 为 true 时显示：`课程加载中...`
//    - 加载完成后显示课程列表
// 8. 使用 `courses.map(...)` 渲染课程列表：
//    - 每一项必须设置 `key={course.id}`
//    - 每一项至少显示课程标题和建议学习时长
//    - 点击某一门课程时，把 `selectedCourseId` 更新为当前课程 id
// 9. 根据 `selectedCourseId` 找到当前选中的课程：
//    - 如果没有选中课程，显示：`请选择一门课程开始学习`
//    - 如果已经选中课程，显示：
//      - `当前课程：xxx`
//      - `建议时长：x 分钟`
//      - `本次学习：x 秒`
// 10. 做一个学习控制按钮：
//    - 没有选中课程时，按钮不可用
//    - 没有学习中时，按钮文字为：`开始学习`
//    - 学习中时，按钮文字为：`暂停学习`
//    - 点击后切换 `isStudying`
// 11. 使用第二个 `useEffect` 实现学习计时：
//    - 当 `isStudying` 为 true 时，启动 `setInterval`
//    - 每 1 秒让 `seconds` 加 1
//    - 当 `isStudying` 变为 false，或者组件卸载时，必须清理 interval
//    - cleanup 中调用 `clearInterval`
// 12. 使用第三个 `useEffect` 处理切换课程：
//    - 当 `selectedCourseId` 改变时，把 `seconds` 重置为 0
//    - 同时把 `isStudying` 设置为 false
// 13. 至少保持两层以上结构，并使用简单样式让加载区、列表区、详情区、控制区分开
//
// 提示：
// - 首次渲染后执行一次：
//   useEffect(() => {
//     const timerId = setTimeout(() => {
//       // 设置课程数据
//     }, 800)
//
//     return () => {
//       clearTimeout(timerId)
//     }
//   }, [])
//
// - 根据某个状态变化执行：
//   useEffect(() => {
//     // selectedCourseId 改变后执行
//   }, [selectedCourseId])
//
// - 定时器写法：
//   useEffect(() => {
//     if (!isStudying) {
//       return
//     }
//
//     const intervalId = setInterval(() => {
//       setSeconds((prevSeconds) => prevSeconds + 1)
//     }, 1000)
//
//     return () => {
//       clearInterval(intervalId)
//     }
//   }, [isStudying])
//
// - 查找当前选中课程：
//   const selectedCourse = courses.find((course) => course.id === selectedCourseId)
//
// ====== 补充笔记：useEffect 核心思想 ======
// React 组件的主要职责是根据 state 和 props 计算 UI。
// 但真实 App 里经常还需要做“渲染之外”的事情，例如请求数据、启动定时器、监听事件、写入本地存储。
// 这些事情就叫副作用，通常放进 `useEffect`。
//
// `useEffect` 的依赖数组决定它什么时候执行：
//
// 1. `useEffect(() => { ... }, [])`
//    组件首次渲染到页面后执行一次，常用于首次加载数据。
//
// 2. `useEffect(() => { ... }, [selectedCourseId])`
//    `selectedCourseId` 每次变化后执行，常用于根据某个状态变化做同步处理。
//
// 3. cleanup：
//    effect 里 `return () => { ... }` 的函数用于清理副作用。
//    定时器、订阅、事件监听这类资源，如果不清理，可能会造成重复执行或内存泄漏。
//
// 👇 在下面写你的代码

import { useEffect, useState, type CSSProperties } from "react"

export default function UseEffectExercise() {
    // TODO: 按上方要求完成本题。保留这个默认导出，练习环境才能正常挂载当前文件。
    type Course = {
        id: string
        title: string
        duration: number
    }

    const [courses, setCourses] = useState<Course[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [selectedCourseId, setSelectedCourseId] = useState("")
    const [isStudying, setIsStudying] = useState(false)
    const [seconds, setSeconds] = useState(0)
    
    useEffect(()=> {
        const timerId = setTimeout(() => {
            setCourses([
                { id: "aa", title: "数学", duration: 30 },
                { id: "bb", title: "语文", duration: 30 },
                { id: "cc", title: "英语", duration: 30 },
            ])
        } ,800)

        setIsLoading(true)

        return () => {
            setIsLoading(false)
            clearTimeout(timerId)
        }

    },[])

    return (
        <div style={styles.page}>
            <div style={styles.shell}>
                <h1>React Beginner 06</h1>
                <h2>课程学习页：加载与计时</h2>
                if (condition) {
                    <div style={styles.todo}>课程加载中...</div>
                } else {
                    const titles = courses.map(item => { item.title })

                }
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
    todo: {
        marginTop: 24,
        color: "#475569",
    },
}
