// ====== 在线测评 intermediate 02：旅行平台综合题 ======
// 运行命令: swift general/coding-assessment/intermediate/02-travel-platform-online-assessment.swift
// 考察点: API 结果过滤、排序、区间扫描线、字符串处理、Dictionary 聚合
//
// 说明：
// 这一组题用于训练知名外企和大型互联网公司线上测评里常见的旅行/住宿业务题型。
// 题目是原创练习题，不对应任何公司的真实原题。

import Foundation

func expectEqual<T: Equatable>(_ name: String, _ actual: T, _ expected: T) {
    if actual == expected {
        print("PASS: \(name)")
    } else {
        print("FAIL: \(name)")
        print("  actual: \(actual)")
        print("  expected: \(expected)")
    }
}

// ====== 第 1 题：搜索结果过滤与排序 ======
// 难度: ⭐⭐
// 考察: 数组过滤、多条件排序、业务字段理解
//
// 题意：
// 一个住宿搜索接口返回多个房源结果。每个房源包含：
// - id: 房源 ID
// - city: 城市
// - price: 每晚价格
// - rating: 评分
// - available: 是否可订
//
// 请返回满足条件的房源 ID：
// 1. 城市等于目标 city。
// 2. available 为 true。
// 3. price <= maxPrice。
// 4. rating >= minRating。
//
// 排序规则：
// 1. rating 高的排前面。
// 2. rating 相同，price 低的排前面。
// 3. rating 和 price 都相同，id 小的排前面。

struct StaySearchResult {
    let id: Int
    let city: String
    let price: Int
    let rating: Double
    let available: Bool
}

func filterAndRankStays(
    _ stays: [StaySearchResult],
    city: String,
    maxPrice: Int,
    minRating: Double
) -> [Int] {
    // TODO: 在这里写你的代码
    return []
}

// ====== 第 2 题：高峰房间需求 ======
// 难度: ⭐⭐⭐
// 考察: 区间扫描线、同一天退房与入住的边界处理
//
// 题意：
// 给定一批订单，每个订单包含：
// - checkIn: 入住日期，用整数表示，例如 10
// - checkOut: 退房日期，用整数表示，例如 12
// - rooms: 订单占用房间数
//
// 规则：
// - 入住当天开始占用房间。
// - 退房当天不再占用房间。
// - 所以订单占用区间是 [checkIn, checkOut)。
//
// 返回任意一天同时被占用的最大房间数。
//
// 示例：
// (1, 4, 2), (2, 5, 1), (4, 6, 3)
// 第 2、3 天占用 3 间；第 4 天第一笔已经退房，只剩 1 + 3 = 4 间
// 返回 4

struct RoomReservation {
    let checkIn: Int
    let checkOut: Int
    let rooms: Int
}

func peakOccupiedRooms(_ reservations: [RoomReservation]) -> Int {
    // TODO: 在这里写你的代码
    return 0
}

// ====== 第 3 题：评论关键词排序 ======
// 难度: ⭐⭐⭐
// 考察: 字符串清洗、关键词计数、Dictionary 聚合、排序
//
// 题意：
// 给定一组用户评论，每条评论属于一个房源。
// 给定一组关键词，例如 ["clean", "location", "quiet"]。
//
// 计算每个房源的关键词命中次数：
// - 大小写不敏感。
// - 标点符号不算单词的一部分。
// - 同一条评论里同一个关键词出现多次，要累计多次。
//
// 返回房源 ID 排序：
// 1. 关键词命中次数高的排前面。
// 2. 命中次数相同，房源 ID 小的排前面。
// 3. 没有命中任何关键词的房源不返回。

struct StayReview {
    let stayId: Int
    let text: String
}

func rankStaysByKeywords(_ reviews: [StayReview], keywords: Set<String>) -> [Int] {
    // TODO: 在这里写你的代码
    return []
}

// ====== 第 4 题：城市成交额报表 ======
// 难度: ⭐⭐⭐
// 考察: SQL 式 group by、过滤、聚合、排序
//
// 题意：
// 给定一批订单，统计每个城市已完成订单的总成交额。
//
// 规则：
// - 只统计 status == "completed" 的订单。
// - 订单金额 = nights * pricePerNight。
// - 返回成交额最高的前 topN 个城市。
//
// 排序规则：
// 1. revenue 高的排前面。
// 2. revenue 相同，city 字典序小的排前面。

struct StayOrder {
    let city: String
    let nights: Int64
    let pricePerNight: Int64
    let status: String
}

struct CityRevenue: Equatable {
    let city: String
    let revenue: Int64
}

func topCitiesByRevenue(_ orders: [StayOrder], topN: Int) -> [CityRevenue] {
    // TODO: 在这里写你的代码
    return []
}

func runTravelPlatformAssessmentDrills() {
    let stays = [
        StaySearchResult(id: 101, city: "Amsterdam", price: 180, rating: 4.7, available: true),
        StaySearchResult(id: 102, city: "Amsterdam", price: 120, rating: 4.7, available: true),
        StaySearchResult(id: 103, city: "Amsterdam", price: 90, rating: 4.2, available: true),
        StaySearchResult(id: 104, city: "Berlin", price: 100, rating: 4.9, available: true),
        StaySearchResult(id: 105, city: "Amsterdam", price: 80, rating: 4.8, available: false),
        StaySearchResult(id: 106, city: "Amsterdam", price: 140, rating: 4.9, available: true)
    ]

    expectEqual(
        "第 1 题 search filter + rank",
        filterAndRankStays(stays, city: "Amsterdam", maxPrice: 150, minRating: 4.5),
        [106, 102]
    )

    let reservations = [
        RoomReservation(checkIn: 1, checkOut: 4, rooms: 2),
        RoomReservation(checkIn: 2, checkOut: 5, rooms: 1),
        RoomReservation(checkIn: 4, checkOut: 6, rooms: 3)
    ]

    expectEqual(
        "第 2 题 peak occupied rooms",
        peakOccupiedRooms(reservations),
        4
    )

    let reviews = [
        StayReview(stayId: 10, text: "Clean room, clean towels, great location."),
        StayReview(stayId: 20, text: "Quiet street and clean lobby."),
        StayReview(stayId: 10, text: "Location is perfect, but not quiet."),
        StayReview(stayId: 30, text: "Average stay.")
    ]

    expectEqual(
        "第 3 题 keyword ranking",
        rankStaysByKeywords(reviews, keywords: ["clean", "location", "quiet"]),
        [10, 20]
    )

    let orders = [
        StayOrder(city: "Amsterdam", nights: 2, pricePerNight: 200, status: "completed"),
        StayOrder(city: "Berlin", nights: 3, pricePerNight: 120, status: "completed"),
        StayOrder(city: "Amsterdam", nights: 1, pricePerNight: 180, status: "cancelled"),
        StayOrder(city: "Paris", nights: 2, pricePerNight: 180, status: "completed"),
        StayOrder(city: "Lisbon", nights: 5, pricePerNight: 70, status: "completed")
    ]

    expectEqual(
        "第 4 题 city revenue report",
        topCitiesByRevenue(orders, topN: 3),
        [
            CityRevenue(city: "Amsterdam", revenue: 400),
            CityRevenue(city: "Berlin", revenue: 360),
            CityRevenue(city: "Paris", revenue: 360)
        ]
    )
}

runTravelPlatformAssessmentDrills()

