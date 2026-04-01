import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // 从本地存储读取数据，如果没有则初始化为空数组
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);

  // 当 transactions 改变时，自动保存到本地存储
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // 计算余额、收入和支出
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);

  // 添加新账单
  const onSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '' || amount === 0) return;

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount // 确保是数字类型
    };

    setTransactions([...transactions, newTransaction]);
    setText('');
    setAmount(0);
  };

  // 删除账单
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="container">
      <h2>简易记账本</h2>
      
      <div className="balance-container">
        <h4>当前余额</h4>
        <h1>¥{total}</h1>
      </div>

      <div className="inc-exp-container">
        <div>
          <h4>收入</h4>
          <p className="money plus">+¥{income}</p>
        </div>
        <div>
          <h4>支出</h4>
          <p className="money minus">-¥{expense}</p>
        </div>
      </div>

      <h3>历史记录</h3>
      <ul className="list">
        {transactions.map(t => (
          <li key={t.id} className={t.amount < 0 ? 'minus' : 'plus'}>
            {t.text} <span>{t.amount > 0 ? '+' : ''}{t.amount}</span>
            <button onClick={() => deleteTransaction(t.id)} className="delete-btn">x</button>
          </li>
        ))}
      </ul>

      <h3>添加新账单</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label>项目名称</label>
          <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="输入名称..." 
          />
        </div>
        <div className="form-control">
          <label>金额 (正数-收入, 负数-支出)</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="输入金额..." 
          />
        </div>
        <button className="btn">确认添加</button>
      </form>
    </div>
  );
}

export default App;
