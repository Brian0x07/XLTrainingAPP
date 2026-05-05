// ====== 在线测评 beginner 01：数组排序与计数 ======
// 运行命令: swift general/coding-assessment/beginner/01-array-sorting-and-counting.swift
// 考察点: 数组切片、排序、Dictionary 计数、边界值、输出格式
//
// 说明：
// 这一组题用于训练知名外企和大型互联网公司在线笔试中的常见基础题型。
// 先实现函数，让下面的测试通过；后续再训练标准输入输出版本。

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

// ====== 第 1 题：花枝排列 ======
// 难度: ⭐
// 考察: 数组分段、升序排序、降序排序
//
// 英文题意简述：
// Emma has N flower sticks. Rosy asks her to arrange the first K flower sticks
// in increasing order of length, and the remaining sticks in decreasing order.
//
// 中文要求：
// 给定花枝长度数组 sticks 和整数 k：
// 1. 前 k 个元素升序排列。
// 2. 剩余元素降序排列。
// 3. 拼接后返回最终数组。
//
// 示例：
// sticks = [11, 7, 5, 10, 46, 23, 16, 8], k = 3
// 返回 [5, 7, 11, 46, 23, 16, 10, 8]
//
// 边界：
// - k = 0：全部降序
// - k = sticks.count：全部升序

func arrangeFlowerSticks(_ sticks: [Int], _ k: Int) -> [Int] {
    // TODO: 在这里写你的代码
    return []
}

// ====== 第 2 题：负温商品计数 ======
// 难度: ⭐
// 考察: 数组遍历、条件判断
//
// 题意：
// 一个冷库存放 N 个商品，每个商品有一个保存温度。
// 找出需要负温保存的商品数量。
//
// 示例：
// temperatures = [9, -3, 8, -6, -7, 8, 10]
// 返回 3

func countNegativeTemperatures(_ temperatures: [Int]) -> Int {
    // TODO: 在这里写你的代码
    return 0
}

// ====== 第 3 题：最小非双胞胎 ======
// 难度: ⭐⭐
// 考察: Dictionary 计数、最小值查找
//
// 题意：
// 数组中成对出现的数字叫 twin。
// 找出只出现 1 次的数字中最小的那个。
// 如果所有数字都成对出现，返回 -1。
//
// 示例：
// nums = [1, 1, 2, 3, 3, 4, 4]
// 返回 2
//
// nums = [1, 1, 2, 2]
// 返回 -1

func smallestNonTwin(_ nums: [Int]) -> Int {
    // TODO: 在这里写你的代码
    return -1
}

func runBeginnerAssessmentDrills() {
    expectEqual(
        "第 1 题 sample",
        arrangeFlowerSticks([11, 7, 5, 10, 46, 23, 16, 8], 3),
        [5, 7, 11, 46, 23, 16, 10, 8]
    )

    expectEqual(
        "第 1 题 k = 0",
        arrangeFlowerSticks([4, 1, 3, 2], 0),
        [4, 3, 2, 1]
    )

    expectEqual(
        "第 1 题 k = n",
        arrangeFlowerSticks([4, 1, 3, 2], 4),
        [1, 2, 3, 4]
    )

    expectEqual(
        "第 2 题 sample",
        countNegativeTemperatures([9, -3, 8, -6, -7, 8, 10]),
        3
    )

    expectEqual(
        "第 2 题 all positive",
        countNegativeTemperatures([1, 2, 3]),
        0
    )

    expectEqual(
        "第 3 题 sample",
        smallestNonTwin([1, 1, 2, 3, 3, 4, 4]),
        2
    )

    expectEqual(
        "第 3 题 all twins",
        smallestNonTwin([1, 1, 2, 2]),
        -1
    )
}

runBeginnerAssessmentDrills()
