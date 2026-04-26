// ====== 初级 01：JSX 与函数组件 ======
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
// 考察点: JSX, 函数组件, 表达式嵌入, 条件渲染, 基础样式组织


// ====== 第 1 题：学习状态面板 ======
// 难度: ⭐
// 考察: JSX 基本语法、函数组件返回结构、组件内常量、三元表达式
//
// 背景：
// 这是 React 前置基础的第一题。
// 目标不是写复杂交互，而是先把 React 最核心的“组件 + JSX 表达式”写顺。
//
// 要求：
// 1. 导出默认组件 `LearningStatusPanel`
// 2. 组件内声明以下常量：
//    - learnerName: 你的名字
//    - targetTrack: `"React -> React Native"`
//    - currentLesson: `"JSX 与函数组件"`
//    - finishedCount: `1`
//    - totalCount: `5`
//    - isReady: `true`
// 3. 页面至少输出以下信息：
//    - 主标题：`React Beginner 01`
//    - 副标题：`JSX 与函数组件`
//    - 一行欢迎语：`你好，xxx`
//    - 一行学习路线：`当前路线：React -> React Native`
//    - 一行当前内容：`当前内容：JSX 与函数组件`
//    - 一行学习进度：`当前进度：1 / 5`
// 4. 用三元表达式根据 `isReady` 输出：
//    - `准备完成，开始练习`
//    - 或 `还没准备好，先复习`
// 5. 至少写出两层结构，而不是把所有内容直接平铺在根节点里
// 6. 可以使用简单的内联样式或对象样式，让结构更清晰
//
// 提示：
// - JSX 里嵌入变量时使用 `{变量名}`
// - 一个组件必须返回单一根节点
// - 三元表达式写法：
//   {isReady ? "准备完成，开始练习" : "还没准备好，先复习"}
//
// 👇 在下面写你的代码

import React from "react"

export default function LearningStatusPanel() {

    const learnerName = "xiaoming"
    const targetTrack = "React -> React Native"
    const currentLesson = "JSX 与函数组件"
    const finishedCount = 1
    const totalCount = 5
    const isReady = true

    return (
        <div style={styles.page}>
            <h1>React Beginner 01</h1>
            <h2>JSX 与函数组件</h2>
            <div style={styles.card}>
                <p>你好，{learnerName}</p>
                <p>当前路线：{targetTrack}</p>
                <p>当前内容：{currentLesson}</p>
                <p>当前进度：{finishedCount}/{totalCount}</p>
                <p>{isReady ? `准备完成，开始练习` : `还没准备好，先复习`}</p>
            </div>
        </div>
    )
}

const styles: Record<string, React.CSSProperties> = {
    page: {
        minHeight: "100vh",
        margin: 0,
        padding: "40px 20px",
        background: "#f3f4f6",
        fontFamily: "sans-serif",
        boxSizing: "border-box",
    },
    card: {
        maxWidth: 560,
        margin: "0 auto",
        padding: 24,
        background: "#ffffff",
        borderRadius: 16,
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
    },
    todo: {
        margin: 0,
        fontSize: 16,
        color: "#374151",
    },
}

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. `当前进度` 这一行写成了 `1/5`，题面示例是 `1 / 5`；不影响 JSX、组件结构和运行结果，属于格式层面的小问题
//   2. `styles.todo` 已经没有被使用，后面可以顺手删除，保持样式对象简洁
// 🔑 知识点：函数组件、JSX 表达式嵌入、单一根节点、三元表达式条件渲染、对象样式
