import { transactions as initialData } from "../data/mockData";

// simulate delay
const delay = (ms) => new Promise(res => setTimeout(res, ms));

// GET transactions
export const fetchTransactions = async () => {
  await delay(800);
  let data = JSON.parse(localStorage.getItem("tx"));
  if (!data) {
    localStorage.setItem("tx", JSON.stringify(initialData));
    data = initialData;
  }
  return data;
};

// ADD transaction
export const createTransaction = async (tx) => {
  await delay(500);
  const existing = JSON.parse(localStorage.getItem("tx")) || [];
  const updated = [...existing, { ...tx, id: Date.now() }];
  localStorage.setItem("tx", JSON.stringify(updated));
  return updated;
};

// UPDATE transaction
export const editTransaction = async (updatedTx) => {
  await delay(500);
  const existing = JSON.parse(localStorage.getItem("tx")) || [];

  const updated = existing.map(t =>
    t.id === updatedTx.id ? updatedTx : t
  );

  localStorage.setItem("tx", JSON.stringify(updated));
  return updated;
};

// DELETE transaction
export const removeTransaction = async (id) => {
  await delay(500);
  const existing = JSON.parse(localStorage.getItem("tx")) || [];

  const updated = existing.filter(t => t.id !== id);

  localStorage.setItem("tx", JSON.stringify(updated));
  return updated;
};