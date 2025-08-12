import React from 'react';

const purchases = [
  {
    id: 1,
    medicineName: 'Paracetamol',
    buyerName: 'John Doe',
    date: '2025-08-12',
    amount: 50,
    status: 'Paid',
  },
  {
    id: 2,
    medicineName: 'Amoxicillin',
    buyerName: 'Jane Smith',
    date: '2025-08-10',
    amount: 30,
    status: 'Pending',
  },
  // ... more data
];

const SalerPaymentHistory = () => {
  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 border-b">Medicine</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 border-b">Buyer</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 border-b">Date</th>
              <th className="py-3 px-6 text-right text-sm font-medium text-gray-700 border-b">Amount</th>
              <th className="py-3 px-6 text-center text-sm font-medium text-gray-700 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map(({id, medicineName, buyerName, date, amount, status}) => (
              <tr key={id} className="hover:bg-gray-50">
                <td className="py-3 px-6 text-sm text-gray-800">{medicineName}</td>
                <td className="py-3 px-6 text-sm text-gray-800">{buyerName}</td>
                <td className="py-3 px-6 text-sm text-gray-800">{date}</td>
                <td className="py-3 px-6 text-sm text-right text-gray-800">${amount}</td>
                <td className="py-3 px-6 text-center">
                  {status === 'Paid' ? (
                    <span className="inline-block px-3 py-1 rounded-full bg-green-200 text-green-800 text-xs font-semibold">Paid</span>
                  ) : (
                    <span className="inline-block px-3 py-1 rounded-full bg-orange-200 text-orange-800 text-xs font-semibold">Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalerPaymentHistory;
