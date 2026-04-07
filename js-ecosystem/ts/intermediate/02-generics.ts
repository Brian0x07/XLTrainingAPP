// ====== 中级 02：泛型 (Generics) ======
// 运行命令: npx ts-node js-ecosystem/ts/intermediate/02-generics.ts
// 考察点: 泛型函数、泛型接口、泛型约束


// ====== 第 1 题：泛型函数基础 ======
// 难度: ⭐⭐
// 考察: 泛型函数的定义和使用
//
// 背景：
// 假设你写一个函数，接收任意类型的值，原样返回。用 any 可以实现，但丢失了类型信息：
//   function identity(value: any): any { return value }
//   const result = identity("hello")  // result 的类型是 any，不是 string
//
// 泛型可以保留类型信息：
//   function identity<T>(value: T): T { return value }
//   const result = identity("hello")  // result 的类型是 string ✅
//
// 要求：
// 1. 写一个泛型函数 getFirst<T>(arr: T[]): T | undefined
//    返回数组的第一个元素，如果数组为空返回 undefined
// 2. 写一个泛型函数 pair<T, U>(first: T, second: U): [T, U]
//    把两个值组成一个元组返回
// 3. 调用测试并输出：
//    getFirst([10, 20, 30])       → "第一个元素: 10"
//    getFirst(["a", "b", "c"])    → "第一个元素: a"
//    getFirst([])                 → "第一个元素: undefined"
//    pair("name", 25)             → "配对: ["name", 25]"
//    pair(true, [1, 2])           → "配对: [true, [1, 2]]"

// 👇 在下面写你的代码


function getFirst<T>(arr: T[]): T | undefined {
    return arr[0]
}


function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second]
}

console.log(getFirst([10, 20, 30]))
console.log(getFirst(["a", "b", "c"]))
console.log(getFirst([]))
console.log(pair("name", 25))
console.log(pair(true, [1, 2]))

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 输出格式：题目要求 "第一个元素: 10"，直接 console.log 只输出值本身
//   2. 第一版漏写 pair：console.log(true, [1, 2])，注意检查函数调用
// 👍 亮点：
//   - 泛型语法掌握很快：<T> 单泛型和 <T, U> 多泛型都正确
//   - getFirst 返回 T | undefined 处理了空数组情况
// 🔑 知识点：泛型函数 <T>、多泛型参数 <T, U>、元组返回类型 [T, U]




// ====== 第 2 题：泛型接口 ======
// 难度: ⭐⭐
// 考察: 用泛型让接口更通用
//
// 要求：
// 1. 定义一个泛型接口 Result<T>，包含：
//    - success: boolean
//    - data: T
//    - error?: string
// 2. 创建三个不同类型的 Result：
//    - Result<string>:   { success: true, data: "登录成功" }
//    - Result<number[]>: { success: true, data: [1, 2, 3] }
//    - Result<null>:     { success: false, data: null, error: "网络错误" }
// 3. 写一个泛型函数 handleResult<T>(result: Result<T>)，输出：
//    成功时 → "✅ 数据: xxx"
//    失败时 → "❌ 错误: xxx"
// 4. 调用 handleResult 处理三个 Result

// 👇 在下面写你的代码

interface Result<T> {
    success: boolean
    data: T
    error?: string
}

const str_result: Result<string> = {
    success: true,
    data: "登录成功"
}

const num_result: Result<number[]> = {
    success: true,
    data: [1,2,3]
}

const error_result: Result<null> = {
    success: false,
    data: null,
    error: "网络错误"
}

function handleResult<T>(result: Result<T>) {
    if (result.success === true) {
        console.log(`✅ 数据:${result.data}`)
    } else {
        console.log(`❌ 错误: ${result.error}`)
    }
}

handleResult(str_result)
handleResult(num_result)
handleResult(error_result)

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. "✅ 数据:登录成功" 冒号后少了空格，应该是 "✅ 数据: 登录成功"（和错误那行保持一致）
//   2. 变量命名用了 snake_case（str_result），TS/JS 惯例是 camelCase（strResult）
//      不是错误，但实际项目中建议统一用 camelCase
// 👍 亮点：
//   - 泛型接口定义完全正确，Result<string>、Result<number[]>、Result<null> 三种用法都对
//   - handleResult 中用 result.success 判断，逻辑清晰
// 🔑 知识点：泛型接口 interface Result<T>、泛型函数配合泛型接口使用










// ====== 第 3 题：泛型约束 (extends) ======
// 难度: ⭐⭐⭐
// 考察: 用 extends 限制泛型的范围
//
// 背景：
// 泛型 T 默认可以是任意类型，但有时候你需要 T 至少拥有某些属性：
//   function getLength<T extends { length: number }>(value: T): number {
//       return value.length  // T 必须有 length 属性，否则报错
//   }
//
// 要求：
// 1. 定义接口 HasId { id: number }
// 2. 写一个泛型函数 findById<T extends HasId>(items: T[], id: number): T | undefined
//    在数组中查找 id 匹配的元素
// 3. 定义两种数据类型（都要包含 id）：
//    - interface User { id: number; name: string; age: number }
//    - interface Product { id: number; title: string; price: number }
// 4. 创建 User 数组和 Product 数组，用 findById 查找：
//    - 在 users 中找 id 为 2 的用户
//    - 在 products 中找 id 为 99 的商品（不存在）
// 5. 输出：
//    "找到用户: xxx, 年龄: xx"
//    "未找到商品"
//
// 提示：
// - arr.find(item => item.id === id) 可以查找数组中符合条件的元素

// 👇 在下面写你的代码


interface HasId {
    id: number
}

interface User {
    id: number
    name: string
    age: number
}

interface Product {
    id: number
    title: string
    price: number
}

const users: User[] = [
    { id: 1, name: "小磊", age: 25 },
    { id: 2, name: "小明", age: 30 },
    { id: 3, name: "小红", age: 22 },
]

const products: Product[] = [
    { id: 10, title: "iPhone", price: 9999 },
    { id: 20, title: "MacBook", price: 15999 },
    { id: 30, title: "AirPods", price: 1299 },
]

function findById<T extends HasId>(items: T[], id: number): T | undefined {
    return items.find(item => item.id === id)
}

// 👇 用 findById 查找 id 为 2 的用户 和 id 为 99 的商品，输出结果

const foundUser = findById(users, 2)
console.log(foundUser ? `找到用户: ${foundUser.name}, 年龄: ${foundUser.age}` : "未找到用户")

const foundProduct = findById(products, 99)
console.log(foundProduct ? `找到商品: ${foundProduct.title}, 价格: ${foundProduct.price}` : "未找到商品")

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 输出格式：题目要求 "找到用户: 小明, 年龄: 30" 和 "未找到商品"，
//      直接 console.log 对象只输出 { id: 2, name: '小明', age: 30 } 和 undefined
//      已帮你改成模板字符串 + 三元运算符格式
// 👍 亮点：
//   - findById 一行搞定，arr.find + 箭头函数用得熟练
//   - 泛型约束理解正确：T extends HasId 保证了 item.id 可用
// 🔑 知识点：泛型约束 extends、arr.find()、三元运算符处理 undefined
//
// ====== 补充笔记 ======
// 📌 JS 的 arr.find() 和 Swift 的 arr.first {} 功能一样，
//    找到第一个符合条件的元素返回，找不到返回 undefined (JS) / nil (Swift)
// 📌 TS 泛型约束 <T extends X> 等同于 Swift 的 <T: X>，
//    都是限制泛型必须符合某个接口/协议
