// ====== 高级 06：TypeScript 综合复盘 - 迷你 API Client ======
// 运行命令: npx ts-node js-ecosystem/ts/advanced/06-review-mini-api-client.ts
//
// 如果本机网络需要代理，可以使用：
// NODE_OPTIONS=--use-env-proxy npx ts-node js-ecosystem/ts/advanced/06-review-mini-api-client.ts
//
// 考察点:
// ApiResponse<T>、泛型函数、fetch、URL query 构造、Raw 数据建模、
// 可选字段默认值、类型守卫、数组转换、Record 归一化、错误输出格式统一
//
// 说明：
// 这是一道 TypeScript 高级阶段的复盘题。
// 目标不是接触一个新的复杂 API，而是把前面练过的类型系统能力组合成一个小型可复用 API Client。
//
// 本题使用 JSONPlaceholder 公开 API：
// - 用户列表：https://jsonplaceholder.typicode.com/users
// - 用户文章：https://jsonplaceholder.typicode.com/posts?userId=1
//
// 真实 App 通常不会直接把外部 API 的 Raw JSON 传给 UI。
// 更常见的做法是：
// 1. 用 RawXxx 类型描述外部接口返回
// 2. 用 XxxCard / XxxPreview / XxxModel 描述 App 内部稳定数据
// 3. 用转换函数把 Raw 数据压平、补默认值、过滤异常项
// 4. 用 ApiResponse<T> 统一表达成功和失败


// ====== 第 1 题：封装 JSONPlaceholder Mini Client ======
// 难度: ⭐⭐⭐⭐⭐
// 考察: 综合类型建模与小型业务封装
//
// 背景：
// 你要为一个简单内容页封装 API Client。
// 页面需要：
// - 展示用户卡片列表
// - 点击某个用户后，加载这个用户的文章
// - 文章列表需要同时保留数组顺序和 id -> item 字典，方便 UI 快速查找
//
// 目标输出：
// 你需要把 JSONPlaceholder 的 Raw 数据转换成 App 内部稳定类型。
//
// 建议内部类型：
// - UserCard:
//   - id: number
//   - displayName: string
//   - email: string
//   - city: string | null
//   - companyName: string | null
//
// - PostPreview:
//   - id: number
//   - userId: number
//   - title: string
//   - excerpt: string
//
// - NormalizedResult<T>:
//   - byId: Record<number, T>
//   - allIds: number[]
//
// 要求：
// 1. 定义 ApiError 和 ApiResponse<T>
//    - 成功：{ ok: true; data: T }
//    - 失败：{ ok: false; error: ApiError }
//
// 2. 写 async function fetchJson<T>(url: string): Promise<ApiResponse<T>>
//    - HTTP 状态码不是 2xx 时，返回失败分支
//    - fetch 或 json 解析抛错时，返回 code 为 "NETWORK_ERROR" 的失败分支
//    - 成功时，把 response.json() 断言为 T
//
// 3. 定义 QueryValue 和 buildUrl(baseUrl, query)
//    - QueryValue 支持 string | number | boolean | null | undefined
//    - null 和 undefined 不写入 query string
//    - 其他值用 URLSearchParams 转成字符串
//    - 示例：buildUrl("https://example.com/posts", { userId: 1 })
//      返回 "https://example.com/posts?userId=1"
//
// 4. 定义 EntityMap<T extends { id: number }> 和 NormalizedResult<T extends { id: number }>
//    - EntityMap<T> = Record<number, T>
//    - NormalizedResult<T> 包含 byId 和 allIds
//    - 这样定义的原因：
//      EntityMap 表示“按 id 建索引的字典”，适合通过 id 快速查找某一项
//    - NormalizedResult 表示“列表归一化后的完整结果”
//      byId 负责快速查找，allIds 负责保留原始列表顺序，方便 UI 渲染列表
//    - 它们都是通用结构，不只适用于当前接口；只要元素有 id: number 就可以复用
//    - 例如 PostPreview[] 归一化后可以得到：
//      { byId: { 1: post1, 2: post2 }, allIds: [1, 2] }
//
// 5. 写 normalizeById<T extends { id: number }>(items: T[]): NormalizedResult<T>
//    - byId 里按 id 存 item
//    - allIds 保持原数组顺序
//
// 6. 定义 RawUser 和 UserCard
//    - RawUser 至少包含 id、name、username、email
//    - RawUser 可以包含 address?: { city?: string }
//    - RawUser 可以包含 company?: { name?: string }
//    - UserCard 使用上方建议内部类型
//
// 7. 写 toUserCard(raw: RawUser): UserCard
//    - displayName 优先使用 raw.name，其次 raw.username
//    - city 缺失时用 null
//    - companyName 缺失时用 null
//
// 8. 定义 RawPost 和 PostPreview
//    - RawPost 的 userId、id、title、body 可以先写成可选字段
//    - PostPreview 使用上方建议内部类型
//    - 这样定义的原因：
//      RawPost 表示接口原始返回的一条文章数据，重点是“忠实描述外部 JSON 长什么样”
//    - 因为真实接口数据可能缺字段、脏数据或类型不稳定，所以这里允许先把字段写成可选
//    - PostPreview 表示给当前页面直接使用的内部文章卡片数据，重点是“结构稳定、字段明确”
//    - 它不需要保留 RawPost 的全部字段，只保留当前业务真正关心的内容：
//      id、userId、title、excerpt
//    - 这题的处理链路是：
//      先请求 RawPost[] -> 用类型守卫过滤成有效文章 -> 再转换成 PostPreview[]
//    - 这样做的目的，是把“不稳定的外部数据”和“稳定的内部数据”分开
//
// 9. 写类型守卫 isValidRawPost(post: RawPost): post is ValidRawPost
//    - 只有 userId、id 是 number，title、body 是 string 时才算有效
//    - 你可以额外定义 ValidRawPost 类型辅助收窄
//    - 这个函数的作用，不只是“返回 true / false”
//      更重要的是告诉 TypeScript：如果返回 true，这条数据就可以被当成 ValidRawPost 使用
//    - 因为 RawPost 里的字段是可选的，不能直接安全地访问 post.id / post.title / post.body
//    - 先经过 isValidRawPost 检查后，才能把“可能缺字段的原始数据”收窄成“字段完整且类型正确的数据”
//    - 它通常会和 filter 一起使用：
//      const validPosts = rawPosts.filter(isValidRawPost)
//    - 过滤之后，validPosts 的类型会从 RawPost[] 变成 ValidRawPost[]
//      这样后面的 toPostPreview(validPost) 才能放心使用 id、userId、title、body
//
// 10. 写 toPostPreview(raw: ValidRawPost): PostPreview
//     - excerpt 取 body 前 80 个字符
//     - 如果 body 超过 80 个字符，末尾加 "..."
//
// 11. 写 async function fetchUserCards(limit: number): Promise<ApiResponse<UserCard[]>>
//     - 请求 https://jsonplaceholder.typicode.com/users
//     - 成功后转换为 UserCard[]
//     - 只返回前 limit 个
//
// 12. 写 async function fetchPostsByUser(userId: number): Promise<ApiResponse<NormalizedResult<PostPreview>>>
//     - 使用 buildUrl 构造 posts?userId=...
//     - 请求 RawPost[]
//     - 先用 isValidRawPost 过滤异常项
//     - 再转换成 PostPreview[]
//     - 最后 normalizeById
//     - 这个函数的作用：
//       根据某个用户 id，去拉取“这个用户的文章列表”
//     - 它和第 11 题的区别是：
//       第 11 题返回的是 UserCard[]，第 12 题返回的是“归一化后的文章结果”
//     - 也就是这个函数最终不是直接返回 PostPreview[]，
//       而是返回 { byId, allIds } 这种更适合页面查找和渲染的数据结构
//     - 处理链路可以理解成：
//       userId -> 请求该用户文章 -> 过滤无效 RawPost -> 转成 PostPreview -> 归一化
//     - 例如 userId = 1 时，请求的 URL 类似：
//       https://jsonplaceholder.typicode.com/posts?userId=1
//     - 如果成功，最终返回的大致结构类似：
//       {
//         ok: true,
//         data: {
//           byId: { 1: post1, 2: post2 },
//           allIds: [1, 2]
//         }
//       }
//     - 如果请求失败，则返回失败分支：
//       { ok: false, error: { code, message } }
//
// 13. 写 printUsers(response: ApiResponse<UserCard[]>): void
//     - 成功时逐行输出用户 id、displayName、email、city、companyName
//     - 失败时输出：用户请求失败 code: message
//
// 14. 写 printPosts(response: ApiResponse<NormalizedResult<PostPreview>>): void
//     - 成功时按 allIds 顺序输出文章 id、title、excerpt
//     - 失败时输出：文章请求失败 code: message
//
// 15. 写 async function runMiniClientDemo(): Promise<void> 并调用它
//     - 先 fetchUserCards(3)
//     - 输出用户列表
//     - 如果用户列表成功且至少有一个用户，再请求第一个用户的文章并输出
//
// 提示：
// - 这题允许你复用前几题的 fetchJson 思路，但建议重新写一遍，当作复盘。
// - printUsers / printPosts 里不要用 map 做副作用，优先用 for...of。
// - 类型守卫的重点是让 TypeScript 在 filter 后知道数据已经是 ValidRawPost[]。
// - 真实网络请求可能因为代理、DNS 或服务限流失败；如果进入 NETWORK_ERROR，不代表类型代码错误。

// 👇 在下面写你的代码




interface ApiError {
    code: string
    message: string
}

type ApiResponse<T> = { ok: true; data: T } | { ok: false; error: ApiError }

async function fetchJson<T>(url: string): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            return {
                ok: false,
                error: {
                    code: String(response.status),
                    message: response.statusText
                }
            }
        }

        const data = await response.json() as T
        return {
            ok: true,
            data: data
        }
    } catch (error) {
        return {
            ok: false,
            error: {
                code: "NETWORK_ERROR",
                message: String(error)
            } 
        }
    }
}


type QueryParamValue = string | number | boolean | null | undefined

type QueryParams = Record<string, QueryParamValue>

function buildUrl(baseUrl: string, query: QueryParams): string {
    const params = new URLSearchParams()

    for (const key in query) {
        const value = query[key]
        if (value === null || value === undefined) {
            continue
        }
        params.set(key, String(value))
    }

    const queryStr = params.toString()

    return queryStr ? `${baseUrl}?${queryStr}` : baseUrl
}


type EntityMap<T extends {id: number}> = Record<number, T>


type NormalizedResult<T extends {id: number}> = {
    byId: EntityMap<T>,
    allIds: number[]
}


// - 遍历普通对象的 key：用 for...in
// - 遍历数组、字符串、Map、Set 的值：用 for...of

function normalizeById<T extends { id: number }>(items: T[]):  NormalizedResult<T> {

    let byId: EntityMap<T> = {}
    let allIds: number[] = []

    for (const element of items) {
        byId[element.id] = element
        allIds.push(element.id)
    }

    return { byId, allIds }
}

type RawUser = {
    id: number,
    name: string,
    username: string,
    email: string,
    address?: {
        city?: string,
    },
    company?: {
        name?: string,
    }
}

type UserCard = {
    id: number
    displayName: string
    email: string
    city: string | null
    companyName: string | null
}

function toUserCard(raw: RawUser): UserCard {
    return {
        id: raw.id,
        displayName: raw.name ?? raw.username,
        email: raw.email,
        city: raw.address?.city ?? null,
        companyName: raw.company?.name ?? null
    }
}

type RawPost = {
    userId?: number,
    id?: number,
    title?: string,
    body?: string
}

type PostPreview = {
    id: number,
    userId: number,
    title: string,
    excerpt: string
}

type ValidRawPost = {
    userId: number
    id: number
    title: string
    body: string
}

// 类型守卫
function isValidRawPost(post: RawPost): post is ValidRawPost {
    return typeof post.id === "number"
        && typeof post.userId === "number"
        && typeof post.title === "string"
        && typeof post.body === "string"
}


function toPostPreview(raw: ValidRawPost): PostPreview {
    const excerpt = raw.body.length > 80
        ? raw.body.slice(0, 80) + "..."
        : raw.body

    return {
        id: raw.id,
        userId: raw.userId,
        title: raw.title,
        excerpt: excerpt
    }
}



async function fetchUserCards(limit: number): Promise<ApiResponse<UserCard[]>> {
    const url = 'https://jsonplaceholder.typicode.com/users'
    const response = await fetchJson<RawUser[]>(url)

    if (!response.ok) {
        return {
            ok: false,
            error: {
                code: response.error.code,
                message: response.error.message
            }
        }
    }

    const rawUsers = response.data
    const userCards = rawUsers.slice(0, limit).map(toUserCard)

    return {
        ok: true,
        data: userCards
    }
}


async function fetchPostsByUser(userId: number): Promise<ApiResponse<NormalizedResult<PostPreview>>> {
    const baseUrl = 'https://jsonplaceholder.typicode.com/posts'

    const query: QueryParams = {
        userId: userId
    }

    const url = buildUrl(baseUrl, query)

    const response = await fetchJson<RawPost[]>(url)

    if (!response.ok) {
        return {
            ok: false,
            error: {
                code: response.error.code,
                message: response.error.message
            }
        }
    }

    const rawPosts = response.data

    const postPreviews = rawPosts.filter(isValidRawPost).map(toPostPreview)

    const normalizedPosts = normalizeById(postPreviews)

    return {
        ok: true,
        data: normalizedPosts
    }
}


function printUsers(response: ApiResponse<UserCard[]>): void {
    if (!response.ok) {
        console.log(`用户请求失败 ${response.error.code}: ${response.error.message}`)
        return
    }

    const data = normalizeById(response.data)
    const allIds = data.allIds

    for (const id of allIds) {
        const user = data.byId[id]
        if (user === undefined || user === null) {
            continue
        }
        console.log(`id: ${user.id}, displayName: ${user.displayName}, email: ${user.email}, city: ${user.city}, companyName: ${user.companyName}`)
    }

}



function printPosts(response: ApiResponse<NormalizedResult<PostPreview>>): void {
    if (!response.ok) {
        console.log(`文章请求失败 ${response.error.code}: ${response.error.message}`)
        return
    }

    const allIds = response.data.allIds

    for (const id of allIds) {
        const post = response.data.byId[id]
        if (post === undefined || post === null) {
            continue
        }
        console.log(`id: ${post.id}, title: ${post.title}, excerpt: ${post.excerpt}`)
    }
}



async function runMiniClientDemo(): Promise<void> {
    const response = await fetchUserCards(3)

    if (!response.ok) {
        printUsers(response)
        return
    }

    const users = response.data

    printUsers(response)

    if (users.length === 0) {
        return
    }

    const id = users[0]!.id
    
    const postRes = await fetchPostsByUser(id)
    printPosts(postRes)

}


runMiniClientDemo()

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 最终提交版本未发现阻塞性问题；核心函数职责拆分清晰，类型关系正确
//   2. 已通过 `npx tsc --noEmit --ignoreConfig js-ecosystem/ts/advanced/06-review-mini-api-client.ts` 静态类型检查
//   3. 真实网络请求链路依赖外部 API，本轮未做联网运行验证
// 🔑 知识点：ApiResponse 成功/失败分支建模、URLSearchParams、Raw 数据与内部数据分层、类型守卫收窄、列表归一化、id 索引字典
