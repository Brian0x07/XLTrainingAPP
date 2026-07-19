// ====== 初级 06B：状态变化后执行 ======
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
// 考察点：useEffect、依赖数组、setInterval、clearInterval

// ====== 第 1 题：运动秒表 ======
// 难度：⭐
//
// 真实场景：
// 用户准备运动时点击“开始”，秒表每秒加 1；点击“暂停”后，秒表停止。
// 用户还可以点击“重置”，把秒数恢复为 0。
//
// 为什么使用 useEffect：
// 重复计时是页面渲染之外持续进行的工作。
// 当 isRunning 改变时，需要让定时器和当前状态保持同步：开始时创建，暂停时清理。
//
// 页面结构和按钮已经写好。你只需要完成下面标有 TODO 的 useEffect。
//
// 验收要求：
// 1. isRunning 为 false 时，不创建定时器。
// 2. isRunning 为 true 时，使用 setInterval 创建重复定时器。
// 3. 每隔 1000 毫秒调用一次 setSeconds，让原有秒数加 1。
// 4. 返回清理函数，并在其中调用 clearInterval(intervalId)。
// 5. 点击“开始”后秒数持续增加；点击“暂停”后数字不再变化。
//
// 做题时可以按这个顺序想：
// isRunning 改变 -> 清理旧 effect -> 执行新 effect -> 决定是否启动定时器

import { useEffect, useState, type CSSProperties } from "react"

export default function UseEffectIntervalExercise() {
    const [isRunning, setIsRunning] = useState(false)
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        // TODO: 根据 isRunning 启动定时器，并返回清理函数。
        if (!isRunning) return 

        const intervalID = setInterval(() => {
            setSeconds((current) => current + 1)
        }, 1000);

        return () => {
            clearInterval(intervalID)
        }

    }, [isRunning])

    const minutesText = String(Math.floor(seconds / 60)).padStart(2, "0")
    const secondsText = String(seconds % 60).padStart(2, "0")

    return (
        <main style={styles.page}>
            <section style={styles.panel}>
                <p style={styles.eyebrow}>React Beginner 06B</p>
                <h1 style={styles.title}>运动秒表</h1>

                <output style={styles.timer} aria-live="polite">
                    {minutesText}:{secondsText}
                </output>

                <div style={styles.actions}>
                    <button
                        type="button"
                        style={styles.primaryButton}
                        onClick={() => setIsRunning((current) => !current)}
                    >
                        {isRunning ? "暂停" : "开始"}
                    </button>

                    <button
                        type="button"
                        style={styles.secondaryButton}
                        onClick={() => {
                            setIsRunning(false)
                            setSeconds(0)
                        }}
                    >
                        重置
                    </button>
                </div>
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
    timer: {
        display: "block",
        minHeight: 92,
        padding: "12px 16px",
        border: "1px solid #c7d0d9",
        borderRadius: 6,
        background: "#f9fafb",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: 48,
        fontWeight: 750,
        lineHeight: "66px",
        textAlign: "center",
        letterSpacing: 0,
        boxSizing: "border-box",
    },
    actions: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        marginTop: 16,
    },
    primaryButton: {
        minHeight: 44,
        padding: "0 16px",
        border: "1px solid #17202a",
        borderRadius: 6,
        background: "#17202a",
        color: "#ffffff",
        font: "inherit",
        fontWeight: 700,
        cursor: "pointer",
    },
    secondaryButton: {
        minHeight: 44,
        padding: "0 16px",
        border: "1px solid #aeb8c2",
        borderRadius: 6,
        background: "#ffffff",
        color: "#17202a",
        font: "inherit",
        fontWeight: 700,
        cursor: "pointer",
    },
}

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 没有功能性问题；已完成后可以删除 useEffect 中原有的 TODO 注释，但不影响运行。
// 🔑 知识点：依赖变化时 React 会先清理旧 effect，再执行新 effect；interval 必须在创建它的 effect 中返回对应 cleanup；连续 state 更新应使用函数式写法。

// ====== 补充笔记 ======
// 1. `return () => clearInterval(intervalID)` 返回的是 cleanup。React 先保存它，不会在创建定时器后立刻执行。
// 2. 点击“暂停”使 isRunning 从 true 变为 false 时，React 先调用旧 cleanup 停止 interval，再执行新的 effect。
// 3. seconds 每秒变化会触发渲染，但依赖 isRunning 没变，因此 effect 不会每秒重新创建 interval。
// 4. `setSeconds((current) => current + 1)` 传入的是匿名更新函数；React 把最新 state 交给它，并使用返回值作为下一个 state。
