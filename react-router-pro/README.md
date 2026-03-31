# 🚀 React Comment Manager (MyStudio Console)

[![React](https://img.shields.io/badge/React-18.x-61dafb.svg)](https://reactjs.org/)
[![React Router](https://img.shields.io/badge/React--Router-v6.x-red.svg)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

这是一个基于 React 18 和 React Router v6 构建的**视频评论管理系统**。该项目集成并展示了 React 开发中的核心知识点，包括状态管理、副作用处理、动态排序以及响应式 UI 设计。

---

## ✨ 核心功能

* **⚡ 动态路由导航**：使用 `react-router-dom` 实现多页面无刷新切换（首页、评论管理、关于）。
* **📂 评论增删改查**：
    * **发布**：实时添加新评论并自动生成时间戳。
    * **删除**：支持根据唯一 ID 精准移除评论。
* **📊 多维度排序**：支持“🔥 最热（按点赞数）”和“🕒 最新（按发布时间）”的双向切换排序逻辑。
* **⌛ 异步数据流模拟**：利用 `useEffect` 模拟真实的 API 接口请求加载状态（Loading）。
* **🎨 响应式布局**：纯 CSS 外联样式实现，包含悬停动画、选项卡切换高亮及移动端适配。

---

## 🛠️ 技术栈

* **前端框架**：React 18
* **路由管理**：React Router v6
* **状态管理**：React Hooks (`useState`, `useEffect`)
* **样式处理**：CSS3 (Flexbox & Grid)

---

## 📂 项目结构

```text
src/
├── index.js          # 项目入口，执行 ReactDOM 挂载
├── App.js            # 核心逻辑：包含路由分发、业务逻辑组件 (CommentManager)
└── App.css           # 样式表：包含布局、评论卡片、按钮及导航样式
