import { useState, useEffect } from "react";

// 模拟初始数据
const MOCK_DATA = [
  {
    id: 1,
    author: "用户1",
    content: "火钳刘明",
    time: "2026-3-23 08:00",
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
];

export const useComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 使用 useEffect 模拟从 API 获取数据
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // 模拟网络延迟 500ms
      await new Promise((resolve) => setTimeout(resolve, 500));
      setComments(MOCK_DATA);
      setLoading(false);
    };
    loadData();
  }, []);

  // 删除逻辑
  const deleteComment = (id) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  return { comments, deleteComment, loading };
};
