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
