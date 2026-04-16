// ====== 高级 03：keyof 与映射类型 (Mapped Types) ======
// 运行命令: npx ts-node js-ecosystem/ts/advanced/03-keyof-mapped-types.ts
// 考察点: keyof、T[K]、K extends keyof T、映射类型、key remapping


// ====== 第 1 题：keyof 与安全取值 ======
// 难度: ⭐⭐
// 考察: 用 keyof 限制 key，只允许读取对象真实存在的属性
//
// 背景：
// keyof 可以拿到一个对象类型的所有 key，组成联合类型：
//
// interface User {
//   id: number
//   name: string
//   isVip: boolean
// }
//
// type UserKey = keyof User
// // 等价于: "id" | "name" | "isVip"
//
// T[K] 表示“对象类型 T 中，属性 K 对应的值类型”：
//
// type NameType = User["name"]  // string
// type IdType = User["id"]      // number
//
// 实际场景：
// 写通用工具函数时，希望 key 不能乱传，而且返回值类型能跟 key 自动对应。
//
// 要求：
// 1. 定义 interface Course：
//    - id (number)
//    - title (string)
//    - durationMinutes (number)
//    - isPublished (boolean)
// 2. 写泛型函数 getProperty<T, K extends keyof T>(obj: T, key: K): T[K]
//    - 返回 obj[key]
// 3. 创建一个 Course 对象
// 4. 分别读取 title、durationMinutes、isPublished 并输出
// 5. 观察：如果传入不存在的 key，比如 "author"，TypeScript 应该报错
//
// 提示：
// - K extends keyof T 表示：K 必须是 T 的合法属性名
// - 返回值 T[K] 会根据 key 自动变化：
//   getProperty(course, "title") -> string
//   getProperty(course, "durationMinutes") -> number

// 👇 在下面写你的代码

interface Course {
    id: number
    title: string
    durationMinutes: number
    isPublished: boolean
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key]
}

const course: Course = {
    id: 1,
    title: "TypeScript 高级",
    durationMinutes: 45,
    isPublished: true
}

const title = getProperty(course, "title")
const duration = getProperty(course, "durationMinutes")
const isPublished = getProperty(course, "isPublished")

console.log(title)
console.log(duration)
console.log(isPublished)

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 没有功能性问题，getProperty 的泛型约束和返回类型都写对了
// 👍 亮点：
//   - K extends keyof T 使用正确，key 被限制为对象真实存在的属性名
//   - 返回类型 T[K] 使用正确，title/duration/isPublished 能分别推导为 string/number/boolean
//   - 运行时通过 console.log 输出了三个读取结果
// 🔑 知识点：keyof、索引访问类型 T[K]、泛型约束、类型层面与值层面的区别
//
// ====== 补充笔记 ======
// T[K] 容易看成 obj[key]，因为两者语法很像，但它们所在的层级不同：
// - obj[key] 是值层面：从某个对象值里取出真实值
// - T[K] 是类型层面：从某个对象类型里取出字段类型
//
// 例如：
// type CourseTitle = Course["title"]
// CourseTitle 得到的是 string 类型，不会产生任何运行时输出。
//
// 真正运行并产生输出的是函数调用和 console.log：
// const title = getProperty(course, "title")
// console.log(title)
//
// interface、type、T[K] 这些都是类型检查阶段的信息，编译后不会作为运行时代码存在。












// ====== 第 2 题：映射类型生成表单错误 ======
// 难度: ⭐⭐⭐
// 考察: 用 [K in keyof T] 遍历对象类型的所有 key，生成新对象类型
//
// 背景：
// 映射类型可以根据一个对象类型，批量生成另一个对象类型：
//
// type Nullable<T> = {
//   [K in keyof T]: T[K] | null
// }
//
// interface User {
//   name: string
//   age: number
// }
//
// type NullableUser = Nullable<User>
// // 等价于:
// // {
// //   name: string | null
// //   age: number | null
// // }
//
// 实际场景：
// 表单校验时，原始表单字段是 name/email/password，
// 错误对象通常是同样的 key，但 value 是错误消息 string。
//
// 要求：
// 1. 定义 interface RegisterForm：
//    - username (string)
//    - email (string)
//    - password (string)
// 2. 定义映射类型 FormErrors<T>：
//    - key 和 T 一样
//    - 每个字段都是可选的
//    - 每个字段的 value 是 string
//    - 例如 { username?: string; email?: string; password?: string }
// 3. 写函数 validateRegisterForm(form: RegisterForm): FormErrors<RegisterForm>
//    - username 为空时，设置 username 错误
//    - email 不包含 "@" 时，设置 email 错误
//    - password 长度小于 6 时，设置 password 错误
// 4. 创建一个错误表单，调用校验并输出错误对象
//
// 提示：
// - 可选属性写法：field?: string
// - 映射类型里可选属性写法：
//   type FormErrors<T> = {
//     [K in keyof T]?: string
//   }

// 👇 在下面写你的代码

interface RegisterForm {
    username: string
    email: string
    password: string
}

type FormErrors<T> = {
    [K in keyof T]?: string
}

function validateRegisterForm(form: RegisterForm): FormErrors<RegisterForm> {
    const errors: FormErrors<RegisterForm> = {}

    if (form.username === "") {
      errors.username = "用户名不能为空"
    }

    if (!form.email.includes("@")) {
      errors.email = "邮箱格式不正确"
    }

    if (form.password.length < 6) {
      errors.password = "密码长度不能小于 6"
    }

    return errors
}

const badForm: RegisterForm = {
    username: "",
    email: "bad-email",
    password: "123"
}

const errors = validateRegisterForm(badForm)
console.log(errors)

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 没有功能性问题，映射类型和校验逻辑都正确
// 👍 亮点：
//   - FormErrors<T> 使用 [K in keyof T]?: string 正确生成了可选错误字段
//   - validateRegisterForm 使用 FormErrors<RegisterForm> 作为返回类型，类型和业务含义匹配
//   - const errors: FormErrors<RegisterForm> = {} 能成立，说明可选字段设计正确
//   - 错误表单覆盖了 username、email、password 三个校验分支
// 🔑 知识点：映射类型、可选属性、派生类型、表单错误对象建模
//
// ====== 补充笔记 ======
// [K in keyof T] 里的中括号表示“动态生成属性名”。
// 它不是数组，也不是运行时取值，而是在类型层面遍历 T 的所有 key。
//
// 如果写成：
// type Bad<T> = { K: string }
// 这表示真的有一个固定字段叫 K。
//
// 如果写成：
// type Good<T> = { [K in keyof T]: string }
// 这表示 K 会依次变成 T 的每个 key，并生成对应字段。
//
// FormErrors<T> 是前端很常用的设计：
// type FormErrors<T> = {
//   [K in keyof T]?: string
// }
//
// 它的价值是“派生类型自动跟源模型同步”。
// 如果 RegisterForm 以后新增 phone 字段，FormErrors<RegisterForm>
// 会自动拥有 phone?: string，不需要手动维护第二份 RegisterFormErrors。
//
// Swift 通常需要手写 RegisterForm 和 RegisterFormErrors 两个 struct。
// TypeScript 的映射类型可以从一个源类型自动生成另一个相关类型，
// 所以在表单、API DTO、权限配置、字段状态等场景里很灵活。
//
// 如果用 Swift 写，大概是这样：
// struct RegisterForm {
//     var username: String
//     var email: String
//     var password: String
// }
//
// struct RegisterFormErrors {
//     var username: String?
//     var email: String?
//     var password: String?
// }
//
// func validateRegisterForm(_ form: RegisterForm) -> RegisterFormErrors {
//     var errors = RegisterFormErrors()
//
//     if form.username.isEmpty {
//         errors.username = "用户名不能为空"
//     }
//
//     if !form.email.contains("@") {
//         errors.email = "邮箱格式不正确"
//     }
//
//     if form.password.count < 6 {
//         errors.password = "密码长度不能小于 6"
//     }
//
//     return errors
// }
//
// Swift 版本更直观，但 RegisterFormErrors 需要手写。
// 如果 RegisterForm 新增 phone 字段，Swift 里通常还要手动给 RegisterFormErrors 加 phone。
// TypeScript 的 FormErrors<T> 则会自动从 RegisterForm 派生 phone?: string。











// ====== 第 3 题：key remapping 生成事件处理器 ======
// 难度: ⭐⭐⭐⭐
// 考察: 映射类型中的 as 重命名 key，结合模板字符串类型生成新属性名
//
// 背景：
// 映射类型不只能保留原来的 key，也可以用 as 生成新的 key：
//
// type Getters<T> = {
//   [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
// }
//
// interface User {
//   name: string
//   age: number
// }
//
// type UserGetters = Getters<User>
// // 等价于:
// // {
// //   getName: () => string
// //   getAge: () => number
// // }
//
// 这里 string & K 的作用：
// - keyof T 可能包含 string、number、symbol
// - Capitalize 只能处理 string
// - string & K 可以告诉 TS：这里只把 K 当作字符串 key 处理
//
// 实际场景：
// 根据表单字段自动生成 onXChange 事件处理器类型。
//
// 要求：
// 1. 定义 interface Settings：
//    - theme (string)
//    - fontSize (number)
//    - notificationsEnabled (boolean)
// 2. 定义映射类型 ChangeHandlers<T>：
//    - 对每个 key 生成一个 onXChange 函数
//    - theme -> onThemeChange
//    - fontSize -> onFontSizeChange
//    - notificationsEnabled -> onNotificationsEnabledChange
//    - 函数参数类型要和原字段类型一致
// 3. 创建 const handlers: ChangeHandlers<Settings>
// 4. 分别实现三个 handler，并在函数里输出收到的新值
// 5. 调用三个 handler 测试
//
// 提示：
// - 模板字符串类型写法：`on${Capitalize<string & K>}Change`
// - 函数类型写法：(value: T[K]) => void
// - 这一题比前两题难，可以先照着背景里的 Getters<T> 改

// 👇 在下面写你的代码

interface Settings {
    theme: string
    fontSize: number
    notificationsEnabled: boolean
}

type ChangeHandlers<T> = {
    [K in keyof T as `on${Capitalize<string & K>}Change`]: (value: T[K]) => void
}

const handlers: ChangeHandlers<Settings> = {
    onThemeChange(value) {
      console.log(value)
    },
    onFontSizeChange(value) {
      console.log(value)
    },
    onNotificationsEnabledChange(value) {
      console.log(value)
    }
  }

  handlers.onThemeChange("dark")
  handlers.onFontSizeChange(18)
  handlers.onNotificationsEnabledChange(true)


// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. handlers 的三个函数返回类型是 void，所以 r1/r2/r3 的值都是 undefined；真实使用时通常直接调用 handler，不再打印返回值
//   2. handlers 对象结束后的几行缩进多了两个空格，建议和外层代码对齐
// 👍 亮点：
//   - ChangeHandlers<T> 正确使用 as 重命名 key
//   - `on${Capitalize<string & K>}Change` 正确生成了 onThemeChange / onFontSizeChange / onNotificationsEnabledChange
//   - (value: T[K]) => void 正确保留了每个字段对应的参数类型
//   - 三个 handler 的调用参数类型都正确：string、number、boolean
// 🔑 知识点：key remapping、模板字符串类型、Capitalize、string & K、void 返回值
//
// ====== 补充笔记 ======
// [K in keyof T as 新名字] 里的 as 表示“重命名 key”。
// 不写 as 时，映射类型会保留原字段名：
// [K in keyof T]: T[K]
//
// 写 as 后，可以把原字段名转成新字段名：
// [K in keyof T as `on${Capitalize<string & K>}Change`]: (value: T[K]) => void
//
// 这句可以拆成：
// 1. K in keyof T
//    遍历 T 的所有字段名，例如 theme、fontSize、notificationsEnabled。
//
// 2. as `on${Capitalize<string & K>}Change`
//    不保留原字段名，而是生成新字段名：
//    theme -> onThemeChange
//    fontSize -> onFontSizeChange
//    notificationsEnabled -> onNotificationsEnabledChange
//
// 3. (value: T[K]) => void
//    每个 handler 接收原字段对应的值类型：
//    theme 是 string，所以 onThemeChange(value: string)
//    fontSize 是 number，所以 onFontSizeChange(value: number)
//    notificationsEnabled 是 boolean，所以 onNotificationsEnabledChange(value: boolean)
//
// string & K 可以理解成“只保留 K 里能当字符串 key 的部分”。
// 因为 keyof T 理论上可能包含 string、number、symbol，
// 但 Capitalize 只能处理字符串类型。
//
// 如果 K = "theme"，string & K 还是 "theme"。
// 如果 K = 0 或 symbol，string & K 会变成 never。
// 在 key remapping 中，never 表示这个 key 不生成。
//
// 更直白的写法是：
// type ChangeHandlers<T> = {
//   [K in keyof T as K extends string ? `on${Capitalize<K>}Change` : never]: (value: T[K]) => void
// }
//
// 这个版本更容易读：如果 K 是字符串 key，就生成 onXChange；否则过滤掉。
