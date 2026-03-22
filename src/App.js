import { useState, useEffect } from "react";

const initialData = [
  { id: 1, name: "Vue", description: "渐进式JavaScript框架" },
  { id: 2, name: "React", description: "用于构建用户界面的JavaScript库" },
  {
    id: 3,
    name: "Angular",
    description: "平台和框架，用于构建单页面客户端应用",
  },
];

function App() {
  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount(data.length);
    }, 1000);
  }, [data]);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const addItem = () => {
    const newItem = {
      id: data.length + 1,
      name: `新框架 ${data.length + 1}`,
      description: "这是一个新添加的框架",
    };
    setData([...data, newItem]);
  };

  const removeItem = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div
      className="App"
      style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}
    >
      <header
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ color: "#333" }}>高级React页面</h1>
        <p>欢迎来到软件工程二班的演示页面</p>
        <p>当前日期: {new Date().toLocaleDateString("zh-CN")}</p>
      </header>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div
          style={{
            flex: 1,
            backgroundColor: "#e9ecef",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h3>统计信息</h3>
          <p>总项目数: {count}</p>
          <button
            onClick={() => setCount(count + 1)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            增加计数
          </button>
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: "#d4edda",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h3>操作面板</h3>
          <button
            onClick={addItem}
            style={{
              padding: "5px 10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              marginRight: "10px",
            }}
          >
            添加项目
          </button>
          <input
            type="text"
            placeholder="搜索框架..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2>框架列表</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredData.map((item) => (
            <li
              key={item.id}
              style={{
                padding: "10px",
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>{item.name}</strong>: {item.description}
              </div>
              <button
                onClick={() => removeItem(item.id)}
                style={{
                  padding: "3px 8px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                删除
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
