import React from 'react';
import usePurchasedmed from '../../Hooks/getPurchasedData/usePurchasedmed';
import useAuth from '../../Hooks/getAuth/useAuth';
import Loading from '../Loading/Loading';
import { useNavigation } from 'react-router';


const UserDashboard = () => {
  const {user,loading}= useAuth();
  const {data:payments,isLoading} = usePurchasedmed(user?.uid);
  const navigation = useNavigation();

  console.log(payments?.purchasedItem);

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

 

  if(loading || isLoading || navigation.state=='loading'){
    return <Loading></Loading>;
  }
  return (
    <div className='pt-6 min-h-screen bg-[#aaa6a669]'>
      <title>User DashBoard - CureCart</title>
    <div className="p-2 md:p-7 rounded-2xl bg-white  shadow-md xl:max-w-[90%] 2xl:max-w-[87%] mx-auto">
      <h2 className="text-2xl text-center font-bold mb-6">Payment History</h2>
      <table className="min-w-full border text-[10px] md:text-[16px] xl:text-lg 2xl:text-xl border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-1 lg:px-4 border-b">No</th>
            <th className="py-2 px-1 lg:px-4 border-b">Name</th>
            <th className=" py-2 px-1 lg:px-4 border-b">Transaction ID</th>
            <th className="py-2 px-1 lg:px-4 border-b">Quantity</th>
            <th className="py-2 px-1 lg:px-4 border-b">Amount</th>
            <th className="py-2 px-1 lg:px-4 border-b">Purchased Date</th>
            <th className="py-2 px-1 lg:px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments?.purchasedItem?.map((purce,index) => (
            <tr key={index} className="text-center border-b hover:bg-gray-50">
              <td className="py-2 px-1 md:px-4">{index+1}</td>
              <td className="py-2 px-1 md:px-4">{purce.name}</td>
              <td className=" py-2 px-1 md:px-4">{purce.transaction_ID}</td>
              <td className="py-2 px-1 md:px-4">{purce.quantity}</td>
              <td className="py-2 px-1 md:px-4">${purce.price.toFixed(2)*purce.quantity}</td>
              <td className="py-2 px-1 md:px-4">{ getTimeAndDate(purce.addedDate)}</td>
              <td className={`py-2 px-3 md:px-4 font-semibold ${purce.paid_status=='pending'? 'text-red-500':'text-green-500'}`}>{purce.paid_status}</td>
              
            </tr>
          ))}
          {payments?.purchasedItem?.length === 0 && (
            <tr>
              <td colSpan={4} className="py-4 text-4xl text-center text-gray-500">
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
