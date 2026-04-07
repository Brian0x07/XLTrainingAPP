// ====== 中级 01：联合类型收窄 ======
// 运行命令: npx ts-node js-ecosystem/ts/intermediate/01-narrowing.ts
// 考察点: typeof、in、判别式联合 (discriminated union)、类型收窄


// ====== 第 1 题：typeof 收窄 ======
// 难度: ⭐
// 考察: typeof 判断 + 不同类型的处理
//
// 要求：
// 1. 定义 type Input = string | number | boolean
// 2. 写一个函数 describe(input: Input)，根据类型输出：
//    string  → "字符串，长度: x"
//    number  → ""
//    boolean → "布尔值，取反: true/false"
// 3. 调用测试：describe("hello"), describe(-5), describe(true)

// 👇 在下面写你的代码

type Input = string | number | boolean

function describe(input: Input) {
    if (typeof input === "string") {
        console.log(`字符串，长度: ${input.length}`)
    } else if (typeof input === "number") {
        const isZheng = input >= 0
        console.log(`数字，是否为正数: ${isZheng}`)
    } else if (typeof input === "boolean") {
        console.log(`布尔值，取反: ${!input}`)
    }
}
describe("hello")
describe(-5)
describe(true)

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 第一版用 console.log(describe(...))，函数内已 console.log 不需要外面再包一层
//      记住：函数没有 return 时返回 undefined，console.log(undefined) 会输出 undefined
// 🔑 知识点：typeof 类型收窄、联合类型分支处理、!取反运算符
//
// ====== 补充笔记 ======
// 📌 as 能判断类型吗？
//    不能。TS 的 as 是类型断言，只在编译时生效，不做运行时检查。
//    不同于 Swift 的 if let x = y as? Type（安全转换）。
//    TS 运行时判断类型只有：typeof、in、instanceof。
//
// 📌 typeof 收窄后，块内自动识别类型？
//    是的。经过 typeof input === "string" 判断后，块内 TS 自动将 input 收窄为 string，
//    可以直接使用 .length、.toUpperCase() 等 string 方法，无需手动转换。这就是"类型收窄"。











// ====== 第 2 题：in 收窄 ======
// 难度: ⭐⭐
// 考察: 用 "属性" in 对象 来区分不同类型
//
// 要求：
// 1. 定义 interface Fish { name: string; swim(): string }
// 2. 定义 interface Bird { name: string; fly(): string }
// 3. 定义 type Animal = Fish | Bird
// 4. 写一个函数 move(animal: Animal)，用 in 判断：
//    如果有 swim → 调用 animal.swim() 并输出结果
//    如果有 fly  → 调用 animal.fly() 并输出结果
// 5. 创建一个 Fish 和一个 Bird，调用 move 测试
//
// 提示：
// - "swim" in animal 可以判断对象是否有 swim 属性
// - swim() 和 fly() 返回一个描述字符串即可，比如 "xxx在游泳"

// 👇 在下面写你的代码
interface Fish {
    name: string
    swim(): string
}

interface Bird {
    name: string
    fly(): string
}

type Animal = Fish | Bird


function move(animal: Animal) {
    if ("swim" in animal) {
        console.log( animal.swim() )
    } else if ("fly" in animal) {
        console.log( animal.fly() )
    }
}

const fish1: Fish = {
    name: "yu",
    swim() {
        return `${this.name} 在游泳`
    },
}

const bird1: Bird = {
    name: "niao",
    fly() {
        return `${this.name} 在飞`
    }
}

move(fish1)
move(bird1)

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. return 不等于输出 — 函数 return 的值如果没人接收或 console.log，就不会显示在终端
// 👍 亮点：
//   - in 收窄语法正确："swim" in animal
//   - 对象中方法的简写语法掌握了：swim() { ... } 而不是 swim: function() { ... }
//   - this.name 使用正确
// 🔑 知识点：in 收窄、对象方法定义、return vs console.log
//
// ====== 补充笔记 ======
// 📌 interface 能否约定函数参数？
//    可以。方法定义时直接写参数：swim(speed: number): string
//    也可以定义纯函数类型：interface Fn { (a: number, b: number): number }






// ====== 第 3 题：判别式联合 (Discriminated Union) ======
// 难度: ⭐⭐⭐
// 考察: 用共同的字面量字段区分类型，这是 TS 中最常用的模式之一
//
// 要求：
// 1. 定义三个 interface，都包含 kind 字段作为判别标识：
//    - Circle:    kind: "circle",    radius: number
//    - Rectangle: kind: "rectangle", width: number, height: number
//    - Triangle:  kind: "triangle",  base: number, height: number
// 2. 定义 type Shape = Circle | Rectangle | Triangle
// 3. 写一个函数 getArea(shape: Shape): number，根据 kind 计算面积：
//    circle    → Math.PI * radius * radius
//    rectangle → width * height
//    triangle  → 0.5 * base * height
// 4. 写一个函数 describe(shape: Shape): string，输出：
//    "圆形，半径: x, 面积: x"
//    "矩形，宽: x, 高: x, 面积: x"
//    "三角形，底: x, 高: x, 面积: x"
// 5. 创建三个形状并调用 describe 输出
//
// 提示：
// - 用 switch (shape.kind) 来收窄类型
// - 面积保留两位小数：result.toFixed(2)

// 👇 在下面写你的代码

interface Circle {
    kind: "circle"
    radius: number
}

interface Rectangle {
    kind: "rectangle"
    width: number
    height: number
}

interface Triangle {
    kind: "triangle"
    base: number
    height: number
}


type Shape = Circle | Rectangle | Triangle

function getArea(shape: Shape): number {
    if (shape.kind === "circle") {
        return Math.PI * shape.radius * shape.radius
    } else if (shape.kind === "rectangle") {
        return shape.width * shape.height
    } else if (shape.kind === "triangle") {
        return 0.5 * shape.base * shape.height
    }
    return 0
}

function describe1(shape: Shape): string {
    switch (shape.kind) {
        case 'circle':
            return `圆形，半径: ${shape.radius}, 面积: ${getArea(shape).toFixed(2)}`
        case 'rectangle':
            return `矩形，宽: ${shape.width}, 高: ${shape.height}, 面积: ${getArea(shape).toFixed(2)}`
        case `triangle`:
            return `三角形，底: ${shape.base}, 高: ${shape.height}, 面积: ${getArea(shape).toFixed(2)}`
    }
}

const circle: Circle = { kind: "circle", radius: 5 }
const rect: Rectangle = { kind: "rectangle", width: 10, height: 3 }
const tri: Triangle = { kind: "triangle", base: 8, height: 4 }

console.log(describe1(circle))
console.log(describe1(rect))
console.log(describe1(tri))

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. getArea 用 if/else，describe1 用 switch — 都能实现，但题目提示用 switch，
//      建议 getArea 也用 switch 保持一致（两种写法都对）
//   2. getArea 末尾 return 0 是防御性代码，可以用之前学的 never 做穷尽检查
// 👍 亮点：
//   - 判别式联合模式完全掌握：kind 字面量类型 + switch 收窄
//   - toFixed(2) 格式化正确
//   - describe1 的 switch 没写 default，因为 TS 知道三个 case 已覆盖所有 Shape
// 🔑 知识点：判别式联合、switch 收窄、字面量类型、toFixed 格式化
//
// ====== 补充笔记 ======
// 📌 interface 中可以写死属性值吗？
//    可以，这叫字面量类型。kind: "circle" 表示 kind 只能是 "circle" 这一个值。
//    这是判别式联合的核心：每个 interface 的 kind 写死不同值，TS 通过 switch(shape.kind) 自动识别类型。