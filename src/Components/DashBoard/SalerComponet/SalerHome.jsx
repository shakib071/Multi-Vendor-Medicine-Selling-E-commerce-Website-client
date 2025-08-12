import { FaMoneyBillWave, FaClock, FaCheckCircle } from "react-icons/fa";

export default function SelerHome() {
  const paidTotal = 12500; 
  const pendingTotal = 3500;
  const totalRevenue = paidTotal + pendingTotal;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6"> Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white shadow-md p-6 rounded-lg flex items-center gap-4">
          <FaMoneyBillWave className="text-green-500 text-4xl" />
          <div>
            <h2 className="text-gray-500 text-sm">Total Revenue</h2>
            <p className="text-xl font-bold text-gray-800">
              ${totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>

       
        <div className="bg-white shadow-md p-6 rounded-lg flex items-center gap-4">
          <FaCheckCircle className="text-blue-500 text-4xl" />
          <div>
            <h2 className="text-gray-500 text-sm">Paid Total</h2>
            <p className="text-xl font-bold text-gray-800">
              ${paidTotal.toLocaleString()}
            </p>
          </div>
        </div>

        
        <div className="bg-white shadow-md p-6 rounded-lg flex items-center gap-4">
          <FaClock className="text-yellow-500 text-4xl" />
          <div>
            <h2 className="text-gray-500 text-sm">Pending Total</h2>
            <p className="text-xl font-bold text-gray-800">
              ${pendingTotal.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
