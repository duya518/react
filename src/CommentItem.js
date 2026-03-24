import React from "react";

const CommentItem = ({ comment, onDelete }) => {
  return (
    <div className="comment">
      <div className="comment-header">
        <span className="author">{comment.author}</span>
        <span className="time">{comment.time}</span>
        <button className="delete-btn" onClick={() => onDelete(comment.id)}>
          删除
        </button>
      </div>
      <div className="comment-content">{comment.content}</div>
      <div className="comment-footer">
        <span>点赞：{comment.likes}</span>
      </div>
    </div>
  );
};

export default CommentItem;
