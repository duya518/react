# React 美团外卖点餐系统 (Redux Toolkit 实战)

本项目是一个基于 **React** 和 **Redux Toolkit** 开发的仿美团外卖点餐移动端页面。主要展示了如何通过 Redux 管理复杂的全局状态，并实现异步数据抓取与组件联动。

## 🌟 项目亮点

* **状态管理方案**: 采用最新的 `Redux Toolkit (RTK)`，通过 `createSlice` 和 `createAsyncThunk` 简化了 Redux 的开发流程。
* **组件化开发**: 严格遵循组件拆分原则，将页面划分为导航 (`NavBar`)、菜单 (`Menu`)、商品列表 (`FoodsCategory`) 和购物车 (`Cart`)。
* **异步数据流**: 在 `App.js` 中使用 `useEffect` 钩子配合 `useDispatch` 触发异步 Action，实现页面初始化时的数据自动加载。
* **样式方案**: 使用 `Sass (SCSS)` 实现模块化样式编写，利用 Flex 布局和 `calc` 函数精准控制移动端滚动区域。

## 🛠️ 技术栈

* **前端框架**: React 18
* **状态管理**: React-Redux & Redux Toolkit
* **样式处理**: Sass / SCSS
* **环境构建**: Create React App (react-scripts)

## 📁 核心文件说明

### 1. 入口配置 (`src/index.js`)
通过 `react-redux` 的 `Provider` 将配置好的 `store` 注入到整个应用中，确保所有后代组件都能访问全局状态。

### 2. 主逻辑实现 (`src/App.js`)
* **数据初始化**: 使用 `useDispatch` 调用 `fetchFoodsList()` 获取外卖商品数据。
* **状态订阅**: 使用 `useSelector` 实时监听 `foodsList`（商品列表）和 `activeIndex`（当前分类索引）的变化。
* **条件渲染**: 根据 `activeIndex` 匹配对应的分类标题和食品列表，实现右侧内容的动态更新。

### 3. 页面布局 (`src/App.scss`)
* **滚动控制**: `.content-wrap` 设为 `overflow-y: auto`，确保内容超出高度时可平滑滑动。
* **布局细节**: 通过 `.goods-list` 的 `margin-bottom` 为底部浮动购物车留出视觉缓冲区。

## 🚀 快速开始

### 1. 安装依赖
在项目根目录下运行，安装 React 和 Redux 相关依赖包：
```bash
npm install
