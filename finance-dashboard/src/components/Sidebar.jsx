import { LayoutDashboard, Receipt, BarChart3 } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const baseClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition";

  const activeClass =
    "bg-indigo-100 dark:bg-gray-700 text-indigo-600";

  return (
    <div className="
      w-64 min-h-screen flex flex-col
      bg-white/80 dark:bg-gray-800/80 
      backdrop-blur-md border-r 
      border-gray-200 dark:border-gray-700
      shadow-sm
    ">

      {/* LOGO */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-indigo-600">Finance</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Manage your money
        </p>
      </div>

      {/* MENU */}
      <div className="flex-1 p-4 space-y-2">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : "text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700"}`
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : "text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700"}`
          }
        >
          <Receipt size={20} />
          <span>Transactions</span>
        </NavLink>

        <NavLink
          to="/insights"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : "text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700"}`
          }
        >
          <BarChart3 size={20} />
          <span>Insights</span>
        </NavLink>

      </div>

      {/* FOOTER */}
      <div className="p-4 border-t text-sm text-gray-400 dark:text-gray-500">
        © 2026 Finance App
      </div>
    </div>
  );
}