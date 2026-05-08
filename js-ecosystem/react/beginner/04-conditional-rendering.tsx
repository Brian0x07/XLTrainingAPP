// ====== 初级 04：条件渲染 ======
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
// 考察点: 条件渲染, if, 三元表达式, &&, 空状态, 错误状态, 加载状态


// ====== 第 1 题：学习任务状态面板 ======
// 难度: ⭐⭐
// 考察: React 条件渲染、联合类型 state、根据状态显示不同 UI
//
// 背景：
// 上一题你已经学会了用 useState 保存组件状态。
// 这一题继续练习：根据 state 的不同值，显示不同的页面内容。
//
// 要求：
// 1. 导出默认组件 `ConditionalRenderingExercise`
// 2. 从 React 中导入 `useState`
// 3. 定义一个联合类型：
//    type StudyStatus = "idle" | "loading" | "success" | "error"
// 4. 至少拆分出 3 个 state：
//    - `taskTitle`: string，初始值为空字符串
//    - `status`: StudyStatus，初始值为 "idle"
//    - `showTip`: boolean，初始值为 false
// 5. 页面顶部至少输出：
//    - 主标题：`React Beginner 04`
//    - 副标题：`条件渲染`
// 6. 做一个学习任务输入框：
//    - 输入框的 `value` 绑定 `taskTitle`
//    - 输入变化时用 `onChange` 更新 `taskTitle`
//    - 如果还没有输入任务，显示：`还没有填写学习任务`
//    - 如果已经输入任务，显示：`当前任务：xxx`
// 7. 做 4 个状态按钮：
//    - “空闲”：点击后把 `status` 设置为 "idle"
//    - “加载中”：点击后把 `status` 设置为 "loading"
//    - “成功”：点击后把 `status` 设置为 "success"
//    - “失败”：点击后把 `status` 设置为 "error"
// 8. 根据 `status` 条件渲染状态区：
//    - "idle"：显示 `请选择一个学习状态`
//    - "loading"：显示 `学习任务加载中...`
//    - "success"：
//       - 如果 `taskTitle` 有内容，显示 `可以开始学习：xxx`
//       - 如果 `taskTitle` 为空，显示 `暂无学习任务`
//    - "error"：显示 `加载失败，请稍后重试`
// 9. 做一个“显示/隐藏提示”按钮：
//    - 点击后切换 `showTip`
//    - 使用 `&&` 条件渲染提示文案：`提示：真实项目里常用条件渲染处理 loading、error 和 empty。`
// 10. 至少保持两层以上结构，并使用简单样式让输入区、按钮区、状态区分开
//
// 提示：
// - 三元表达式：
//   {taskTitle ? `当前任务：${taskTitle}` : "还没有填写学习任务"}
// - && 条件渲染：
//   {showTip && <p>提示内容</p>}
// - 如果状态分支比较多，可以写一个函数：
//   function renderStatusContent() {
//     if (status === "loading") {
//       return <p>学习任务加载中...</p>
//     }
//     return <p>请选择一个学习状态</p>
//   }
//
// ====== 补充笔记：条件渲染核心思想 ======
// React 的 JSX 本质上可以根据 JavaScript 表达式返回不同内容。
// 条件渲染就是：根据当前数据状态，决定页面上应该显示什么。
//
// 常见写法有三类：
//
// 1. 三元表达式：适合二选一
// {isDone ? "已完成" : "未完成"}
//
// 2. &&：适合“满足条件才显示”
// {hasError && <p>出现错误</p>}
//
// 3. if + return：适合多个分支，通常写在组件函数或辅助函数里
// if (status === "loading") {
//   return <p>加载中...</p>
// }
//
// 在真实 App 中，列表为空、网络加载中、请求失败、用户未登录等场景，都会大量使用条件渲染。
//
// 👇 在下面写你的代码

import type { CSSProperties } from "react"
import { useState } from "react"




export default function ConditionalRenderingExercise() {
    // TODO: 按上方要求完成本题。保留这个默认导出，练习环境才能正常挂载当前文件。

    type StudyStatus = "idle" | "loading" | "success" | "error"

    const [taskTitle, setTaskTitle] = useState("")

    const[status, setStatus]  = useState<StudyStatus>("idle")

    const[showTip, setShowTip] = useState(false)

    function renderStatusContent() {
        switch (status) {
            case "idle":
                return <p>请选择一个学习状态</p>
            case "loading":
                return <p>学习任务加载中...</p>
            case "success":
                return <p>{taskTitle.trim() ? `可以开始学习：${taskTitle}` : "暂无学习任务"}</p>
            case "error":
                return <p>加载失败，请稍后重试</p>
        }
    }

    return (
        <div style={styles.page}>
            <div style={styles.shell}>
                <h1>React Beginner 04</h1>
                <h2>条件渲染</h2>
                <div style={styles.todo}>

                    <div>
                        <input 
                        type="text" 
                        value={taskTitle}
                        onChange={(e)=>{setTaskTitle(e.target.value)}} 
                        />
                        <p>
                            {taskTitle ? `当前任务：${taskTitle}` : "还没有填写学习任务"}
                        </p>
                    </div>

                    <div>
                        <button 
                        onClick={()=>{setStatus("idle")}}>空闲
                        </button>
                        <button 
                        onClick={()=>{setStatus("loading")}}>加载中
                        </button>
                        <button 
                        onClick={()=>{setStatus("success")}}>成功
                        </button>
                        <button 
                        onClick={()=>{setStatus("error")}}>失败
                        </button>
                    </div>

                    <div>
                        {renderStatusContent()}
                    </div>


                    <button onClick={() => {
                        setShowTip(!showTip)
                    }} >
                        {showTip ? "隐藏提示" : "显示提示"}
                    </button>

                    {showTip && (<p> 提示：真实项目里常用条件渲染处理 loading、error 和 empty。 </p>)
                    }

                </div>
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
        maxWidth: 720,
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

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 功能要求已经完成，`npm run build` 已通过。
//   2. 小优化：第 6 项的“当前任务”判断用的是 `taskTitle`，第 8 项 success 分支用的是 `taskTitle.trim()`；
//      只输入空格时两处展示会不一致。真实项目里建议统一先用 `const normalizedTitle = taskTitle.trim()` 再判断。
//   3. `TODO` 注释可以在完成后删掉，避免以后复查时误以为题目还没写完。
// 🔑 知识点：受控输入框、联合类型 state、switch 条件分支、三元表达式、&& 条件渲染。
//
// ====== 补充笔记 ======
// 1. `input` 的 `value` 应该绑定真实状态 `taskTitle`，展示文案应放在单独的 JSX 节点里。
//    当 `onChange` 调用 `setTaskTitle` 后，React 会重新渲染组件，所以 `<p>` 里依赖 `taskTitle` 的内容会实时刷新。
// 2. `taskTitle ? xxx : yyy` 使用的是 JavaScript 真假值判断。
//    空字符串 `""`、`null`、`undefined` 都会被当成 false；非空字符串会被当成 true。
// 3. 如果要把只输入空格也当成“没有内容”，可以写：
//    `taskTitle.trim() ? `可以开始学习：${taskTitle}` : "暂无学习任务"`。
// 4. 多分支 UI 可以用 `switch` 写在辅助函数里，再在 JSX 中用 `{renderStatusContent()}` 调用。
//    `<renderStatusContent />` 会被当成 JSX 标签，不是调用普通函数。
// 5. `showTip && <p>...</p>` 表示只有 `showTip` 为 true 时，才渲染后面的提示文案。
