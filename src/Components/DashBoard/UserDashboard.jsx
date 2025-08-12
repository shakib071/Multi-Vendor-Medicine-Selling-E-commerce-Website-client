import React from 'react';

const dummyPayments = [
  { id: 1, transactionId: 'TXN123456', amount: 100, status: 'Paid', date: '2025-08-12' },
  { id: 2, transactionId: 'TXN654321', amount: 50, status: 'Pending', date: '2025-08-10' },
  { id: 3, transactionId: 'TXN789012', amount: 75, status: 'Paid', date: '2025-08-08' },
];

const UserDashboard = () => {
  return (
    <div className='pt-6 min-h-screen bg-[#aaa6a669]'>
    <div className="p-7 rounded-2xl bg-white  shadow-md max-w-5xl mx-auto">
      <h2 className="text-2xl text-center font-bold mb-6">Payment History</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Transaction ID</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyPayments.map(({ id, transactionId, amount, status, date }) => (
            <tr key={id} className="text-center border-b hover:bg-gray-50">
              <td className="py-2 px-4">{transactionId}</td>
              <td className="py-2 px-4">${amount.toFixed(2)}</td>
              <td className="py-2 px-4">{date}</td>
              <td
                className={`py-2 px-4 font-semibold ${
                  status === 'Paid' ? 'text-green-600' : 'text-yellow-600'
                }`}
              >
                {status}
              </td>
            </tr>
          ))}
          {dummyPayments.length === 0 && (
            <tr>
              <td colSpan={4} className="py-4 text-center text-gray-500">
                No payment history found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default UserDashboard;
