import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaHome, FaUsers, FaThList, FaMoneyCheckAlt, FaChartLine, FaBullhorn } from 'react-icons/fa';
import AdminHome from "./AdminComponents/AdminHome";
import AdminManageUser from "./AdminComponents/AdminManageUser";
import AdminManageCategory from './AdminComponents/AdminManageCategory'


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
  const [active, setActive] = useState("Home");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          collapsed ? "w-16" : "w-60"
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
        <NavButton icon={<FaHome className="text-[#03e003cc]" />} label="Home" active={active} setActive={setActive} collapsed={collapsed} />
        <NavButton icon={<FaUsers className="text-[#e0037ccc]" />} label="Manage Users" active={active} setActive={setActive} collapsed={collapsed} />
        <NavButton icon={<FaThList className="text-[#03b4e0cc]" />} label="Manage Category" active={active} setActive={setActive} collapsed={collapsed} />
        <NavButton icon={<FaMoneyCheckAlt className="text-[#e37e00cc]" />} label="Payment management" active={active} setActive={setActive} collapsed={collapsed} />
        <NavButton icon={<FaChartLine className="text-[#1e90ffcc]" />} label="Sales Report" active={active} setActive={setActive} collapsed={collapsed} />
        <NavButton icon={<FaBullhorn className="text-[#e00307cc]" />} label="Manage Advertise" active={active} setActive={setActive} collapsed={collapsed} />
      </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 bg-gray-200">
        {active === "Home" && <div className="text-2xl font-bold"><AdminHome></AdminHome></div>}
        {active === "Manage Users" && <div className="text-2xl font-bold"><AdminManageUser></AdminManageUser></div>}
        {active === "Manage Category" && <div className="text-2xl font-bold"><AdminManageCategory></AdminManageCategory></div>}
        {active === "Payment management" && <h1 className="text-2xl font-bold">Payment management</h1>}
        {active === "Sales Report" && <h1 className="text-2xl font-bold">Sales Report</h1>}
        {active === "Manage Advertise" && <h1 className="text-2xl font-bold">Manage banner Advertise</h1>}
      </div>
    </div>
  );
}
