import { useFinance } from "../context/FinanceContext";
import { Search, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Topbar() {
  const { role, setRole, setSearch } = useFinance();

  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // APPLY DARK MODE
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="flex justify-between items-center px-6 py-4 border-b shadow-sm 
    bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">

      {/* SEARCH */}
      <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-xl w-1/3">
        <Search size={18} className="text-gray-400" />
        <input
          placeholder="Search transactions..."
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none px-2 w-full text-sm text-gray-700 dark:text-gray-200"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* ROLE */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg text-sm outline-none text-gray-700 dark:text-gray-200"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        {/* TOGGLE */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:scale-105 transition"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

      </div>
    </div>
  );
}