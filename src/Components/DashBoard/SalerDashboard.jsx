import { useState } from "react";
import { FaHome, FaPills, FaMoneyBill, FaBullhorn, FaBars } from "react-icons/fa";
import SalerHome from "./SalerComponet/SalerHome";
import ManageMedicine from "./SalerComponet/ManageMedicine";
import SalerPaymentHistory from "./SalerComponet/SalerPaymentHistory";
import SalerAdvertisement from "./SalerComponet/SalerAdvertisement";
import { useNavigation } from "react-router";
import Loading from "../Loading/Loading";

const NavButton = ({ icon, label, active, setActive, collapsed }) => (
  <button
    onClick={() => setActive(label)}
    className={`flex items-center w-full text-sm md:text-[16px] p-3 rounded-md transition ${
      active === label ? "bg-blue-500 text-white" : "text-gray-200 hover:bg-blue-400"
    }`}
  >
    {icon}
    {!collapsed && <span className="ml-1 md:ml-3">{label}</span>}
  </button>
);

export default function SalerDashboard() {
  const [active, setActive] = useState("Home");
  const [collapsed, setCollapsed] = useState(false);
  const navigation = useNavigation();

  if(navigation.state == 'loading'){
    return <Loading></Loading>;
  }

  return (
    <div className="flex h-screen">
      <title>Saler Dashboard - CureCart</title>
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
          
          <NavButton icon={<FaHome  className="text-sm md:text-2xl text-[#03e003cc]"/>} label="Home" active={active} setActive={setActive} collapsed={collapsed} />
          <NavButton icon={<FaPills className=" text-sm md:text-2xl text-[#e0037ccc]"/>} label="Manage Medicines" active={active} setActive={setActive} collapsed={collapsed} />
          <NavButton icon={<FaMoneyBill className="text-sm md:text-2xl text-[#03b4e0cc]"/>} label="Payment History" active={active} setActive={setActive} collapsed={collapsed} />
          <NavButton icon={<FaBullhorn className="text-sm md:text-2xl text-[#e00307cc]"/>} label="Advertisement" active={active} setActive={setActive} collapsed={collapsed} />
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 bg-gray-100">
        {active === "Home" && <div className="text-sm md:text-2xl font-bold"><SalerHome></SalerHome></div> }
        {active === "Manage Medicines" && <div className="text-sm md:text-2xl font-bold"><ManageMedicine></ManageMedicine></div>}
        {active === "Payment History" && <div className="text-sm md:text-2xl font-bold"><SalerPaymentHistory></SalerPaymentHistory></div>}
        {active === "Advertisement" && <div className="text-sm md:text-2xl font-bold"><SalerAdvertisement></SalerAdvertisement></div>}
      </div>
    </div>
  );
}
