import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// ==========================================
// 1. 模拟的后端数据
// ==========================================
const INITIAL_DATA = [
  { id: 1, text: "React Router v6 配合 Hooks 真好用！", likes: 120, time: "2026-03-31 10:00" },
  { id: 2, text: "正在学习 useEffect 的依赖项配置", likes: 45, time: "2026-03-31 09:30" },
  { id: 3, text: "列表渲染的 key 属性绝对不能忘", likes: 210, time: "2026-03-30 14:00" },
];

// ==========================================
// 2. 页面组件定义
// ==========================================

// 首页组件
const Home = () => (
  <div className="page-card">
    <h2>🏠 控制台首页</h2>
    <p>欢迎来到你的专属工作台。这里记录了你学习 React 的每一次进步。</p>
    <p>请点击上方导航栏的 <strong>“评论管理”</strong> 体验完整的增删改查功能。</p>
  </div>
);

// 核心组件：评论管理系统 (综合应用 useState, useEffect, 列表渲染)
const CommentManager = () => {
  // 定义状态
  const [comments, setComments] = useState([]); // 评论列表
  const [isLoading, setIsLoading] = useState(true); // 加载状态
  const [activeTab, setActiveTab] = useState('hot'); // 当前排序标签 (hot/time)
  const [inputValue, setInputValue] = useState(''); // 输入框内容

  // useEffect: 组件首次挂载时，模拟从服务器获取数据
  useEffect(() => {
    const timer = setTimeout(() => {
      setComments(INITIAL_DATA);
      setIsLoading(false); // 1秒后取消加载状态
    }, 1000);
    
    // 清理函数，防止组件卸载时内存泄漏
    return () => clearTimeout(timer);
  }, []);

  // 排序逻辑 (根据 activeTab 的值动态计算)
  const sortedComments = [...comments].sort((a, b) => {
    if (activeTab === 'hot') {
      return b.likes - a.likes; // 按点赞数降序
    } else {
      // 简单的时间字符串比较，降序 (越新越靠前)
      return b.time.localeCompare(a.time); 
    }
  });

  // 处理：发布评论
  const handlePublish = () => {
    if (inputValue.trim() === '') return;
    
    const newComment = {
      id: Date.now(), // 用时间戳模拟唯一ID
      text: inputValue,
      likes: 0, // 新评论初始点赞为0
      time: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    // 把新评论放到数组最前面
    setComments([newComment, ...comments]);
    setInputValue(''); // 清空输入框
  };

  // 处理：删除评论
  const handleDelete = (idToDelete) => {
    const updatedComments = comments.filter(comment => comment.id !== idToDelete);
    setComments(updatedComments);
  };

  return (
    <div className="page-card">
      <h2>💬 视频评论管理</h2>
      
      {/* 评论发布区 */}
      <div className="comment-box">
        <input 
          type="text" 
          className="comment-input"
          placeholder="发一条友善的评论..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="btn-primary" onClick={handlePublish}>发布评论</button>
      </div>

      {/* 排序标签区 */}
      <div className="tabs">
        <span 
          className={`tab-item ${activeTab === 'hot' ? 'active' : ''}`}
          onClick={() => setActiveTab('hot')}
        >
          🔥 最热 (按点赞)
        </span>
        <span 
          className={`tab-item ${activeTab === 'time' ? 'active' : ''}`}
          onClick={() => setActiveTab('time')}
        >
          🕒 最新 (按时间)
        </span>
      </div>

      {/* 评论列表渲染区 */}
      {isLoading ? (
        <p style={{ textAlign: 'center', color: '#888' }}>正在加载评论数据...</p>
      ) : (
        <div className="comment-list">
          {sortedComments.map(comment => (
            <div key={comment.id} className="comment-item">
              <div className="comment-content">
                <h4>{comment.text}</h4>
                <p>点赞: {comment.likes} · 时间: {comment.time}</p>
              </div>
              <div 
                className="comment-actions" 
                onClick={() => handleDelete(comment.id)}
              >
                删除
              </div>
            </div>
          ))}
          {sortedComments.length === 0 && <p>当前没有任何评论。</p>}
        </div>
      )}
    </div>
  );
};

// 关于页面
const About = () => (
  <div className="page-card">
    <h2>📖 关于此项目</h2>
    <p>这个微型项目完美展示了 React 单页应用的核心运作机制。</p>
  </div>
);

// ==========================================
// 3. 根组件与路由配置
// ==========================================
export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        {/* 全局导航栏 */}
        <header className="navbar">
          <h1 style={{ margin: 0 }}>MyStudio Console</h1>
          <div className="nav-links">
            <Link to="/" className="nav-link">首页</Link>
            <Link to="/comments" className="nav-link">评论管理</Link>
            <Link to="/about" className="nav-link">关于</Link>
          </div>
        </header>
        
        {/* 动态页面出口 */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/comments" element={<CommentManager />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
