import React from 'react';
import { FaDollarSign, FaClock } from 'react-icons/fa';
import useAllSoldMed from '../../../Hooks/getAllSoldMeds/useAllSoldMed';
import Loading from '../../Loading/Loading';

const AdminHome = () => {
  const {data,isLoading} = useAllSoldMed();
  // console.log(data);
  const soldItem = data?.flatMap(item => item.soldItems);
 

  const getPaidTotal = () => {
    const getPaidItem = soldItem?.filter(item => item.paid_status == "paid");
    // console.log('paid item',getPaidItem);
    return getPaidItem?.reduce(
      (sum,item) => sum + (item.price * item.quantity),0
    ) || 0;
  }

  const getPendingTotal = () => {
    const getPendingItems = soldItem?.filter(item => item.paid_status != "paid");
    return getPendingItems?.reduce(
      (sum,item) => sum + (item.price * item.quantity),0
    ) || 0;
  }
  

  if(isLoading){
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-[#ffffff] rounded-xl shadow-lg">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
        Total Sales
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Paid Total Card */}
        <div className="flex items-center p-6 bg-green-200 rounded-lg shadow-md">
          <div className="p-4 bg-green-400 rounded-full mr-6 text-green-900">
            <FaDollarSign size={36} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-1">Paid Total</h3>
            <p className="text-4xl font-bold text-green-900">
              ${getPaidTotal()?.toFixed(2)}
            </p>
            <p className="text-green-700 text-sm mt-1">Revenue successfully collected</p>
          </div>
        </div>

        {/* Pending Total Card */}
        <div className="flex items-center p-6 bg-yellow-200 rounded-lg shadow-md">
          <div className="p-4 bg-yellow-50 rounded-full mr-6 text-yellow-700">
            <FaClock size={36} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-800 mb-1">Pending Total</h3>
            <p className="text-4xl font-bold text-red-900">
              ${getPendingTotal()?.toFixed(2)}
            </p>
            <p className="text-yellow-700 text-sm mt-1">Revenue awaiting payment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
