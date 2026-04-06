// ====== 初级 01：基础类型 ======
// 运行命令: npx ts-node js-ecosystem/ts/beginner/01-basic-types.ts
// 考察点: string, number, boolean, array, 元组, 模板字符串, 数组方法


// ====== 第 1 题：变量声明 ======
// 难度: ⭐
// 考察: 基本类型声明、模板字符串
//
// 要求：
// 1. 声明一个变量 username，类型为 string，值为你的名字
// 2. 声明一个变量 score，类型为 number，值为 98.5
// 3. 声明一个变量 passed，类型为 boolean，根据 score >= 60 来决定
// 4. 声明一个变量 hobbies，类型为 string 数组，放入至少 3 个爱好
// 5. 用 console.log 输出以下格式：
//    "姓名: xxx, 分数: 98.5, 是否及格: true"
//    "爱好: 读书, 游泳, 编程"

// 👇 在下面写你的代码

const username = "xiaoming"
const score = 98.5

const passed = score >= 60

const hobbies = ["basketball", "read", "swim"]


console.log(`姓名: ${username}, 分数: ${score}, 是否及格: ${passed}`)
console.log(`爱好: ${hobbies}`)

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 模板字符串要用反引号 ` 而不是单引号 ' — 单引号不会解析 ${}
//   2. score >= 60 本身就是 boolean，不需要写成 score >= 60 ? true : false
//   3. 变量名用 name 会和全局内置变量冲突，改为 username 更安全
// 🔑 知识点：模板字符串语法、布尔表达式简写、变量命名避免冲突


// ====== 第 2 题：元组与类型注解 ======
// 难度: ⭐⭐
// 考察: 元组、显式类型注解、数组方法 (Math.max, reduce, toFixed)
//
// 要求：
// 1. 声明一个变量 person，类型为元组 [string, number, boolean]
//    分别表示 [姓名, 年龄, 是否在职]，赋值为你自己的信息
// 2. 声明一个变量 scores，类型为 number[]，值为 [88, 95, 72, 100, 63]
// 3. 用 scores 计算出：最高分、最低分、平均分（保留1位小数）
// 4. 用 console.log 输出：
//    "个人信息: 姓名=xxx, 年龄=xx, 在职=true"
//    "最高分: 100, 最低分: 63, 平均分: 83.6"
//
// 提示：
// - 元组语法: let x: [string, number] = ["hello", 42]
// - Math.max(...数组) 可以取最大值
// - Math.min(...数组) 可以取最小值
// - .toFixed(1) 可以保留1位小数，但返回的是 string
// - 数组.reduce((sum, n) => sum + n, 0) 可以求和

// 👇 在下面写你的代码
const person: [string, number, boolean] = ['xiaoming', 18, false]

const scores: number[] = [88, 95, 72, 100, 63]

const maxScore = Math.max(...scores)
const minScore = Math.min(...scores)

const sum = scores.reduce( (sum, n) => sum + n, 0)
const average = (sum/scores.length).toFixed(1)

console.log(`个人信息: 姓名=${person[0]}, 年龄=${person[1]}, 在职=${person[2]}`)

console.log(`最高分: ${maxScore}, 最低分: ${minScore}, 平均分: ${average}`)

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. reduce 回调中用了 sum += n（赋值），应该用 sum + n（返回新值）
//      reduce 的理念是"返回新值"而不是"修改累加器"，虽然结果一样但语义更清晰
// 🔑 知识点：元组类型注解、展开运算符 ...、Math.max/min、reduce 求和、toFixed


// ====== 第 3 题：const vs let 与只读 ======
// 难度: ⭐
// 考察: const 和 let 的区别、readonly 数组
//
// 要求：
// 1. 用 let 声明一个变量 count，初始值为 0，然后把它改为 10
// 2. 用 const 声明一个变量 PI，值为 3.14159
//    思考：尝试给 PI 重新赋值会发生什么？（写一行注释说明）
// 3. 声明一个只读数组 readonly number[]，值为 [1, 2, 3]
//    思考：尝试 push 一个元素会发生什么？（写一行注释说明）
// 4. console.log 输出 count 和 PI

// 👇 在下面写你的代码

let count = 0
count = 10

const PI = 3.14159
// PI = 1  红线提示错误，是编译器提示的吗？

let arr: readonly number[] = [1,2,3]
// arr.push(4)

console.log(count)
console.log(PI)

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 漏写了 readonly 数组 push 的注释说明
//      答案：arr.push(4) 会报错，readonly number[] 上没有 push 方法
// 💡 提出了好问题：红线是 TS 编译器通过 VS Code 语言服务实时检查的，不需要运行
// 🔑 知识点：const 管变量不可重新赋值、readonly 管内容不可修改、TS 编译期检查
