// ====== 高级 05：真实开放 API 请求与类型建模 ======
// 运行命令: npx ts-node js-ecosystem/ts/advanced/05-real-world-public-apis.ts
// 考察点: fetch、真实 JSON 建模、ApiResponse<T>、错误处理、可选字段、数据转换、Promise.all、类型守卫
//
// 说明：
// 这一组题专门练真实开放 API。
// 重点不是“会发请求”，而是把外部 API 的原始结构转换成 App 内部更稳定的类型。
//
// 所有题都统一使用下面的响应包装类型：
// - 成功：{ ok: true; data: T }
// - 失败：{ ok: false; error: ApiError }
//
// 提醒：
// - 真实网络请求可能因为网络、代理、服务限流等原因失败
// - 如果网络不可用，返回 NETWORK_ERROR 是正常结果
// - 为了礼貌使用公共 API，不要写循环刷请求
// - response.json() 的返回类型很宽，本组题允许先使用 as RawXxx
// - 真实项目里更严谨的做法是使用 zod / valibot / io-ts 等运行时校验

interface ApiError {
    code: string
    message: string
}

type ApiResponse<T> = { ok: true; data: T } | { ok: false; error: ApiError }


// ====== 第 1 题：Open-Meteo 天气 API ======
// 难度: ⭐⭐⭐⭐
// 考察: 嵌套对象建模、平行数组合并、字段重命名、ApiResponse<T>
//
// 文档：https://open-meteo.com/en/docs
// 示例：
// GET https://api.open-meteo.com/v1/forecast?latitude=31.23&longitude=121.47&hourly=temperature_2m&forecast_days=1&timezone=Asia%2FShanghai
//
// 背景：
// Open-Meteo 返回的 hourly 数据不是 [{ time, temperature }]，
// 而是两个平行数组：
//
// {
//   hourly: {
//     time: ["2026-04-16T00:00", "2026-04-16T01:00"],
//     temperature_2m: [18.2, 17.9]
//   }
// }
//
// 真实 App 更希望使用：
// [
//   { time: "2026-04-16T00:00", temperature: 18.2 },
//   { time: "2026-04-16T01:00", temperature: 17.9 }
// ]
//
// 要求：
// 1. 定义 interface RawOpenMeteoResponse：
//    - hourly: { time: string[]; temperature_2m: number[] }
// 2. 定义 interface WeatherPoint：
//    - time (string)
//    - temperature (number)
// 3. 写函数 toWeatherPoints(raw: RawOpenMeteoResponse): WeatherPoint[]
//    - 把 hourly.time 和 hourly.temperature_2m 合并成 WeatherPoint[]
//    - 如果某个温度缺失，可以跳过该项
// 4. 写 async function fetchShanghaiWeather(): Promise<ApiResponse<WeatherPoint[]>>
//    - 请求上面的 Open-Meteo 示例 URL
//    - response.ok 为 false 时返回失败分支
//    - 成功时把 raw 转成 WeatherPoint[] 后返回
//    - fetch 抛错时返回 NETWORK_ERROR
// 5. 写 printWeather(response: ApiResponse<WeatherPoint[]>): void
//    - 成功时输出前 3 个时间点和温度
//    - 失败时输出错误
// 6. 写 async function runWeatherDemo(): Promise<void> 并调用它
//
// 提示：
// - const raw = await response.json() as RawOpenMeteoResponse
// - 可以用 map，也可以用 for 循环

// 👇 在下面写你的代码





// ====== 第 2 题：Open Library 图书搜索 API ======
// 难度: ⭐⭐⭐⭐
// 考察: 可选字段、默认值、数组转换、外部 DTO 到内部 View Model
//
// 文档：https://openlibrary.org/dev/docs/api/search
// 示例：
// GET https://openlibrary.org/search.json?q=typescript&limit=5
//
// 背景：
// Open Library 的搜索结果字段很多，而且不少字段可能缺失。
// 例如 author_name、first_publish_year 不一定存在。
// 真实 App 通常不会直接把 RawSearchDoc 传给 UI，而是转成稳定的 BookCard。
//
// 要求：
// 1. 定义 interface RawOpenLibrarySearchResponse：
//    - numFound (number)
//    - docs (RawOpenLibraryDoc[])
// 2. 定义 interface RawOpenLibraryDoc：
//    - title (string)
//    - author_name? (string[])
//    - first_publish_year? (number)
//    - cover_i? (number)
// 3. 定义 interface BookCard：
//    - title (string)
//    - authors (string[])
//    - firstPublishYear (number | null)
//    - coverUrl (string | null)
// 4. 写函数 toBookCard(doc: RawOpenLibraryDoc): BookCard
//    - author_name 缺失时 authors 使用 []
//    - first_publish_year 缺失时 firstPublishYear 使用 null
//    - cover_i 存在时生成 https://covers.openlibrary.org/b/id/<cover_i>-M.jpg
//    - cover_i 缺失时 coverUrl 使用 null
// 5. 写 async function searchBooks(query: string): Promise<ApiResponse<BookCard[]>>
//    - 请求 https://openlibrary.org/search.json?q=<query>&limit=5
//    - 注意 query 要 encodeURIComponent
// 6. 写 printBooks(response: ApiResponse<BookCard[]>): void
//    - 成功时输出每本书标题、作者、出版年份
//    - 失败时输出错误
// 7. 写 async function runBookDemo(): Promise<void> 并调用它
//
// 提示：
// - 可选字段读取可以用 ?? 给默认值
// - authors 输出时可以用 authors.join(", ")

// 👇 在下面写你的代码





// ====== 第 3 题：Hacker News 官方 API ======
// 难度: ⭐⭐⭐⭐⭐
// 考察: 多请求、Promise.all、联合类型、类型守卫、过滤 null、外部类型转换
//
// 文档：https://github.com/HackerNews/API
// 示例：
// GET https://hacker-news.firebaseio.com/v0/topstories.json
// GET https://hacker-news.firebaseio.com/v0/item/<id>.json
//
// 背景：
// Hacker News API 不是一次性返回完整列表。
// 它先返回 top story id 数组，再用每个 id 请求 item 详情。
// item 可能是 story/job/comment/poll，也可能是 null。
//
// 要求：
// 1. 定义 type HNItemType = "job" | "story" | "comment" | "poll" | "pollopt"
// 2. 定义 interface RawHNItem：
//    - id (number)
//    - type (HNItemType)
//    - by? (string)
//    - title? (string)
//    - url? (string)
//    - score? (number)
//    - time? (number)
// 3. 定义 interface HNStoryCard：
//    - id (number)
//    - title (string)
//    - url (string | null)
//    - score (number)
//    - by (string)
// 4. 写类型守卫 isStoryItem(item: RawHNItem | null): item is RawHNItem
//    - item 不是 null
//    - item.type === "story"
//    - item.title 存在
// 5. 写函数 toStoryCard(item: RawHNItem): HNStoryCard
//    - url 缺失时使用 null
//    - score 缺失时使用 0
//    - by 缺失时使用 "unknown"
// 6. 写 async function fetchTopStories(limit: number): Promise<ApiResponse<HNStoryCard[]>>
//    - 请求 topstories id 数组
//    - 取前 limit 个 id
//    - 用 Promise.all 请求每个 item
//    - 过滤出 story
//    - 转成 HNStoryCard[]
// 7. 写 printStories(response: ApiResponse<HNStoryCard[]>): void
//    - 成功时输出标题、分数、作者
//    - 失败时输出错误
// 8. 写 async function runHackerNewsDemo(): Promise<void> 并调用它
//
// 提示：
// - const ids = await response.json() as number[]
// - const item = await itemResponse.json() as RawHNItem | null
// - 类型守卫返回值写法：item is RawHNItem
// - Promise.all 会并发请求多个 item，limit 建议先用 5

// 👇 在下面写你的代码





// ====== 第 4 题：REST Countries 国家信息 API ======
// 难度: ⭐⭐⭐⭐
// 考察: 深层对象建模、可选字段、数组结果、复杂结构压平
//
// 文档：https://restcountries.com/
// 示例：
// GET https://restcountries.com/v3.1/name/japan?fields=name,capital,currencies,languages,population,region
//
// 背景：
// REST Countries 返回的国家信息结构比较深。
// UI 通常不需要完整原始结构，只需要一个更扁平的 CountrySummary。
//
// 要求：
// 1. 定义 interface RawCountry：
//    - name: { common: string; official: string }
//    - capital?: string[]
//    - currencies?: Record<string, { name: string; symbol?: string }>
//    - languages?: Record<string, string>
//    - population (number)
//    - region (string)
// 2. 定义 interface CountrySummary：
//    - name (string)
//    - capital (string | null)
//    - region (string)
//    - population (number)
//    - languages (string[])
//    - currencies (string[])
// 3. 写函数 toCountrySummary(raw: RawCountry): CountrySummary
//    - name 使用 raw.name.common
//    - capital 使用 raw.capital?.[0] ?? null
//    - languages 使用 Object.values(raw.languages ?? {})
//    - currencies 使用 Object.values(raw.currencies ?? {}).map(c => c.name)
// 4. 写 async function fetchCountry(name: string): Promise<ApiResponse<CountrySummary[]>>
//    - 请求 REST Countries 示例接口，name 要 encodeURIComponent
//    - 成功后把 RawCountry[] 转成 CountrySummary[]
// 5. 写 printCountries(response: ApiResponse<CountrySummary[]>): void
//    - 成功时输出国家名、首都、地区、人口、语言
//    - 失败时输出错误
// 6. 写 async function runCountryDemo(): Promise<void> 并调用它
//
// 提示：
// - REST Countries 返回数组，即使只查一个国家
// - capital/currencies/languages 都要按可能缺失处理

// 👇 在下面写你的代码
