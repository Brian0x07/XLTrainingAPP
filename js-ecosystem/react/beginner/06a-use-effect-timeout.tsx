// ====== 初级 06A：首次渲染后执行 ======
// 适用环境：React 项目中的 `.tsx` 组件文件
// 建议运行方式：
// 1. 打开终端并进入 React 练习环境：
//    cd /Users/xiaolei/Documents/文稿/TrainingAPP/js-ecosystem/react
// 2. 启动开发环境：
//    npm run dev
// 3. 在浏览器中打开：
//    http://127.0.0.1:5173/
// 4. 如果 5173 端口被占用，以终端显示的实际地址为准
// 5. 当前题目已经通过 `src/App.tsx` 挂载，保存代码后可直接查看结果
// 考察点：useEffect、空依赖数组、setTimeout、clearTimeout

// ====== 第 1 题：设备连接提示 ======
// 难度：⭐
//
// 真实场景：
// 用户打开设备页面时，App 会尝试连接附近的耳机。
// 页面先显示“正在连接设备...”，1 秒后改为“设备已连接”。
//
// 为什么使用 useEffect：
// “等待 1 秒后更新状态”不是计算页面内容，而是页面出现后才开始的一项额外工作。
// 因此把它放在 useEffect 中。
//
// 你只需要完成下面标有 TODO 的 useEffect，不需要自己写页面结构。
//
// 验收要求：
// 1. useEffect 只在组件首次出现后执行一次。
// 2. 在 useEffect 中用 setTimeout 等待 1000 毫秒。
// 3. 时间到后调用 setIsConnected(true)。
// 4. 返回清理函数，并在其中调用 clearTimeout(timeoutId)。
//
// 做题时可以按这个顺序想：
// 页面出现 -> 启动一次性定时器 -> 1 秒后修改状态 -> 页面重新渲染

import { useEffect, useState, type CSSProperties } from "react"

export default function UseEffectTimeoutExercise() {
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        // TODO: 在这里启动一次性定时器，并返回清理函数。

        const timeoutId = setTimeout(() => {
            setIsConnected(true)
        }, 1000);

        return () => {
            clearTimeout(timeoutId)
        }

    }, [])

    return (
        <main style={styles.page}>
            <section style={styles.panel}>
                <p style={styles.eyebrow}>React Beginner 06A</p>
                <h1 style={styles.title}>设备连接提示</h1>

                <div style={styles.statusRow}>
                    <span
                        aria-hidden="true"
                        style={{
                            ...styles.statusDot,
                            background: isConnected ? "#16a34a" : "#f59e0b",
                        }}
                    />
                    <span>{isConnected ? "设备已连接" : "正在连接设备..."}</span>
                </div>

                {!isConnected && (
                    <button
                        type="button"
                        style={styles.connectButton}
                        onClick={() => setIsConnected(true)}
                    >
                        立即连接
                    </button>
                )}
            </section>
        </main>
    )
}

const styles: Record<string, CSSProperties> = {
    page: {
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "#f4f6f8",
        color: "#17202a",
        fontFamily: "system-ui, sans-serif",
        boxSizing: "border-box",
    },
    panel: {
        width: "min(100%, 440px)",
        padding: 28,
        border: "1px solid #d8dee4",
        borderRadius: 8,
        background: "#ffffff",
        boxShadow: "0 12px 28px rgba(23, 32, 42, 0.08)",
        boxSizing: "border-box",
    },
    eyebrow: {
        margin: "0 0 8px",
        color: "#5b6573",
        fontSize: 13,
        fontWeight: 700,
    },
    title: {
        margin: "0 0 24px",
        fontSize: 26,
        lineHeight: 1.25,
    },
    statusRow: {
        minHeight: 52,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "0 16px",
        border: "1px solid #d8dee4",
        borderRadius: 6,
        fontWeight: 650,
    },
    statusDot: {
        width: 10,
        height: 10,
        flex: "0 0 10px",
        borderRadius: "50%",
    },
    connectButton: {
        minHeight: 40,
        marginTop: 16,
        padding: "0 16px",
        border: "1px solid #17202a",
        borderRadius: 6,
        background: "#17202a",
        color: "#ffffff",
        font: "inherit",
        fontWeight: 700,
        cursor: "pointer",
    },
}

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 没有功能性问题；已完成后可以删除 useEffect 中原有的 TODO 注释，但不影响运行。
// 🔑 知识点：空依赖数组让 effect 在组件首次挂载后执行；setTimeout 返回的 id 可用于取消任务；cleanup 负责在组件卸载时清理尚未执行的定时器。

// ====== 补充笔记 ======
// 1. useEffect 由 React 在页面提交更新后安排执行，不是浏览器直接调用，也不保证“立刻”执行。
// 2. 第二个参数 `[]` 是依赖数组，表示这个 effect 不依赖会变化的 state 或 props。
// 3. effect 中 return 的是清理函数。effect 执行时 React 保存它，组件卸载或 effect 重新执行前才调用它。
// 4. setTimeout 只执行一次，用 clearTimeout 取消；setInterval 会重复执行，用 clearInterval 停止。
