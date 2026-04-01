# React Simple Budget Tracker | 简易 React 记账本 💰

这是一个基于 **React** 开发的轻量级个人记账应用。它可以帮助用户实时记录收支情况，自动计算余额，并支持数据本地持久化，非常适合作为 React 基础项目参考或日常简单记账使用。

---

## ✨ 功能特性

* **实时收支统计**：自动计算并展示当前总余额、总收入和总支出。
* **账单历史记录**：清晰展示每一笔账单的名称和金额，支持颜色区分（绿色为收入，红色为支出）。
* **动态操作**：支持快速添加新账单及删除历史记录。
* **本地存储 (LocalStorage)**：即使关闭页面或刷新浏览器，账单数据也不会丢失。
* **响应式设计**：界面简洁，兼容移动端和桌面端浏览。

## 🛠️ 技术栈

* **前端框架**: React (Hooks)
* **状态管理**: `useState`, `useEffect`
* **数据持久化**: 浏览器 `LocalStorage` API
* **样式方案**: 原生 CSS3 (Flexbox)

## 🚀 快速启动

要在本地运行此项目，请确保你已经安装了 [Node.js](https://nodejs.org/)。

### 1. 克隆仓库
```bash
git clone [https://github.com/你的用户名/react-budget-tracker.git](https://github.com/你的用户名/react-budget-tracker.git)
cd react-budget-tracker
