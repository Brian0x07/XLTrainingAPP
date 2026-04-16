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

async function fetchJson<T>(url: string): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            return {
                ok: false,
                error: {
                    code: String(response.status),
                    message: response.statusText
                }
            }
        }

        const data = await response.json() as T
        return {
            ok: true,
            data
        }
    } catch (error) {
        return {
            ok: false,
            error: {
                code: "NETWORK_ERROR",
                message: String(error)
            }
        }
    }
}

function previewJson<T>(response: ApiResponse<T>): void {
    if (response.ok) {
        console.log(JSON.stringify(response.data, null, 2))
    } else {
        console.log(`请求失败 ${response.error.code}: ${response.error.message}`)
    }
}

// 调试真实 API 原始数据时，可以临时取消下面的注释。
// 看完原始 JSON 后，再回到具体题目里定义 RawXxx 类型和转换函数。
//
async function previewOpenMeteoRaw(url: string): Promise<void> {
    const response = await fetchJson<unknown>(url)
    previewJson(response)
}


















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

// const url = "https://api.open-meteo.com/v1/forecast?latitude=31.23&longitude=121.47&hourly=temperature_2m&forecast_days=1&timezone=Asia%2FShanghai"
// const data = previewOpenMeteoRaw(url)
// console.log(data)

interface RawOpenMeteoResponse {
    hourly: { time: string[]; temperature_2m: number[] }
}

interface WeatherPoint {
    time: string
    temperature: number
}

function toWeatherPoints(raw: RawOpenMeteoResponse): WeatherPoint[] {
    const timeArr: string[] = raw.hourly.time
    const tempArr: number[] = raw.hourly.temperature_2m

    const minLength = Math.min(timeArr.length, tempArr.length)

    const weatherPoints: WeatherPoint[] = []
    for (let index = 0; index < minLength; index++) {
        const time = timeArr[index]
        const temperature = tempArr[index]

        if (time === undefined || temperature === undefined) {
            continue
        }

        const element: WeatherPoint = {
            time,
            temperature
        }
        weatherPoints.push(element)
    }
    return weatherPoints
}


async function fetchShanghaiWeather(): Promise<ApiResponse<WeatherPoint[]>> {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=31.23&longitude=121.47&hourly=temperature_2m&forecast_days=1&timezone=Asia%2FShanghai"

    const response = await fetchJson<RawOpenMeteoResponse>(url)

    if (!response.ok) {
        return response
    }

    const arr = toWeatherPoints(response.data)
    return { ok: true, data: arr }
}


function printWeather(response: ApiResponse<WeatherPoint[]>): void {
    if (!response.ok) {
        console.log(`天气请求失败 ${response.error.code}: ${response.error.message}`)
        return
    }

    for (const point of response.data.slice(0, 3)) {
        console.log(`${point.time}: ${point.temperature}°C`)
    }
}

async function runWeatherDemo(): Promise<void> {
    const res = await fetchShanghaiWeather()
    printWeather(res)
}

runWeatherDemo()

// ====== 批改记录 ======
// ✅ 通过
// 📝 发现的问题：
//   1. 当前运行结果进入了 NETWORK_ERROR 分支，输出 "TypeError: fetch failed"；这是当前环境网络请求失败，不是 TypeScript 编译问题
//   2. printWeather 成功分支现在直接输出前三个对象数组，符合“前 3 个时间点和温度”的核心要求；后续可以改成逐行格式化输出，读起来更像业务日志
// 👍 亮点：
//   - RawOpenMeteoResponse 正确描述了 hourly.time 和 hourly.temperature_2m 两个平行数组
//   - toWeatherPoints 正确把平行数组转换成 WeatherPoint[]
//   - 在 noUncheckedIndexedAccess 开启时，能判断 undefined 后再组装 WeatherPoint，类型安全
//   - fetchJson<RawOpenMeteoResponse>(url) 使用正确，解决了 unknown 不能直接当 RawOpenMeteoResponse 的问题
//   - fetchShanghaiWeather 正确把外部 Raw 数据转换成内部 WeatherPoint[] 后包装成 ApiResponse
// 🔑 知识点：真实 API 建模、unknown、泛型 fetchJson<T>、数组索引安全、slice(0, 3)、错误包装
//
// ====== 补充笔记 ======
// fetchJson<T>(url) 是一个通用请求函数。
// 调用时要写明这次期望的 JSON 类型：
// fetchJson<RawOpenMeteoResponse>(url)
//
// 如果不写泛型参数，TypeScript 无法知道 response.data 的具体结构，
// response.data 会被当成 unknown，不能直接赋值给 RawOpenMeteoResponse。
//
// unknown 是安全版的“不知道类型”：
// - 任何值都可以赋给 unknown
// - 但 unknown 不能直接访问属性，也不能直接当作具体类型使用
// - 必须先做类型判断，或者在真实 JSON 场景里显式指定/断言类型
//
// 本题里对 timeArr[index] 和 tempArr[index] 做 undefined 判断是必要的。
// 因为项目开启了 noUncheckedIndexedAccess，数组索引访问结果会是 T | undefined。
//
// slice(0, 3) 可以快速截取数组前三项。
// 如果数组不足 3 项，也不会报错，只会返回已有项。







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
