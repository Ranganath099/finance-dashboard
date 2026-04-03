import { useFinance } from "../context/FinanceContext";

export default function Insights() {
  const { transactions } = useFinance();

  const expenses = transactions.filter(t => t.type === "expense");

  //  CATEGORY TOTAL
  const categoryTotals = {};
  expenses.forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  const highest = Object.entries(categoryTotals).sort((a,b)=>b[1]-a[1])[0];

  //  MONTHLY TOTAL
  const monthly = {};
  transactions.forEach(t => {
    const month = new Date(t.date).toLocaleString("default", { month: "short" });
    monthly[month] = (monthly[month] || 0) + t.amount;
  });

  const months = Object.entries(monthly);

  //  SIMPLE OBSERVATION
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((a,b)=>a+b.amount,0);

  const totalExpense = expenses.reduce((a,b)=>a+b.amount,0);

  return (
  <div className="grid md:grid-cols-3 gap-4">

    {/* HIGHEST CATEGORY */}
    {highest && (
      <div className="
        p-4 rounded-xl border shadow-sm
        bg-white dark:bg-gray-800
        border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-300
      ">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Highest Spending
        </p>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mt-1">
          {highest[0]}
        </h3>
        <p className="text-sm text-indigo-600 mt-1">
          ₹ {highest[1]}
        </p>
      </div>
    )}

    {/* MONTHLY */}
    {months.length > 1 && (
      <div className="
        p-4 rounded-xl border shadow-sm
        bg-white dark:bg-gray-800
        border-gray-200 dark:border-gray-700 hover:scale-[1.02] transition-all duration-300
      ">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Monthly Range
        </p>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mt-1">
          ₹ {Math.min(...months.map(m => m[1]))}
          <span className="text-sm text-gray-400"> → </span>
          ₹ {Math.max(...months.map(m => m[1]))}
        </h3>
      </div>
    )}

    {/* OBSERVATION */}
    <div className="
      p-4 rounded-xl border shadow-sm
      bg-white dark:bg-gray-800
      border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-300
    ">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Observation
      </p>

      <h3 className={`text-sm font-medium mt-2 ${
        totalExpense > totalIncome
          ? "text-red-500"
          : "text-green-500"
      }`}>
        {totalExpense > totalIncome
          ? "Expenses exceed income"
          : "Income is higher than expenses"}
      </h3>
    </div>

  </div>
);
}