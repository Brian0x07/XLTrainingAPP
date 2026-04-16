// ====== 高级 04：应用型高级题 - API Response 类型建模 ======
// 运行命令: npx ts-node js-ecosystem/ts/advanced/04-api-response-modeling.ts
// 考察点: 判别式联合、Record、Pick/Omit/Partial、keyof、T[K]、映射类型在业务中的应用


// ====== 第 1 题：API 请求结果建模 ======
// 难度: ⭐⭐⭐
// 考察: 用判别式联合描述成功/失败状态，并安全读取 data
//
// 背景：
// 真实接口通常不是简单返回 User，而是返回“成功或失败”两种结构：
//
// 成功：
// { ok: true, data: ... }
//
// 失败：
// { ok: false, error: { code, message } }
//
// 这种结构非常适合用判别式联合建模。
// 当代码判断 if (response.ok) 后，TypeScript 会自动知道这是成功分支。
//
// 要求：
// 1. 定义 interface ApiError：
//    - code (string)
//    - message (string)
// 2. 定义泛型类型 ApiResponse<T>：
//    - 成功分支：{ ok: true; data: T }
//    - 失败分支：{ ok: false; error: ApiError }
// 3. 定义 interface UserProfile：
//    - id (number)
//    - name (string)
//    - email (string)
// 4. 写函数 printUserResponse(response: ApiResponse<UserProfile>): void
//    - 如果成功，输出 "用户: name <email>"
//    - 如果失败，输出 "错误 code: message"
// 5. 创建一个成功响应和一个失败响应，分别调用 printUserResponse
//
// 提示：
// - if (response.ok) 之后，可以安全访问 response.data
// - else 分支里，可以安全访问 response.error
// - 这里的 ok: true / ok: false 也是字面量类型

// 👇 在下面写你的代码

interface ApiError {
    code: string
    message: string
}

type ApiResponse<T> = { ok: true; data: T } | { ok: false; error: ApiError }

interface UserProfile {
    id: number
    name: string
    email: string
}

function printUserResponse(response: ApiResponse<UserProfile>): void {
    if(response.ok) {
        const user = response.data
        console.log(`用户: ${user.name} <${user.email}>`)
    } else {
        console.log(`错误 ${response.error.code}: ${response.error.message}`)
    }
}

const successResponse: ApiResponse<UserProfile> = {
    ok: true,
    data: {
        id: 1,
        name: "xiaoming",
        email: "xiaoming@example.com"
    }
}

const failedResponse: ApiResponse<UserProfile> = {
    ok: false,
    error: {
        code: "USER_NOT_FOUND",
        message: "用户不存在"
    }
}


printUserResponse(successResponse)
printUserResponse(failedResponse)

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 没有功能性问题，成功/失败响应都建模并调用成功
// 👍 亮点：
//   - ApiResponse<T> 正确写成了成功分支 | 失败分支的联合类型
//   - ok: true / ok: false 作为判别字段使用正确
//   - if (response.ok) 后直接读取 response.data，不再使用 as，这是正确方向
//   - 成功和失败两个响应对象都按类型创建并测试了输出
// 🔑 知识点：判别式联合、字面量类型、类型收窄、避免不必要的 as
//
// ====== 补充笔记 ======
// ApiResponse<T> 这里应该是联合类型，不是条件类型。
//
// 正确含义是：
// type ApiResponse<T> =
//   | { ok: true; data: T }
//   | { ok: false; error: ApiError }
//
// 它表示响应要么成功，有 data；要么失败，有 error。
//
// 如果写成 T extends { ok: true } ? ... : ...，
// 意思会变成“根据 T 自己是不是有 ok: true 来决定响应类型”，
// 这和本题需求不一样。UserProfile 没有 ok 字段，所以会被错误地算成失败分支。
//
// if (response.ok) 会触发 TypeScript 的类型收窄：
// - if 分支里，response 是 { ok: true; data: UserProfile }
// - else 分支里，response 是 { ok: false; error: ApiError }
//
// 所以 if 分支里可以直接写 response.data，不需要 as UserProfile。
// 能让 TypeScript 自己推断出来时，尽量不要用 as。
// as 是类型断言，会绕过一部分类型检查，容易把真实错误藏起来。









// ====== 第 2 题：列表数据归一化 ======
// 难度: ⭐⭐⭐
// 考察: Record<number, T>、数组 reduce/forEach、从列表生成字典
//
// 背景：
// 前端拿到列表后，经常会把数组转成 id -> item 的字典，方便后续快速查找。
//
// 原始数组：
// [
//   { id: 1, title: "A" },
//   { id: 2, title: "B" }
// ]
//
// 归一化后：
// {
//   1: { id: 1, title: "A" },
//   2: { id: 2, title: "B" }
// }
//
// 要求：
// 1. 定义 interface Article：
//    - id (number)
//    - title (string)
//    - author (string)
//    - publishedAt (string)
// 2. 定义类型 EntityMap<T extends { id: number }> = Record<number, T>
// 3. 写泛型函数 normalizeById<T extends { id: number }>(items: T[]): EntityMap<T>
//    - 按 id 把数组转成对象
// 4. 创建 3 篇 Article
// 5. 调用 normalizeById，输出完整字典和 id 为 2 的文章标题
//
// 提示：
// - 可以先创建 const result: EntityMap<T> = {}
// - 遍历 items，把 result[item.id] = item
// - T extends { id: number } 表示传入的对象必须有 number 类型的 id 字段

// 👇 在下面写你的代码

interface Article {
    id: number
    title: string
    author: string
    publishedAt: string
}

type EntityMap<T extends { id: number }> = Record<number, T>


function normalizeById<T extends { id: number }>(items: T[]): EntityMap<T> {
    const result: EntityMap<T> = {}
    for (const element of items) {
        result[element.id] = element
    }
    return result
}

const art1 = {
    id: 1,
    title: "t1",
    author: "ming",
    publishedAt: "23-06-01",
}

const art2 = {
    id: 2,
    title: "t2",
    author: "ming2",
    publishedAt: "23-06-02",
}


const art4 = {
    id: 4,
    title: "t4",
    author: "ming4",
    publishedAt: "23-06-04",
}

const items = [art1, art2, art4]

const result = normalizeById(items)
console.log(result)

console.log(`id 为 2 的文章标题: ${result[2]?.title}`)

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 第 3 篇文章变量名是 art4，id 也是 4；不影响题目要求，但如果只是第 3 个样例，命名为 art3 会更顺
//   2. result[2]?.title 使用了可选链，运行更稳；如果确定 id 2 一定存在，也可以直接写 result[2].title
// 👍 亮点：
//   - EntityMap<T extends { id: number }> = Record<number, T> 定义正确
//   - normalizeById 使用泛型约束保证 item.id 可以安全访问
//   - for...of 用在这里很合适，逻辑比 reduce 更直观
//   - 成功输出完整字典和 id 为 2 的文章标题
// 🔑 知识点：Record<number, T>、泛型结构约束、for...of、对象字典归一化
//
// ====== 补充笔记 ======
// Record<number, T> 表示在 TypeScript 类型层面用 number key 访问 T。
// 但普通 JavaScript 对象运行时会把数字 key 转成字符串。
// 所以 console.log(result) 里会看到 '1'、'2'、'4' 这样的字符串 key。
//
// 如果运行时也要保留真正的 number key，可以使用 Map<number, T>。
// 但前端业务里用 Record<number, T> 做 id -> entity 字典很常见。
//
// for...of 基本对应 Swift 的 for item in items。
// 只是遍历数组元素时，for...of 通常比普通 for 循环更清楚。

















// ====== 第 3 题：安全的 Patch Payload ======
// 难度: ⭐⭐⭐⭐
// 考察: Pick、Partial、keyof、T[K]、限制哪些字段允许更新
//
// 背景：
// PATCH 接口通常只允许更新部分字段。
// 比如用户资料里 id、createdAt 不应该被前端更新，只有 name、email、bio 可以更新。
//
// 要求：
// 1. 定义 interface Account：
//    - id (number)
//    - name (string)
//    - email (string)
//    - bio (string)
//    - createdAt (string)
// 2. 定义 type EditableAccountKey = "name" | "email" | "bio"
// 3. 定义 type AccountPatch = Partial<Pick<Account, EditableAccountKey>>
//    - 表示只允许更新 name/email/bio，且都可选
// 4. 写函数 applyPatch(account: Account, patch: AccountPatch): Account
//    - 返回合并后的新 account
//    - 不要修改原对象
// 5. 写函数 setEditableField<K extends EditableAccountKey>(
//      patch: AccountPatch,
//      key: K,
//      value: Account[K]
//    ): AccountPatch
//    - 返回新的 patch 对象，设置指定字段
// 6. 创建一个 Account
// 7. 用 setEditableField 逐步生成 patch：更新 name 和 bio
// 8. 调用 applyPatch 并输出更新后的 Account
//
// 提示：
// - applyPatch 可以用 { ...account, ...patch }
// - setEditableField 可以用 { ...patch, [key]: value }
// - K extends EditableAccountKey 限制 key 只能是 name/email/bio
// - Account[K] 让 value 类型跟 key 自动对应
// - 如果尝试 setEditableField(patch, "id", 123)，应该报错

// 👇 在下面写你的代码


interface Account {
    id: number
    name: string
    email: string
    bio: string
    createAt: string
}

type EditableAccountKey = "name" | "email" | "bio"

type AccountPatch = Partial<Pick<Account, EditableAccountKey>>

// 返回合并后的新 account
function applyPatch(account: Account, patch: AccountPatch): Account {
    return {...account, ...patch}
}


// - 返回新的 patch 对象，设置指定字段
function setEditableField<K extends EditableAccountKey>(
    patch: AccountPatch,
    key: K,
    value: Account[K]
): AccountPatch {
    return { ...patch, [key]: value }
}


const acc: Account = {
    id: 123,
    name: "xiaoming",
    email: "xm@123.com",
    bio: "handsome",
    createAt: "26-02-01"
}

const accPatch: AccountPatch = {
    name:"xiaohong",
    email: "xm@222.com"
}

const newPatch = setEditableField(accPatch, 'bio', "ugly")

const accNew = applyPatch(acc, newPatch)

console.log(accNew)

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 题目要求字段名是 createdAt，你写成了 createAt；当前类型和对象内部保持一致所以能运行，但实际业务里字段名要和接口/题目保持一致
//   2. 题目要求“用 setEditableField 逐步生成 patch：更新 name 和 bio”，你先手写了 name/email patch，再用 setEditableField 更新 bio；核心类型正确，但更贴题的做法是从 {} 开始连续调用 setEditableField
// 👍 亮点：
//   - AccountPatch = Partial<Pick<Account, EditableAccountKey>> 使用正确
//   - applyPatch 用 { ...account, ...patch } 返回新对象，没有修改原对象
//   - setEditableField<K extends EditableAccountKey> 正确限制了可编辑字段
//   - value: Account[K] 正确让 value 类型跟 key 自动对应
// 🔑 知识点：Pick、Partial、动态属性名、T[K]、类型安全的 PATCH payload
//
// ====== 补充笔记 ======
// Pick<Account, EditableAccountKey> 先从 Account 中挑出 name/email/bio。
// Partial<...> 再把这些字段都变成可选字段。
// 所以 AccountPatch 表示：只允许更新 name/email/bio，而且可以只更新其中一部分。
//
// applyPatch 的作用是把完整 account 和部分 patch 合并：
// { ...account, ...patch }
// 后面的 patch 会覆盖前面 account 的同名字段。
//
// setEditableField 是一个类型安全的 patch 构建器。
// K extends EditableAccountKey 限制 key 只能是 name/email/bio。
// Account[K] 让 value 的类型跟 key 对应。
// 例如 key 是 "bio" 时，value 必须是 Account["bio"]，也就是 string。
