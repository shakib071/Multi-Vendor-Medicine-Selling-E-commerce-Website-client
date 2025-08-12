// AdminSalesReport.jsx
import React from "react";
import { Download, Filter } from "lucide-react";

const AdminSalesReport = () => {
  const salesData = [
    {
      id: 1,
      medicine: "Paracetamol 500mg",
      sellerEmail: "seller1@email.com",
      buyerEmail: "buyer1@email.com",
      totalPrice: 250,
      date: "2025-08-01",
    },
    {
      id: 2,
      medicine: "Amoxicillin 250mg",
      sellerEmail: "seller2@email.com",
      buyerEmail: "buyer2@email.com",
      totalPrice: 480,
      date: "2025-08-05",
    },
    {
      id: 3,
      medicine: "Vitamin C 1000mg",
      sellerEmail: "seller3@email.com",
      buyerEmail: "buyer3@email.com",
      totalPrice: 320,
      date: "2025-08-07",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 rounded-2xl min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-blue-700">
          💊 Sales Report
        </h2>
        <div className="flex flex-wrap items-center gap-3">
         

          {/* Download Options */}
          <button className="flex items-center text-xl gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow">
            <Download size={16} /> Download Report
          </button>
        </div>
      </div>

      <div className="">
        <p className="text-xl mb-2">Filter  data by date</p>
         {/* Date Range Filter */}
          <div className="flex items-center gap-5 bg-white p-2 mb-4 rounded-lg shadow">
            <Filter size={18} className="text-gray-500" />
            <input
              type="date"
              className="outline-none text-sm text-gray-700"
            />
            <span className="text-gray-400 text-lg">to</span>
            <input
              type="date"
              className="outline-none text-sm text-gray-700"
            />
          </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-blue-600 text-white text-sm uppercase">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Medicine Name</th>
              <th className="p-3">Seller Email</th>
              <th className="p-3">Buyer Email</th>
              <th className="p-3">Total Price</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale, index) => (
              <tr
                key={sale.id}
                className={`border-b text-lg hover:bg-blue-50 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium text-gray-800">{sale.medicine}</td>
                <td className="p-3 text-gray-600">{sale.sellerEmail}</td>
                <td className="p-3 text-gray-600">{sale.buyerEmail}</td>
                <td className="p-3 font-semibold text-green-600">
                  ${sale.totalPrice}
                </td>
                <td className="p-3 text-gray-500">{sale.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSalesReport;
