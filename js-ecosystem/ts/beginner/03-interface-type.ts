// ====== 初级 03：interface 与 type ======
// 运行命令: npx ts-node js-ecosystem/ts/beginner/03-interface-type.ts
// 考察点: interface 定义、可选属性、readonly、type 别名、联合类型基础


// ====== 第 1 题：定义接口 ======
// 难度: ⭐
// 考察: interface 基本用法、可选属性、readonly
//
// 要求：
// 1. 定义一个 interface Product，包含：
//    - id: number（只读）
//    - name: string
//    - price: number
//    - description: string（可选）
// 2. 创建两个 Product 对象：
//    - product1: 有 description
//    - product2: 没有 description
// 3. console.log 输出两个商品的信息：
//    "商品: iPhone, 价格: 9999, 描述: 苹果手机"
//    "商品: 数据线, 价格: 19.9, 描述: 暂无描述"

// 👇 在下面写你的代码

interface Product {
    readonly id: number
    name: string
    price: number
    description?: string
}

const product1: Product = {
    id: 1,
    name: "ice cream",
    price: 100,
    description: "cold"
}

const product2: Product = {
    id: 1,
    name: "apple",
    price: 50
}

console.log(product1)
console.log(product2)

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 直接 console.log(对象) 而非用模板字符串按格式输出
//      应该用 product1.name 等方式访问属性，并用 ?? "暂无描述" 处理可选属性
// 🔑 知识点：interface 定义、readonly、可选属性 ?、?? 处理 undefined


// ====== 第 2 题：type 别名与联合类型 ======
// 难度: ⭐⭐
// 考察: type 关键字、联合类型 |、字面量类型
//
// 要求：
// 1. 用 type 定义一个 Status 类型，只能是 "success" | "error" | "loading"
// 2. 用 type 定义一个 ID 类型，可以是 string 或 number
// 3. 写一个函数 showStatus，接收 Status 参数，根据不同值输出：
//    "success" → "✅ 操作成功"
//    "error"   → "❌ 操作失败"
//    "loading" → "⏳ 加载中..."
// 4. 写一个函数 printId，接收 ID 参数，输出：
//    如果是 string: "字符串ID: xxx"
//    如果是 number: "数字ID: xxx"
// 5. 调用并输出结果
//
// 提示：
// - typeof x === "string" 可以判断类型

// 👇 在下面写你的代码

type Status = "success" | "error" | "loading"
type ID = string | number

function showStatus(status: Status) {
    if (status === "success") {
        return "✅ 操作成功"
    } else if (status === "error") {
        return "❌ 操作失败"
    } else if (status === "loading") {
        return "⏳ 加载中..."
    }
    return ""
}

console.log(showStatus("success"))
console.log(showStatus("loading"))
console.log(showStatus("error"))

function printId(id: ID) {
    if (typeof id === "string") {
        return `字符串ID: ${id}`
    } else if (typeof id === "number") {
        return `数字ID: ${id}`
    }
    return ""
}
console.log(printId(123123))
console.log(printId("laxsr123"))

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. showStatus 和 printId 用了 return 而非直接 console.log，功能没问题但题目要求的是"输出"
//      不过 return + 外面 console.log 其实更好，函数职责更单一（返回数据 vs 打印），这是好习惯
//   2. 最后的 return "" 是防御性代码，TS 其实可以通过 never 类型让编译器帮你检查是否覆盖了所有分支
// 🔑 知识点：type 别名、联合类型 |、字面量类型、typeof 类型收窄














// ====== 第 3 题：interface vs type ======
// 难度: ⭐⭐
// 考察: interface 继承 (extends)、type 交叉 (&)、两者的区别
//
// 要求：
// 1. 用 interface 定义 Animal，包含 name: string, age: number
// 2. 用 interface 定义 Dog extends Animal，新增 breed: string (品种)
// 3. 用 type 定义 Cat = Animal & { indoor: boolean } (是否家养)
// 4. 创建一个 Dog 和一个 Cat 对象
// 5. console.log 输出：
//    "狗: xxx, 年龄: x, 品种: xxx"
//    "猫: xxx, 年龄: x, 家养: true/false"
// 6. 写一行注释总结：interface 和 type 的主要区别是什么？

// 👇 在下面写你的代码

interface Animal {
    name: string
    age: number
}

interface Dog extends Animal {
    breed: string
}

type Cat = Animal & { indoor: boolean }


const dog: Dog = {
    name: "Dan",
    age: 6,
    breed: "labubu"
}

const cat: Cat = {
    name: "hau",
    age: 3,
    indoor: true 
}

console.log(dog)
console.log(cat)

// 主要区别：interface可以被扩展extends

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. console.log 直接输出对象，题目要求按格式输出（"狗: Dan, 年龄: 6, 品种: labubu"）
//      老问题了，记得用模板字符串 `狗: ${dog.name}, 年龄: ${dog.age}, 品种: ${dog.breed}`
//   2. 总结不够完整，补充：
//      - interface 可以 extends 继承，也可以被重复声明（自动合并）
//      - type 不能重复声明，但可以用 & 交叉类型组合，还能定义联合类型、字面量类型
//      - 定义对象结构时两者都行，需要联合类型时只能用 type
// 🔑 知识点：interface extends 继承、type & 交叉类型、两者区别
//
// ====== 补充笔记 ======
// 📌 interface 重复声明：同名 interface 写两次会自动合并属性，type 不行会报错。
//    常用于扩展第三方库的类型（如给 Window 加自定义属性）。
// 📌 & 交叉类型：把多个类型"叠加"，所有属性都要有。
//    type Cat = Animal & { indoor: boolean } 等同于 interface Cat extends Animal { indoor: boolean }