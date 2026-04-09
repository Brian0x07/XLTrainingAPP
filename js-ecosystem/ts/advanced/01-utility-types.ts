// ====== 高级 01：内置工具类型 (Utility Types) ======
// 运行命令: npx ts-node js-ecosystem/ts/advanced/01-utility-types.ts
// 考察点: Partial、Required、Pick、Omit、Record、Readonly


// ====== 第 1 题：Partial 与 Required ======
// 难度: ⭐⭐
// 考察: Partial<T> 把所有属性变可选，Required<T> 把所有属性变必填
//
// 背景：
// interface User { name: string; age: number }
// type PartialUser = Partial<User>   // { name?: string; age?: number }
// type RequiredUser = Required<PartialUser>  // 又变回 { name: string; age: number }
//
// 实际场景：更新操作只需要传部分字段（Partial），而创建操作需要所有字段（Required）
//
// 要求：
// 1. 定义 interface Profile：name (string), email (string), age (number), bio (string)
// 2. 定义函数 updateProfile(current: Profile, updates: Partial<Profile>): Profile
//    - 用展开运算符 { ...current, ...updates } 合并，返回新 Profile
// 3. 创建一个完整的 Profile 对象
// 4. 调用 updateProfile 只更新 age 和 bio，输出更新前后的结果
//
// 提示：
// - 展开运算符：{ ...obj1, ...obj2 } 后面的属性会覆盖前面的（和 Swift 的 struct 更新类似）

// 👇 在下面写你的代码

interface Profile {
    name: string
    email: string
    age: number
    bio: string
}

function updateProfile(current: Profile, updates: Partial<Profile>): Profile {
    return { ...current, ...updates }
}

const p: Profile = {
    name: "xiaoming",
    age: 12,
    email: "ssa@gmail.com",
    bio: "ugly"
}
console.log(p)
const pp = updateProfile(p, {age: 18, bio: "handsome"})
console.log(pp)

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 第一版把 updateProfile 写进了 interface 里（interface 只能声明，不能写实现）
// 👍 亮点：
//   - 修正后结构清晰：interface 定义数据，函数独立在外
//   - Partial<Profile> 使用正确
//   - 展开运算符 { ...current, ...updates } 运用正确
// 🔑 知识点：Partial<T>、展开运算符合并对象、interface 只定义形状不写实现




// ====== 第 2 题：Pick 与 Omit ======
// 难度: ⭐⭐
// 考察: Pick<T, K> 从类型中选取部分属性，Omit<T, K> 排除部分属性
//
// 背景：
// interface User { id: number; name: string; email: string; password: string }
// type PublicUser = Omit<User, "password">       // { id, name, email }
// type Credentials = Pick<User, "email" | "password">  // { email, password }
//
// 实际场景：API 返回数据时隐藏敏感字段，或者只取需要的字段
//
// 要求：
// 1. 定义 interface Product：id (number), name (string), price (number),
//    description (string), internalCode (string), stock (number)
// 2. 用 Pick 定义 ProductCard 类型，只包含 id、name、price（商品卡片展示用）
// 3. 用 Omit 定义 PublicProduct 类型，排除 internalCode（对外不暴露内部编码）
// 4. 写函数 toProductCard(product: Product): ProductCard
//    - 返回只包含 id、name、price 的对象
// 5. 创建一个 Product，转成 ProductCard 并输出

// 👇 在下面写你的代码

interface Product {
    id: number
    name: string
    price: number
    description: string
    internalCode: string
    stock: number
}

type ProductCard = Pick<Product, "id" | "name" | "price">

type PublicProduct =  Omit<Product, "internalCode">

function toProductCard({id, name, price}: Product): ProductCard {
    return {id, name, price}
}


const product: Product = { 
    id: 1, 
    name: 'apple',
    price: 99, 
    description: 'oop', 
    internalCode: 'x011', 
    stock: 8809 
}

console.log(toProductCard(product))

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 第一版函数体为空 {}，不知道怎么从完整对象中提取部分字段
// 👍 亮点：
//   - Pick 和 Omit 类型定义一次就对了
//   - 学会解构写法 ({ id, name, price }: Product) 后直接用上，简洁
// 🔑 知识点：Pick<T, K> 选取属性、Omit<T, K> 排除属性、函数参数解构









// ====== 第 3 题：Record 与综合运用 ======
// 难度: ⭐⭐⭐
// 考察: Record<K, V> 定义键值对类型，结合其他工具类型
//
// 背景：
// Record<string, number> 等于 { [key: string]: number }
// Record<"a" | "b", boolean> 等于 { a: boolean; b: boolean }
//
// 要求：
// 1. 定义 type Status = "todo" | "in-progress" | "done"
// 2. 定义 interface Task：id (number), title (string), status (Status)
// 3. 用 Record 定义 TaskBoard 类型：键是 Status，值是 Task[]
//    （即 TaskBoard 是 { todo: Task[], "in-progress": Task[], done: Task[] }）
// 4. 写函数 createBoard(tasks: Task[]): TaskBoard
//    - 接收一组 Task，按 status 分组，返回 TaskBoard
// 5. 写函数 summarize(board: TaskBoard): Record<Status, number>
//    - 返回每个状态的任务数量，如 { todo: 2, "in-progress": 1, done: 3 }
// 6. 创建几个 Task，调用 createBoard 和 summarize，输出结果
//
// 提示：
// - 初始化 board 时可以写 { todo: [], "in-progress": [], done: [] }
// - 遍历数组分组：tasks.forEach(t => board[t.status].push(t))

// 👇 在下面写你的代码


type Status = "todo" | "in-progress" | "done"

interface Task {
    id: number
    title: string
    status: Status
}
