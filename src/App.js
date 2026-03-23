import React, { useState } from "react";
import "./App.css";

function App() {
  // 模拟评论数据
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "用户1",
      content: "火钳刘明",
      time: "2026-3-23 8:00",
      likes: 45,
    },
    {
      id: 2,
      author: "用户2",
      content: "1111",
      time: "2026-3-23 11:06",
      likes: 33,
    },
    {
      id: 3,
      author: "用户3",
      content: "有点意思",
      time: "2026-3-23 12:05",
      likes: 70,
    },
    {
      id: 4,
      author: "用户4",
      content: "加油up",
      time: "2026-3-23 13:24",
      likes: 99,
    },
  ]);

  // 当前选中的tab
  const [activeTab, setActiveTab] = useState("all");

  // 排序方式
  const [sortBy, setSortBy] = useState("time");

  // 删除评论
  const deleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  // 排序评论
  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === "time") {
      return new Date(b.time) - new Date(a.time);
    } else if (sortBy === "likes") {
      return b.likes - a.likes;
    }
    return 0;
  });

  // 过滤评论（根据tab）
  const filteredComments = sortedComments.filter((comment) => {
    if (activeTab === "all") return true;
    if (activeTab === "hot") return comment.likes >= 5;
    return true;
  });

  return (
    <div className="App">
      <h1>视频评论</h1>

      {/* 导航tab */}
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

      {/* 排序选项 */}
      <div className="sort-options">
        <label>排序方式：</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="time">按时间</option>
          <option value="likes">按热度</option>
        </select>
      </div>

      {/* 评论列表 */}
      <div className="comments-list">
        {filteredComments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <span className="author">{comment.author}</span>
              <span className="time">{comment.time}</span>
              <button
                className="delete-btn"
                onClick={() => deleteComment(comment.id)}
              >
                删除
              </button>
            </div>
            <div className="comment-content">{comment.content}</div>
            <div className="comment-footer">
              <span>点赞：{comment.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
