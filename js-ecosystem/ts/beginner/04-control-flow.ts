// ====== 初级 04：控制流语句 ======
// 运行命令: npx ts-node js-ecosystem/ts/beginner/04-control-flow.ts
// 考察点: if/else、switch、for、while、for...of、break/continue


// ====== 第 1 题：if/else + switch ======
// 难度: ⭐
// 考察: 条件判断、switch 语句
//
// 要求：
// 1. 写一个函数 getGrade(score: number): string
//    - score >= 90 → "A"
//    - score >= 80 → "B"
//    - score >= 70 → "C"
//    - score >= 60 → "D"
//    - 其他        → "F"
// 2. 写一个函数 getDayName(day: number): string
//    - 用 switch 实现：1 → "周一", 2 → "周二", ... 7 → "周日"
//    - 其他数字 → "无效"
// 3. 调用测试并输出：
//    "分数 85 → 等级: B"
//    "分数 42 → 等级: F"
//    "第 3 天 → 周三"
//    "第 9 天 → 无效"

// 👇 在下面写你的代码

function getGrade(score: number): string {
    if (score >= 90) {
        return "A"
    } else if (score >= 80) {
        return "B"
    } else if (score >= 70) {
        return "C"
    } else if (score >= 60) {
        return "D"
    }
    return "F"
}

console.log(getGrade(85))
console.log(getGrade(42))

function getDayName(day: number): string {
    switch (day) {
        case 1:
            return '周一'
        case 2:
            return '周2'
        case 3:
            return '周3'
        case 4:
            return '周4'
        case 5:
            return '周5'
        case 6:
            return '周6'
        case 7:
            return '周日'
    }
    return "无效"
}

console.log(`分数 85 → 等级: ${getGrade(85)}`)
console.log(`分数 42 → 等级: ${getGrade(42)}`)
console.log(`第 3 天 → ${getDayName(3)}`)
console.log(`第 9 天 → ${getDayName(9)}`)

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 输出格式：console.log(getGrade(85)) 只输出 "B"，题目要求 "分数 85 → 等级: B"
//      已帮你改成模板字符串格式，以后记得按题目要求格式输出
//   2. "周2"~"周6" 应该写中文数字"周二"~"周六"，注意细节一致性
// 🔑 知识点：if/else 条件链、switch/case 匹配、return 代替 break
// ⚠️ switch 注意：如果没有 return，每个 case 末尾必须写 break，否则会"穿透"执行下一个 case



// ====== 第 2 题：for 循环 ======
// 难度: ⭐
// 考察: for 循环、for...of、数组遍历
//
// 要求：
// 1. 用 for 循环计算 1 到 100 的总和，输出 "1到100的总和: 5050"
// 2. 定义一个字符串数组 fruits: string[] = ["苹果", "香蕉", "橘子", "葡萄", "西瓜"]
//    用 for...of 遍历，输出每个水果和它的序号：
//    "1. 苹果"
//    "2. 香蕉"
//    ...
// 3. 用 for 循环找出数组 [12, 5, 8, 130, 44] 中的最大值，输出 "最大值: 130"
//
// 提示：
// - for...of 遍历的是值，如果还需要索引，可以用一个计数变量
// - 或者用 for (let i = 0; i < arr.length; i++) 经典写法

// 👇 在下面写你的代码

let result = 0
for (let i = 0; i<=100; i++) {
    result += i
}
console.log(result)

let fruitIndex = 1
const fruits: string[] = ["苹果", "香蕉", "橘子", "葡萄", "西瓜"]
for (const fruit of fruits) {
    console.log(`${fruitIndex}. ${fruit}`)
    fruitIndex++
}


const arr = [12, 5, 8, 130, 44]
// let maxNumber = arr[0] as number
let maxNumber = -Infinity
for (const element of arr) {
    if (element > maxNumber) {
            maxNumber = element
        }
}
console.log(`最大值: ${maxNumber}`)

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 输出格式：记得按题目要求用模板字符串（"1到100的总和: 5050"、"最大值: 130"）
//   2. 缩进不一致：maxNumber 赋值那块内层 if 多了一层缩进，注意对齐
// 👍 亮点：
//   - 用 -Infinity 做初始值，避免了 undefined 问题，思路很好
//   - 主动思考了类型安全问题（拒绝 ?? 0 和 as number），这是好习惯
// 🔑 知识点：for 循环、for...of 遍历、-Infinity 边界值技巧










// ====== 第 3 题：while + break/continue ======
// 难度: ⭐⭐
// 考察: while 循环、break 跳出、continue 跳过
//
// 要求：
// 1. 用 while 循环实现：从 1 开始累加，当总和超过 100 时停止（用 break）
//    输出 "累加到 x 时，总和 y 首次超过100"
// 2. 用 for 循环 + continue：遍历 1 到 20，跳过所有 3 的倍数，
//    把剩下的数字收集到一个数组中，输出该数组
//    预期: [1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 20]
// 3. 写一个函数 fizzBuzz(n: number): string[]
//    遍历 1 到 n，对每个数字：
//    - 能被 3 和 5 同时整除 → "FizzBuzz"
//    - 只能被 3 整除        → "Fizz"
//    - 只能被 5 整除        → "Buzz"
//    - 其他                 → 数字本身（转成字符串）
//    调用 fizzBuzz(15) 并输出结果数组
//
// 提示：
// - x % 3 === 0 判断是否能被 3 整除
// - String(x) 或 `${x}` 把数字转成字符串

// 👇 在下面写你的代码

let sum = 0
let item = 0
while(sum <= 100) {
    item ++
    sum += item
}
console.log(`累加到 ${item} 时，总和 ${sum} 首次超过100`)

let someArr: number[] = []
for(let i = 0; i<= 20; i++) {
    if (i%3 === 0) {
        continue
    }
    someArr.push(i)
}
console.log(someArr)


function fizzBuzz(n: number): string[] {
    let arr: string[] = []
    for(let i = 1; i<=n; i++) {
        if (i%3 === 0 && i%5 === 0) {
            arr.push("FizzBuzz")
        } else if (i % 3 === 0) {
            arr.push("Fizz")
        } else if (i % 5 === 0) {
            arr.push("Buzz")
        } else {
            arr.push(`${i}`)
        }
        
    }
    return arr
}

console.log(fizzBuzz(15))

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 第一版 while(sum > 100) 条件写反了，导致循环不执行 — 写 while 时注意：条件为 true 才继续循环
//   2. 第一版模板字符串写成了普通字符串 "`${i}`"，注意反引号 ` 和双引号 " 的区别
//   3. someArr 从 i=0 开始，0 也是 3 的倍数被跳过了，结果恰好正确，但题目说"遍历 1 到 20"，应该 i=1 起
// 👍 亮点：
//   - FizzBuzz 逻辑完全正确，先判断同时整除再分别判断，顺序很关键
//   - continue 用法正确
// 🔑 知识点：while 循环条件、break/continue、% 取余、模板字符串反引号