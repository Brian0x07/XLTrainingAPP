// ====== 初级 03：useState 与基础交互 ======
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
// 考察点: useState, 受控输入, 点击事件, 多个 state 的拆分, 条件渲染


// ====== 第 1 题：学习打卡面板 ======
// 难度: ⭐⭐
// 考察: useState 基础、输入框受控组件、按钮事件、状态更新后重新渲染
//
// 背景：
// 前两题你已经练了 JSX、函数组件、props 和组件复用。
// 这一题开始进入 React 交互的核心：组件自己的状态 state。
//
// 要求：
// 1. 导出默认组件 `UseStateExercise`
// 2. 从 React 中导入 `useState`
// 3. 至少拆分出 3 个 state：
//    - `learnerName`: string，初始值为空字符串
//    - `finishedCount`: number，初始值为 0
//    - `isFocusedToday`: boolean，初始值为 false
// 4. 页面顶部至少输出：
//    - 主标题：`React Beginner 03`
//    - 副标题：`useState 与基础交互`
// 5. 做一个姓名输入框：
//    - 输入框的 `value` 绑定 `learnerName`
//    - 输入变化时用 `onChange` 更新 `learnerName`
//    - 页面上实时显示：`你好，xxx`
//    - 如果还没有输入名字，显示：`还没有填写学习者`
// 6. 做一个“完成 1 节”按钮：
//    - 点击后让 `finishedCount` 加 1
//    - 页面上显示：`今日完成：x 节`
// 7. 做一个“重置进度”按钮：
//    - 点击后把 `finishedCount` 重置为 0
// 8. 做一个“切换专注状态”按钮：
//    - 点击后在 true / false 之间切换 `isFocusedToday`
//    - 页面上根据状态显示：
//      `今天已进入专注状态`
//      或
//      `今天还未进入专注状态`
// 9. 根据 `finishedCount` 条件渲染目标状态：
//    - 当 `finishedCount >= 3` 时显示：`今日目标已完成`
//    - 否则显示：`距离今日目标还差 x 节`
// 10. 至少保持两层以上结构，并使用简单样式让输入区、按钮区、状态区分开
//
// 提示：
// - useState 基本写法：
//   const [count, setCount] = useState(0)
// - 输入框事件里可以通过 `event.target.value` 读取当前输入
// - 更新数字时可以写：
//   setFinishedCount(finishedCount + 1)
// - 切换 boolean 时可以写：
//   setIsFocusedToday(!isFocusedToday)
//
// ====== 补充笔记：useState 核心思想 ======
// React 组件默认只是一个“根据数据返回 UI 的函数”。
// 如果一个值只是普通变量，比如 `let count = 0`，React 不会因为它变了就自动重新画页面。
// `useState` 的作用是告诉 React：这个值是组件状态，它变化时需要重新执行组件函数，并用新结果更新 UI。
//
// `useState` 会返回两个东西：
// 1. 当前状态值：用于显示到页面上，或者参与判断
// 2. 更新状态的函数：用于告诉 React 这个状态变了
//
// 基本写法：
// const [count, setCount] = useState(0)
//
// 可以这样理解：
// - `count` 是当前值
// - `setCount` 是修改它的专用函数
// - `useState(0)` 里的 `0` 是初始值，只在组件第一次出现时使用
//
// 为什么不能直接写 `count = count + 1`？
// 因为 React 需要通过 `setCount(...)` 知道“状态变了，请重新渲染”。
// 直接改普通变量，React 不知道这件事，页面通常不会按预期更新。
//
// 常见例子：
// const [name, setName] = useState("")
// const [finishedCount, setFinishedCount] = useState(0)
// const [isFocusedToday, setIsFocusedToday] = useState(false)
//
// 对应到 UI：
// - 输入框输入内容 -> 调用 `setName(event.target.value)` -> 页面显示新名字
// - 点击完成按钮 -> 调用 `setFinishedCount(finishedCount + 1)` -> 页面显示新的完成数量
// - 点击切换按钮 -> 调用 `setIsFocusedToday(!isFocusedToday)` -> 页面切换文案
//
// 👇 在下面写你的代码

import type { CSSProperties } from "react"
import  { useState } from "react"



export default function UseStateExercise() {
    // TODO: 按上方要求完成本题。保留这个默认导出，练习环境才能正常挂载当前文件。

    const [learnerName, setName] = useState("")
    const [finishedCount, setCount] = useState(0)
    const [isFocusedToday, setIsFocusedToday] = useState(false)

    return (
        <div style={styles.page}>
            <div style={styles.shell}>
                <h1>React Beginner 03</h1>
                <h2>useState 与基础交互</h2>
                <div style={styles.todo}>

                    <div>
                        <label>
                            <input
                                type="text"
                                value={learnerName}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="请输入你的名字" />
                            <p>
                                {learnerName ? `你好，${learnerName}` : "还没有填写学习者"}
                            </p>
                        </label>
                    </div>

                    <div>
                        <button onClick={()=>{setCount(
                            finishedCount+1
                        )}}>完成1节</button>
                        <p>今日完成：{finishedCount} 节</p>
                    </div>

                    <div><button onClick={() => {
                        setCount(0)
                    }}>重置进度
                    </button></div>

                    <div>
                        <button onClick={()=>{
                            setIsFocusedToday(!isFocusedToday)
                        }}>
                            切换专注状态
                        </button>
                        <p>{isFocusedToday ? "今天已进入专注状态" : "今天还未进入专注状态"} </p>
                    </div>

                    <div>
                        <p>{finishedCount >= 3 ?  "今日目标已完成" : `距离今日目标还差 ${3-finishedCount} 节`}</p>
                    </div>

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
// ❌ 未通过
// 📝 发现的问题：
//   1. `useState` 不能写在组件外层。Hook 必须写在 React 函数组件内部，或者自定义 Hook 内部。
//   2. `namePart` 用小写开头，JSX 会把 `<namePart>` 当成原生 HTML 标签，而不是 React 组件。
//   3. 如果要拆成子组件，组件名应使用大写，例如 `NamePart`，并写成 `<NamePart />`。
//   4. `finishedCount` 和 `setCount` 目前声明了但没有使用，所以 TypeScript 构建会报未使用错误。
//   5. 题目要求的 `isFocusedToday`、完成按钮、重置按钮、专注状态按钮、目标状态条件渲染还没有完成。
// 🔑 知识点：
//   React Hook 的调用位置很严格：`useState` 必须在组件函数内部调用。JSX 中自定义组件必须大写开头，
//   小写标签会被当成浏览器原生标签。受控输入框的方向是对的：`value={learnerName}` 负责显示 state，
//   `onChange={(event) => setName(event.target.value)}` 负责把输入内容写回 state。

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 当前版本已经完成 3 个 state、受控输入框、完成按钮、重置按钮、专注状态切换和目标状态条件渲染。
//   2. 代码可以编译通过。后续可以继续优化 JSX 排版，例如按钮文案和数字之间保留空格，让页面显示更自然。
// 🔑 知识点：本题核心是把会变化的数据放进 state，并通过事件处理函数调用 setter 更新状态。
//   React 会在 state 更新后重新执行组件函数，因此输入框、完成节数、专注状态和目标状态都会自动刷新。
