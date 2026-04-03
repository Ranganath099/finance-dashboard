import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import ReactDOM from "react-dom";

export default function AddTransactionModal() {
  const { addTransaction, role } = useFinance();
  const [open, setOpen] = useState(false);

 const [form, setForm] = useState({
  amount: "",
  category: "",
  type: "expense",
  date: new Date().toISOString().split("T")[0], // default today
});

  //  Only admin can see button
  if (role !== "admin") return null;

  const submit = () => {
    if (!form.amount || !form.category) return;

    addTransaction({
  ...form,
  amount: Number(form.amount),
});

    setOpen(false);
    setForm({ amount: "", category: "", type: "expense" });
  };

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-5 py-2 rounded-xl shadow hover:scale-105 transition"
      >
        + Add Transaction
      </button>

      {/* MODAL USING PORTAL */}
      {open &&
        ReactDOM.createPortal(
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            {/* MODAL BOX */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="
                w-full max-w-md p-6 rounded-2xl shadow-2xl animate-fadeIn
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
              "
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Add Transaction
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-black dark:hover:text-white text-xl"
                >
                  ✕
                </button>
              </div>

              {/* FORM */}
              <div className="space-y-4">

                {/* AMOUNT */}
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Amount
                  </label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={form.amount}
                    onChange={(e) =>
                      setForm({ ...form, amount: e.target.value })
                    }
                    className="
                      w-full mt-1 px-3 py-2 rounded-lg outline-none
                      bg-gray-100 dark:bg-gray-700
                      text-gray-800 dark:text-white
                      focus:ring-2 focus:ring-indigo-500
                    "
                  />
                </div>

                {/* CATEGORY */}
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Category
                  </label>
                  <input
                    placeholder="e.g Food, Salary"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="
                      w-full mt-1 px-3 py-2 rounded-lg outline-none
                      bg-gray-100 dark:bg-gray-700
                      text-gray-800 dark:text-white
                      focus:ring-2 focus:ring-indigo-500
                    "
                  />
                </div>

                {/* DATE */}
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    max={new Date().toISOString().split("T")[0]} // ✅ restrict future
                    onChange={(e) =>
                      setForm({ ...form, date: e.target.value })
                    }
                    className="w-full mt-1 px-3 py-2 rounded-lg outline-none
                      bg-gray-100 dark:bg-gray-700
                      text-gray-800 dark:text-white
                      focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* TYPE */}
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Type
                  </label>
                  <div className="flex mt-2 gap-2">
                    <button
                      onClick={() => setForm({ ...form, type: "income" })}
                      className={`flex-1 py-2 rounded-lg transition ${
                        form.type === "income"
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      Income
                    </button>

                    <button
                      onClick={() => setForm({ ...form, type: "expense" })}
                      className={`flex-1 py-2 rounded-lg transition ${
                        form.type === "expense"
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      Expense
                    </button>
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                >
                  Cancel
                </button>

                <button
                  onClick={submit}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}