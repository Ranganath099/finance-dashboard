import { useState, useEffect } from "react";
import { useFinance } from "../context/FinanceContext";

export default function EditTransactionModal({ transaction }) {
  const { updateTransaction } = useFinance();
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    category: "",
    amount: "",
    type: "income",
    date: ""
  });

  //  Sync data when modal opens
  useEffect(() => {
    if (open && transaction) {
      setForm(transaction);
    }
  }, [open, transaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTransaction(form);
    setOpen(false);
  };

  return (
    <>
      {/* EDIT BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="text-blue-500 text-xs hover:underline"
      >
        Edit
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fadeIn">

          <div className="
            w-80 p-6 rounded-2xl shadow-lg
            bg-white dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            transform transition-all duration-300 scale-95 animate-scaleIn
          ">

            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Edit Transaction
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">

              {/* CATEGORY */}
              <input
                type="text"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                placeholder="Category"
                className="
                  w-full px-3 py-2 rounded-lg
                  border border-gray-300 dark:border-gray-600
                  bg-white dark:bg-gray-700
                  text-gray-700 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-indigo-500
                "
              />

              {/* AMOUNT */}
              <input
                type="number"
                value={form.amount}
                onChange={(e) =>
                  setForm({ ...form, amount: Number(e.target.value) })
                }
                placeholder="Amount"
                className="
                  w-full px-3 py-2 rounded-lg
                  border border-gray-300 dark:border-gray-600
                  bg-white dark:bg-gray-700
                  text-gray-700 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-indigo-500
                "
              />

              {/* TYPE */}
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value })
                }
                className="
                  w-full px-3 py-2 rounded-lg
                  border border-gray-300 dark:border-gray-600
                  bg-white dark:bg-gray-700
                  text-gray-700 dark:text-white
                "
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              {/* DATE */}
              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
                className="
                  w-full px-3 py-2 rounded-lg
                  border border-gray-300 dark:border-gray-600
                  bg-white dark:bg-gray-700
                  text-gray-700 dark:text-white
                "
              />

              {/* ACTION BUTTONS */}
              <div className="flex justify-end gap-2 pt-2">

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="
                    px-3 py-1 rounded
                    bg-gray-200 dark:bg-gray-700
                    text-gray-700 dark:text-white
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="
                    px-3 py-1 rounded
                    bg-indigo-500 text-white
                    hover:bg-indigo-600
                  "
                >
                  Save
                </button>

              </div>

            </form>

          </div>
        </div>
      )}
    </>
  );
}