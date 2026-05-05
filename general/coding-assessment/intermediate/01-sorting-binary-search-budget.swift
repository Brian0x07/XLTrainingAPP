// ====== 在线测评 intermediate 01：排序、前缀最大值与二分 ======
// 运行命令: swift general/coding-assessment/intermediate/01-sorting-binary-search-budget.swift
// 考察点: 排序、前缀最大值、二分查找、贪心、Int64 防溢出
//
// 说明：
// 这一组题用于训练“糖果店订单题”背后的通用套路。
// 数据规模到 10^5 时，不能写两层循环枚举所有组合。

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

struct MachineOption {
    let time: Int64
    let cost: Int64
}

struct ShopOption {
    let boxes: Int64
    let cost: Int64
}

// ====== 第 1 题：糖果店订单最短时间 ======
// 难度: ⭐⭐⭐
// 考察: 排序、前缀最大值、二分查找、贪心
//
// 题意简述：
// William 要交付 numOfBox 盒糖果。
// 旧机器每盒需要 prepTime 分钟，买新机器后不能再用旧机器。
// 他也可以从某个商店直接购买一批现成糖果，购买后立即可用。
// 总预算不能超过 money。
//
// 目标：
// 在预算内选择：
// - 使用旧机器或购买一台新机器
// - 可以选择一个商店购买现成糖果
// 求完成订单的最短时间。
//
// 规则：
// - 旧机器也可以看作一台机器：time = prepTime, cost = 0
// - 若从商店买到 boughtBoxes 盒，还需要机器生产 max(0, numOfBox - boughtBoxes) 盒
// - 时间 = 剩余盒数 * 机器每盒时间
// - 返回最短时间对 1000007 取模后的结果
//
// 提示：
// 1. shops 按 cost 升序排序。
// 2. 做 prefixBestBoxes，表示花费不超过当前 cost 时最多能买多少盒。
// 3. 枚举每台机器，用 money - machine.cost 得到剩余预算。
// 4. 对 shops.cost 二分，找 <= 剩余预算 的最后一个位置。
// 5. 用 prefixBestBoxes 得到最多可买盒数。
//
// 示例：
// numOfBox = 20, prepTime = 10, money = 20
// machines = [(2, 30), (3, 25), (4, 10)]
// shops = [(5, 10), (15, 80)]
// 最优：买 cost 10 的机器，每盒 4 分钟；买 cost 10 的 5 盒现成糖果
// 剩余 15 盒需要生产，时间 = 15 * 4 = 60

func minimumCandyDeliveryTime(
    numOfBox: Int64,
    prepTime: Int64,
    money: Int64,
    machines: [MachineOption],
    shops: [ShopOption]
) -> Int64 {
    // TODO: 在这里写你的代码
    return -1
}

// ====== 第 2 题：预算内最多能买多少盒 ======
// 难度: ⭐⭐
// 考察: 排序、前缀最大值、二分查找
//
// 题意：
// 给定多个商店，每个商店有 boxes 和 cost。
// 在预算 budget 内，只能选择一个商店，求最多能买多少盒。
//
// 这题是糖果店订单题的子问题。

func maxBoxesWithinBudget(_ shops: [ShopOption], _ budget: Int64) -> Int64 {
    // TODO: 在这里写你的代码
    return 0
}

// ====== 第 3 题：最小处理速度 ======
// 难度: ⭐⭐⭐
// 考察: 二分答案
//
// 题意：
// 给定若干任务量 workloads。
// 如果处理速度为 speed，每个任务需要 ceil(workload / speed) 小时。
// 求在 hours 小时内完成所有任务的最小 speed。
//
// 示例：
// workloads = [3, 6, 7, 11], hours = 8
// speed = 4 时耗时 1 + 2 + 2 + 3 = 8
// 返回 4

func minimumSpeedToFinish(_ workloads: [Int64], _ hours: Int64) -> Int64 {
    // TODO: 在这里写你的代码
    return -1
}

func runIntermediateAssessmentDrills() {
    let machines = [
        MachineOption(time: 2, cost: 30),
        MachineOption(time: 3, cost: 25),
        MachineOption(time: 4, cost: 10)
    ]

    let shops = [
        ShopOption(boxes: 5, cost: 10),
        ShopOption(boxes: 15, cost: 80)
    ]

    expectEqual(
        "第 1 题 candy sample",
        minimumCandyDeliveryTime(
            numOfBox: 20,
            prepTime: 10,
            money: 20,
            machines: machines,
            shops: shops
        ),
        60
    )

    expectEqual(
        "第 2 题 prefix + binary search sample",
        maxBoxesWithinBudget(
            [
                ShopOption(boxes: 3, cost: 5),
                ShopOption(boxes: 10, cost: 12),
                ShopOption(boxes: 8, cost: 7)
            ],
            10
        ),
        8
    )

    expectEqual(
        "第 3 题 binary search answer sample",
        minimumSpeedToFinish([3, 6, 7, 11], 8),
        4
    )
}

runIntermediateAssessmentDrills()

