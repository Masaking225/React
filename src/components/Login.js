// src/components/Login.js
import React, { useState } from "react";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!userId || !password) {
      setError("ユーザーIDとパスワードは必須です。");
    } else {
      setError("");
      console.log("ログイン成功:", { userId, password });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">ログイン</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="userId" className="block text-sm font-medium">ユーザーID</label>
            <input
              id="userId"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">パスワード</label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
