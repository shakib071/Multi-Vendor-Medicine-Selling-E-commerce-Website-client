import { FaPrint } from "react-icons/fa";
import Logo  from '../../assets/medicalLogo.png';
import useUserCartMed from "../../Hooks/getUserCart/useUserCartMed";
import useAuth from '../../Hooks/getAuth/useAuth';
import Loading from '../Loading/Loading';

const Invoice = () => {

  const {loading,user} = useAuth();
  const {data: invoiceData,isLoading} = useUserCartMed(user?.uid);
  console.log(invoiceData);

  const todaysDate = () => {
    const todaysDate = new Date();

      const year = todaysDate.getFullYear();
      const month = todaysDate.getMonth() + 1;
      const day = todaysDate.getDate();
      if(month<10){
        return `${day}-0${month}-${year}`;
      }
      return `${day}-${month}-${year}`;
  }


  

  const totalAmount = invoiceData?.medicines.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  // console.log(totalAmount);

  if(loading || isLoading){
    return <Loading></Loading>;
  }
  

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 mt-10 shadow-lg rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <div>
            <div className="text-3xl flex items-center font-bold text-blue-600">
                <img className="w-12" src={Logo} alt="" />
                <h1 className=""> MedStore</h1>
            </div>
          
          <p className="text-gray-500">Your Trusted Online Pharmacy</p>
        </div>
        <div>
          <p className="font-semibold">Invoice #: INV-2025-001</p>
          <p className="text-gray-500">Date: {todaysDate()} </p>
        </div>
      </div>

      {/* Customer Info */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Bill To:{user?.displayName}</h2>
        <p>{user?.email}</p>
        
      </div>

      {/* Items Table */}
      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Medicine</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Company</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Quantity</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Price</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Total</th>
          </tr>
        </thead>
        <tbody>
        
            {
              invoiceData.medicines.map((med,index)=>(
                    <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{med.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{med.company}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{med.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">${med.price}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    ${med.price * med.quantity}
                  </td>
                </tr>
              ))
            }
        
        </tbody>
      </table>

      {/* Total */}
      <div className="flex justify-end mb-6">
        <div className="text-right">
          <p className="text-lg font-semibold">
            Total Amount: <span className="text-green-600">${totalAmount}</span>
          </p>
        </div>
      </div>

      {/* Print Button */}
      <div className="flex justify-end">
        <button
          type="button"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
        >
          <FaPrint /> Print Invoice
        </button>
      </div>
    </div>
  );
};

export default Invoice;
