import { FaMoneyBillWave, FaClock, FaCheckCircle } from "react-icons/fa";
import useAuth from "../../../Hooks/getAuth/useAuth";
import useSoldMeds from "../../../Hooks/getSalerSoldItems/useSoldMeds";
import Loading from "../../Loading/Loading";

export default function SelerHome() {
  const {user,loading} = useAuth();
  const {data:purchases,isLoading} = useSoldMeds(user?.uid);


  const calculateTotal = () => {
    return purchases?.soldItems?.reduce(
      (sum,item)=> sum + (item.price * item.quantity),0
    ) || 0;
  }

  const calculatePendingTotal = () => {
    const pendingItems = purchases?.soldItems?.filter(item => item.paid_status === 'pending')
    // console.log('pendub',pendingItems);
    return pendingItems?.reduce(
      (sum,item) => sum + (item.price * item.quantity),0
    ) || 0;
  }

  

  if(loading || isLoading){
    return <Loading></Loading>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6"> Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white shadow-md p-6 rounded-lg flex items-center gap-4">
          <FaMoneyBillWave className="text-green-500 text-4xl" />
          <div>
            <h2 className="text-gray-500 text-sm">Total Revenue</h2>
            <p className="text-xl font-bold text-gray-800">
              ${calculateTotal()}
            </p>
          </div>
        </div>

       
        <div className="bg-white shadow-md p-6 rounded-lg flex items-center gap-4">
          <FaCheckCircle className="text-blue-500 text-4xl" />
          <div>
            <h2 className="text-gray-500 text-sm">Paid Total</h2>
            <p className="text-xl font-bold text-gray-800">
              ${calculateTotal() - calculatePendingTotal()}
            </p>
          </div>
        </div>

        
        <div className="bg-white shadow-md p-6 rounded-lg flex items-center gap-4">
          <FaClock className="text-yellow-500 text-4xl" />
          <div>
            <h2 className="text-gray-500 text-sm">Pending Total</h2>
            <p className="text-xl font-bold text-gray-800">
              ${calculatePendingTotal()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
