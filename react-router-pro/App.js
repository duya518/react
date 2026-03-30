import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css"; //  关键点：在这里引入你的 CSS 文件

const ITEMS = [
  { id: 1, title: "React 基础", desc: "学习组件、Props 和 State" },
  { id: 2, title: "路由进阶", desc: "掌握嵌套路由和动态传参" },
  { id: 3, title: "项目实战", desc: "开发一个完整的视频评论系统" },
];

// 导航组件
const Navbar = () => (
  <header className="navbar">
    <h1 style={{ margin: 0 }}>MyStudio</h1>
    <div className="nav-links">
      <Link to="/" className="nav-link">
        首页
      </Link>
      <Link to="/courses" className="nav-link">
        课程列表
      </Link>
      <Link to="/about" className="nav-link">
        关于
      </Link>
    </div>
  </header>
);

// 首页
const Home = () => (
  <div className="page-card">
    <h2>🚀 欢迎来到学习中心</h2>
    <p>在这里，你可以从零开始掌握前端开发的各种核心技术。</p>
    <div className="hero-box">
      <h3>今日推荐：JavaScript 核心面试题</h3>
      <button className="btn-primary">立即查看</button>
    </div>
  </div>
);

// 列表页
const CourseList = () => (
  <div className="page-card">
    <h2>📚 选修课程</h2>
    <div className="course-grid">
      {ITEMS.map((item) => (
        <div key={item.id} className="course-card">
          <h4>{item.title}</h4>
          <p style={{ fontSize: "14px", color: "#666" }}>{item.desc}</p>
          <button className="btn-outline">了解更多内容</button>
        </div>
      ))}
    </div>
  </div>
);

const About = () => (
  <div className="page-card">
    <h2>📖 关于我们</h2>
    <p>样式已经成功外联！现在的代码符合生产环境的规范。</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<h2>404 - 页面走丢了</h2>} />
          </Routes>
        </main>

        <footer className="footer">
          © 2026 MyStudio Project - 保持探索，保持学习
        </footer>
      </div>
    </BrowserRouter>
  );
}
