import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div className="
      flex min-h-screen 
      bg-gray-100 dark:bg-gray-900 
      text-gray-900 dark:text-white 
      transition-colors duration-300
    ">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <Topbar />

        {/* CONTENT */}
        <div className="flex-1">
          {children}
        </div>

      </div>
    </div>
  );
}