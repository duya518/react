# 视频评论功能 - React 优化版

这是一个基于 React 开发的视频评论管理模块。本项目在原始版本的基础上，通过 **自定义 Hook**、**组件拆分** 以及 **副作用管理** 进行了深度重构，旨在提升代码的可维护性、复用性以及逻辑清晰度。

---

## 📁 项目结构

请确保你的 `src` 目录包含以下四个核心文件：

* **`App.js`**: 主视图组件，负责页面整体布局、Tab 切换以及排序过滤逻辑。
* **`App.css`**: 存放评论组件的样式。
* **`CommentItem.js`**: 封装的单个评论项组件，负责渲染每条评论的 UI。
* **`useComments.js`**: 自定义 Hook，封装了 `useEffect` 获取数据的逻辑以及删除评论的核心业务。

---

## 🚀 核心优化点

### 1. 逻辑抽离：自定义 Hook (`useComments`)
* **状态封装**：将评论列表 (`comments`) 和加载状态 (`loading`) 封装在 Hook 内部，使外部组件无需关心底层实现。
* **业务隔离**：删除评论 (`deleteComment`) 等操作逻辑从 UI 层抽离，App 组件只需调用方法，无需关心如何过滤数组。
* **数据流向**：通过返回对象的方式，向外暴露必要的状态和操作接口。

### 2. 副作用管理：`useEffect`
* **异步模拟**：利用 `useEffect` 模拟真实开发中从后端 API 获取数据的过程，适合练习异步编程。
* **挂载执行**：依赖数组为空 `[]`，确保数据仅在组件首次挂载时加载一次。
* **用户体验**：引入了 `loading` 状态，在数据未返回前显示“加载中...”，避免页面空白导致的不良体验。

### 3. 组件化封装：`CommentItem`
* **Props 传递**：通过属性 (`props`) 将单条评论数据和删除回调函数传递给子组件。
* **代码整洁**：`App.js` 中的 `.map()` 循环内部不再堆砌大量 HTML，极大提高了主文件的可读性。

---

## 🛠️ 代码实现参考

### `useComments.js`
> 负责数据获取与核心逻辑。

```javascript
import { useState, useEffect } from "react";

export const useComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // 模拟 500ms 网络延迟
      await new Promise(resolve => setTimeout(resolve, 500));
      setComments([
        { id: 1, author: "用户1", content: "火钳刘明", time: "2026-3-23 08:00", likes: 45 },
        { id: 2, author: "用户2", content: "1111", time: "2026-3-23 11:06", likes: 33 },
        { id: 3, author: "用户3", content: "有点意思", time: "2026-3-23 12:05", likes: 70 },
        { id: 4, author: "用户4", content: "加油up", time: "2026-3-23 13:24", likes: 99 },
      ]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteComment = (id) => {
    setComments(prev => prev.filter(c => c.id !== id));
  };

  return { comments, deleteComment, loading };
};
