import React from "react";
import useAllPurchasedMed from "../../../Hooks/getAllPurchasedData/useAllPurchasedMed";
import Loading from '../../Loading/Loading'
import useAxios from "../../../Hooks/AxiosHook/useAxios";


export default function AdminPaymentManagement() {

  const {data,isLoading,refetch} = useAllPurchasedMed();
  const axiosInstance = useAxios();
  // console.log(data);

  const payments = data?.flatMap(purce => purce.purchasedItem );
  // console.log(payments);

  const acceptPayment = async(sbId) => {
    console.log(sbId);

    const res = await axiosInstance.patch(`/update-paid-status/${sbId}`);
    refetch();
    console.log(res);

  };

  if(isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <title>Payment Management - CureCart</title>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        Payment Management
      </h1>

      <table className="w-full table-auto border-collapse rounded-md shadow-md overflow-hidden">
        <thead className="bg-indigo-600 text-white text-left text-lg">
          <tr>
            <th className="py-3 px-3 font-semibold">No</th>
            <th className="py-3 px-3 font-semibold">Transaction ID</th>
            <th className="py-3 px-3 font-semibold">User Name</th>
            <th className="py-3 px-3 font-semibold">Medicine</th>
            <th className="py-3 px-3 font-semibold">Amount</th>
            <th className="py-3 px-3 font-semibold">Status</th>
            <th className="py-3 px-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {payments && payments?.map((pay, i) => (
            <tr
              key={i}
              className={`${i % 2 === 0 ? "bg-gray-100" : "bg-white"} text-lg hover:bg-indigo-50 transition-colors`}
            >
              <td className="py-3 px-3 font-mono  text-gray-800">{i+1}</td>
              <td className="py-3 px-3 font-mono text-[12px] text-gray-800">{pay.transaction_ID}</td>
              <td className="py-3 px-3 text-gray-900 font-semibold">{pay.buyerName}</td>
              <td className="py-3 px-3 text-gray-800">{pay.name}</td>
              <td className="py-3 px-3 text-gray-900 font-semibold">${pay.price.toFixed(2)*pay.quantity}</td>
              <td className="py-3 px-3">
                <span
                  className={`px-3 py-1  rounded-full text-[16px] font-semibold ${
                    pay.paid_status !== "pending"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {pay.paid_status.charAt(0).toUpperCase() + pay.paid_status.slice(1)}
                </span>
              </td>
              <td className="py-3 px-6">
                {pay.paid_status === "pending" ? (
                  <button
                    onClick={() => acceptPayment(pay.sbId)}
                    className="px-3 py-2 text-[16px] bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition"
                  >
                    Accept Payment
                  </button>
                ) : (
                  <span className="text-gray-400 font-medium">———</span>
                )}
              </td>
            </tr>
          ))}

          {payments?.length === 0 && (
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
