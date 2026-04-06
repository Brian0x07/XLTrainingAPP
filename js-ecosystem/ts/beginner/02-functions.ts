// ====== 初级 02：函数与参数类型 ======
// 运行命令: npx ts-node js-ecosystem/ts/beginner/02-functions.ts
// 考察点: 函数参数类型、返回值类型、可选参数、默认值、箭头函数


// ====== 第 1 题：基本函数 ======
// 难度: ⭐
// 考察: 函数参数类型、返回值类型
//
// 要求：
// 1. 写一个函数 multiply，接收两个 number 参数，返回它们的乘积
// 2. 写一个函数 greet，接收一个 string 参数 name，返回 "你好, xxx!"
// 3. 调用这两个函数并输出：
//    "3 x 4 = 12"
//    "你好, xiaolei!"

// 👇 在下面写你的代码

function multiply(num1: number, num2: number): number {
    return num1 * num2
}

function greet(name: string): string {
    return `你好，${name}`
}

const a = multiply(3,4)
console.log(`3 x 4 = ${a}`)

const b = greet("xiaoming")
console.log(b)

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 题目要求返回 "你好, xxx!"（英文逗号+感叹号），实际返回 "你好，xxx"（中文逗号，无感叹号）
//      编程中字符串一般用英文标点，养成习惯
// 🔑 知识点：函数参数类型、返回值类型、函数调用与模板字符串输出


// ====== 第 2 题：可选参数与默认值 ======
// 难度: ⭐⭐
// 考察: 可选参数 ?、默认值 =、void 返回类型
//
// 要求：
// 1. 写一个函数 createUser，接收三个参数：
//    - name: string（必填）
//    - age: number（必填）
//    - email: string（可选）
//    返回一个字符串，格式为：
//    有 email 时: "用户: xxx, 年龄: xx, 邮箱: xxx@xx.com"
//    无 email 时: "用户: xxx, 年龄: xx, 邮箱: 未填写"
// 2. 写一个函数 log，接收两个参数：
//    - message: string（必填）
//    - level: string（默认值为 "INFO"）
//    用 console.log 输出格式: "[INFO] 这是一条消息"
// 3. 调用并输出：
//    createUser("小磊", 25, "xiaolei@test.com")
//    createUser("小明", 20)
//    log("服务器启动")
//    log("出错了", "ERROR")
//
// 提示：
// - 可选参数语法: function foo(x?: string) — x 的类型是 string | undefined
// - 默认值语法: function foo(x: string = "默认") — 不传时用默认值
// - 判断可选参数: if (email) { ... } 或 email ?? "未填写"

// 👇 在下面写你的代码
function createUser(name: string, age: number, email?: string): string {
    return `用户: ${name}, 年龄: ${age}, 邮箱: ${ email ?? '未填写'  }`
}

function log(message: string, level: string = "INFO") {
    console.log(`[${level}] ${message}`)
}

const c = createUser("小红", 25, "xiaohong@test.com")
console.log(c)
const d = createUser("小明", 20)
console.log(d)

log("服务器启动")
log("出错了", "ERROR")

// ====== 批改记录 ======
// ✅ 通过（第二次提交）
// 📝 第一次提交发现的问题：
//   1. createUser 有返回值但没有 console.log 输出 — 函数 return 的值不会自动打印，需要手动输出
//   2. log 函数没有使用传入的 message 参数，写死了字符串 — 参数定义了就要用上
// 🔑 知识点：可选参数 ?、默认值 =、?? 空值合并运算符、函数返回值需要主动使用




// ====== 第 3 题：箭头函数 ======
// 难度: ⭐⭐
// 考察: 箭头函数语法、函数类型声明
//
// 要求：
// 1. 用箭头函数写一个 square，接收 number，返回它的平方
// 2. 用箭头函数写一个 isEven，接收 number，返回是否为偶数 (boolean)
// 3. 声明一个数组 numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//    - 用 .filter() + isEven 过滤出偶数
//    - 用 .map() + square 对偶数求平方
// 4. console.log 输出：
//    "偶数: 2,4,6,8,10"
//    "偶数的平方: 4,16,36,64,100"
//
// 提示：
// - 箭头函数: const fn = (x: number): number => x * x
// - 简写（单表达式可省略大括号和 return）: const fn = (x: number) => x * x
// - .filter(fn) 过滤数组, .map(fn) 映射数组

// 👇 在下面写你的代码

const square = (num: number): number => {
    return num * num
}

const isEven = (num: number): boolean => num%2 === 0

const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const events = numbers.filter((n) => n % 2 === 0 )

const sq = events.map((n) => n*n )

console.log(`偶数:${events}`)
console.log(`偶数的平方: ${sq}`)

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 定义了 square 和 isEven 函数但没复用，filter/map 里又写了匿名函数 — 应该直接传函数名：numbers.filter(isEven)
//   2. 变量名 events（事件）应为 evens（偶数们）— 拼写要注意
//   3. 用了 == 而不是 === — TS/JS 中推荐严格相等 ===，避免隐式类型转换
// 🔑 知识点：箭头函数语法、filter/map 数组方法、函数作为参数传递、=== 严格相等