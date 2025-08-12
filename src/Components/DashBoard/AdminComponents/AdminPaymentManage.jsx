import React, { useState } from "react";

const fakePayments = [
  {
    id: "TXN123456",
    userName: "John Doe",
    medicine: "Paracetamol 500mg",
    amount: 25.0,
    status: "pending",
  },
  {
    id: "TXN987654",
    userName: "Jane Smith",
    medicine: "Amoxicillin 250mg",
    amount: 40.5,
    status: "paid",
  },
  {
    id: "TXN456789",
    userName: "Alice Johnson",
    medicine: "Vitamin C 1000mg",
    amount: 15.0,
    status: "pending",
  },
];

export default function AdminPaymentManagement() {
  const [payments, setPayments] = useState(fakePayments);

  const acceptPayment = (id) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "paid" } : p
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        Payment Management
      </h1>

      <table className="w-full table-auto border-collapse rounded-md shadow-md overflow-hidden">
        <thead className="bg-indigo-600 text-white text-left text-lg">
          <tr>
            <th className="py-3 px-3 font-semibold">Transaction ID</th>
            <th className="py-3 px-3 font-semibold">User Name</th>
            <th className="py-3 px-3 font-semibold">Medicine</th>
            <th className="py-3 px-3 font-semibold">Amount</th>
            <th className="py-3 px-3 font-semibold">Status</th>
            <th className="py-3 px-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(({ id, userName, medicine, amount, status }, i) => (
            <tr
              key={id}
              className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} text-lg hover:bg-indigo-50 transition-colors`}
            >
              <td className="py-3 px-3 font-mono text-gray-800">{id}</td>
              <td className="py-3 px-3 text-gray-900 font-semibold">{userName}</td>
              <td className="py-3 px-3 text-gray-800">{medicine}</td>
              <td className="py-3 px-3 text-gray-900 font-semibold">${amount.toFixed(2)}</td>
              <td className="py-3 px-3">
                <span
                  className={`px-3 py-1  rounded-full text-[16px] font-semibold ${
                    status === "paid"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </td>
              <td className="py-3 px-6">
                {status === "pending" ? (
                  <button
                    onClick={() => acceptPayment(id)}
                    className="px-3 py-2 text-[16px] bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition"
                  >
                    Accept Payment
                  </button>
                ) : (
                  <span className="text-gray-400 font-medium">—</span>
                )}
              </td>
            </tr>
          ))}

          {payments.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-10 text-gray-500 font-semibold">
                No payment records available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
