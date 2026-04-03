import { useFinance } from "../context/FinanceContext";
import EditTransactionModal from "./EditTransactionModal";
import { useState } from "react";

export default function TransactionTable() {
  const { transactions, search, setSearch, role, deleteTransaction } = useFinance();
  

  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("latest");

  //  SEARCH + FILTER
  const filtered = transactions
    .filter((t) =>
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.type.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) =>
      filter === "all" ? true : t.type === filter
    );

  // SORTING
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "amount") return b.amount - a.amount;
    if (sort === "oldest") return new Date(a.date) - new Date(b.date);
    return new Date(b.date) - new Date(a.date);
  });

  const exportCSV = () => {
  const headers = ["Date", "Category", "Amount", "Type"];

  const rows = transactions.map(t => [
    t.date,
    t.category,
    t.amount,
    t.type
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows]
      .map(e => e.join(","))
      .join("\n");

  const encodedUri = encodeURI(csvContent);

  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "transactions.csv");
  document.body.appendChild(link);
  link.click();
};

  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
        <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-200">
          Transactions
        </h3>

        {/* SEARCH */}
        <input
          placeholder="Search category or type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            border border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-700
            text-gray-700 dark:text-white
            rounded px-3 py-1 text-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
        />
      </div>

      <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-4">

  {/* FILTER */}
  <div className="flex gap-2">
    {["all", "income", "expense"].map((type) => (
      <button
        key={type}
        onClick={() => setFilter(type)}
        className={`px-3 py-1 rounded text-sm capitalize transition ${
          filter === type
            ? "bg-indigo-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white"
        }`}
      >
        {type}
      </button>
    ))}
  </div>

  {/* RIGHT SIDE */}
  <div className="flex gap-2">

    {/* SORT */}
    <select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className="
        border border-gray-300 dark:border-gray-600
        bg-white dark:bg-gray-700
        text-gray-700 dark:text-white
        rounded px-3 py-1 text-sm
      "
    >
      <option value="latest">Latest</option>
      <option value="oldest">Oldest</option>
      <option value="amount">Amount (High → Low)</option>
    </select>

    {/* EXPORT */}
    <button
      onClick={exportCSV}
      className="
        px-3 py-1 rounded text-sm
        bg-indigo-500 text-white
        hover:bg-indigo-600 transition
      "
    >
      Export CSV
    </button>

  </div>
</div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-500 dark:text-gray-400 border-b">
            <tr>
              <th className="text-left py-2">Date</th>
              <th className="text-left">Category</th>
              <th className="text-center">Amount</th>
              <th className="text-center">Type</th>
              {role === "admin" && <th className="text-center">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td
                  colSpan={role === "admin" ? 5 : 4}
                  className="text-center py-4 text-gray-400 dark:text-gray-500"
                >
                  No transactions found
                </td>
              </tr>
            ) : (
              sorted.map((t) => (
                <tr
                  key={t.id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-[1.01]">
                  <td className="py-2">{t.date}</td>
                  <td>{t.category}</td>

                  <td className="text-center font-medium">
                    ₹{t.amount}
                  </td>

                  <td className="text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        t.type === "income"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>

                  {/* ✅ ACTIONS COLUMN */}
                  {role === "admin" && (
                    <td className="text-center space-x-3">

                      {/* EDIT */}
                      <EditTransactionModal transaction={t} />

                      {/* DELETE */}
                      <button onClick={() => {
                          if (window.confirm("Are you sure?")) {
                            deleteTransaction(t.id);}}}className="text-red-500 text-xs hover:underline">
                        Delete
                      </button>

                    </td>
                  )}

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}