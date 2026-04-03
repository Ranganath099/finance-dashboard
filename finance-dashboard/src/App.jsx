import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import TransactionTable from "./components/TransactionTable";
import Insights from "./components/Insights";
import TransactionsPage from "./components/TransactionsPage";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* DASHBOARD */}
        <Route path="/" element={<Layout> <Dashboard /> </Layout>}/>

        {/* TRANSACTIONS */}
        <Route path="/transactions" 
          element={ <Layout>
            <div className="p-6">
              <div className="bg-white/80 dark:bg-gray-800/80 p-5 rounded-2xl shadow border">
                <TransactionsPage />
              </div>
            </div>
          </Layout>}
        />

        {/* INSIGHTS */}
        <Route path="/insights"
          element={<Layout>
              <div className="p-6">
                <div className="bg-white/80 dark:bg-gray-800/80 p-5 rounded-2xl shadow border">
                  <Insights />
                </div>
              </div>
          </Layout>}
        />

      </Routes>
    </BrowserRouter>
  );
}