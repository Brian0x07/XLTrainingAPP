// ====== 初级 06C：依赖连续变化时清理旧任务 ======
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
// 考察点：useEffect、状态依赖、setTimeout、cleanup、延迟自动保存

// ====== 第 1 题：草稿自动保存 ======
// 难度：⭐⭐
//
// 真实场景：
// 用户在备忘录里连续输入内容时，不需要每输入一个字就立即保存。
// 当用户停止输入 800 毫秒后，页面再显示“草稿已保存”。
// 如果 800 毫秒内又输入了内容，就取消上一次等待，从最新一次输入重新计时。
//
// 为什么使用 useEffect：
// 自动保存需要跟随 draft 的变化启动延迟任务。
// cleanup 可以取消旧的 timeout，避免已经过期的保存任务继续执行。
//
// 页面结构、输入事件和空内容判断已经写好。
// 你只需要完成下面标有 TODO 的 useEffect。
//
// 验收要求：
// 1. draft 为空时不创建定时器，已有代码已经处理这一情况。
// 2. draft 有内容时，使用 setTimeout 等待 800 毫秒。
// 3. 时间到后调用 setSaveStatus("saved")。
// 4. 返回清理函数，并在其中调用 clearTimeout(timeoutId)。
// 5. 连续输入时保持“等待保存”；停止输入约 800 毫秒后显示“草稿已保存”。
//
// 做题时可以按这个顺序想：
// draft 改变 -> 清理上一次 timeout -> 创建新的 timeout -> 停止输入后完成保存

import { useEffect, useState, type CSSProperties } from "react"

type SaveStatus = "idle" | "waiting" | "saved"

const statusText: Record<SaveStatus, string> = {
    idle: "还没有草稿",
    waiting: "等待保存...",
    saved: "草稿已保存",
}

export default function UseEffectAutosaveExercise() {
    const [draft, setDraft] = useState("")
    const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle")

    useEffect(() => {
        if (draft.trim() === "") return

        // TODO: 创建延迟保存任务，并返回清理函数。
    }, [draft])

    return (
        <main style={styles.page}>
            <section style={styles.editor}>
                <p style={styles.eyebrow}>React Beginner 06C</p>
                <h1 style={styles.title}>随手记</h1>

                <label htmlFor="draft" style={styles.label}>
                    草稿内容
                </label>
                <textarea
                    id="draft"
                    value={draft}
                    rows={7}
                    placeholder="写下现在需要记住的事情"
                    style={styles.textarea}
                    onChange={(event) => {
                        const nextDraft = event.target.value
                        setDraft(nextDraft)
                        setSaveStatus(nextDraft.trim() === "" ? "idle" : "waiting")
                    }}
                />

                <p style={styles.status} aria-live="polite">
                    <span
                        aria-hidden="true"
                        style={{
                            ...styles.statusDot,
                            background: saveStatus === "saved" ? "#16803c" : "#d08700",
                        }}
                    />
                    {statusText[saveStatus]}
                </p>
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
        background: "#f3f5f7",
        color: "#18212a",
        fontFamily: "system-ui, sans-serif",
        boxSizing: "border-box",
    },
    editor: {
        width: "min(100%, 560px)",
        padding: 28,
        border: "1px solid #d6dce2",
        borderRadius: 8,
        background: "#ffffff",
        boxShadow: "0 12px 28px rgba(24, 33, 42, 0.08)",
        boxSizing: "border-box",
    },
    eyebrow: {
        margin: "0 0 8px",
        color: "#5d6874",
        fontSize: 13,
        fontWeight: 700,
    },
    title: {
        margin: "0 0 24px",
        fontSize: 26,
        lineHeight: 1.25,
    },
    label: {
        display: "block",
        marginBottom: 8,
        fontSize: 14,
        fontWeight: 700,
    },
    textarea: {
        width: "100%",
        minHeight: 176,
        resize: "vertical",
        padding: 14,
        border: "1px solid #aeb8c2",
        borderRadius: 6,
        color: "#18212a",
        background: "#ffffff",
        font: "inherit",
        lineHeight: 1.6,
        letterSpacing: 0,
        boxSizing: "border-box",
    },
    status: {
        minHeight: 24,
        display: "flex",
        alignItems: "center",
        gap: 8,
        margin: "14px 0 0",
        color: "#4f5b66",
        fontSize: 14,
        fontWeight: 650,
    },
    statusDot: {
        width: 9,
        height: 9,
        flex: "0 0 9px",
        borderRadius: "50%",
    },
}
