// ====== 初级 01：核心组件与基础布局 ======
// 适用环境：React Native 项目中的 `.tsx` 组件文件
// 建议运行方式：
// 1. 先初始化一个 React Native 项目
// 2. 把本文件导出的组件挂到 `App.tsx` 中运行
// 考察点: SafeAreaView, View, Text, TextInput, Pressable, StyleSheet.create, useState


// ====== 第 1 题：个人资料卡片 ======
// 难度: ⭐
// 考察: 核心组件、基础布局、输入状态管理、按钮交互
//
// 背景：
// 你要实现一个简单的个人资料卡片页面。
// 这是 React Native 第一题，重点不是复杂业务，而是先熟悉最常用的基础组件和写法。
//
// 要求：
// 1. 导出默认组件 `ProfileCardExercise`
// 2. 页面根节点使用 `SafeAreaView`
// 3. 顶部显示：
//    - 主标题：`React Native Beginner 01`
//    - 副标题：`核心组件 + 基础布局`
// 4. 用 `View` 实现一张资料卡片，卡片中至少展示：
//    - 姓名：`Alex Chen`
//    - 职位：`Junior RN Developer`
//    - 城市：`Shanghai`
// 5. 加一个 `TextInput`
//    - placeholder: `输入一句自我介绍`
//    - 输入内容用 state 管理
// 6. 加一个 `Pressable` 按钮
//    - 默认按钮文字：`保存简介`
//    - 按下时有明显样式变化
// 7. 点击按钮后：
//    - 如果输入为空，显示：`简介不能为空`
//    - 如果输入不为空，显示：`当前简介：xxx`
// 8. 使用 `StyleSheet.create` 管理样式
// 9. 布局要求：
//    - 页面背景色不要纯白
//    - 卡片有圆角、内边距
//    - 标题区、卡片、输入框、按钮之间有明确间距
//    - iOS/Android 至少做一个基础阴影方案（shadow 或 elevation）
//
// 提示：
// - 你可以用两个 state：
//   一个存输入内容，一个存提交后的提示文案
// - `Pressable` 的 `style` 可以写成函数：
//   style={({ pressed }) => [...]}
// - `TextInput` 常见写法：
//   value={bio}
//   onChangeText={setBio}
//
// 👇 在下面写你的代码

import React from "react"
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native"

export default function ProfileCardExercise() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.todo}>TODO: 在这里完成第 1 题</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f4f6",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    todo: {
        fontSize: 16,
        color: "#374151",
    },
})
