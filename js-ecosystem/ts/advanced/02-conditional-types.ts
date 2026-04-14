// ====== 高级 02：条件类型 (Conditional Types) ======
// 运行命令: npx ts-node js-ecosystem/ts/advanced/02-conditional-types.ts
// 考察点: T extends U ? X : Y、infer、分布式条件类型、联合类型过滤


// ====== 第 1 题：条件类型基础 ======
// 难度: ⭐⭐
// 考察: 用 T extends U ? X : Y 根据输入类型生成不同结果类型
//
// 背景：
// 条件类型很像类型系统里的 if/else：
//
// type IsString<T> = T extends string ? true : false
// type A = IsString<string>  // true
// type B = IsString<number>  // false
//
// 注意：这里的 true/false 是类型，不是运行时计算结果。
//
// 实际场景：
// 根据 API 原始数据类型，自动生成不同的包装结果类型。
//
// 要求：
// 1. 定义 interface User：id (number), name (string)
// 2. 定义条件类型 ApiPayload<T>：
//    - 如果 T 是 string，结果类型为 { kind: "text"; value: string }
//    - 如果 T 是 number，结果类型为 { kind: "number"; value: number }
//    - 其他类型，结果类型为 { kind: "object"; value: T }
// 3. 创建三个变量：
//    - textPayload: ApiPayload<string>
//    - countPayload: ApiPayload<number>
//    - userPayload: ApiPayload<User>
// 4. 分别输出三个变量
//
// 提示：
// - 条件类型可以嵌套：
//   type X<T> = T extends string ? A : T extends number ? B : C
// - kind 的值要和类型要求完全一致，比如 "text" 不能写成 "string"

// 👇 在下面写你的代码

interface User {
    id: number
    name: string
}

type ApiPayload<T> = T extends string 
? { kind: "text", value: string } 
: ( T extends number 
    ? { kind: "number", value: number } 
    : { kind: "object", value: T } )

const textPayload: ApiPayload<string> = { kind: "text", value: "文字" }
const countPayload: ApiPayload<number> = { kind: "number", value: 123 }

const user: User = {
    id: 112233,
    name: "xiaohong"
}
const userPayload: ApiPayload<User> = { kind: "object", value: user }

console.log(textPayload)

console.log(countPayload)

console.log(userPayload)

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 没有功能性问题，条件类型三分支都写对了
//   2. ApiPayload<T> 的嵌套条件类型可以再排版清楚一点，方便以后阅读复杂类型
// 👍 亮点：
//   - T extends string ? ... : T extends number ? ... : ... 的判断顺序正确
//   - string、number、User 三种输入类型都生成了对应的 payload 结构
//   - object 分支保留 value: T，说明你已经理解了泛型参数会被带进结果类型
// 🔑 知识点：条件类型、泛型参数、字面量类型、类型系统里的 if/else
//
// ====== 补充笔记 ======
// TypeScript 里的 true / false 不只是运行时的值，也可以作为“字面量类型”。
// 例如 let a: true = true 表示 a 的类型只能是 true，不能赋值为 false。
// 所以 boolean 可以理解成 true | false 的合集。
//
// 类似地，"success"、"error" 这种字符串也可以作为字面量类型：
// type Status = "success" | "error"
//
// 这也是 TypeScript 比 Swift 更细的一点：
// TypeScript 支持字面量类型，所以能表达非常精确的类型规则。
// Swift 有 Bool、String，但不能把 true 或 "success" 本身当成独立类型。
















// ====== 第 2 题：infer 提取 Promise 结果 ======
// 难度: ⭐⭐⭐
// 考察: 用 infer 从复杂类型中提取内部类型
//
// 背景：
// infer 可以在条件类型中“抓出”某个内部类型：
//
// type UnwrapArray<T> = T extends Array<infer Item> ? Item : T
// type A = UnwrapArray<string[]>  // string
// type B = UnwrapArray<number>    // number
//
// 实际场景：
// 在异步 API 中，经常需要从 Promise<User> 里提取 User 类型。
//
// 要求：
// 1. 定义条件类型 UnwrapPromise<T>：
//    - 如果 T 是 Promise<某个类型>，返回 Promise 里的那个类型
//    - 否则返回 T 本身
// 2. 定义 interface ApiUser：id (number), nickname (string)
// 3. 定义 async function fetchUser(): Promise<ApiUser>
//    - 返回 { id: 1, nickname: "xiaolei" }
// 4. 定义 type FetchUserResult = UnwrapPromise<ReturnType<typeof fetchUser>>
//    - 这个类型应该等价于 ApiUser
// 5. 写函数 printUser(user: FetchUserResult): void
//    - 输出 "用户 1: xiaolei"
// 6. 调用 fetchUser().then(printUser)
//
// 提示：
// - ReturnType<typeof fetchUser> 会得到 Promise<ApiUser>
// - UnwrapPromise<Promise<ApiUser>> 应该得到 ApiUser

// 👇 在下面写你的代码


type UnwrapPromise<T> = T extends Promise<infer Item> ? Item : T

interface ApiUser {
    id: number
    nickname: string
}

async function fetchUser(): Promise<ApiUser> {
    return { id: 1, nickname: "xiaolei" }
}

type FetchUserResult = UnwrapPromise<ReturnType<typeof fetchUser>>


function printUser(user: FetchUserResult): void {
    console.log(user)
}


fetchUser().then(printUser)

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 题目要求 printUser 输出 "用户 1: xiaolei"，当前直接输出了 user 对象；类型逻辑正确，但输出格式可以再按题目要求补齐
// 👍 亮点：
//   - UnwrapPromise<T> 的 infer 用法正确，能从 Promise<ApiUser> 中提取 ApiUser
//   - ReturnType<typeof fetchUser> 使用正确，说明你已经能把函数返回类型接到工具类型里
//   - fetchUser().then(printUser) 的异步调用链写法正确
// 🔑 知识点：infer、Promise<T>、ReturnType<T>、async function 返回类型
//
// ====== 补充笔记 ======
// Promise<T> 表示“未来会得到一个 T”。例如 Promise<string> 表示未来会得到 string。
// async function 的返回值会自动被包成 Promise：
// async function fetchName(): Promise<string> { return "xiaolei" }
//
// UnwrapPromise<ReturnType<typeof fetchUser>> 可以拆成三层：
// 1. typeof fetchUser
//    拿到 fetchUser 这个函数本身的类型，不是调用函数。
//    如果 fetchUser(): Promise<ApiUser>，那么 typeof fetchUser 近似等于 () => Promise<ApiUser>。
//
// 2. ReturnType<typeof fetchUser>
//    ReturnType 是 TypeScript 内置工具类型，用来拿函数返回值类型。
//    所以 ReturnType<typeof fetchUser> 等价于 Promise<ApiUser>。
//
// 3. UnwrapPromise<Promise<ApiUser>>
//    UnwrapPromise<T> 通过 T extends Promise<infer Item> ? Item : T
//    从 Promise<ApiUser> 里把 ApiUser 抓出来。
//
// 所以整句最终等价于：
// type FetchUserResult = ApiUser
//
// infer 的核心作用是：当 T 匹配某种外层结构时，把里面的内部类型临时抓出来并命名。
// 比如 T extends Array<infer Item> 可以从 string[] 里抓出 string，
// T extends Promise<infer Item> 可以从 Promise<ApiUser> 里抓出 ApiUser。










// ====== 第 3 题：分布式条件类型与联合类型过滤 ======
// 难度: ⭐⭐⭐
// 考察: 条件类型遇到联合类型时，会自动逐个成员判断并重新合并
//
// 背景：
// 条件类型默认会分布到联合类型的每一项：
//
// type OnlyString<T> = T extends string ? T : never
// type A = OnlyString<string | number | boolean>  // string
//
// 它的过程类似：
//   string extends string ? string : never   -> string
//   number extends string ? number : never   -> never
//   boolean extends string ? boolean : never -> never
//   合并后得到 string
//
// 实际场景：
// 从事件联合类型里筛选出某一种事件。
//
// 要求：
// 1. 定义三个事件类型：
//    - LoadingEvent：{ type: "loading" }
//    - SuccessEvent：{ type: "success"; data: string[] }
//    - ErrorEvent：{ type: "error"; message: string }
// 2. 定义联合类型 AppEvent = LoadingEvent | SuccessEvent | ErrorEvent
// 3. 定义条件类型 EventOfType<T, K>：
//    - 如果 T 是 { type: K } 这种形状，保留 T
//    - 否则变成 never
// 4. 定义 type SuccessOnly = EventOfType<AppEvent, "success">
//    - 这个类型应该只剩 SuccessEvent
// 5. 写函数 handleSuccess(event: SuccessOnly): string
//    - 返回 "成功返回 3 条数据" 这样的字符串
// 6. 创建一个 success 事件并调用 handleSuccess，输出结果
//
// 提示：
// - EventOfType<T, K> 和内置工具类型 Extract<T, U> 的思想很像
// - K 可以约束为 string：type EventOfType<T, K extends string> = ...
// - { type: K } 只检查 type 字段是否匹配，不会要求对象只有 type 一个字段

// 👇 在下面写你的代码


type LoadingEvent = { type: "loading" }
type SuccessEvent = { type: "success", data: string[] }
type ErrorEvent = { type: "error", message: string }

type AppEvent = LoadingEvent | SuccessEvent | ErrorEvent

type EventOfType<T, K> = T extends { type: K } ? T : never

type SuccessOnly = EventOfType<AppEvent, "success">

function handleSuccess(event: SuccessOnly): string {
    return `成功返回 ${event.data.length} 条数据`
}

const sucRes: SuccessEvent = { type: "success", data: ["xiaoming","xiaohong","xiaolan"] }

const errRes: ErrorEvent = { type: "error", message: "system error" }

const res = handleSuccess(sucRes)
console.log(res)

// const res2 = handleSuccess(errRes)

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. handleSuccess 当前直接写死了 "3 条数据"，更通用的写法可以根据 event.data.length 生成数量
//   2. errRes 定义后没有使用；作为反例保留可以，但真实项目里未使用变量应删除或放进注释示例
// 👍 亮点：
//   - LoadingEvent / SuccessEvent / ErrorEvent 三个对象类型定义正确
//   - SuccessEvent 里的 type: "success" 正确使用了字符串字面量类型
//   - EventOfType<T, K> 的条件类型写对了，能从 AppEvent 联合类型中筛出 SuccessEvent
//   - const res2 = handleSuccess(errRes) 注释掉是对的；取消注释后应该报类型错误，说明筛选生效
// 🔑 知识点：对象类型、字符串字面量类型、分布式条件类型、never、联合类型过滤
//
// ====== 补充笔记 ======
// type SuccessEvent = { type: "success", data: string[] }
// 这里等号后面的 { type: "success", data: string[] } 是“对象类型”，不是对象值。
// 它描述某个对象必须有 type 和 data 两个字段：
// - type 字段只能是字符串字面量 "success"
// - data 字段必须是 string[]
//
// type: "success" 和前面学过的 let a: true = true 是同一类思想：
// TypeScript 允许把具体值当成更精确的“字面量类型”。
// "success" 是 string 里的一个具体值，也可以作为类型约束。
//
// EventOfType<T, K> 可以读成：
// 如果 T 这个类型有一个 type 字段，并且 type 字段的类型是 K，
// 就保留 T；否则变成 never。
//
// type EventOfType<T, K> = T extends { type: K } ? T : never
//
// 当 T 是联合类型 AppEvent = LoadingEvent | SuccessEvent | ErrorEvent 时，
// 条件类型会自动拆开逐项判断：
// LoadingEvent extends { type: "success" } ? LoadingEvent : never -> never
// SuccessEvent extends { type: "success" } ? SuccessEvent : never -> SuccessEvent
// ErrorEvent extends { type: "success" } ? ErrorEvent : never -> never
//
// 最后合并成 never | SuccessEvent | never。
// never 在联合类型里会消失，所以最终只剩 SuccessEvent。
//
// never 是“不可能存在的类型”。在类型过滤里，它常用来表示“这一项不要”。
// 它也常用于永不返回的函数和 switch 穷尽检查。
