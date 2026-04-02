import React, { useState } from 'react';
import './App.css';

function App() {
  // 状态管理：文章列表与表单输入
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  // 处理封面图片上传与预览
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 生成本地预览的临时URL
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  // 处理文章发布
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('标题和内容不能为空！');
      return;
    }

    const newArticle = {
      id: Date.now(),
      title,
      content,
      // 如果没有上传封面，可以给一个默认图片
      coverUrl: previewUrl || 'https://via.placeholder.com/300x150?text=No+Cover', 
      date: new Date().toLocaleDateString()
    };

    // 将新文章添加到列表最前面
    setArticles([newArticle, ...articles]);

    // 清空表单
    setTitle('');
    setContent('');
    setPreviewUrl('');
    // 注意：如果有 file input 的 ref，也可以在这里重置它
  };

  return (
    <div className="app-container">
      <div className="publish-section">
        <h2>发布新文章</h2>
        <form onSubmit={handleSubmit} className="article-form">
          <div className="form-group">
            <label>文章标题</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="请输入标题" 
            />
          </div>

          <div className="form-group">
            <label>文章封面</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
            />
            {/* 如果有预览链接，则展示图片预览 */}
            {previewUrl && (
              <div className="image-preview">
                <img src={previewUrl} alt="封面预览" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>文章内容</label>
            <textarea 
              rows="5" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              placeholder="请输入正文内容..." 
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">发布文章</button>
        </form>
      </div>

      <div className="article-list-section">
        <h2>文章列表</h2>
        {articles.length === 0 ? (
          <p className="empty-tips">暂无文章，快去发布一篇吧！</p>
        ) : (
          <div className="articles-grid">
            {articles.map((article) => (
              <div key={article.id} className="article-card">
                <div className="article-cover">
                  <img src={article.coverUrl} alt={article.title} />
                </div>
                <div className="article-info">
                  <h3>{article.title}</h3>
                  <p className="article-date">{article.date}</p>
                  <p className="article-snippet">
                    {article.content.length > 50 
                      ? `${article.content.substring(0, 50)}...` 
                      : article.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
