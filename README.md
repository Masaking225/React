このプロジェクトは、React と Tailwind CSS を使用して作成されたシンプルな顧客管理アプリです。以下の手順でプロジェクトをセットアップして、実行することができます。

## セットアップ手順

### 1. React アプリケーションの作成

まず、React アプリケーションを作成します。以下のコマンドを実行してください。

```bash
npx create-react-app customer-app
cd customer-app

2. Tailwind CSS のインストール
次に、Tailwind CSS をプロジェクトに追加します。必要な依存関係をインストールします。

bash
コピーする
npm install -D tailwindcss postcss autoprefixer
その後、Tailwind CSS の設定ファイルを初期化します。

bash
コピーする
npx tailwindcss init
3. tailwind.config.js の設定
tailwind.config.js を以下のように設定します。

js
コピーする
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // React のファイルパスを指定
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
4. postcss.config.js の設定
次に、postcss.config.js を設定します。このファイルで Tailwind CSS を PostCSS プラグインとして使用します。

js
コピーする
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
5. src/index.css の設定
src/index.css ファイルで Tailwind CSS をインポートします。

css
コピーする
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
6. React コンポーネントの作成
プロジェクトに必要な React コンポーネントを作成します。

Login.js (ログインフォーム)
jsx
コピーする
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
CustomerList.js (顧客一覧)
jsx
コピーする
// src/components/CustomerList.js
import React, { useState } from "react";

const customersData = [
  { id: 1, name: "田中 太郎", email: "taro@example.com", phone: "090-1234-5678", registered: "2023-01-01" },
  { id: 2, name: "鈴木 次郎", email: "jiro@example.com", phone: "090-9876-5432", registered: "2023-02-01" },
  { id: 3, name: "佐藤 花子", email: "hanako@example.com", phone: "090-5555-6666", registered: "2023-03-01" },
];

const CustomerList = () => {
  const [customers, setCustomers] = useState(customersData);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (criteria) => {
    setSortBy(criteria);
    const sortedCustomers = [...customers].sort((a, b) => {
      if (a[criteria] < b[criteria]) return -1;
      if (a[criteria] > b[criteria]) return 1;
      return 0;
    });
    setCustomers(sortedCustomers);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">顧客一覧</h2>
      <input
        type="text"
        placeholder="顧客名で検索"
        value={search}
        onChange={handleSearch}
        className="mb-4 px-3 py-2 border border-gray-300 rounded-lg w-full"
      />
      <div className="mb-4">
        <button
          onClick={() => handleSort("name")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          名前順で並べ替え
        </button>
        <button
          onClick={() => handleSort("registered")}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          登録日順で並べ替え
        </button>
      </div>
      <table className="min-w-full border-collapse table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">顧客名</th>
            <th className="border px-4 py-2">メールアドレス</th>
            <th className="border px-4 py-2">電話番号</th>
            <th className="border px-4 py-2">登録日</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td className="border px-4 py-2">{customer.name}</td>
              <td className="border px-4 py-2">{customer.email}</td>
              <td className="border px-4 py-2">{customer.phone}</td>
              <td className="border px-4 py-2">{customer.registered}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
7. 最後にアプリを実行
設定が完了したら、以下のコマンドでアプリケーションを起動します。

bash
コピーする
npm start
これで、ブラウザで http://localhost:3000 にアクセスし、アプリが正常に動作することを確認できます。

トラブルシューティング
エラー: It looks like you're trying to use tailwindcss directly as a PostCSS plugin
もし以下のエラーが発生した場合：

vbnet
コピーする
Error: It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin...
このエラーは、tailwindcss パッケージを直接使用しているため発生します。解決方法は、以下の手順で @tailwindcss/postcss をインストールし、設定を更新することです。

bash
コピーする
npm install @tailwindcss/postcss
その後、postcss.config.js を以下のように設定してください：

js
コピーする
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
再度アプリケーションを実行することで、エラーが解消されるはずです。