import { createContext, useContext, useState, useEffect } from "react";
import {
  fetchTransactions,
  createTransaction,
  editTransaction,
  removeTransaction
} from "../api/mockApi";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [role, setRole] = useState("viewer");
  const [search, setSearch] = useState("");

  //  FETCH DATA (Mock API)
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchTransactions();
      setTransactions(data);
      setLoading(false);
    };

    loadData();
  }, []);

  // ADD
  const addTransaction = async (tx) => {
    const updated = await createTransaction(tx);
    setTransactions(updated);
  };

  //  UPDATE
  const updateTransaction = async (updatedTx) => {
    const updated = await editTransaction(updatedTx);
    setTransactions(updated);
  };

  //  DELETE
  const deleteTransaction = async (id) => {
    const updated = await removeTransaction(id);
    setTransactions(updated);
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        role,
        setRole,
        search,
        setSearch,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        loading   // 
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);