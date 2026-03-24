import React, { useState } from "react";
import "./App.css";
// 导入你刚才新建的自定义 Hook 和组件
import { useComments } from "./useComments";
import CommentItem from "./CommentItem";

function App() {
  // 1. 使用自定义 Hook 获取数据和删除逻辑
  const { comments, deleteComment, loading } = useComments();

  // 2. 这里的 UI 状态（Tab 和排序方式）保留在 App 组件中，因为它们控制整体视图
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("time");

  // 3. 处理排序：根据时间或热度进行排序
  // 注意：使用 [...comments] 创建副本进行排序，不影响原始状态
  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === "time") {
      return new Date(b.time) - new Date(a.time);
    } else if (sortBy === "likes") {
      return b.likes - a.likes;
    }
    return 0;
  });

  // 4. 处理过滤：根据 Tab 筛选评论
  const filteredComments = sortedComments.filter((comment) => {
    if (activeTab === "all") return true;
    if (activeTab === "hot") return comment.likes >= 5; // 沿用你原本的逻辑
    return true;
  });

  return (
    <div className="App">
      <h1>视频评论</h1>

      {/* 导航 Tab 层 */}
      <div className="tabs">
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
        >
          全部评论
        </button>
        <button
          className={activeTab === "hot" ? "active" : ""}
          onClick={() => setActiveTab("hot")}
        >
          热门评论
        </button>
      </div>

      {/* 排序选项层 */}
      <div className="sort-options">
        <label>排序方式：</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="time">按时间</option>
          <option value="likes">按热度</option>
        </select>
      </div>

      {/* 评论列表渲染层 */}
      <div className="comments-list">
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            正在加载评论...
          </div>
        ) : filteredComments.length > 0 ? (
          filteredComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onDelete={deleteComment}
            />
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>暂无评论</div>
        )}
      </div>
    </div>
  );
}

export default App;
