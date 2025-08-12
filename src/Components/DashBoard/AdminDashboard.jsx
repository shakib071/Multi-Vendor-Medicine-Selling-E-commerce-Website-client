import { useState } from "react";
import { FaHome, FaPills, FaMoneyBill, FaBullhorn, FaBars } from "react-icons/fa";

const NavButton = ({ icon, label, active, setActive, collapsed }) => (
  <button
    onClick={() => setActive(label)}
    className={`flex items-center w-full p-3 rounded-md transition ${
      active === label ? "bg-blue-500 text-white" : "text-gray-200 hover:bg-blue-400"
    }`}
  >
    {icon}
    {!collapsed && <span className="ml-3">{label}</span>}
  </button>
);

export default function AdminDashboard() {
  const [active, setActive] = useState("home");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          collapsed ? "w-16" : "w-56"
        } bg-[#3d4a5a] text-white flex flex-col transition-all duration-300`}
      >
        {/* Top section with toggle */}
        <div className="flex items-center justify-between p-3">
          {!collapsed && <h1 className="font-bold text-lg">Dashboard</h1>}
          <FaBars
            className="cursor-pointer"
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 px-2">
          <NavButton icon={<FaHome  className="text-[#03e003cc]"/>} label="Home" active={active} setActive={setActive} collapsed={collapsed} />
          <NavButton icon={<FaPills className="text-[#e0037ccc]"/>} label="Manage Medicines" active={active} setActive={setActive} collapsed={collapsed} />
          <NavButton icon={<FaMoneyBill className="text-[#03b4e0cc]"/>} label="Payment History" active={active} setActive={setActive} collapsed={collapsed} />
          <NavButton icon={<FaBullhorn className="text-[#e00307cc]"/>} label="Advertisement" active={active} setActive={setActive} collapsed={collapsed} />
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 bg-gray-100">
        {active === "Home" && <h1 className="text-2xl font-bold">Home</h1>}
        {active === "Manage Medicines" && <h1 className="text-2xl font-bold">Manage Medicines</h1>}
        {active === "Payment History" && <h1 className="text-2xl font-bold">Payment History</h1>}
        {active === "Advertisement" && <h1 className="text-2xl font-bold">Ask For Advertisement</h1>}
      </div>
    </div>
  );
}
