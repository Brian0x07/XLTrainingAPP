// ====== 中级 03：类 (Class) ======
// 运行命令: npx ts-node js-ecosystem/ts/intermediate/03-class.ts
// 考察点: class 基础、构造函数、访问修饰符、继承、implements 接口


// ====== 第 1 题：class 基础 ======
// 难度: ⭐⭐
// 考察: class 定义、constructor、方法、访问修饰符
//
// 背景：
// TS 的 class 和 Swift 的 class 很像：
//   class Person {
//       name: string              // 属性
//       constructor(name: string) { this.name = name }  // 构造函数（类似 Swift 的 init）
//       greet(): string { return `Hi, I'm ${this.name}` }  // 方法
//   }
//   const p = new Person("小磊")  // 创建实例（类似 Swift 不需要 new）
//
// 访问修饰符：
//   public    — 默认，外部可访问（Swift 也是默认 public/internal）
//   private   — 只能在 class 内部访问（Swift 的 private）
//   readonly  — 只读，初始化后不能修改（Swift 的 let）
//
// 要求：
// 1. 定义 class BankAccount，包含：
//    - readonly id: number（只读）
//    - public owner: string
//    - private balance: number（余额，外部不能直接访问）
// 2. constructor 接收 id、owner、初始 balance
// 3. 方法：
//    - deposit(amount: number): void — 存款，余额增加
//    - withdraw(amount: number): boolean — 取款，余额不足返回 false
//    - getBalance(): number — 获取余额（因为 balance 是 private，需要通过方法访问）
//    - toString(): string — 返回 "账户 [id] 所有者: xxx, 余额: xxx"
// 4. 创建账户，存款 500，取款 200，再尝试取款 1000（应失败），输出每步结果

// 👇 在下面写你的代码

class BankAccount {
    readonly id: number
    public owner: string
    private balance: number

    constructor(id: number, owner: string, balance: number) {
        this.id = id
        this.owner = owner
        this.balance = balance
    }

    deposit(amount: number) {
        this.balance += amount
    }

    withdraw(amount: number): boolean {
        if (this.balance < amount) return false
        this.balance -= amount
        return true
    }

    getbalance(): number {
        return this.balance
    }

    toString(): string {
        return `账户 ${this.id}, 所有者: ${this.owner}, 余额: ${this.balance}`
    }
}

const account = new BankAccount(112233, 'LEA', 500)
account.deposit(500)
console.log(`存款 500 后: ${account.toString()}`)
console.log(`取款 200: ${account.withdraw(200) ? "成功" : "失败"}`)
console.log(`取款后: ${account.toString()}`)
console.log(`取款 1000: ${account.withdraw(1000) ? "成功" : "失败"}`)
console.log(`最终: ${account.toString()}`)

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 题目要求存款 500 再取款，你初始余额就是 500 跳过了 deposit 步骤
//   2. 输出只有 true/false，应该配合 toString() 输出完整状态，已帮你补上
//   3. getbalance → 方法名应该用 camelCase：getBalance
//   4. 第一版用了 Swift 风格的具名参数 new BankAccount(id:112233, owner:'LEA')，TS 按顺序传参
// 👍 亮点：
//   - class 结构完整：readonly/public/private 都正确
//   - withdraw 返回 boolean 表示成功失败，比第一版的 return 好
// 🔑 知识点：class 定义、constructor、访问修饰符、this 引用
//
// ====== 补充笔记 ======
// 📌 class 内部不需要 let/function 关键字
//    class {} 内部 TS 已知道是在定义属性和方法，不需要额外关键字。
//    这点和 Swift 不同（Swift 在 class 内仍需 var/func）。
// 📌 TS 构造函数不支持具名参数，按顺序传参：new Foo(1, "a", true)





// ====== 第 2 题：继承 (extends) ======
// 难度: ⭐⭐
// 考察: class 继承、super、方法重写
//
// 要求：
// 1. 定义基类 Vehicle：
//    - brand: string
//    - speed: number（当前速度，初始 0）
//    - constructor 接收 brand
//    - accelerate(amount: number): void — 加速
//    - brake(amount: number): void — 减速（速度最低为 0）
//    - status(): string — "品牌: xxx, 速度: xxxkm/h"
// 2. 定义子类 ElectricCar extends Vehicle，新增：
//    - private battery: number（电量百分比，初始 100）
//    - 重写 accelerate：每次加速电量减少 5，电量为 0 时无法加速
//    - charge(): void — 充电，电量恢复到 100
//    - 重写 status()：在父类基础上追加 ", 电量: xx%"
// 3. 创建一辆电动车，加速几次，输出状态，充电，再输出状态
//
// 提示：
// - 子类 constructor 中要调用 super(brand)
// - 重写方法中可以用 super.方法名() 调用父类方法

// 👇 在下面写你的代码




// ====== 第 3 题：implements 接口 ======
// 难度: ⭐⭐⭐
// 考察: class 实现 interface、多接口实现
//
// 背景：
// interface 定义"能力"，class 用 implements 承诺实现这些能力：
//   interface Printable {
//       print(): void
//   }
//   class Report implements Printable {
//       print() { console.log("打印报告") }  // 必须实现 print，否则报错
//   }
//
// 要求：
// 1. 定义 interface Loggable { log(): string }
// 2. 定义 interface Serializable { serialize(): string }
// 3. 定义 class TodoItem implements Loggable, Serializable，包含：
//    - id: number
//    - title: string
//    - completed: boolean（默认 false）
//    - toggle(): void — 切换完成状态
//    - log(): string — 返回 "[x] 标题" 或 "[ ] 标题"（x 表示已完成）
//    - serialize(): string — 返回 JSON 字符串（用 JSON.stringify）
// 4. 创建两个 TodoItem，toggle 其中一个
// 5. 遍历输出 log() 和 serialize() 的结果
//
// 提示：
// - JSON.stringify({ id: 1, title: "xxx" }) 可以把对象转成 JSON 字符串

// 👇 在下面写你的代码


