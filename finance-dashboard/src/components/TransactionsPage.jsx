import AddTransactionModal from "../components/AddTransactionModal";
import TransactionTable from "../components/TransactionTable";

export default function TransactionsPage() {
  return (
    <div className="px-6 py-6 space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Transactions
        </h2>
        <AddTransactionModal />
      </div>

      {/* TABLE */}
      <div className="
        bg-white/80 dark:bg-gray-800/80 
        p-5 rounded-2xl shadow border
      ">
        <TransactionTable />
      </div>

    </div>
  );
}