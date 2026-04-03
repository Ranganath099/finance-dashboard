import { useFinance } from "../context/FinanceContext";
import BalanceChart from "../charts/BalanceChart";
import CategoryChart from "../charts/CategoryChart";
import TransactionTable from "../components/TransactionTable";
import Insights from "../components/Insights";
import AddTransactionModal from "../components/AddTransactionModal";

export default function Dashboard() {
  const { transactions, loading } = useFinance();

  // LOADING UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  return (
    <div
      className="
      w-full min-h-screen 
      bg-gradient-to-br from-gray-100 to-gray-200 
      dark:from-gray-900 dark:to-gray-800
    "
    >
      {/* HEADER */}
      <div className="px-6 pt-6">
        <div
          className="
            w-full px-6 py-6
            flex flex-col items-center text-center gap-3

            bg-white/80 dark:bg-gray-800/80 
            backdrop-blur-md 
            shadow border border-gray-200 dark:border-gray-700

            rounded-2xl
          "
        >
          <h1 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
            Finance Dashboard
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Track your income & expenses
          </p>

          <div className="mt-2">
            <AddTransactionModal />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-6 py-6 space-y-6">

        {/* SUMMARY */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* BALANCE */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-5 rounded-2xl shadow border hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Total Balance
            </p>
            <h2 className="text-2xl font-bold mt-2 text-indigo-600">
              ₹ {balance}
            </h2>
          </div>

          {/* INCOME */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-5 rounded-2xl shadow border hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Income
            </p>
            <h2 className="text-2xl font-bold mt-2 text-green-500">
              ₹ {income}
            </h2>
          </div>

          {/* EXPENSE */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-5 rounded-2xl shadow border hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Expenses
            </p>
            <h2 className="text-2xl font-bold mt-2 text-red-500">
              ₹ {expense}
            </h2>
          </div>

        </div>

        {/* CHARTS */}
        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-5 rounded-2xl shadow border hover:shadow-xl transition">
            <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-200">
              Balance Trend
            </h3>
            <BalanceChart />
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-5 rounded-2xl shadow border hover:shadow-xl transition">
            <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-200">
              Spending Breakdown
            </h3>
            <CategoryChart />
          </div>

        </div>

        {/* INSIGHTS */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-5 rounded-2xl shadow border hover:shadow-xl transition">
          <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Insights
          </h3>
          <Insights />
        </div>

        {/* TRANSACTIONS */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-5 rounded-2xl shadow border hover:shadow-xl transition">
          <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-200">
          </h3>
          <TransactionTable />
        </div>

      </div>
    </div>
  );
}