import React from 'react';
import useAuth from '../../../Hooks/getAuth/useAuth';
import useSoldMeds from '../../../Hooks/getSalerSoldItems/useSoldMeds';
import Loading from '../../Loading/Loading';

// const purchases = [
//   {
//     id: 1,
//     medicineName: 'Paracetamol',
//     buyerName: 'John Doe',
//     date: '2025-08-12',
//     amount: 50,
//     status: 'Paid',
//   },
//   {
//     id: 2,
//     medicineName: 'Amoxicillin',
//     buyerName: 'Jane Smith',
//     date: '2025-08-10',
//     amount: 30,
//     status: 'Pending',
//   },
 
// ];

const SalerPaymentHistory = () => {
  const {user,loading} = useAuth();
  const {data:purchases,isLoading} = useSoldMeds(user?.uid);

  // console.log(purchases?.soldItems);

   const getTimeAndDate = (utcDate) => {
   
    const date = new Date(utcDate);

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; 

    const formatted = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${hours}:${minutes}${ampm}`;
    // console.log(formatted); 
    return formatted;
  }

  if(loading || isLoading){
    return <Loading></Loading>;
  }


  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 border-b">No</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 border-b">Medicine</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 border-b">Buyer</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 border-b">Date</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 border-b">Quantity</th>
              <th className="py-3 px-6 text-right text-sm font-medium text-gray-700 border-b">Amount</th>
              <th className="py-3 px-6 text-center text-sm font-medium text-gray-700 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {purchases?.soldItems.map((sold,index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 px-6 text-sm text-gray-800">{index+1}</td>
                <td className="py-3 px-6 text-sm text-gray-800">{sold.name}</td>
                <td className="py-3 px-6 text-sm text-gray-800">{sold.buyerName}</td>
                <td className="py-3 px-6 text-sm text-gray-800">{getTimeAndDate(sold.addedDate)}</td>
                <td className="py-3 px-6 text-sm text-gray-800 text-center">{sold.quantity}</td>
                <td className="py-3 px-6 text-sm text-right text-gray-800">${sold.price * sold.quantity}</td>
                <td className="py-3 px-6 text-center">
                  {sold.paid_status !== 'pending' ? (
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
